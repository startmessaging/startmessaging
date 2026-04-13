import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-rust-axum',
  title: 'Send OTP in Rust with Axum and Reqwest — 2026 Guide',
  description:
    'Build a production OTP backend in Rust using Axum and reqwest, calling the StartMessaging API. Includes structs, handlers, error type, and tower-http rate limiting.',
  category: 'tutorials',
  keywords: [
    'send otp rust',
    'axum sms otp api',
    'rust phone verification',
    'reqwest otp india',
    'startmessaging rust',
    'rust backend otp',
    'rust axum auth',
    'rust otp without dlt',
    'tokio otp api',
    'sms otp api rust',
  ],
  publishedAt: '2026-04-23',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-rust', title: 'Why Rust for OTP Backends' },
    { id: 'cargo', title: 'Cargo.toml' },
    { id: 'client', title: 'StartMessaging Client' },
    { id: 'handlers', title: 'Axum Handlers' },
    { id: 'error', title: 'Error Type' },
    { id: 'rate-limit', title: 'Rate Limiting' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-go-golang', 'send-otp-nodejs', 'idempotency-keys-otp'],
  faq: [
    {
      question: 'Is Rust overkill for an OTP service?',
      answer:
        'Not if you already have a Rust stack or expect very high throughput on a tiny VM. Axum + reqwest can handle thousands of OTP requests per second on a single core, and the type system catches bugs at compile time.',
    },
    {
      question: 'Should I use reqwest::blocking or the async client?',
      answer:
        'Use the async client. Axum is built on tokio, and mixing blocking calls inside async handlers is the most common Rust performance footgun.',
    },
    {
      question: 'Do I need to install OpenSSL?',
      answer:
        'No — use the rustls feature on reqwest (rustls-tls) to skip the system OpenSSL dependency entirely. The Cargo.toml below already does this.',
    },
  ],
  content: (
    <>
      <p>
        Rust is a great fit for OTP backends: tiny binary, predictable
        performance, and no GC pauses while a marketing burst slams your
        endpoints. This guide builds a complete OTP service on Axum that
        proxies the <Link href="/otp-api">StartMessaging OTP API</Link>.
      </p>

      <h2 id="why-rust">Why Rust for OTP Backends</h2>
      <p>
        OTP traffic is bursty and latency-sensitive. Rust&rsquo;s async runtime
        gives you C-like throughput with memory safety, which means your OTP
        service can run on a small ARM VM and still handle spikes during sale
        events.
      </p>

      <h2 id="cargo">Cargo.toml</h2>
      <pre>
        <code>{`[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
reqwest = { version = "0.12", default-features = false, features = ["rustls-tls", "json"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tower-http = { version = "0.5", features = ["limit"] }
uuid = { version = "1", features = ["v4"] }
anyhow = "1"`}</code>
      </pre>

      <h2 id="client">StartMessaging Client</h2>
      <pre>
        <code>{`use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Clone)]
pub struct StartMessaging {
    http: Client,
    api_key: String,
}

#[derive(Serialize)]
struct SendBody<'a> { phoneNumber: &'a str, idempotencyKey: String }

#[derive(Deserialize)]
pub struct SendData { pub requestId: String, pub expiresAt: String, pub attemptsLeft: u32 }

#[derive(Deserialize)]
struct Envelope<T> { data: T }

impl StartMessaging {
    pub fn new(api_key: String) -> Self {
        Self { http: Client::new(), api_key }
    }

    pub async fn send_otp(&self, phone: &str) -> anyhow::Result<SendData> {
        let body = SendBody { phoneNumber: phone, idempotencyKey: uuid::Uuid::new_v4().to_string() };
        let env: Envelope<SendData> = self.http
            .post("https://api.startmessaging.com/otp/send")
            .header("X-API-Key", &self.api_key)
            .json(&body)
            .send().await?
            .error_for_status()?
            .json().await?;
        Ok(env.data)
    }

    pub async fn verify_otp(&self, request_id: &str, code: &str) -> anyhow::Result<bool> {
        #[derive(Serialize)] struct B<'a> { requestId: &'a str, otpCode: &'a str }
        #[derive(Deserialize)] struct V { verified: bool }
        let env: Envelope<V> = self.http
            .post("https://api.startmessaging.com/otp/verify")
            .header("X-API-Key", &self.api_key)
            .json(&B { requestId: request_id, otpCode: code })
            .send().await?
            .error_for_status()?
            .json().await?;
        Ok(env.data.verified)
    }
}`}</code>
      </pre>

      <h2 id="handlers">Axum Handlers</h2>
      <pre>
        <code>{`use axum::{routing::post, Json, Router, extract::State};

#[derive(Deserialize)] struct SendReq { phone: String }
#[derive(Serialize)]   struct SendRes { request_id: String, expires_at: String }

async fn send_handler(
    State(sm): State<StartMessaging>,
    Json(req): Json<SendReq>,
) -> Result<Json<SendRes>, String> {
    let data = sm.send_otp(&req.phone).await.map_err(|e| e.to_string())?;
    Ok(Json(SendRes { request_id: data.requestId, expires_at: data.expiresAt }))
}

#[tokio::main]
async fn main() {
    let sm = StartMessaging::new(std::env::var("STARTMESSAGING_API_KEY").unwrap());
    let app = Router::new()
        .route("/auth/send-otp", post(send_handler))
        .with_state(sm);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}`}</code>
      </pre>

      <h2 id="error">Error Type</h2>
      <p>
        For production, replace <code>String</code> error returns with a
        thiserror enum that maps each StartMessaging status code to a typed
        variant. This lets you log errors structurally and return clean JSON to
        the client.
      </p>

      <h2 id="rate-limit">Rate Limiting</h2>
      <p>
        Use <code>tower-governor</code> for IP-based limits and a Redis-backed
        sliding window keyed by phone for the send endpoint. See our{' '}
        <Link href="/blog/otp-rate-limiting-guide">
          OTP rate limiting guide
        </Link>{' '}
        for the algorithms.
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>Reuse one <code>reqwest::Client</code> for the lifetime of the process.</li>
        <li>Use rustls-tls to avoid the OpenSSL dependency on minimal containers.</li>
        <li>Add a 10-second timeout on every reqwest call.</li>
        <li>Return verified=false rather than 401 if you want a generic UX.</li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See <Link href="/pricing">pricing</Link> or compare with the{' '}
        <Link href="/blog/send-otp-go-golang">Go version</Link>.
      </p>
    </>
  ),
};
