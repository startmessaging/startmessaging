import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-dotnet-csharp',
  title: 'How to Send OTP in .NET / C# (ASP.NET Core 2026 Guide)',
  description:
    'Send and verify SMS OTPs from a .NET 8 / ASP.NET Core API using the StartMessaging REST API. Includes HttpClient, typed clients, controller actions, and DI setup.',
  category: 'tutorials',
  keywords: [
    'send otp dotnet',
    'send otp c#',
    'asp.net core otp',
    '.net 8 sms otp api',
    'c# phone verification',
    'startmessaging .net',
    'httpclient otp',
    'otp api india c#',
    'csharp otp without dlt',
    'dotnet core sms otp india',
  ],
  publishedAt: '2026-04-17',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'typed-client', title: 'Register a Typed HttpClient' },
    { id: 'send-otp', title: 'Send an OTP' },
    { id: 'verify-otp', title: 'Verify the OTP' },
    { id: 'controller', title: 'Minimal API Endpoints' },
    { id: 'error-handling', title: 'Error Handling' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-nodejs', 'send-otp-java-spring-boot', 'idempotency-keys-otp'],
  faq: [
    {
      question: 'Does StartMessaging offer an official .NET SDK?',
      answer:
        'StartMessaging is a plain REST API. The built-in System.Net.Http.HttpClient is enough — no NuGet package required. If you prefer a typed wrapper, the small client class in this guide is production-ready.',
    },
    {
      question: 'Will this work with .NET Framework 4.8?',
      answer:
        'Yes, but you should use HttpClient as a singleton via IHttpClientFactory if you are on .NET 6+. On the older Framework, instantiate one HttpClient at app start and reuse it.',
    },
    {
      question: 'How do I avoid socket exhaustion at high RPS?',
      answer:
        'Always inject HttpClient via IHttpClientFactory. Never call new HttpClient() per request — that is the most common production bug for .NET teams calling external APIs.',
    },
  ],
  content: (
    <>
      <p>
        Adding phone OTP to an ASP.NET Core API is a great fit for{' '}
        <code>HttpClient</code> and the typed-client pattern. This guide wires
        up the <Link href="/otp-api">StartMessaging OTP API</Link> from a .NET
        8 minimal API in under 100 lines of code.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>.NET 6, 7, or 8 SDK installed.</li>
        <li>
          A free{' '}
          <Link href="https://app.startmessaging.com/register">
            StartMessaging account
          </Link>{' '}
          and an API key.
        </li>
      </ul>
      <p>Add the key to <code>appsettings.json</code> or user secrets:</p>
      <pre>
        <code>{`{
  "StartMessaging": {
    "ApiKey": "sm_live_xxxxxxxxxxxxxxxxxxxx",
    "BaseUrl": "https://api.startmessaging.com"
  }
}`}</code>
      </pre>

      <h2 id="typed-client">Register a Typed HttpClient</h2>
      <pre>
        <code>{`// Program.cs
builder.Services.AddHttpClient<StartMessagingClient>(client =>
{
    var cfg = builder.Configuration.GetSection("StartMessaging");
    client.BaseAddress = new Uri(cfg["BaseUrl"]!);
    client.DefaultRequestHeaders.Add("X-API-Key", cfg["ApiKey"]);
    client.Timeout = TimeSpan.FromSeconds(10);
});`}</code>
      </pre>

      <h2 id="send-otp">Send an OTP</h2>
      <pre>
        <code>{`public sealed class StartMessagingClient
{
    private readonly HttpClient _http;
    public StartMessagingClient(HttpClient http) => _http = http;

    public record SendOtpResult(string RequestId, DateTime ExpiresAt, int AttemptsLeft);
    private record SendEnvelope(SendOtpResult Data);

    public async Task<SendOtpResult> SendOtpAsync(string phoneNumber, CancellationToken ct = default)
    {
        var body = new { phoneNumber, idempotencyKey = Guid.NewGuid().ToString() };
        var res = await _http.PostAsJsonAsync("/otp/send", body, ct);
        res.EnsureSuccessStatusCode();
        var env = await res.Content.ReadFromJsonAsync<SendEnvelope>(cancellationToken: ct);
        return env!.Data;
    }
}`}</code>
      </pre>

      <h2 id="verify-otp">Verify the OTP</h2>
      <pre>
        <code>{`public record VerifyResult(bool Verified);
private record VerifyEnvelope(VerifyResult Data);

public async Task<bool> VerifyOtpAsync(string requestId, string code, CancellationToken ct = default)
{
    var body = new { requestId, otpCode = code };
    var res = await _http.PostAsJsonAsync("/otp/verify", body, ct);
    if (!res.IsSuccessStatusCode) return false;
    var env = await res.Content.ReadFromJsonAsync<VerifyEnvelope>(cancellationToken: ct);
    return env!.Data.Verified;
}`}</code>
      </pre>

      <h2 id="controller">Minimal API Endpoints</h2>
      <pre>
        <code>{`app.MapPost("/auth/send-otp", async (SendOtpRequest req, StartMessagingClient sm) =>
{
    var data = await sm.SendOtpAsync(req.PhoneNumber);
    return Results.Ok(new { data.RequestId, data.ExpiresAt });
});

app.MapPost("/auth/verify-otp", async (VerifyOtpRequest req, StartMessagingClient sm) =>
{
    var ok = await sm.VerifyOtpAsync(req.RequestId, req.OtpCode);
    return ok ? Results.Ok(new { verified = true }) : Results.Unauthorized();
});

public record SendOtpRequest(string PhoneNumber);
public record VerifyOtpRequest(string RequestId, string OtpCode);`}</code>
      </pre>

      <h2 id="error-handling">Error Handling</h2>
      <p>
        Wrap calls in <code>try/catch (HttpRequestException)</code> and handle
        the common status codes: 400 invalid phone, 401 bad API key, 402
        wallet empty, 429 rate limited. See our full{' '}
        <Link href="/blog/otp-rate-limiting-guide">
          OTP rate limiting guide
        </Link>{' '}
        for production patterns.
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>
          <strong>Use IHttpClientFactory.</strong> Never <code>new HttpClient()</code> per request.
        </li>
        <li>
          <strong>Set a 10-second timeout</strong> so a slow upstream cannot
          stall your thread pool.
        </li>
        <li>
          <strong>Validate phone numbers</strong> using{' '}
          <code>libphonenumber-csharp</code>.
        </li>
        <li>
          <strong>Add idempotency keys</strong> to every send call &mdash; see{' '}
          <Link href="/blog/idempotency-keys-otp">why</Link>.
        </li>
        <li>
          <strong>Cache the typed client&rsquo;s config</strong> via DI; do not
          read appsettings on every request.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Compare against Twilio in our{' '}
        <Link href="/blog/twilio-vs-startmessaging">Twilio vs StartMessaging</Link>{' '}
        breakdown, or check{' '}
        <Link href="/pricing">pricing at Rs 0.25 per OTP</Link>.
      </p>
    </>
  ),
};
