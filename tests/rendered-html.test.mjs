import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Nexus One investment reference page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Nexus One/i);
  assert.match(html, /Web3 포트폴리오 지주회사/i);
  assert.match(html, /KRW 2,000,000,000/i);
  assert.match(html, /15%/i);
  assert.match(html, /RealSun Solar NFC Platform/i);
  assert.match(html, /KRW 140,000,000/i);
  assert.match(html, /Decentralized OTC Platform/i);
  assert.match(html, /https:\/\/nft\.lart\.lol/i);
  assert.match(html, /ILOVEKOREA\.AI/i);
  assert.match(html, /KRW 3,000,000,000/i);
  assert.doesNotMatch(html, /\[Designated USDT Wallet\]|\[Insert/i);
  assert.doesNotMatch(html, /promises returns|guaranteed returns/i);
  assert.match(html, /VAISEN Mainnet/i);
  assert.match(html, /https:\/\/hubmembership\.info/i);
  assert.match(html, /책임 있는 투자 설명 방식/i);
  assert.match(html, /application\/ld\+json/i);
});

test("removes starter preview scaffolding from product files", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /SkeletonPreview|codex-preview|Your site is taking shape/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /openGraph/);
  assert.match(layout, /Nexus One \| Korean Web3 Portfolio Investment Reference/);
});
