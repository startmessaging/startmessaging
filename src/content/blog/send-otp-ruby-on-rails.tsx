import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-ruby-on-rails',
  title: 'How to Send OTP in Ruby on Rails (2026 Guide)',
  description:
    'Send and verify SMS OTPs from a Ruby on Rails app using the StartMessaging API. Includes Net::HTTP examples, a service object, controller actions, and rspec tests.',
  category: 'tutorials',
  keywords: [
    'send otp ruby on rails',
    'rails sms otp api',
    'ruby otp verification',
    'otp api india ruby',
    'ruby net::http otp',
    'startmessaging rails',
    'rails phone verification',
    'ruby send sms india',
    'rails otp without dlt',
    'rails service object otp',
  ],
  publishedAt: '2026-04-16',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'service-object', title: 'Create a Rails Service Object' },
    { id: 'send-otp', title: 'Send an OTP' },
    { id: 'verify-otp', title: 'Verify the OTP' },
    { id: 'controller', title: 'Controller Actions' },
    { id: 'rspec', title: 'Testing with RSpec' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-nodejs', 'send-otp-python', 'otp-verification-flow'],
  faq: [
    {
      question: 'Do I need a gem like Faraday or HTTParty?',
      answer:
        'No. Net::HTTP from the Ruby standard library is enough. The examples in this guide work on any Rails version from 6 onward without additional gems. If you already use HTTParty or Faraday in your project, you can swap the call shape easily.',
    },
    {
      question: 'Where should I put the OTP code?',
      answer:
        'Use a service object under app/services. Service objects keep controllers thin and let you reuse the same OTP logic from background jobs or rake tasks.',
    },
    {
      question: 'How do I store the request ID between send and verify?',
      answer:
        'Store it in the Rails session or in Redis keyed by the user. Never store the OTP code itself — store only the requestId returned by StartMessaging.',
    },
  ],
  content: (
    <>
      <p>
        Ruby on Rails is still a fast way to ship a backend, and adding phone
        verification doesn&rsquo;t need to be complicated. This guide wires up
        the <Link href="/otp-api">StartMessaging OTP API</Link> from a Rails app
        using only Net::HTTP and a clean service object.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>Rails 6, 7, or 8 with Ruby 3.0+.</li>
        <li>
          A{' '}
          <Link href="https://app.startmessaging.com/register">
            StartMessaging account
          </Link>{' '}
          and an API key.
        </li>
      </ul>
      <p>
        Add the key to your Rails credentials or to <code>.env</code>:
      </p>
      <pre>
        <code>{`# config/credentials.yml.enc
startmessaging:
  api_key: sm_live_xxxxxxxxxxxxxxxxxxxx`}</code>
      </pre>

      <h2 id="service-object">Create a Rails Service Object</h2>
      <p>
        Create <code>app/services/start_messaging_otp.rb</code>:
      </p>
      <pre>
        <code>{`require "net/http"
require "json"
require "uri"

class StartMessagingOtp
  BASE_URL = "https://api.startmessaging.com".freeze

  def self.send_otp(phone_number, idempotency_key: SecureRandom.uuid)
    post("/otp/send", {
      phoneNumber: phone_number,
      idempotencyKey: idempotency_key
    })
  end

  def self.verify_otp(request_id, code)
    post("/otp/verify", { requestId: request_id, otpCode: code })
  end

  def self.post(path, body)
    uri = URI(BASE_URL + path)
    req = Net::HTTP::Post.new(uri)
    req["Content-Type"] = "application/json"
    req["X-API-Key"] = Rails.application.credentials.dig(:startmessaging, :api_key)
    req.body = body.to_json

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
    raise "OTP API error: #{res.code} #{res.body}" unless res.is_a?(Net::HTTPSuccess)
    JSON.parse(res.body, symbolize_names: true)
  end
end`}</code>
      </pre>

      <h2 id="send-otp">Send an OTP</h2>
      <pre>
        <code>{`result = StartMessagingOtp.send_otp("+919876543210")
request_id = result.dig(:data, :requestId)
expires_at = result.dig(:data, :expiresAt)`}</code>
      </pre>

      <h2 id="verify-otp">Verify the OTP</h2>
      <pre>
        <code>{`verified = StartMessagingOtp.verify_otp(request_id, "482910").dig(:data, :verified)`}</code>
      </pre>

      <h2 id="controller">Controller Actions</h2>
      <pre>
        <code>{`# app/controllers/api/auth_controller.rb
class Api::AuthController < ApplicationController
  def send_otp
    res = StartMessagingOtp.send_otp(params.require(:phone_number))
    session[:otp_request_id] = res.dig(:data, :requestId)
    render json: { ok: true, expires_at: res.dig(:data, :expiresAt) }
  rescue => e
    render json: { error: e.message }, status: :bad_gateway
  end

  def verify_otp
    request_id = session.delete(:otp_request_id)
    res = StartMessagingOtp.verify_otp(request_id, params.require(:code))
    if res.dig(:data, :verified)
      render json: { verified: true }
    else
      render json: { verified: false }, status: :unauthorized
    end
  end
end`}</code>
      </pre>

      <h2 id="rspec">Testing with RSpec</h2>
      <p>
        Stub the HTTP call so your tests don&rsquo;t bill your wallet:
      </p>
      <pre>
        <code>{`# spec/services/start_messaging_otp_spec.rb
require "rails_helper"
require "webmock/rspec"

RSpec.describe StartMessagingOtp do
  it "sends an OTP" do
    stub_request(:post, "https://api.startmessaging.com/otp/send")
      .to_return(status: 200, body: { data: { requestId: "abc", expiresAt: "...", attemptsLeft: 3 } }.to_json)

    res = described_class.send_otp("+919876543210")
    expect(res.dig(:data, :requestId)).to eq("abc")
  end
end`}</code>
      </pre>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>
          <strong>Always use idempotency keys</strong> &mdash; see our{' '}
          <Link href="/blog/idempotency-keys-otp">idempotency guide</Link>.
        </li>
        <li>
          <strong>Throttle send actions</strong> with rack-attack or your own
          rate limiter to prevent abuse.
        </li>
        <li>
          <strong>Validate Indian numbers</strong> with the
          <code> phonelib</code> gem before sending.
        </li>
        <li>
          <strong>Never log OTP codes</strong> or request bodies in production.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See <Link href="/pricing">pricing</Link> or read our{' '}
        <Link href="/blog/otp-verification-flow">
          end-to-end OTP verification flow guide
        </Link>{' '}
        for the architectural picture.
      </p>
    </>
  ),
};
