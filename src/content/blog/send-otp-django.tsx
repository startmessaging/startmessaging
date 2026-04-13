import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-django',
  title: 'How to Send OTP in Django (Python) — DRF 2026 Guide',
  description:
    'Send and verify SMS OTPs from Django and Django REST Framework using the StartMessaging API. Includes a service module, DRF views, serializers, and rate limiting.',
  category: 'tutorials',
  keywords: [
    'send otp django',
    'django sms otp api',
    'django rest framework otp',
    'django phone verification',
    'otp api india python django',
    'startmessaging django',
    'drf otp login',
    'django otp without dlt',
    'django requests otp',
    'django sms otp tutorial',
  ],
  publishedAt: '2026-04-19',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'service', title: 'OTP Service Module' },
    { id: 'views', title: 'DRF Views' },
    { id: 'serializers', title: 'Serializers' },
    { id: 'urls', title: 'URL Routing' },
    { id: 'rate-limit', title: 'Rate Limiting' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-python', 'send-otp-flask', 'otp-rate-limiting-guide'],
  faq: [
    {
      question: 'Can I use this with Django\'s built-in auth instead of DRF?',
      answer:
        'Yes. The service module is framework-agnostic — you can call it from a regular Django view, a class-based view, or even from a celery task. The DRF examples are just one common shape.',
    },
    {
      question: 'Should I store the request_id in the session or in the database?',
      answer:
        'For most apps, the Django session is enough. If you need OTP request_ids to survive across devices (for example a cross-device login flow), store them in the database keyed to a temporary token.',
    },
    {
      question: 'What about django-phone-verify or django-otp?',
      answer:
        'Those libraries focus on TOTP or pluggable SMS backends. With StartMessaging you do not need them — the service module is ~30 lines and you keep full control of the verification flow.',
    },
  ],
  content: (
    <>
      <p>
        Django and DRF are still the fastest way to ship a Python API in India.
        This guide adds phone OTP login on top of DRF using the{' '}
        <Link href="/otp-api">StartMessaging OTP API</Link> — no extra packages,
        no DLT paperwork.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>Python 3.10+, Django 4.2 / 5.x, djangorestframework.</li>
        <li>
          A free{' '}
          <Link href="https://app.startmessaging.com/register">
            StartMessaging account
          </Link>{' '}
          and an API key.
        </li>
      </ul>
      <pre>
        <code>{`# .env
STARTMESSAGING_API_KEY=sm_live_xxxxxxxxxxxxxxxxxxxx`}</code>
      </pre>

      <h2 id="service">OTP Service Module</h2>
      <pre>
        <code>{`# accounts/services/otp.py
import os
import uuid
import requests

BASE_URL = "https://api.startmessaging.com"
HEADERS = {
    "Content-Type": "application/json",
    "X-API-Key": os.environ["STARTMESSAGING_API_KEY"],
}

class OtpError(Exception):
    pass

def send_otp(phone_number: str) -> dict:
    res = requests.post(
        f"{BASE_URL}/otp/send",
        json={"phoneNumber": phone_number, "idempotencyKey": str(uuid.uuid4())},
        headers=HEADERS,
        timeout=10,
    )
    if res.status_code >= 400:
        raise OtpError(res.json().get("message", "Failed to send OTP"))
    return res.json()["data"]

def verify_otp(request_id: str, code: str) -> bool:
    res = requests.post(
        f"{BASE_URL}/otp/verify",
        json={"requestId": request_id, "otpCode": code},
        headers=HEADERS,
        timeout=10,
    )
    if res.status_code >= 400:
        return False
    return res.json()["data"]["verified"]`}</code>
      </pre>

      <h2 id="serializers">Serializers</h2>
      <pre>
        <code>{`# accounts/serializers.py
from rest_framework import serializers

class SendOtpSerializer(serializers.Serializer):
    phone_number = serializers.RegexField(r"^\\+91\\d{10}$")

class VerifyOtpSerializer(serializers.Serializer):
    code = serializers.RegexField(r"^\\d{4,6}$")`}</code>
      </pre>

      <h2 id="views">DRF Views</h2>
      <pre>
        <code>{`# accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SendOtpSerializer, VerifyOtpSerializer
from .services.otp import send_otp, verify_otp, OtpError

class SendOtpView(APIView):
    throttle_scope = "otp_send"

    def post(self, request):
        s = SendOtpSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        try:
            data = send_otp(s.validated_data["phone_number"])
        except OtpError as e:
            return Response({"error": str(e)}, status=502)
        request.session["otp_request_id"] = data["requestId"]
        return Response({"expires_at": data["expiresAt"]})

class VerifyOtpView(APIView):
    def post(self, request):
        s = VerifyOtpSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        request_id = request.session.pop("otp_request_id", None)
        if not request_id:
            return Response({"error": "session expired"}, status=400)
        if not verify_otp(request_id, s.validated_data["code"]):
            return Response({"verified": False}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"verified": True})`}</code>
      </pre>

      <h2 id="urls">URL Routing</h2>
      <pre>
        <code>{`# accounts/urls.py
from django.urls import path
from .views import SendOtpView, VerifyOtpView

urlpatterns = [
    path("auth/send-otp/", SendOtpView.as_view()),
    path("auth/verify-otp/", VerifyOtpView.as_view()),
]`}</code>
      </pre>

      <h2 id="rate-limit">Rate Limiting</h2>
      <p>
        Add a DRF throttle scope so a single phone cannot trigger 100 sends per
        hour:
      </p>
      <pre>
        <code>{`REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.ScopedRateThrottle"],
    "DEFAULT_THROTTLE_RATES": {"otp_send": "5/hour"},
}`}</code>
      </pre>
      <p>
        For the full picture see our{' '}
        <Link href="/blog/otp-rate-limiting-guide">OTP rate limiting guide</Link>.
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>Validate phone numbers with <code>phonenumbers</code> before calling the API.</li>
        <li>Use idempotency keys on every send.</li>
        <li>Never log OTP codes &mdash; not even in DEBUG.</li>
        <li>Wrap requests in <code>try/except requests.Timeout</code>.</li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Compare with the{' '}
        <Link href="/blog/send-otp-flask">Flask version</Link> or jump to{' '}
        <Link href="/pricing">pricing</Link>.
      </p>
    </>
  ),
};
