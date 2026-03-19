import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-nodejs',
  title: 'How to Send OTP in Node.js (2026 Guide)',
  description:
    'Step-by-step Node.js tutorial to send and verify OTP via SMS using the StartMessaging API. Includes fetch examples, error handling, and verification flow.',
  category: 'tutorials',
  keywords: [
    'send otp nodejs',
    'otp sms node.js',
    'node.js otp api',
    'otp verification node',
    'startmessaging otp',
    'sms otp india nodejs',
    'otp api integration node',
  ],
  publishedAt: '2026-01-15',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'get-api-key', title: 'Get Your API Key' },
    { id: 'send-otp', title: 'Send an OTP' },
    { id: 'verify-otp', title: 'Verify the OTP' },
    { id: 'full-express-example', title: 'Full Express.js Example' },
    { id: 'error-handling', title: 'Error Handling' },
    { id: 'idempotency', title: 'Using Idempotency Keys' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-verification-flow', 'idempotency-keys-otp'],
  faq: [
    {
      question: 'Do I need a DLT registration to send OTPs with StartMessaging?',
      answer:
        'No. StartMessaging handles all DLT compliance on your behalf. You simply call the API and we take care of sender ID registration, template approvals, and TRAI compliance. See our DLT-free OTP page for details.',
    },
    {
      question: 'How much does each OTP cost?',
      answer:
        'Each OTP sent through StartMessaging costs Rs 0.25. There are no monthly fees, no minimum commitments, and no hidden charges. You only pay for what you send.',
    },
    {
      question: 'Can I use this with TypeScript?',
      answer:
        'Absolutely. All the code examples in this guide work with TypeScript as-is. You can add type annotations to the response objects for extra safety. The StartMessaging API returns consistent JSON response envelopes that are easy to type.',
    },
    {
      question: 'What phone number format should I use?',
      answer:
        'Use the E.164 format with country code, for example +919876543210 for an Indian mobile number. Do not include spaces or dashes.',
    },
  ],
  content: (
    <>
      <p>
        One-time passwords (OTPs) are the most common way to verify phone
        numbers in India. Whether you are building a login flow, a payment
        confirmation, or an account-recovery screen, you need a reliable way to
        send and verify OTPs via SMS.
      </p>
      <p>
        In this guide you will learn how to integrate OTP sending and
        verification into a Node.js application using the{' '}
        <Link href="/features">StartMessaging API</Link>. We will use the
        built-in <code>fetch</code> API (available in Node 18+), so there are no
        extra dependencies to install.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>
          <strong>Node.js 18 or later</strong> &mdash; we use the native{' '}
          <code>fetch</code> function. If you are on Node 16, swap{' '}
          <code>fetch</code> for <code>node-fetch</code> or <code>axios</code>.
        </li>
        <li>
          <strong>A StartMessaging account</strong> &mdash;{' '}
          <Link href="https://app.startmessaging.com/register">
            sign up for free
          </Link>{' '}
          and add credit to your wallet.
        </li>
        <li>
          <strong>An API key</strong> &mdash; generated from the{' '}
          <Link href="https://app.startmessaging.com/api-keys">
            API Keys page
          </Link>{' '}
          in the dashboard.
        </li>
      </ul>

      <h2 id="get-api-key">Get Your API Key</h2>
      <p>
        After registering, navigate to <strong>API Keys</strong> in the
        StartMessaging dashboard. Click <strong>Create API Key</strong>, give it
        a name (e.g. &quot;Node Backend&quot;), and copy the key. It starts with{' '}
        <code>sm_live_</code>. You will only see the full key once, so paste it
        into your <code>.env</code> file immediately:
      </p>
      <pre>
        <code>{`# .env
STARTMESSAGING_API_KEY=sm_live_xxxxxxxxxxxxxxxxxxxx`}</code>
      </pre>
      <p>
        Load the key in your application using <code>process.env</code> or a
        library like <code>dotenv</code>:
      </p>
      <pre>
        <code>{`import 'dotenv/config';

const API_KEY = process.env.STARTMESSAGING_API_KEY;
const BASE_URL = 'https://api.startmessaging.com';`}</code>
      </pre>

      <h2 id="send-otp">Send an OTP</h2>
      <p>
        To send an OTP, make a <code>POST</code> request to{' '}
        <code>/otp/send</code>. The only required field is the recipient&rsquo;s
        phone number in E.164 format (e.g. <code>+919876543210</code>).
        StartMessaging generates the code, delivers it via SMS, and returns a
        request ID you will use later to verify.
      </p>
      <pre>
        <code>{`async function sendOtp(phoneNumber) {
  const response = await fetch(\`\${BASE_URL}/otp/send\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send OTP');
  }

  const { data } = await response.json();
  // data contains: { requestId, expiresAt, attemptsLeft }
  return data;
}

// Usage
const result = await sendOtp('+919876543210');
console.log('OTP sent. Request ID:', result.requestId);
console.log('Expires at:', result.expiresAt);`}</code>
      </pre>
      <p>
        The API responds with a JSON envelope. The <code>data</code> object
        contains:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>requestId</code>
              </td>
              <td>string</td>
              <td>Unique ID for this OTP request. Store this for verification.</td>
            </tr>
            <tr>
              <td>
                <code>expiresAt</code>
              </td>
              <td>ISO 8601</td>
              <td>When the OTP expires (default 10 minutes).</td>
            </tr>
            <tr>
              <td>
                <code>attemptsLeft</code>
              </td>
              <td>number</td>
              <td>
                How many verification attempts remain (default 3).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="verify-otp">Verify the OTP</h2>
      <p>
        Once the user receives the SMS and enters the code in your app, send it
        to <code>/otp/verify</code> along with the <code>requestId</code>:
      </p>
      <pre>
        <code>{`async function verifyOtp(requestId, otpCode) {
  const response = await fetch(\`\${BASE_URL}/otp/verify\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ requestId, otpCode }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Verification failed');
  }

  const { data } = await response.json();
  // data contains: { verified: true }
  return data;
}

// Usage
try {
  const result = await verifyOtp(requestId, '482910');
  if (result.verified) {
    console.log('Phone number verified successfully!');
  }
} catch (err) {
  console.error('Verification failed:', err.message);
}`}</code>
      </pre>
      <p>
        If the code is correct, <code>verified</code> will be <code>true</code>.
        If the code is wrong or expired, the API returns an error response with a
        descriptive message.
      </p>

      <h2 id="full-express-example">Full Express.js Example</h2>
      <p>
        Here is a complete Express application with two endpoints: one to
        request an OTP and one to verify it. This is a minimal but
        production-representative pattern.
      </p>
      <pre>
        <code>{`import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

const API_KEY = process.env.STARTMESSAGING_API_KEY;
const BASE_URL = 'https://api.startmessaging.com';

// POST /auth/send-otp
app.post('/auth/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'phoneNumber is required' });
  }

  try {
    const response = await fetch(\`\${BASE_URL}/otp/send\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({ phoneNumber }),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.message || 'Failed to send OTP',
      });
    }

    // Return requestId to the client; they will need it to verify
    return res.json({
      requestId: result.data.requestId,
      expiresAt: result.data.expiresAt,
    });
  } catch (err) {
    console.error('OTP send error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /auth/verify-otp
app.post('/auth/verify-otp', async (req, res) => {
  const { requestId, otpCode } = req.body;

  if (!requestId || !otpCode) {
    return res
      .status(400)
      .json({ error: 'requestId and otpCode are required' });
  }

  try {
    const response = await fetch(\`\${BASE_URL}/otp/verify\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({ requestId, otpCode }),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.message || 'Verification failed',
      });
    }

    // OTP verified — issue a session token, mark phone verified, etc.
    return res.json({ verified: true });
  } catch (err) {
    console.error('OTP verify error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});`}</code>
      </pre>

      <h2 id="error-handling">Error Handling</h2>
      <p>
        The StartMessaging API uses standard HTTP status codes. Here are the most
        common errors you will encounter and how to handle them:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Meaning</th>
              <th>How to Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>400</td>
              <td>Bad request (invalid phone number, missing fields)</td>
              <td>Show validation error to the user. Do not retry.</td>
            </tr>
            <tr>
              <td>401</td>
              <td>Invalid or missing API key</td>
              <td>
                Check your <code>X-API-Key</code> header. Ensure the key is
                active.
              </td>
            </tr>
            <tr>
              <td>402</td>
              <td>Insufficient wallet balance</td>
              <td>
                Top up your{' '}
                <Link href="https://app.startmessaging.com/wallet">wallet</Link>.
                Alert your ops team.
              </td>
            </tr>
            <tr>
              <td>409</td>
              <td>Duplicate idempotency key</td>
              <td>
                The same request was already processed. Use the original response.
              </td>
            </tr>
            <tr>
              <td>429</td>
              <td>Rate limited</td>
              <td>Back off and retry after the time indicated in the response.</td>
            </tr>
            <tr>
              <td>500+</td>
              <td>Server error</td>
              <td>Retry with exponential backoff (max 3 retries).</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A robust helper function that handles retries for transient errors:
      </p>
      <pre>
        <code>{`async function sendOtpWithRetry(phoneNumber, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(\`\${BASE_URL}/otp/send\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({ phoneNumber }),
      });

      // Do not retry client errors (4xx) — they won't succeed on retry
      if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new Error(error.message || \`Client error: \${response.status}\`);
      }

      if (!response.ok) {
        throw new Error(\`Server error: \${response.status}\`);
      }

      const { data } = await response.json();
      return data;
    } catch (err) {
      if (attempt === maxRetries) throw err;

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.warn(\`Attempt \${attempt} failed, retrying in \${delay}ms...\`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}`}</code>
      </pre>

      <h2 id="idempotency">Using Idempotency Keys</h2>
      <p>
        Network failures can cause your send request to be delivered twice. To
        prevent the user from receiving duplicate OTPs, include an{' '}
        <code>idempotencyKey</code> in your request body. If StartMessaging
        receives the same key again, it returns the original response instead of
        sending a new SMS.
      </p>
      <pre>
        <code>{`import { randomUUID } from 'crypto';

async function sendOtpIdempotent(phoneNumber) {
  const idempotencyKey = randomUUID();

  const response = await fetch(\`\${BASE_URL}/otp/send\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ phoneNumber, idempotencyKey }),
  });

  const { data } = await response.json();
  return data;
}`}</code>
      </pre>
      <p>
        Read our detailed guide on{' '}
        <Link href="/blog/idempotency-keys-otp">
          idempotency keys in OTP APIs
        </Link>{' '}
        to understand all the edge cases.
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>
          <strong>Never log OTP codes.</strong> StartMessaging hashes OTPs with
          bcrypt on our side. Do not log them on yours either.
        </li>
        <li>
          <strong>Store the <code>requestId</code>, not the code.</strong> Your
          database should only hold the request ID. Verification happens
          server-side via the API.
        </li>
        <li>
          <strong>Validate phone numbers before calling the API.</strong> Use a
          library like <code>libphonenumber-js</code> to ensure the number is a
          valid Indian mobile number before spending wallet credit.
        </li>
        <li>
          <strong>Set appropriate timeouts.</strong> Use{' '}
          <code>AbortController</code> to set a 10-second timeout on fetch calls
          so your server does not hang.
        </li>
        <li>
          <strong>Use idempotency keys.</strong> Always include an idempotency
          key for send requests to protect against network retries and duplicate
          charges.
        </li>
        <li>
          <strong>Monitor your wallet balance.</strong> Set up an alert when your
          balance drops below a threshold so you never fail to deliver OTPs in
          production.
        </li>
        <li>
          <strong>Keep your API key secret.</strong> Never expose it in frontend
          code or commit it to version control. Use environment variables.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>

      <p>
        Ready to start? <Link href="/pricing">Check our pricing</Link> at Rs
        0.25 per OTP with no monthly fees, or jump straight to the{' '}
        <Link href="/otp-api">OTP API documentation</Link>.
      </p>
    </>
  ),
};
