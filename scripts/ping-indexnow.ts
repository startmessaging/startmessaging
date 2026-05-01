/**
 * Run with: npx tsx scripts/ping-indexnow.ts
 *
 * Reads all blog post slugs + key product pages, submits them to IndexNow.
 * Requires INDEXNOW_KEY and INDEXNOW_KEY_LOCATION env vars.
 */
import { getAllSlugs } from "../src/lib/blog";
import { SITE_URL } from "../src/lib/metadata";
import { notifyIndexNow } from "../src/lib/indexnow";

const STATIC_PATHS = [
  "/",
  "/otp-api",
  "/dlt-free-otp",
  "/send-otp-without-dlt",
  "/bulk-otp-api",
  "/pricing",
  "/features",
  "/use-cases",
  "/blog",
  "/about",
  "/contact",
];

async function main() {
  const blogUrls = getAllSlugs().map((slug) => `${SITE_URL}/blog/${slug}`);
  const pageUrls = STATIC_PATHS.map((p) => `${SITE_URL}${p === "/" ? "" : p}`);
  const all = [...pageUrls, ...blogUrls];

  console.log(`Submitting ${all.length} URLs to IndexNow...`);
  const result = await notifyIndexNow(all);
  console.log(`Status: ${result.status} ok=${result.ok}`);
  if (result.body) console.log(result.body);
  if (!result.ok) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
