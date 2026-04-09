import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-java-spring-boot',
  title: 'Send OTP via SMS from Java and Spring Boot',
  description:
    'Spring Boot 3 + RestClient calling a TRAI-compliant OTP SMS API: JSON, env-based keys, and patterns for DLT-backed transactional SMS from JVM backends.',
  category: 'tutorials',
  keywords: [
    'Java OTP SMS',
    'Spring Boot OTP',
    'Send OTP Java',
    'RestClient OTP API',
    'StartMessaging Java',
    'SMS OTP Spring Security',
    'OTP SMS API India Java',
    'DLT SMS integration Java',
    'TRAI SMS API REST',
    'transactional SMS API Spring Boot',
    'bulk SMS OTP Java',
    'SMS gateway API Java India',
  ],
  publishedAt: '2026-04-17',
  readingTime: 11,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-java', title: 'Why This Guide Exists' },
    { id: 'config', title: 'Configuration and Secrets' },
    { id: 'send-snippet', title: 'Send OTP Request' },
    { id: 'verify-note', title: 'Verify and Status' },
    { id: 'next-steps', title: 'Next Steps' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-nodejs',
    'idempotency-keys-otp',
    'sms-api-key-rotation-developers',
  ],
  faq: [
    {
      question: 'Is this the same as the Node/Python tutorials?',
      answer:
        'Same product concepts, different language and Spring ecosystem patterns—so teams on Java stacks do not have to mentally translate from JavaScript or Python.',
    },
    {
      question: 'Should I use RestClient or WebClient?',
      answer:
        'For synchronous request-response in a typical controller, RestClient is simpler. Use WebClient when you need reactive pipelines or streaming.',
    },
  ],
  content: (
    <>
      <p>
        We already published hands-on guides for{' '}
        <Link
          href="/blog/send-otp-nodejs"
          className="text-primary hover:underline"
        >
          Node.js
        </Link>
        ,{' '}
        <Link
          href="/blog/send-otp-python"
          className="text-primary hover:underline"
        >
          Python
        </Link>
        , and{' '}
        <Link
          href="/blog/send-otp-php-laravel"
          className="text-primary hover:underline"
        >
          PHP/Laravel
        </Link>
        . This article is the <strong>Java / Spring Boot</strong> counterpart—new
        code samples, not copy-pasted explanations of DLT or pricing.
      </p>

      <h2 id="why-java">Why This Guide Exists</h2>
      <p>
        Enterprise and fintech teams in India often standardize on JVM backends.
        They need a Spring-friendly shape: beans, properties, and HTTP clients
        that fit existing patterns. See{' '}
        <Link href="/otp-api" className="text-primary hover:underline">
          API documentation
        </Link>{' '}
        for exact paths and headers.
      </p>

      <h2 id="config">Configuration and Secrets</h2>
      <p>
        Store the API key in environment variables or Spring Cloud Secret—not in
        source control. Align with{' '}
        <Link
          href="/blog/sms-api-key-rotation-developers"
          className="text-primary hover:underline"
        >
          key rotation
        </Link>{' '}
        practices.
      </p>
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code>{`# application.yml (example)
startmessaging:
  api-key: \${STARTMESSAGING_API_KEY}
  base-url: https://api.startmessaging.com`}</code>
      </pre>

      <h2 id="send-snippet">Send OTP Request</h2>
      <p>
        Use Spring 6.1+ <code>RestClient</code> to POST JSON matching your
        template. Replace placeholders with your template ID and variables.
      </p>
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code>{`record OtpSendRequest(
    String phoneNumber,
    String templateId,
    Map<String, String> variables
) {}

// RestClient bean
public OtpSendResponse sendOtp(OtpSendRequest body) {
  return restClient.post()
      .uri("/otp/send")
      .header("X-API-Key", apiKey)
      .body(body)
      .retrieve()
      .body(OtpSendResponse.class);
}`}</code>
      </pre>
      <p>
        Map response fields to your persistence layer the same way you would in
        Node or Python: store requestId for verification and status polling.
      </p>

      <h2 id="verify-note">Verify and Status</h2>
      <p>
        Follow the same verification sequence as in{' '}
        <Link
          href="/blog/otp-verification-flow"
          className="text-primary hover:underline"
        >
          the OTP verification flow
        </Link>
        . Use{' '}
        <Link
          href="/blog/idempotency-keys-otp"
          className="text-primary hover:underline"
        >
          idempotency keys
        </Link>{' '}
        on send if your client retries POST requests.
      </p>

      <h2 id="next-steps">Next Steps</h2>
      <p>
        Add integration tests with mocks per{' '}
        <Link
          href="/blog/testing-otp-flows-staging-sandboxes"
          className="text-primary hover:underline"
        >
          staging and testing OTP
        </Link>
        , then wire Spring Security so only authenticated admins can trigger
        bulk test sends.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>See FAQ above.</p>
    </>
  ),
};
