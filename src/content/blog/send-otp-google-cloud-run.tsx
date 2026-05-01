import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-google-cloud-run',
  title: 'How to Send OTP with Google Cloud Run (2026)',
  description:
    'Cloud Run OTP tutorial using StartMessaging. Containerised Node service, Secret Manager for keys, Memorystore for rate limit, deployed via gcloud.',
  category: 'tutorials',
  keywords: [
    'send otp cloud run',
    'google cloud run otp',
    'cloud run sms api',
    'cloud run india otp',
  ],
  publishedAt: '2026-05-11',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'service', title: 'Cloud Run Service' },
    { id: 'secrets', title: 'Secret Manager' },
    { id: 'rate-limit', title: 'Memorystore Rate Limit' },
    { id: 'deploy', title: 'Deploy with gcloud' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-firebase-functions',
    'send-otp-aws-lambda',
    'send-otp-vercel-functions',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Cloud Run vs Firebase Functions for OTP?',
      answer:
        'Cloud Run gives you full container control and lower per-request cost at scale. Firebase Functions is simpler if you already live in Firebase. Same StartMessaging integration in both.',
    },
  ],
  content: (
    <>
      <p>
        Cloud Run is a tidy target for containerised Indian SaaS. This
        tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> via a small Node
        container.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Containerise a Node app with /send + /verify routes.</li>
        <li>Pull SM_API_KEY from Secret Manager at startup.</li>
        <li>Per-phone hourly cap in Memorystore (Redis).</li>
        <li>Deploy with <code>gcloud run deploy</code>.</li>
      </ol>

      <h2 id="service">Cloud Run Service</h2>
      <pre>
        <code>{`# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=8080
CMD ["node", "src/index.js"]`}</code>
      </pre>
      <pre>
        <code>{`// src/index.ts
import express from 'express';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { randomUUID } from 'node:crypto';

const sm = new SecretManagerServiceClient();
let apiKey: string | null = null;
async function getKey() {
  if (apiKey) return apiKey;
  const [v] = await sm.accessSecretVersion({ name: process.env.SM_API_KEY_REF! });
  apiKey = v.payload!.data!.toString();
  return apiKey;
}

const app = express();
app.use(express.json());
app.post('/auth/send-otp', async (req, res) => {
  const k = await getKey();
  const r = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'X-API-Key': k, 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: req.body.phoneNumber, idempotencyKey: randomUUID() }),
  });
  res.status(r.status).send(await r.text());
});
app.post('/auth/verify-otp', async (req, res) => {
  const k = await getKey();
  const r = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'X-API-Key': k, 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  res.status(r.status).send(await r.text());
});
app.listen(Number(process.env.PORT) || 8080);`}</code>
      </pre>

      <h2 id="secrets">Secret Manager</h2>
      <pre>
        <code>{`gcloud secrets create sm-api-key --replication-policy=automatic
echo -n 'sm_live_xxx' | gcloud secrets versions add sm-api-key --data-file=-`}</code>
      </pre>

      <h2 id="rate-limit">Memorystore Rate Limit</h2>
      <p>
        Spin a small Memorystore Redis; per-phone INCR with EXPIRE 3600.
      </p>

      <h2 id="deploy">Deploy with gcloud</h2>
      <pre>
        <code>{`gcloud run deploy otp-api --source . \\
  --set-env-vars SM_API_KEY_REF=projects/<id>/secrets/sm-api-key/versions/latest \\
  --service-account otp-runtime@<id>.iam.gserviceaccount.com`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Lambda equivalent in{' '}
        <Link href="/blog/send-otp-aws-lambda">our AWS Lambda guide</Link>.
      </p>
    </>
  ),
};
