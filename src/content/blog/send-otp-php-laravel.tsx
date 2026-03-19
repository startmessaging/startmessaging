import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-php-laravel',
  title: 'OTP SMS Integration in PHP and Laravel',
  description:
    'Complete PHP tutorial for sending and verifying OTP via SMS using curl and Laravel HTTP client with the StartMessaging API. Includes service class and middleware patterns.',
  category: 'tutorials',
  keywords: [
    'php otp sms',
    'laravel otp verification',
    'send otp php curl',
    'laravel sms api',
    'startmessaging php',
    'php sms verification',
    'otp api laravel integration',
  ],
  publishedAt: '2026-01-22',
  readingTime: 12,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'plain-php-curl', title: 'Plain PHP with cURL' },
    { id: 'verify-otp-php', title: 'Verify OTP in Plain PHP' },
    { id: 'laravel-setup', title: 'Laravel Setup' },
    { id: 'laravel-service-class', title: 'Laravel Service Class' },
    { id: 'laravel-controller', title: 'Laravel Controller' },
    { id: 'laravel-routes', title: 'Routes and Middleware' },
    { id: 'error-handling', title: 'Error Handling' },
    { id: 'testing', title: 'Testing Your Integration' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-nodejs', 'send-otp-python'],
  faq: [
    {
      question: 'Does StartMessaging work with older PHP versions?',
      answer:
        'The cURL examples work with PHP 7.4+. The Laravel examples require Laravel 9 or later, which itself requires PHP 8.0+. We recommend PHP 8.1+ for the best experience with typed properties and enums.',
    },
    {
      question: 'Do I need a DLT registration to send OTPs from my PHP app?',
      answer:
        'No. StartMessaging handles all DLT compliance including sender ID registration and template approvals with Indian telecom operators. You just call the API.',
    },
    {
      question: 'Can I use Guzzle instead of the Laravel HTTP client?',
      answer:
        'Yes. The Laravel HTTP client is actually a wrapper around Guzzle. If you prefer using Guzzle directly, the API calls are identical — just POST JSON to the endpoints with the X-API-Key header.',
    },
    {
      question: 'How do I test OTP sending in development without spending money?',
      answer:
        'During development, you can use a small wallet balance for testing. Each OTP costs only Rs 0.25, so even Rs 25 gives you 100 test messages. We recommend testing with your own phone number to verify end-to-end delivery.',
    },
  ],
  content: (
    <>
      <p>
        PHP powers a massive share of web applications in India, from custom
        frameworks to Laravel-based SaaS products. If you need to add phone
        number verification or two-factor authentication to your PHP
        application, this guide shows you how to integrate OTP sending and
        verification using the{' '}
        <Link href="/features">StartMessaging API</Link>.
      </p>
      <p>
        We will cover two approaches: plain PHP with cURL (works anywhere), and
        a clean Laravel integration with a dedicated service class. Both use the
        same API endpoints and cost Rs 0.25 per OTP with no{' '}
        <Link href="/dlt-free-otp">DLT registration</Link> required on your
        end.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>
          <strong>PHP 7.4+</strong> with the cURL extension enabled (enabled by
          default in most installations).
        </li>
        <li>
          <strong>For Laravel sections:</strong> Laravel 9 or later.
        </li>
        <li>
          <strong>A StartMessaging account</strong> &mdash;{' '}
          <Link href="https://app.startmessaging.com/register">
            sign up for free
          </Link>{' '}
          and top up your wallet.
        </li>
        <li>
          <strong>An API key</strong> from the{' '}
          <Link href="https://app.startmessaging.com/api-keys">
            API Keys page
          </Link>{' '}
          (starts with <code>sm_live_</code>).
        </li>
      </ul>

      <h2 id="plain-php-curl">Plain PHP with cURL</h2>
      <p>
        This approach works in any PHP environment, whether you are using a
        framework, a legacy codebase, or a simple script. The{' '}
        <code>/otp/send</code> endpoint accepts a JSON body with the phone
        number and returns a request ID.
      </p>
      <pre>
        <code>{`<?php

$apiKey = getenv('STARTMESSAGING_API_KEY'); // or read from config
$baseUrl = 'https://api.startmessaging.com';

function sendOtp(string $phoneNumber): array
{
    global $apiKey, $baseUrl;

    $ch = curl_init("{$baseUrl}/otp/send");
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            "X-API-Key: {$apiKey}",
        ],
        CURLOPT_POSTFIELDS     => json_encode([
            'phoneNumber'    => $phoneNumber,
            'idempotencyKey' => bin2hex(random_bytes(16)),
        ]),
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        throw new RuntimeException("cURL error: {$curlError}");
    }

    $body = json_decode($response, true);

    if ($httpCode >= 400) {
        throw new RuntimeException(
            $body['message'] ?? "HTTP error {$httpCode}"
        );
    }

    return $body['data'];
    // Returns: ['requestId' => '...', 'expiresAt' => '...', 'attemptsLeft' => 3]
}

// Usage
$result = sendOtp('+919876543210');
echo "OTP sent! Request ID: " . $result['requestId'] . "\\n";
echo "Expires at: " . $result['expiresAt'] . "\\n";`}</code>
      </pre>
      <p>
        Note the inclusion of an <code>idempotencyKey</code>. This prevents
        duplicate OTPs if a network retry occurs. Read more about{' '}
        <Link href="/blog/idempotency-keys-otp">
          idempotency keys in OTP APIs
        </Link>
        .
      </p>

      <h2 id="verify-otp-php">Verify OTP in Plain PHP</h2>
      <p>
        After the user enters the OTP code, verify it by sending the code and
        request ID to <code>/otp/verify</code>:
      </p>
      <pre>
        <code>{`function verifyOtp(string $requestId, string $otpCode): bool
{
    global $apiKey, $baseUrl;

    $ch = curl_init("{$baseUrl}/otp/verify");
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            "X-API-Key: {$apiKey}",
        ],
        CURLOPT_POSTFIELDS     => json_encode([
            'requestId' => $requestId,
            'otpCode'   => $otpCode,
        ]),
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $body = json_decode($response, true);

    if ($httpCode >= 400) {
        throw new RuntimeException(
            $body['message'] ?? "Verification failed (HTTP {$httpCode})"
        );
    }

    return $body['data']['verified'] === true;
}

// Usage
if (verifyOtp($result['requestId'], '482910')) {
    echo "Phone number verified!\\n";
} else {
    echo "Invalid OTP code.\\n";
}`}</code>
      </pre>

      <h2 id="laravel-setup">Laravel Setup</h2>
      <p>
        In a Laravel application, store your API key in the <code>.env</code>{' '}
        file and register it in your config:
      </p>
      <pre>
        <code>{`# .env
STARTMESSAGING_API_KEY=sm_live_xxxxxxxxxxxxxxxxxxxx`}</code>
      </pre>
      <p>
        Add it to a config file, for example{' '}
        <code>config/services.php</code>:
      </p>
      <pre>
        <code>{`// config/services.php
return [
    // ... other services

    'startmessaging' => [
        'api_key'  => env('STARTMESSAGING_API_KEY'),
        'base_url' => env('STARTMESSAGING_BASE_URL', 'https://api.startmessaging.com'),
    ],
];`}</code>
      </pre>

      <h2 id="laravel-service-class">Laravel Service Class</h2>
      <p>
        Create a dedicated service class that encapsulates all OTP API
        interactions. This keeps your controllers clean and makes the
        integration easy to test.
      </p>
      <pre>
        <code>{`<?php
// app/Services/OtpService.php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Str;
use Illuminate\\Http\\Client\\RequestException;

class OtpService
{
    private string $baseUrl;
    private string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.startmessaging.base_url');
        $this->apiKey = config('services.startmessaging.api_key');
    }

    /**
     * Send an OTP to the given phone number.
     *
     * @return array{requestId: string, expiresAt: string, attemptsLeft: int}
     * @throws RequestException
     */
    public function send(string $phoneNumber, ?string $idempotencyKey = null): array
    {
        $response = Http::withHeaders([
            'X-API-Key' => $this->apiKey,
        ])
        ->timeout(10)
        ->post("{$this->baseUrl}/otp/send", [
            'phoneNumber'    => $phoneNumber,
            'idempotencyKey' => $idempotencyKey ?? Str::uuid()->toString(),
        ]);

        $response->throw(); // Throws RequestException on 4xx/5xx

        return $response->json('data');
    }

    /**
     * Verify an OTP code.
     *
     * @throws RequestException
     */
    public function verify(string $requestId, string $otpCode): bool
    {
        $response = Http::withHeaders([
            'X-API-Key' => $this->apiKey,
        ])
        ->timeout(10)
        ->post("{$this->baseUrl}/otp/verify", [
            'requestId' => $requestId,
            'otpCode'   => $otpCode,
        ]);

        $response->throw();

        return $response->json('data.verified') === true;
    }
}`}</code>
      </pre>
      <p>
        Register the service in <code>AppServiceProvider</code> so it can be
        injected:
      </p>
      <pre>
        <code>{`// app/Providers/AppServiceProvider.php

use App\\Services\\OtpService;

public function register(): void
{
    $this->app->singleton(OtpService::class);
}`}</code>
      </pre>

      <h2 id="laravel-controller">Laravel Controller</h2>
      <p>
        Create a controller that uses the <code>OtpService</code> via
        dependency injection:
      </p>
      <pre>
        <code>{`<?php
// app/Http/Controllers/OtpController.php

namespace App\\Http\\Controllers;

use App\\Services\\OtpService;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\Client\\RequestException;

class OtpController extends Controller
{
    public function __construct(
        private readonly OtpService $otpService,
    ) {}

    public function send(Request $request): JsonResponse
    {
        $request->validate([
            'phoneNumber' => ['required', 'string', 'regex:/^\\+[1-9]\\d{6,14}$/'],
        ]);

        try {
            $data = $this->otpService->send($request->input('phoneNumber'));

            return response()->json([
                'requestId' => $data['requestId'],
                'expiresAt' => $data['expiresAt'],
            ]);
        } catch (RequestException $e) {
            $status = $e->response?->status() ?? 500;
            $message = $e->response?->json('message') ?? 'Failed to send OTP';

            return response()->json(['error' => $message], $status);
        }
    }

    public function verify(Request $request): JsonResponse
    {
        $request->validate([
            'requestId' => ['required', 'string'],
            'otpCode'   => ['required', 'string', 'digits:6'],
        ]);

        try {
            $verified = $this->otpService->verify(
                $request->input('requestId'),
                $request->input('otpCode'),
            );

            return response()->json(['verified' => $verified]);
        } catch (RequestException $e) {
            $status = $e->response?->status() ?? 500;
            $message = $e->response?->json('message') ?? 'Verification failed';

            return response()->json(['error' => $message], $status);
        }
    }
}`}</code>
      </pre>

      <h2 id="laravel-routes">Routes and Middleware</h2>
      <p>
        Register the routes in <code>routes/api.php</code>. You will likely
        want rate limiting on the send endpoint to prevent abuse:
      </p>
      <pre>
        <code>{`// routes/api.php

use App\\Http\\Controllers\\OtpController;
use Illuminate\\Support\\Facades\\Route;

Route::prefix('auth')->group(function () {
    Route::post('/send-otp', [OtpController::class, 'send'])
        ->middleware('throttle:5,1'); // 5 requests per minute

    Route::post('/verify-otp', [OtpController::class, 'verify'])
        ->middleware('throttle:10,1'); // 10 requests per minute
});`}</code>
      </pre>
      <p>
        The throttle middleware prevents a single client from spamming OTP
        requests. You can customize the limits based on your use case. For a
        deeper dive on rate limiting and other security measures, read our guide
        on{' '}
        <Link href="/blog/otp-verification-flow">
          building a complete OTP verification flow
        </Link>
        .
      </p>

      <h2 id="error-handling">Error Handling</h2>
      <p>
        The StartMessaging API uses standard HTTP status codes. Here is how to
        interpret them in your PHP application:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Meaning</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>200</td>
            <td>Success</td>
            <td>Process the response data normally.</td>
          </tr>
          <tr>
            <td>400</td>
            <td>Invalid request (bad phone format, missing fields)</td>
            <td>Return validation error to client. Do not retry.</td>
          </tr>
          <tr>
            <td>401</td>
            <td>Invalid API key</td>
            <td>Check your configuration. The key may be revoked.</td>
          </tr>
          <tr>
            <td>402</td>
            <td>Insufficient wallet balance</td>
            <td>
              Top up your wallet and alert your operations team.
            </td>
          </tr>
          <tr>
            <td>409</td>
            <td>Duplicate idempotency key</td>
            <td>Return the original cached response. This is not an error.</td>
          </tr>
          <tr>
            <td>429</td>
            <td>Rate limited</td>
            <td>Wait and retry after the indicated period.</td>
          </tr>
          <tr>
            <td>500+</td>
            <td>Server error</td>
            <td>Retry with exponential backoff (max 3 attempts).</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        For Laravel, you can add a retry mechanism using the HTTP client&rsquo;s
        built-in retry method:
      </p>
      <pre>
        <code>{`$response = Http::withHeaders([
    'X-API-Key' => $this->apiKey,
])
->timeout(10)
->retry(3, 1000, function ($exception, $request) {
    // Only retry on server errors, not client errors
    return $exception instanceof ConnectionException
        || ($exception instanceof RequestException
            && $exception->response->status() >= 500);
})
->post("{$this->baseUrl}/otp/send", [
    'phoneNumber'    => $phoneNumber,
    'idempotencyKey' => $idempotencyKey,
]);`}</code>
      </pre>

      <h2 id="testing">Testing Your Integration</h2>
      <p>
        In Laravel, you can easily mock the HTTP client for tests:
      </p>
      <pre>
        <code>{`// tests/Feature/OtpTest.php

use Illuminate\\Support\\Facades\\Http;

it('sends OTP successfully', function () {
    Http::fake([
        'api.startmessaging.com/otp/send' => Http::response([
            'success' => true,
            'data' => [
                'requestId'    => 'req_test_123',
                'expiresAt'    => '2026-01-22T12:10:00Z',
                'attemptsLeft' => 3,
            ],
        ]),
    ]);

    $response = $this->postJson('/api/auth/send-otp', [
        'phoneNumber' => '+919876543210',
    ]);

    $response->assertOk()
        ->assertJsonPath('requestId', 'req_test_123');
});

it('verifies OTP successfully', function () {
    Http::fake([
        'api.startmessaging.com/otp/verify' => Http::response([
            'success' => true,
            'data' => ['verified' => true],
        ]),
    ]);

    $response = $this->postJson('/api/auth/verify-otp', [
        'requestId' => 'req_test_123',
        'otpCode'   => '482910',
    ]);

    $response->assertOk()
        ->assertJsonPath('verified', true);
});`}</code>
      </pre>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>
          <strong>Use a service class.</strong> Do not put HTTP calls directly
          in controllers. A dedicated service class is easier to test, reuse,
          and maintain.
        </li>
        <li>
          <strong>Always include idempotency keys.</strong> Prevent duplicate
          SMS charges from network retries. Use{' '}
          <code>Str::uuid()</code> in Laravel or{' '}
          <code>bin2hex(random_bytes(16))</code> in plain PHP.
        </li>
        <li>
          <strong>Validate phone numbers before calling the API.</strong> Use
          Laravel&rsquo;s validation rules or a library like{' '}
          <code>giggsey/libphonenumber-for-php</code> to ensure valid E.164
          format.
        </li>
        <li>
          <strong>Rate limit your OTP endpoints.</strong> Use
          Laravel&rsquo;s throttle middleware or implement your own rate limiting
          to prevent abuse.
        </li>
        <li>
          <strong>Never log OTP codes.</strong> The codes are bcrypt-hashed on
          the StartMessaging side. Your application should never store or log
          them.
        </li>
        <li>
          <strong>Store only the <code>requestId</code>.</strong> Your database
          or session only needs the request ID. All verification logic runs on
          the StartMessaging servers.
        </li>
        <li>
          <strong>Set timeouts.</strong> Always configure a timeout (10 seconds
          is recommended) on HTTP calls to prevent your application from
          hanging.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>

      <p>
        Start sending OTPs from your PHP or Laravel application today.{' '}
        <Link href="/pricing">Check our pricing</Link> at Rs 0.25 per OTP with
        no monthly fees, or read the{' '}
        <Link href="/otp-api">full API documentation</Link> for endpoint
        details. You can also explore our guides for{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link> and{' '}
        <Link href="/blog/send-otp-python">Python</Link>.
      </p>
    </>
  ),
};
