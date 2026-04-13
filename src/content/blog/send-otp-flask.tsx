import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-flask',
  title: 'How to Send OTP in Flask (Python) — 2026 Tutorial',
  description:
    'Send and verify SMS OTPs from a Flask application using the StartMessaging API. Includes app factory, blueprint routes, sessions, and error handling.',
  category: 'tutorials',
  keywords: [
    'send otp flask',
    'flask sms otp api',
    'flask phone verification',
    'python flask otp tutorial',
    'flask requests otp india',
    'startmessaging flask',
    'flask blueprint otp',
    'flask otp without dlt',
    'flask otp login',
    'sms otp api india python',
  ],
  publishedAt: '2026-04-20',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'app-factory', title: 'App Factory Setup' },
    { id: 'service', title: 'OTP Service' },
    { id: 'blueprint', title: 'Auth Blueprint' },
    { id: 'session', title: 'Sessions and Cookies' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-django', 'send-otp-python', 'idempotency-keys-otp'],
  faq: [
    {
      question: 'Should I use Flask-Login with OTP?',
      answer:
        'Yes — once a user verifies an OTP, call login_user() to create the session. The OTP itself is just the verification step; Flask-Login handles the persistent identity.',
    },
    {
      question: 'Can I run this on Vercel or Lambda?',
      answer:
        'Flask works on AWS Lambda via Mangum and on Vercel via Python runtime. Just make sure your STARTMESSAGING_API_KEY is set in environment variables, not in code.',
    },
    {
      question: 'How do I prevent the same phone from spamming send?',
      answer:
        'Use Flask-Limiter with a "5 per hour" key by phone number, or store recent send timestamps in Redis. Always rate-limit OTP send endpoints — they cost real money.',
    },
  ],
  content: (
    <>
      <p>
        Flask is the go-to micro-framework for small Python services. This
        guide shows how to drop a phone-OTP login on top of Flask using the{' '}
        <Link href="/otp-api">StartMessaging OTP API</Link> in fewer than 80
        lines of code.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>Python 3.10+ and Flask 3.x.</li>
        <li>
          A free{' '}
          <Link href="https://app.startmessaging.com/register">
            StartMessaging account
          </Link>{' '}
          and an API key.
        </li>
      </ul>
      <pre>
        <code>{`pip install Flask requests python-dotenv Flask-Limiter`}</code>
      </pre>

      <h2 id="app-factory">App Factory Setup</h2>
      <pre>
        <code>{`# app/__init__.py
import os
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(get_remote_address, default_limits=["60 per minute"])

def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ["FLASK_SECRET"]
    limiter.init_app(app)

    from .auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
    return app`}</code>
      </pre>

      <h2 id="service">OTP Service</h2>
      <pre>
        <code>{`# app/services/otp.py
import os, uuid, requests

BASE = "https://api.startmessaging.com"
HEAD = {
    "Content-Type": "application/json",
    "X-API-Key": os.environ["STARTMESSAGING_API_KEY"],
}

def send_otp(phone):
    res = requests.post(
        f"{BASE}/otp/send",
        json={"phoneNumber": phone, "idempotencyKey": str(uuid.uuid4())},
        headers=HEAD, timeout=10,
    )
    res.raise_for_status()
    return res.json()["data"]

def verify_otp(request_id, code):
    res = requests.post(
        f"{BASE}/otp/verify",
        json={"requestId": request_id, "otpCode": code},
        headers=HEAD, timeout=10,
    )
    return res.ok and res.json()["data"]["verified"]`}</code>
      </pre>

      <h2 id="blueprint">Auth Blueprint</h2>
      <pre>
        <code>{`# app/auth.py
from flask import Blueprint, request, session, jsonify
from .services.otp import send_otp, verify_otp
from . import limiter

bp = Blueprint("auth", __name__)

@bp.post("/send-otp")
@limiter.limit("5 per hour", key_func=lambda: request.json.get("phone", ""))
def send():
    phone = request.json.get("phone", "")
    try:
        data = send_otp(phone)
    except Exception as e:
        return jsonify(error=str(e)), 502
    session["otp_request_id"] = data["requestId"]
    return jsonify(expires_at=data["expiresAt"])

@bp.post("/verify-otp")
def verify():
    code = request.json.get("code", "")
    rid = session.pop("otp_request_id", None)
    if not rid:
        return jsonify(error="session expired"), 400
    if not verify_otp(rid, code):
        return jsonify(verified=False), 401
    session["user_phone"] = request.json.get("phone")
    return jsonify(verified=True)`}</code>
      </pre>

      <h2 id="session">Sessions and Cookies</h2>
      <p>
        Flask&rsquo;s built-in cookie session is signed but not encrypted, so
        only store opaque values like the requestId &mdash; never the OTP
        itself. For higher-security apps, use server-side sessions via
        Flask-Session backed by Redis.
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>Use Flask-Limiter on the send endpoint, keyed by phone.</li>
        <li>Always set an HTTP timeout on the requests call.</li>
        <li>Never log <code>request.json</code> on the verify endpoint.</li>
        <li>
          For background sends, queue them via Celery or RQ so the request
          returns instantly.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See the equivalent{' '}
        <Link href="/blog/send-otp-django">Django guide</Link> if you prefer
        DRF, or check our{' '}
        <Link href="/blog/otp-verification-flow">OTP flow design article</Link>.
      </p>
    </>
  ),
};
