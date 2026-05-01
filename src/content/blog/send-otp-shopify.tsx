import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-shopify',
  title: 'How to Send OTP on Shopify (2026)',
  description:
    'Shopify OTP integration using StartMessaging. App-based pattern with App Proxy, customer metafields, signed cookies, and a checkout-extension flow for India COD verification.',
  category: 'tutorials',
  keywords: [
    'send otp shopify',
    'shopify otp app',
    'shopify cod otp',
    'shopify india otp',
  ],
  publishedAt: '2026-05-11',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'app-proxy', title: 'App Proxy Pattern' },
    { id: 'send-route', title: 'Send Route' },
    { id: 'verify-route', title: 'Verify Route' },
    { id: 'metafield', title: 'Customer Metafield' },
    { id: 'cod', title: 'COD Verification Pattern' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-wordpress',
    'send-otp-nodejs',
    'send-otp-express',
    'otp-ecommerce-india',
  ],
  faq: [
    {
      question: 'Why is OTP important for Shopify in India?',
      answer:
        'COD (cash-on-delivery) is dominant in Indian e-commerce and a major source of fake orders. Phone-OTP at checkout cuts COD-fraud rates by 30–60%.',
    },
  ],
  content: (
    <>
      <p>
        Shopify is heavily used by Indian D2C brands. OTP at checkout is the
        single most effective COD-fraud reduction. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> via App Proxy.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Shopify app with an App Proxy URL.</li>
        <li>Backend (Node / any) hosts <code>/sm/send</code> + <code>/sm/verify</code>.</li>
        <li>Storefront / checkout-extension calls App Proxy.</li>
        <li>On verify, set a customer metafield <code>sm.phone_verified = true</code>.</li>
      </ol>

      <h2 id="app-proxy">App Proxy Pattern</h2>
      <p>
        App Proxy lets your store frontend call your backend without CORS
        gymnastics. Configure proxy prefix <code>apps/sm</code> and proxy URL
        pointing at your backend.
      </p>

      <h2 id="send-route">Send Route</h2>
      <pre>
        <code>{`// backend/index.ts (Node)
import express from 'express';
import { randomUUID } from 'node:crypto';

const app = express();
app.use(express.json());

app.post('/sm/send', async (req, res) => {
  const { phoneNumber } = req.body;
  const r = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'X-API-Key': process.env.SM_API_KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, idempotencyKey: randomUUID() }),
  });
  const data = (await r.json()).data;
  res.cookie('sm_otp_req', data.requestId, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 900_000 });
  res.json({ expiresAt: data.expiresAt });
});`}</code>
      </pre>

      <h2 id="verify-route">Verify Route</h2>
      <pre>
        <code>{`app.post('/sm/verify', async (req, res) => {
  const { otpCode } = req.body;
  const requestId = req.cookies?.sm_otp_req;
  if (!requestId) return res.status(400).json({ error: 'no otp' });
  const r = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'X-API-Key': process.env.SM_API_KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestId, otpCode }),
  });
  if (!r.ok) return res.status(401).json({ error: 'invalid' });
  // set Shopify customer metafield via Admin API
  return res.json({ verified: true });
});`}</code>
      </pre>

      <h2 id="metafield">Customer Metafield</h2>
      <p>
        After verification, set the customer&rsquo;s metafield{' '}
        <code>sm.phone_verified = true</code> via Shopify Admin API.
        Checkout-extension can then read this and enable / disable COD
        accordingly.
      </p>

      <h2 id="cod">COD Verification Pattern</h2>
      <ol>
        <li>Buyer enters phone at checkout.</li>
        <li>Checkout-extension prompts OTP if metafield false.</li>
        <li>Buyer enters OTP; verify call sets metafield.</li>
        <li>COD radio button enables.</li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See our{' '}
        <Link href="/blog/otp-ecommerce-india">e-commerce OTP guide</Link>{' '}
        for the broader Indian COD-fraud playbook.
      </p>
    </>
  ),
};
