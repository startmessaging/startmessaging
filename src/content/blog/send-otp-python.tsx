import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-python',
  title: 'Send OTP via SMS in Python (Requests)',
  description:
    'Python tutorial to send and verify OTP via SMS using the requests library and StartMessaging API. Includes Flask and Django integration examples.',
  category: 'tutorials',
  keywords: [
    'send otp python',
    'python otp sms',
    'otp api python requests',
    'python sms verification',
    'startmessaging python',
    'flask otp sms',
    'django otp verification',
  ],
  publishedAt: '2026-01-18',
  readingTime: 11,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'install-and-configure', title: 'Install and Configure' },
    { id: 'send-otp', title: 'Send an OTP' },
    { id: 'verify-otp', title: 'Verify the OTP' },
    { id: 'helper-class', title: 'Reusable OTP Client Class' },
    { id: 'flask-integration', title: 'Flask Integration' },
    { id: 'django-integration', title: 'Django Integration Tips' },
    { id: 'error-handling', title: 'Error Handling and Retries' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-nodejs', 'otp-verification-flow'],
  faq: [
    {
      question: 'Does StartMessaging provide a Python SDK?',
      answer:
        'Not yet, but the REST API is straightforward to call with the requests library as shown in this guide. A thin wrapper class of about 30 lines gives you a clean interface. We plan to release official SDKs later in 2026.',
    },
    {
      question: 'Can I use httpx or aiohttp instead of requests?',
      answer:
        'Yes. The API is standard REST over HTTPS. Any HTTP client that can send JSON POST requests with custom headers will work. If you are building an async application with FastAPI or similar, httpx with async support is a great choice.',
    },
    {
      question: 'What Python version do I need?',
      answer:
        'The code examples in this guide work with Python 3.8 and above. We recommend Python 3.10+ for production applications.',
    },
    {
      question: 'How do I handle DLT registration in India?',
      answer:
        'You do not need to handle DLT registration yourself. StartMessaging manages all TRAI DLT compliance including sender ID registration and template approvals. Visit our DLT-free OTP page for more information.',
    },
  ],
  content: (
    <>
      <p>
        Sending OTP (one-time password) messages via SMS is a core requirement
        for most Indian web and mobile applications. In this tutorial, you will
        learn how to integrate OTP sending and verification into a Python
        application using the{' '}
        <Link href="/features">StartMessaging API</Link> and the popular{' '}
        <code>requests</code> library.
      </p>
      <p>
        By the end of this guide you will have a reusable OTP client class, a
        working Flask example, and tips for integrating with Django. All for Rs
        0.25 per OTP with no DLT hassle on your end.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>
          <strong>Python 3.8+</strong> installed on your system.
        </li>
        <li>
          <strong>A StartMessaging account</strong> &mdash;{' '}
          <Link href="https://app.startmessaging.com/register">
            sign up here
          </Link>{' '}
          and add funds to your wallet.
        </li>
        <li>
          <strong>An API key</strong> starting with <code>sm_live_</code>,
          created from the{' '}
          <Link href="https://app.startmessaging.com/api-keys">
            API Keys page
          </Link>
          .
        </li>
      </ul>

      <h2 id="install-and-configure">Install and Configure</h2>
      <p>
        Install the <code>requests</code> library and{' '}
        <code>python-dotenv</code> for loading environment variables:
      </p>
      <pre>
        <code>{`pip install requests python-dotenv`}</code>
      </pre>
      <p>
        Create a <code>.env</code> file in your project root:
      </p>
      <pre>
        <code>{`# .env
STARTMESSAGING_API_KEY=sm_live_xxxxxxxxxxxxxxxxxxxx`}</code>
      </pre>
      <p>Load the configuration:</p>
      <pre>
        <code>{`import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ["STARTMESSAGING_API_KEY"]
BASE_URL = "https://api.startmessaging.com"`}</code>
      </pre>

      <h2 id="send-otp">Send an OTP</h2>
      <p>
        The <code>/otp/send</code> endpoint accepts a JSON body with the
        phone number in E.164 format and returns a request ID you will use
        later for verification.
      </p>
      <pre>
        <code>{`import requests

def send_otp(phone_number: str) -> dict:
    """Send an OTP to the given phone number."""
    response = requests.post(
        f"{BASE_URL}/otp/send",
        json={"phoneNumber": phone_number},
        headers={
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
        },
        timeout=10,
    )
    response.raise_for_status()
    return response.json()["data"]

# Usage
result = send_otp("+919876543210")
print(f"OTP sent. Request ID: {result['requestId']}")
print(f"Expires at: {result['expiresAt']}")`}</code>
      </pre>
      <p>
        The response <code>data</code> object contains:
      </p>
      <ul>
        <li>
          <code>requestId</code> &mdash; unique identifier to use during
          verification.
        </li>
        <li>
          <code>expiresAt</code> &mdash; ISO 8601 timestamp for when the OTP
          expires.
        </li>
        <li>
          <code>attemptsLeft</code> &mdash; number of verification attempts
          remaining.
        </li>
      </ul>

      <h2 id="verify-otp">Verify the OTP</h2>
      <p>
        After the user enters the code they received, send it to{' '}
        <code>/otp/verify</code> along with the <code>requestId</code>:
      </p>
      <pre>
        <code>{`def verify_otp(request_id: str, otp_code: str) -> bool:
    """Verify an OTP code. Returns True if valid."""
    response = requests.post(
        f"{BASE_URL}/otp/verify",
        json={"requestId": request_id, "otpCode": otp_code},
        headers={
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
        },
        timeout=10,
    )
    response.raise_for_status()
    return response.json()["data"]["verified"]

# Usage
is_valid = verify_otp(result["requestId"], "384920")
if is_valid:
    print("Phone number verified!")`}</code>
      </pre>

      <h2 id="helper-class">Reusable OTP Client Class</h2>
      <p>
        For cleaner code, wrap the API calls in a client class that handles
        headers, timeouts, and error formatting in one place:
      </p>
      <pre>
        <code>{`import uuid
import requests

class StartMessagingOTP:
    """Thin client for the StartMessaging OTP API."""

    def __init__(self, api_key: str, base_url: str = "https://api.startmessaging.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        })
        self.session.timeout = 10  # seconds

    def send(self, phone_number: str, idempotency_key: str | None = None) -> dict:
        """Send an OTP. Returns dict with requestId, expiresAt, attemptsLeft."""
        payload = {"phoneNumber": phone_number}
        if idempotency_key:
            payload["idempotencyKey"] = idempotency_key
        else:
            payload["idempotencyKey"] = str(uuid.uuid4())

        resp = self.session.post(f"{self.base_url}/otp/send", json=payload)
        resp.raise_for_status()
        return resp.json()["data"]

    def verify(self, request_id: str, otp_code: str) -> bool:
        """Verify an OTP code. Returns True if verified."""
        resp = self.session.post(
            f"{self.base_url}/otp/verify",
            json={"requestId": request_id, "otpCode": otp_code},
        )
        resp.raise_for_status()
        return resp.json()["data"]["verified"]


# Usage
otp_client = StartMessagingOTP(api_key=API_KEY)

data = otp_client.send("+919876543210")
print(f"Request ID: {data['requestId']}")

verified = otp_client.verify(data["requestId"], "482910")
print(f"Verified: {verified}")`}</code>
      </pre>
      <p>
        This class automatically generates an{' '}
        <Link href="/blog/idempotency-keys-otp">idempotency key</Link> for
        every send request, protecting you from accidental duplicate SMS
        charges caused by network retries.
      </p>

      <h2 id="flask-integration">Flask Integration</h2>
      <p>
        Below is a minimal Flask application with two routes for OTP send and
        verify. You can drop this into an existing Flask project.
      </p>
      <pre>
        <code>{`from flask import Flask, request, jsonify

app = Flask(__name__)
otp_client = StartMessagingOTP(api_key=API_KEY)

@app.post("/auth/send-otp")
def handle_send_otp():
    body = request.get_json()
    phone = body.get("phoneNumber")
    if not phone:
        return jsonify({"error": "phoneNumber is required"}), 400

    try:
        data = otp_client.send(phone)
        return jsonify({
            "requestId": data["requestId"],
            "expiresAt": data["expiresAt"],
        })
    except requests.HTTPError as e:
        status = e.response.status_code if e.response else 500
        message = e.response.json().get("message", str(e)) if e.response else str(e)
        return jsonify({"error": message}), status

@app.post("/auth/verify-otp")
def handle_verify_otp():
    body = request.get_json()
    request_id = body.get("requestId")
    otp_code = body.get("otpCode")

    if not request_id or not otp_code:
        return jsonify({"error": "requestId and otpCode are required"}), 400

    try:
        verified = otp_client.verify(request_id, otp_code)
        return jsonify({"verified": verified})
    except requests.HTTPError as e:
        status = e.response.status_code if e.response else 500
        message = e.response.json().get("message", str(e)) if e.response else str(e)
        return jsonify({"error": message}), status

if __name__ == "__main__":
    app.run(port=5000, debug=True)`}</code>
      </pre>
      <p>
        Test it with <code>curl</code>:
      </p>
      <pre>
        <code>{`# Send OTP
curl -X POST http://localhost:5000/auth/send-otp \\
  -H "Content-Type: application/json" \\
  -d '{"phoneNumber": "+919876543210"}'

# Verify OTP (replace REQUEST_ID with actual value)
curl -X POST http://localhost:5000/auth/verify-otp \\
  -H "Content-Type: application/json" \\
  -d '{"requestId": "REQUEST_ID", "otpCode": "384920"}'`}</code>
      </pre>

      <h2 id="django-integration">Django Integration Tips</h2>
      <p>
        If you are using Django or Django REST Framework, here are the key
        patterns to follow:
      </p>
      <ol>
        <li>
          <strong>Store the API key in <code>settings.py</code></strong> by
          reading it from an environment variable:{' '}
          <code>STARTMESSAGING_API_KEY = os.environ[&quot;STARTMESSAGING_API_KEY&quot;]</code>
        </li>
        <li>
          <strong>Create a service module</strong> (e.g.{' '}
          <code>myapp/services/otp.py</code>) that instantiates the{' '}
          <code>StartMessagingOTP</code> client class using{' '}
          <code>settings.STARTMESSAGING_API_KEY</code>.
        </li>
        <li>
          <strong>Call it from your view or serializer.</strong> In DRF, you
          might use an <code>APIView</code> or <code>@api_view</code> decorator.
          The send endpoint returns the request ID to the client, and the verify
          endpoint checks the code.
        </li>
        <li>
          <strong>Use Django&rsquo;s cache framework</strong> to optionally
          store the <code>requestId</code> in Redis or Memcached for quick
          lookup, though this is not required since the StartMessaging API
          handles all state.
        </li>
      </ol>
      <p>
        A quick DRF example:
      </p>
      <pre>
        <code>{`# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from myapp.services.otp import StartMessagingOTP

otp_client = StartMessagingOTP(api_key=settings.STARTMESSAGING_API_KEY)

@api_view(["POST"])
def send_otp_view(request):
    phone = request.data.get("phoneNumber")
    if not phone:
        return Response({"error": "phoneNumber is required"}, status=400)
    data = otp_client.send(phone)
    return Response({"requestId": data["requestId"], "expiresAt": data["expiresAt"]})

@api_view(["POST"])
def verify_otp_view(request):
    request_id = request.data.get("requestId")
    otp_code = request.data.get("otpCode")
    if not request_id or not otp_code:
        return Response({"error": "requestId and otpCode required"}, status=400)
    verified = otp_client.verify(request_id, otp_code)
    return Response({"verified": verified})`}</code>
      </pre>

      <h2 id="error-handling">Error Handling and Retries</h2>
      <p>
        The StartMessaging API returns standard HTTP status codes. Here is how
        to handle common errors in Python:
      </p>
      <pre>
        <code>{`from requests.exceptions import HTTPError, ConnectionError, Timeout
import time

def send_otp_with_retry(phone_number: str, max_retries: int = 3) -> dict:
    """Send OTP with exponential backoff for transient errors."""
    for attempt in range(1, max_retries + 1):
        try:
            data = otp_client.send(phone_number)
            return data
        except HTTPError as e:
            status = e.response.status_code if e.response else 0
            # Do not retry client errors (4xx)
            if 400 <= status < 500:
                raise
            if attempt == max_retries:
                raise
        except (ConnectionError, Timeout):
            if attempt == max_retries:
                raise

        delay = 2 ** (attempt - 1)
        print(f"Attempt {attempt} failed, retrying in {delay}s...")
        time.sleep(delay)

    raise RuntimeError("Failed to send OTP after retries")`}</code>
      </pre>
      <p>Key error codes to watch for:</p>
      <ul>
        <li>
          <strong>400</strong> &mdash; bad request (invalid phone format). Fix
          the input, do not retry.
        </li>
        <li>
          <strong>401</strong> &mdash; invalid API key. Check your
          configuration.
        </li>
        <li>
          <strong>402</strong> &mdash; insufficient wallet balance. Top up your{' '}
          <Link href="https://app.startmessaging.com/wallet">wallet</Link>.
        </li>
        <li>
          <strong>429</strong> &mdash; rate limited. Wait and retry.
        </li>
        <li>
          <strong>5xx</strong> &mdash; server error. Retry with backoff.
        </li>
      </ul>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>
          <strong>Always use idempotency keys.</strong> Network retries can
          cause duplicate SMS delivery. The{' '}
          <code>StartMessagingOTP</code> class above handles this automatically
          by generating a UUID for each send call.
        </li>
        <li>
          <strong>Validate phone numbers on the server.</strong> Use the{' '}
          <code>phonenumbers</code> library to verify E.164 format before
          calling the API.
        </li>
        <li>
          <strong>Set timeouts.</strong> Always pass a <code>timeout</code>{' '}
          parameter to <code>requests</code> calls. 10 seconds is a good
          default.
        </li>
        <li>
          <strong>Keep your API key out of source control.</strong> Use{' '}
          <code>.env</code> files, environment variables, or a secrets manager.
        </li>
        <li>
          <strong>Never log OTP codes.</strong> StartMessaging hashes them
          server-side with bcrypt. Your application should not log or store them
          either.
        </li>
        <li>
          <strong>Monitor wallet balance programmatically.</strong> Use the{' '}
          <code>/wallet</code> API endpoint to check your balance and set up
          alerts before it runs too low.
        </li>
      </ol>
      <p>
        For more on designing a complete OTP flow including retry logic and
        expiry handling, see our guide on{' '}
        <Link href="/blog/otp-verification-flow">
          building a complete OTP verification flow
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>

      <p>
        Get started with StartMessaging at{' '}
        <Link href="/pricing">Rs 0.25 per OTP</Link> &mdash; no monthly fees,
        no DLT registration required. Read the full{' '}
        <Link href="/otp-api">OTP API documentation</Link> for complete
        endpoint details.
      </p>
    </>
  ),
};
