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

test("server-renders the NanoCapital landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /결제 및 커머스 솔루션/i);
  assert.match(html, /NanoCapital Pay Solution/i);
  assert.match(html, /Shopping Mall Solution/i);
  assert.match(html, /투명한 상업 구조/i);
  assert.match(html, /KRW 5,000,000/i);
  assert.doesNotMatch(html, /\[Designated USDT Wallet\]|\[Insert/i);
  assert.match(html, /서명된 인보이스에서 확정되는 USDT 지갑/i);
  assert.match(html, /결제 시 최종 금액 확정/i);
  assert.match(html, /VAISEN Mainnet/i);
  assert.match(html, /https:\/\/hubmembership\.info/i);
  assert.match(html, /책임 있는 비즈니스 운영을 위한 설계/i);
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
  assert.match(layout, /NanoCapital \| Payment and Commerce Solutions/);
});
