import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-fastapi',
  title: 'How to Send OTP with FastAPI (2026 Guide)',
  description:
    'Step-by-step FastAPI tutorial to send and verify SMS OTPs using StartMessaging. Includes Pydantic models, async httpx, error handling, dependency injection and a complete /auth router.',
  category: 'tutorials',
  keywords: [
    'send otp fastapi',
    'fastapi otp api',
    'fastapi sms otp',
    'otp verification fastapi',
    'fastapi authentication',
    'startmessaging fastapi',
  ],
  publishedAt: '2026-04-26',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'project-setup', title: 'Project Setup' },
    { id: 'config', title: 'Configuration with Pydantic Settings' },
    { id: 'client', title: 'A Reusable HTTP Client' },
    { id: 'send', title: 'POST /auth/send-otp' },
    { id: 'verify', title: 'POST /auth/verify-otp' },
    { id: 'errors', title: 'Error Handling' },
    { id: 'rate-limit', title: 'Rate Limiting' },
    { id: 'tests', title: 'Testing the Endpoints' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-python',
    'send-otp-django',
    'send-otp-flask',
    'send-otp-nodejs',
    'otp-verification-flow',
  ],
  faq: [
    {
      question: 'Do I need DLT registration to use StartMessaging from FastAPI?',
      answer:
        'No. StartMessaging handles DLT registration, sender ID approval and template compliance on our side. You just call the API.',
    },
    {
      question: 'Can I use sync requests instead of async httpx?',
      answer:
        'Yes. The integration is identical with the requests library. The async path simply scales better when you have many concurrent OTP sends.',
    },
    {
      question: 'How do I avoid duplicate sends on retries?',
      answer:
        'Pass an idempotencyKey in the body. We return the original requestId for the same key, so a network retry never costs you twice. See our idempotency guide for details.',
    },
    {
      question: 'Where should I store the requestId during the flow?',
      answer:
        'In a short-lived HTTP-only signed cookie, or in Redis keyed by the user’s session ID. Never store the OTP code itself — only the request ID.',
    },
  ],
  content: (
    <>
      <p>
        FastAPI&rsquo;s combination of async-first design, Pydantic validation
        and dependency-injection container makes it a natural fit for
        HTTP-based OTP flows. This tutorial walks through a complete{' '}
        <code>/auth</code> router that sends and verifies OTPs via{' '}
        <Link href="/otp-api">StartMessaging</Link>, with full error handling
        and a basic in-memory rate limiter.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>Python 3.11+</li>
        <li>
          A StartMessaging account —{' '}
          <Link href="https://app.startmessaging.com/register">sign up</Link>{' '}
          and copy your API key.
        </li>
        <li>Basic familiarity with FastAPI routers and Pydantic.</li>
      </ul>

      <h2 id="project-setup">Project Setup</h2>
      <pre>
        <code>{`uv init otp-fastapi
cd otp-fastapi
uv add fastapi uvicorn[standard] httpx pydantic pydantic-settings python-multipart`}</code>
      </pre>
      <p>Project layout:</p>
      <pre>
        <code>{`otp-fastapi/
  app/
    __init__.py
    main.py
    settings.py
    sm_client.py
    routers/
      __init__.py
      auth.py
  .env`}</code>
      </pre>

      <h2 id="config">Configuration with Pydantic Settings</h2>
      <pre>
        <code>{`# app/settings.py
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_prefix='SM_')

    api_key: str
    base_url: str = 'https://api.startmessaging.com'
    otp_default_attempts: int = 3

settings = Settings()  # type: ignore`}</code>
      </pre>
      <p>Add to <code>.env</code>:</p>
      <pre>
        <code>{`SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx`}</code>
      </pre>

      <h2 id="client">A Reusable HTTP Client</h2>
      <pre>
        <code>{`# app/sm_client.py
from contextlib import asynccontextmanager
import httpx
from app.settings import settings

@asynccontextmanager
async def sm_client():
    async with httpx.AsyncClient(
        base_url=settings.base_url,
        headers={'X-API-Key': settings.api_key, 'Content-Type': 'application/json'},
        timeout=httpx.Timeout(10.0, connect=3.0),
    ) as client:
        yield client`}</code>
      </pre>

      <h2 id="send">POST /auth/send-otp</h2>
      <pre>
        <code>{`# app/routers/auth.py
from uuid import uuid4
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.sm_client import sm_client

router = APIRouter(prefix='/auth', tags=['auth'])

class SendOtpIn(BaseModel):
    phone_number: str = Field(pattern=r'^\\+91\\d{10}$')

class SendOtpOut(BaseModel):
    request_id: str
    expires_at: str
    attempts_left: int

@router.post('/send-otp', response_model=SendOtpOut)
async def send_otp(body: SendOtpIn):
    payload = {
        'phoneNumber': body.phone_number,
        'idempotencyKey': str(uuid4()),
    }
    async with sm_client() as client:
        res = await client.post('/otp/send', json=payload)

    if res.status_code == 402:
        raise HTTPException(503, 'Service temporarily unavailable. Try again shortly.')
    if res.status_code >= 400:
        detail = res.json().get('message', 'Failed to send OTP')
        raise HTTPException(res.status_code, detail)

    data = res.json()['data']
    return SendOtpOut(
        request_id=data['requestId'],
        expires_at=data['expiresAt'],
        attempts_left=data['attemptsLeft'],
    )`}</code>
      </pre>
      <p>
        Notice we generate an idempotency key per request. If FastAPI&rsquo;s
        outer client retries on transient failure, the same key is reused and
        no duplicate SMS is sent. See{' '}
        <Link href="/blog/idempotency-keys-otp">our idempotency guide</Link>.
      </p>

      <h2 id="verify">POST /auth/verify-otp</h2>
      <pre>
        <code>{`class VerifyOtpIn(BaseModel):
    request_id: str
    otp_code: str = Field(pattern=r'^\\d{4,8}$')

class VerifyOtpOut(BaseModel):
    verified: bool

@router.post('/verify-otp', response_model=VerifyOtpOut)
async def verify_otp(body: VerifyOtpIn):
    async with sm_client() as client:
        res = await client.post(
            '/otp/verify',
            json={'requestId': body.request_id, 'otpCode': body.otp_code},
        )

    if res.status_code == 410:
        raise HTTPException(410, 'OTP expired. Please request a new one.')
    if res.status_code == 400:
        raise HTTPException(400, res.json().get('message', 'Invalid OTP'))
    if res.status_code >= 400:
        raise HTTPException(res.status_code, 'Verification failed')

    return VerifyOtpOut(verified=True)`}</code>
      </pre>

      <h2 id="errors">Error Handling</h2>
      <p>The status codes you will encounter mapped to FastAPI responses:</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>StartMessaging</th>
              <th>FastAPI response</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>400</td>
              <td>400 Bad Request</td>
              <td>Invalid phone or OTP format</td>
            </tr>
            <tr>
              <td>401</td>
              <td>500 Internal</td>
              <td>API key issue — surface as generic 500 to user</td>
            </tr>
            <tr>
              <td>402</td>
              <td>503 Service Unavailable</td>
              <td>Wallet exhausted; alert ops</td>
            </tr>
            <tr>
              <td>410</td>
              <td>410 Gone</td>
              <td>OTP expired</td>
            </tr>
            <tr>
              <td>429</td>
              <td>429 Too Many Requests</td>
              <td>Rate-limited</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="rate-limit">Rate Limiting</h2>
      <p>
        Add a simple per-phone limit to protect your wallet from{' '}
        <Link href="/blog/otp-bot-attacks-traffic-pumping">OTP traffic pumping</Link>:
      </p>
      <pre>
        <code>{`from collections import defaultdict
from time import time

WINDOW = 3600   # 1h
LIMIT = 5

_buckets: dict[str, list[float]] = defaultdict(list)

def assert_under_limit(phone: str) -> None:
    now = time()
    bucket = [t for t in _buckets[phone] if now - t < WINDOW]
    if len(bucket) >= LIMIT:
        raise HTTPException(429, 'Too many OTP requests. Try again later.')
    bucket.append(now)
    _buckets[phone] = bucket`}</code>
      </pre>
      <p>
        For production, swap the in-memory dict for Redis. Read{' '}
        <Link href="/blog/otp-rate-limiting-guide">our rate-limiting guide</Link>.
      </p>

      <h2 id="tests">Testing the Endpoints</h2>
      <pre>
        <code>{`# tests/test_auth.py
import respx, httpx
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@respx.mock
def test_send_otp():
    respx.post('https://api.startmessaging.com/otp/send').mock(
        return_value=httpx.Response(200, json={
            'data': {
                'requestId': 'req_123',
                'expiresAt': '2026-04-26T12:00:00Z',
                'attemptsLeft': 3,
            }
        })
    )
    r = client.post('/auth/send-otp', json={'phone_number': '+919876543210'})
    assert r.status_code == 200
    assert r.json()['request_id'] == 'req_123'`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Looking for the same flow in another stack?{' '}
        <Link href="/blog/send-otp-django">Django</Link>,{' '}
        <Link href="/blog/send-otp-flask">Flask</Link>,{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link>,{' '}
        <Link href="/blog/send-otp-php-laravel">PHP/Laravel</Link>, and many
        more in our <Link href="/blog">tutorial library</Link>. Or jump into
        the <Link href="/otp-api">API reference</Link>.
      </p>
    </>
  ),
};
