import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-aws-lambda',
  title: 'How to Send OTP with AWS Lambda (2026)',
  description:
    'AWS Lambda OTP tutorial using StartMessaging. Function URLs, Secrets Manager for API keys, DynamoDB for rate limits, and SAM/CDK deployment patterns.',
  category: 'tutorials',
  keywords: [
    'send otp aws lambda',
    'aws lambda otp',
    'lambda sms otp',
    'serverless otp india',
  ],
  publishedAt: '2026-05-09',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'secrets', title: 'API Keys via Secrets Manager' },
    { id: 'lambda', title: 'The Lambda Handler' },
    { id: 'rate-limit', title: 'Rate Limiting via DynamoDB' },
    { id: 'function-url', title: 'Function URL or API Gateway' },
    { id: 'cold-start', title: 'Cold Start Mitigation' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-vercel-functions',
    'send-otp-cloudflare-workers',
    'send-otp-google-cloud-run',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Lambda cold starts vs OTP latency — is this a problem?',
      answer:
        'For OTP send-and-verify in India, total user-facing latency is dominated by SMS delivery (3–10s). A 200ms Lambda cold start is negligible. If you want sub-100ms responses, use Provisioned Concurrency.',
    },
  ],
  content: (
    <>
      <p>
        AWS Lambda is a popular target for Indian fintech and SaaS. This
        tutorial wires <Link href="/otp-api">StartMessaging</Link> with
        Secrets Manager for keys and DynamoDB for rate limits.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Lambda function for /send-otp and /verify-otp.</li>
        <li>Secrets Manager for SM_API_KEY.</li>
        <li>DynamoDB for per-phone rate limit.</li>
        <li>Function URL or API Gateway for HTTPS.</li>
      </ol>

      <h2 id="secrets">API Keys via Secrets Manager</h2>
      <pre>
        <code>{`aws secretsmanager create-secret --name sm/api-key --secret-string sm_live_xxx`}</code>
      </pre>

      <h2 id="lambda">The Lambda Handler</h2>
      <pre>
        <code>{`// src/handler.ts (Node.js 20 runtime)
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'node:crypto';

const sm = new SecretsManagerClient({});
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
let cached: string | null = null;

async function getApiKey() {
  if (cached) return cached;
  const r = await sm.send(new GetSecretValueCommand({ SecretId: 'sm/api-key' }));
  cached = r.SecretString!;
  return cached;
}

export const handler = async (event: any) => {
  const path = event.rawPath ?? event.path;
  const body = JSON.parse(event.body ?? '{}');
  const apiKey = await getApiKey();

  if (path === '/auth/send-otp') {
    // hourly cap per phone
    await ddb.send(new UpdateCommand({
      TableName: 'OtpRateLimit',
      Key: { phone: body.phoneNumber },
      UpdateExpression: 'ADD #c :one SET ttl = :ttl',
      ExpressionAttributeNames: { '#c': 'count' },
      ExpressionAttributeValues: { ':one': 1, ':ttl': Math.floor(Date.now() / 1000) + 3600 },
    }));
    const r = await fetch('https://api.startmessaging.com/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({ phoneNumber: body.phoneNumber, idempotencyKey: randomUUID() }),
    });
    return { statusCode: r.status, body: await r.text() };
  }

  if (path === '/auth/verify-otp') {
    const r = await fetch('https://api.startmessaging.com/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(body),
    });
    return { statusCode: r.status, body: await r.text() };
  }
  return { statusCode: 404, body: 'not found' };
};`}</code>
      </pre>

      <h2 id="rate-limit">Rate Limiting via DynamoDB</h2>
      <p>
        DynamoDB with TTL gives you simple per-phone hour caps. For tighter
        limits, conditional updates with <code>count &lt; 5</code> + reject
        on failure.
      </p>

      <h2 id="function-url">Function URL or API Gateway</h2>
      <ul>
        <li>Function URL — simplest, no additional service.</li>
        <li>API Gateway — when you need authentication, custom domains, request validation.</li>
      </ul>

      <h2 id="cold-start">Cold Start Mitigation</h2>
      <ul>
        <li>Cache <code>SM_API_KEY</code> across invocations.</li>
        <li>Use SnapStart (Java) or Provisioned Concurrency (Node).</li>
        <li>Keep Lambda small — no heavy SDK imports beyond what you need.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For Vercel-hosted alternative, see{' '}
        <Link href="/blog/send-otp-vercel-functions">our Vercel guide</Link>.
      </p>
    </>
  ),
};
