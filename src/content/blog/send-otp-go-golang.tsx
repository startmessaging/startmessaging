import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-go-golang',
  title: 'How to Send OTP in Go (Golang) — 2026 Developer Guide',
  description:
    'Step-by-step Go (Golang) tutorial to send and verify SMS OTPs using the StartMessaging API. Includes net/http examples, structs, error handling, and a complete Gin server.',
  category: 'tutorials',
  keywords: [
    'send otp golang',
    'go sms otp api',
    'golang otp verification',
    'go phone verification',
    'otp api india golang',
    'startmessaging go sdk',
    'go gin otp tutorial',
    'send sms golang india',
    'golang otp without dlt',
    'go backend otp verification',
  ],
  publishedAt: '2026-04-15',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-go', title: 'Why Use Go for OTP Backends' },
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'send-otp', title: 'Send an OTP from Go' },
    { id: 'verify-otp', title: 'Verify the OTP' },
    { id: 'gin-example', title: 'Full Gin Server Example' },
    { id: 'error-handling', title: 'Error Handling & Retries' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-nodejs', 'send-otp-python', 'send-otp-java-spring-boot'],
  faq: [
    {
      question: 'Do I need an SDK to call StartMessaging from Go?',
      answer:
        'No. StartMessaging is a plain REST API. The Go standard library net/http is enough — you do not need to install any additional packages to send and verify OTPs.',
    },
    {
      question: 'Can I use this with a Fiber or Echo server instead of Gin?',
      answer:
        'Yes. The OTP send and verify functions are framework-agnostic. The HTTP handlers shown in the Gin example can be ported to Fiber, Echo, Chi, or net/http with no changes to the API call logic.',
    },
    {
      question: 'How do I handle Indian phone numbers with country code?',
      answer:
        'StartMessaging expects E.164 format. For Indian numbers, prefix the 10-digit mobile number with +91 (for example +919876543210). Validate this server-side before calling the API to avoid wasted wallet credits.',
    },
  ],
  content: (
    <>
      <p>
        Go is a popular choice for high-throughput OTP backends thanks to its
        simple concurrency model and tiny memory footprint. In this guide
        you&rsquo;ll wire up the{' '}
        <Link href="/otp-api">StartMessaging OTP API</Link> from a Go service
        using only the standard library — no third-party SDK required.
      </p>

      <h2 id="why-go">Why Use Go for OTP Backends</h2>
      <p>
        OTP traffic is bursty: thousands of users may try to log in at the same
        instant during a marketing push or app launch. Go&rsquo;s goroutines let
        a single small VM handle that fan-out comfortably, and the static
        binary makes deployment trivial. Pair that with a{' '}
        <Link href="/dlt-free-otp">DLT-free OTP API</Link> and you can ship a
        production OTP flow in an afternoon.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>Go 1.21 or newer.</li>
        <li>
          A free{' '}
          <Link href="https://app.startmessaging.com/register">
            StartMessaging account
          </Link>{' '}
          with wallet credit.
        </li>
        <li>
          An API key generated from the{' '}
          <Link href="https://app.startmessaging.com/api-keys">
            API Keys page
          </Link>
          .
        </li>
      </ul>
      <pre>
        <code>{`# .env
STARTMESSAGING_API_KEY=sm_live_xxxxxxxxxxxxxxxxxxxx`}</code>
      </pre>

      <h2 id="send-otp">Send an OTP from Go</h2>
      <p>
        Define small request and response structs, then POST JSON to{' '}
        <code>/otp/send</code>:
      </p>
      <pre>
        <code>{`package otp

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"time"
)

const baseURL = "https://api.startmessaging.com"

type sendReq struct {
	PhoneNumber    string \`json:"phoneNumber"\`
	IdempotencyKey string \`json:"idempotencyKey,omitempty"\`
}

type SendResponse struct {
	Data struct {
		RequestID    string    \`json:"requestId"\`
		ExpiresAt    time.Time \`json:"expiresAt"\`
		AttemptsLeft int       \`json:"attemptsLeft"\`
	} \`json:"data"\`
}

var client = &http.Client{Timeout: 10 * time.Second}

func Send(phone, idemKey string) (*SendResponse, error) {
	body, _ := json.Marshal(sendReq{PhoneNumber: phone, IdempotencyKey: idemKey})
	req, _ := http.NewRequest("POST", baseURL+"/otp/send", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-API-Key", os.Getenv("STARTMESSAGING_API_KEY"))

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return nil, errors.New("startmessaging: send failed status " + resp.Status)
	}
	var out SendResponse
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return nil, err
	}
	return &out, nil
}`}</code>
      </pre>

      <h2 id="verify-otp">Verify the OTP</h2>
      <pre>
        <code>{`type verifyReq struct {
	RequestID string \`json:"requestId"\`
	OtpCode   string \`json:"otpCode"\`
}

type VerifyResponse struct {
	Data struct {
		Verified bool \`json:"verified"\`
	} \`json:"data"\`
}

func Verify(requestID, code string) (bool, error) {
	body, _ := json.Marshal(verifyReq{RequestID: requestID, OtpCode: code})
	req, _ := http.NewRequest("POST", baseURL+"/otp/verify", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-API-Key", os.Getenv("STARTMESSAGING_API_KEY"))

	resp, err := client.Do(req)
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	var out VerifyResponse
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return false, err
	}
	return out.Data.Verified, nil
}`}</code>
      </pre>

      <h2 id="gin-example">Full Gin Server Example</h2>
      <pre>
        <code>{`package main

import (
	"net/http"
	"yourapp/otp"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	r := gin.Default()

	r.POST("/auth/send-otp", func(c *gin.Context) {
		var body struct{ PhoneNumber string \`json:"phoneNumber"\` }
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
			return
		}
		res, err := otp.Send(body.PhoneNumber, uuid.NewString())
		if err != nil {
			c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"requestId": res.Data.RequestID,
			"expiresAt": res.Data.ExpiresAt,
		})
	})

	r.POST("/auth/verify-otp", func(c *gin.Context) {
		var body struct {
			RequestID string \`json:"requestId"\`
			OtpCode   string \`json:"otpCode"\`
		}
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
			return
		}
		ok, err := otp.Verify(body.RequestID, body.OtpCode)
		if err != nil || !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"verified": false})
			return
		}
		c.JSON(http.StatusOK, gin.H{"verified": true})
	})

	r.Run(":8080")
}`}</code>
      </pre>

      <h2 id="error-handling">Error Handling &amp; Retries</h2>
      <p>
        Wrap the <code>Send</code> call in a small retry helper that backs off
        on 5xx and 429 responses but never retries 4xx — those will not succeed
        on retry. Combine this with{' '}
        <Link href="/blog/idempotency-keys-otp">idempotency keys</Link> so a
        retried network request never bills the wallet twice.
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>
          <strong>Validate phone numbers</strong> server-side using
          libphonenumber or a regex before calling the API.
        </li>
        <li>
          <strong>Set short HTTP timeouts</strong> (8&ndash;10 seconds) to
          avoid blocked goroutines.
        </li>
        <li>
          <strong>Hide the API key</strong> behind environment variables and
          never log it.
        </li>
        <li>
          <strong>Track verify attempts</strong> in your own DB so you can lock
          accounts after repeated failures &mdash; see{' '}
          <Link href="/blog/otp-rate-limiting-guide">
            OTP rate limiting guide
          </Link>
          .
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Compare costs in our{' '}
        <Link href="/blog/otp-api-pricing-comparison-india">
          OTP API pricing comparison
        </Link>{' '}
        or jump straight to <Link href="/pricing">StartMessaging pricing</Link>{' '}
        at Rs 0.25 per OTP.
      </p>
    </>
  ),
};
