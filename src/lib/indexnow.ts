/**
 * IndexNow — submit URL changes to Bing, Yandex, Naver, Seznam in one call.
 * Set INDEXNOW_KEY and INDEXNOW_KEY_LOCATION env vars to use.
 *
 *   INDEXNOW_KEY=<32-char hex>
 *   INDEXNOW_KEY_LOCATION=https://startmessaging.com/indexnow/<same-key>.txt
 *
 * The key file is served by src/app/indexnow/[key]/route.ts using the
 * same INDEXNOW_KEY env var, so set it in one place and both sides match.
 */
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export interface NotifyResult {
  ok: boolean;
  status: number;
  body?: string;
}

export async function notifyIndexNow(urls: string[]): Promise<NotifyResult> {
  const key = process.env.INDEXNOW_KEY;
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION;

  if (!key || !keyLocation) {
    throw new Error(
      "INDEXNOW_KEY and INDEXNOW_KEY_LOCATION must be set to call IndexNow.",
    );
  }
  if (urls.length === 0) {
    return { ok: true, status: 200, body: "no urls" };
  }

  const host = new URL(urls[0]).host;

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: urls,
    }),
  });

  const body = await res.text().catch(() => undefined);
  return { ok: res.ok, status: res.status, body };
}
