import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'migrate-sms-provider-checklist',
  title: 'SMS Provider Migration Checklist for Devs',
  description:
    'Step-by-step checklist for migrating from one SMS or OTP provider to another. Covers API abstraction, testing, gradual rollout, monitoring, and rollback planning.',
  category: 'business',
  keywords: [
    'migrate sms provider',
    'switch otp api provider',
    'sms provider migration checklist',
    'change sms api provider',
    'otp provider migration',
    'sms api abstraction layer',
    'sms migration rollback plan',
  ],
  publishedAt: '2026-02-14',
  readingTime: 12,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'when-to-migrate', title: 'When to Migrate Providers' },
    { id: 'pre-migration-audit', title: 'Pre-Migration Audit' },
    { id: 'abstraction-layer', title: 'Building the Abstraction Layer' },
    { id: 'new-provider-setup', title: 'Setting Up the New Provider' },
    { id: 'testing-strategy', title: 'Testing Strategy' },
    { id: 'gradual-rollout', title: 'Gradual Rollout Plan' },
    { id: 'monitoring', title: 'Monitoring During Migration' },
    { id: 'rollback-plan', title: 'Rollback Plan' },
    { id: 'post-migration', title: 'Post-Migration Cleanup' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['best-otp-api-india', 'build-otp-saas-product'],
  faq: [
    {
      question: 'How long does a typical SMS provider migration take?',
      answer:
        'For a well-structured codebase with an existing abstraction layer, the migration can be completed in one to two weeks including testing and gradual rollout. If you need to build the abstraction layer first, add another one to two weeks. For complex systems with multiple SMS use cases (OTP, notifications, marketing), plan for three to four weeks total.',
    },
    {
      question: 'Should I run both providers simultaneously during migration?',
      answer:
        'Yes. Running both providers in parallel during the gradual rollout phase is critical. This lets you compare delivery rates, latency, and reliability in production. It also serves as your safety net: if the new provider has issues, you can instantly route traffic back to the old provider without downtime.',
    },
    {
      question: 'Will users notice the provider change?',
      answer:
        'If done correctly, users should not notice any difference. The OTP content, expiry time, and verification flow remain the same. The only visible change might be the sender ID on the SMS, which may differ between providers. Inform your support team about the sender ID change so they can handle any user questions.',
    },
    {
      question: 'Can I migrate to StartMessaging from any provider?',
      answer:
        'Yes. The StartMessaging OTP API uses standard REST endpoints that are straightforward to integrate regardless of your current provider. The API accepts a phone number, sends the OTP, and provides a requestId for verification. If you follow the abstraction layer pattern in this guide, swapping in StartMessaging requires implementing just two methods: sendOtp and verifyOtp.',
    },
  ],
  content: (
    <>
      <p>
        Switching SMS or OTP providers is something most development teams will
        face at least once. Maybe your current provider&rsquo;s delivery rates
        have dropped. Maybe their pricing no longer makes sense at your current
        volume. Maybe you need better support, Indian-specific features, or
        simpler DLT compliance. Whatever the reason, migrating SMS providers
        requires careful planning to avoid disrupting your users.
      </p>
      <p>
        This guide provides a complete, step-by-step checklist for migrating
        from one SMS or OTP provider to another. Follow it and you will get
        through the migration with zero downtime and minimal risk.
      </p>

      <h2 id="when-to-migrate">When to Migrate Providers</h2>
      <p>
        Migration carries risk and effort, so make sure the reasons justify it.
        Common valid reasons to switch providers include:
      </p>
      <ul>
        <li>
          <strong>Declining delivery rates:</strong> If your OTP delivery
          success rate drops below 95%, users are experiencing failed logins
          and abandoned transactions. This directly impacts revenue.
        </li>
        <li>
          <strong>Cost increases:</strong> Providers sometimes raise prices,
          especially after acquisitions or when your contract comes up for
          renewal. Compare your current effective rate against alternatives
          like{' '}
          <Link href="/pricing">StartMessaging at Rs 0.25 per OTP</Link>.
        </li>
        <li>
          <strong>Poor support responsiveness:</strong> When delivery issues
          arise and your provider takes days to respond, every hour of
          degraded service costs you users and money.
        </li>
        <li>
          <strong>DLT compliance burden:</strong> Managing your own DLT
          registration, template approvals, and compliance updates is
          time-consuming. Providers like StartMessaging handle this entirely.
        </li>
        <li>
          <strong>Currency and billing complexity:</strong> If your provider
          bills in USD and you operate in INR, exchange rate fluctuations
          make cost planning difficult.
        </li>
        <li>
          <strong>Missing features:</strong> You need idempotency keys,
          better status tracking, webhook notifications, or other features
          your current provider does not offer.
        </li>
      </ul>
      <p>
        If you are experiencing two or more of these issues simultaneously,
        migration is likely overdue.
      </p>

      <h2 id="pre-migration-audit">Pre-Migration Audit</h2>
      <p>
        Before writing any migration code, audit your current SMS usage. This
        step prevents surprises during the switch.
      </p>
      <h3>Checklist: Current Provider Inventory</h3>
      <ul>
        <li>
          <strong>List all SMS use cases:</strong> OTP login, OTP for
          transactions, order notifications, appointment reminders, marketing
          campaigns. Each may have different requirements for the new
          provider.
        </li>
        <li>
          <strong>Document current API endpoints used:</strong> Which send,
          verify, status check, and webhook endpoints does your code call?
        </li>
        <li>
          <strong>Record current sender IDs:</strong> What sender ID (header)
          appears on messages? Will this change with the new provider?
        </li>
        <li>
          <strong>Measure current performance baselines:</strong> Average
          delivery time, delivery success rate, verification success rate,
          monthly volume by use case. You need these to compare against the
          new provider.
        </li>
        <li>
          <strong>Identify all integration points:</strong> Search your
          codebase for the current provider&rsquo;s domain, SDK imports, and
          API key references. Every integration point must be updated.
        </li>
        <li>
          <strong>Check contractual obligations:</strong> Review your current
          contract for termination notice periods, minimum commitments, and
          any exit fees.
        </li>
        <li>
          <strong>Inventory DLT assets:</strong> If you manage your own DLT
          registration, document all registered templates, entity IDs, and
          sender IDs. These may need to be recreated or transferred.
        </li>
      </ul>

      <h2 id="abstraction-layer">Building the Abstraction Layer</h2>
      <p>
        If your current code calls the SMS provider&rsquo;s API directly
        throughout the codebase, the first step is to refactor into an
        abstraction layer. This makes the actual migration trivial and
        protects you from future provider changes.
      </p>
      <pre>
        <code>{`// sms-provider.interface.ts
interface SmsProvider {
  sendOtp(phoneNumber: string, options?: SendOtpOptions): Promise<SendOtpResult>;
  verifyOtp(requestId: string, code: string): Promise<VerifyResult>;
  getDeliveryStatus(messageId: string): Promise<DeliveryStatus>;
}

interface SendOtpOptions {
  idempotencyKey?: string;
  expiryMinutes?: number;
}

interface SendOtpResult {
  requestId: string;
  expiresAt: string;
  provider: string; // Track which provider handled it
}

interface VerifyResult {
  verified: boolean;
  attemptsRemaining?: number;
}

type DeliveryStatus = 'pending' | 'delivered' | 'failed' | 'expired';`}</code>
      </pre>
      <p>
        Implement this interface for your current provider first. Replace all
        direct API calls in your codebase with calls to this interface. Deploy
        and verify everything works exactly as before. Only then move to
        implementing the new provider.
      </p>
      <pre>
        <code>{`// startmessaging-provider.ts
class StartMessagingProvider implements SmsProvider {
  private baseUrl = 'https://api.startmessaging.com';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendOtp(phoneNumber: string, options?: SendOtpOptions): Promise<SendOtpResult> {
    const response = await fetch(\`\${this.baseUrl}/otp/send\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
      body: JSON.stringify({
        phoneNumber,
        idempotencyKey: options?.idempotencyKey,
      }),
    });

    const { data } = await response.json();
    return {
      requestId: data.requestId,
      expiresAt: data.expiresAt,
      provider: 'startmessaging',
    };
  }

  async verifyOtp(requestId: string, code: string): Promise<VerifyResult> {
    const response = await fetch(\`\${this.baseUrl}/otp/verify\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
      body: JSON.stringify({ requestId, otpCode: code }),
    });

    const { data } = await response.json();
    return { verified: data.verified };
  }

  async getDeliveryStatus(messageId: string): Promise<DeliveryStatus> {
    // Query message status from StartMessaging
    const response = await fetch(\`\${this.baseUrl}/messages/\${messageId}\`, {
      headers: { 'X-API-Key': this.apiKey },
    });
    const { data } = await response.json();
    return data.status;
  }
}`}</code>
      </pre>

      <h2 id="new-provider-setup">Setting Up the New Provider</h2>
      <p>
        With the abstraction layer in place, set up the new provider account
        and implementation:
      </p>
      <ol>
        <li>
          <strong>Create the account:</strong> Sign up at{' '}
          <Link href="https://app.startmessaging.com">
            app.startmessaging.com
          </Link>{' '}
          (or your chosen provider). Complete any verification steps.
        </li>
        <li>
          <strong>Generate API credentials:</strong> Create an API key for your
          production environment. Store it securely in your environment
          variables or secrets manager. Never commit it to source control.
        </li>
        <li>
          <strong>Add wallet credit:</strong> For prepaid providers like
          StartMessaging, add sufficient credit for testing and the initial
          rollout period. A starting balance of Rs 500 to Rs 1,000 is
          adequate for testing.
        </li>
        <li>
          <strong>Review the API documentation:</strong> Read the{' '}
          <Link href="/otp-api">OTP API docs</Link> thoroughly. Note any
          differences in request format, response structure, error codes, or
          rate limits compared to your current provider.
        </li>
        <li>
          <strong>Implement the provider adapter:</strong> Write the
          implementation of your SmsProvider interface for the new provider.
          Map response formats to your standardized interface.
        </li>
        <li>
          <strong>Handle error mapping:</strong> Map the new provider&rsquo;s
          error codes to your application&rsquo;s error handling. Different
          providers use different HTTP status codes and error formats for the
          same conditions.
        </li>
      </ol>

      <h2 id="testing-strategy">Testing Strategy</h2>
      <p>
        Never go directly from implementation to production. Follow this
        testing progression:
      </p>
      <h3>Unit Tests</h3>
      <p>
        Test the new provider adapter in isolation with mocked HTTP responses.
        Verify that request formatting, response parsing, and error handling
        all work correctly. Test edge cases: malformed phone numbers, expired
        OTPs, rate limiting responses, and network timeouts.
      </p>
      <h3>Integration Tests</h3>
      <p>
        Test against the actual new provider API in a staging environment.
        Send real OTPs to test phone numbers. Verify the complete send and
        verify cycle works end-to-end. Measure delivery latency.
      </p>
      <h3>Load Tests</h3>
      <p>
        If your production volume is significant (more than 10,000 OTPs per
        day), run a load test against the new provider. Send a burst of
        requests to verify rate limits, response times under load, and
        whether the provider throttles your account.
      </p>
      <h3>Canary Tests</h3>
      <p>
        Route a small percentage (1% to 5%) of production traffic to the new
        provider while the rest continues on the old provider. Monitor
        delivery rates and latency in real production conditions for at least
        48 hours before expanding.
      </p>

      <h2 id="gradual-rollout">Gradual Rollout Plan</h2>
      <p>
        A gradual rollout minimizes risk by slowly shifting traffic to the new
        provider. Here is a proven rollout schedule:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Traffic Split</th>
            <th>Duration</th>
            <th>Success Criteria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Canary</td>
            <td>5% new, 95% old</td>
            <td>2 days</td>
            <td>Delivery rate within 1% of old provider</td>
          </tr>
          <tr>
            <td>Early Rollout</td>
            <td>25% new, 75% old</td>
            <td>3 days</td>
            <td>No increase in support tickets</td>
          </tr>
          <tr>
            <td>Mid Rollout</td>
            <td>50% new, 50% old</td>
            <td>3 days</td>
            <td>Latency within acceptable range</td>
          </tr>
          <tr>
            <td>Late Rollout</td>
            <td>90% new, 10% old</td>
            <td>3 days</td>
            <td>All metrics stable</td>
          </tr>
          <tr>
            <td>Complete</td>
            <td>100% new</td>
            <td>Ongoing</td>
            <td>Old provider decommissioned</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        Implement the traffic split using a feature flag or a simple
        configuration value. A random number check works for percentage-based
        routing:
      </p>
      <pre>
        <code>{`// provider-router.ts
class ProviderRouter implements SmsProvider {
  constructor(
    private oldProvider: SmsProvider,
    private newProvider: SmsProvider,
    private newProviderPercentage: number, // 0 to 100
  ) {}

  async sendOtp(phoneNumber: string, options?: SendOtpOptions) {
    const useNew = Math.random() * 100 < this.newProviderPercentage;
    const provider = useNew ? this.newProvider : this.oldProvider;

    try {
      return await provider.sendOtp(phoneNumber, options);
    } catch (error) {
      // Fallback to old provider if new one fails during rollout
      if (useNew) {
        console.warn('New provider failed, falling back to old provider');
        return await this.oldProvider.sendOtp(phoneNumber, options);
      }
      throw error;
    }
  }

  // Similar pattern for verifyOtp...
}`}</code>
      </pre>
      <p>
        The key detail: during the rollout phase, the new provider falls back
        to the old provider on failure. This means the worst case during
        migration is slightly slower delivery for some requests, never a
        complete failure.
      </p>

      <h2 id="monitoring">Monitoring During Migration</h2>
      <p>
        Active monitoring during the migration is non-negotiable. Track these
        metrics continuously:
      </p>
      <ul>
        <li>
          <strong>Delivery success rate:</strong> The percentage of OTPs
          successfully delivered. Compare new vs. old provider in real-time.
          Any drop below 95% should trigger investigation.
        </li>
        <li>
          <strong>Average delivery latency:</strong> Time from API call to SMS
          delivery. Measure at the p50, p95, and p99 percentiles. Latency
          spikes at p99 can indicate provider-side queuing issues.
        </li>
        <li>
          <strong>Verification success rate:</strong> The percentage of sent
          OTPs that are successfully verified. A drop here could indicate
          delivery issues (users not receiving the SMS) or code generation
          problems.
        </li>
        <li>
          <strong>Error rates by type:</strong> Track 4xx and 5xx errors
          separately. 4xx errors usually indicate your integration issues.
          5xx errors indicate provider-side problems.
        </li>
        <li>
          <strong>Fallback trigger rate:</strong> How often the new provider
          fails and falls back to the old provider. If this exceeds 5%, pause
          the rollout and investigate.
        </li>
        <li>
          <strong>Support ticket volume:</strong> Monitor for increases in
          user complaints about OTPs not being received or login issues.
        </li>
      </ul>
      <p>
        Set up automated alerts for each metric crossing its threshold. Do not
        rely on manually checking dashboards during the migration period.
      </p>

      <h2 id="rollback-plan">Rollback Plan</h2>
      <p>
        Every migration needs a tested rollback plan. Here is yours:
      </p>
      <ol>
        <li>
          <strong>Keep the old provider active:</strong> Do not cancel your old
          provider account or revoke API keys until at least two weeks after
          the migration is complete at 100%.
        </li>
        <li>
          <strong>One-line rollback:</strong> Your ProviderRouter should allow
          you to set <code>newProviderPercentage</code> back to 0 instantly.
          This routes all traffic back to the old provider with no code
          deployment needed. Use a feature flag service or environment variable.
        </li>
        <li>
          <strong>Verify rollback works:</strong> Before starting the
          migration, test the rollback by setting the percentage to 0 and
          confirming the old provider handles all traffic correctly.
        </li>
        <li>
          <strong>Handle in-flight OTPs:</strong> During rollback, OTPs sent
          via the new provider but not yet verified still need to verify
          against the new provider. Your verification logic should route to
          the correct provider based on which one issued the requestId.
        </li>
        <li>
          <strong>Communication plan:</strong> If a rollback is needed, notify
          your team. If users were affected, prepare a status page update.
        </li>
      </ol>

      <h2 id="post-migration">Post-Migration Cleanup</h2>
      <p>
        After running at 100% on the new provider for at least two weeks with
        stable metrics, complete the cleanup:
      </p>
      <ul>
        <li>
          <strong>Remove the old provider implementation:</strong> Delete the
          old provider adapter code, SDK dependencies, and configuration
          values. Keep the abstraction interface for future flexibility.
        </li>
        <li>
          <strong>Remove the routing layer:</strong> Replace the
          ProviderRouter with a direct reference to the new provider.
          Simplify the code path now that migration is complete.
        </li>
        <li>
          <strong>Cancel the old provider account:</strong> After confirming
          there are no remaining dependencies, terminate the old provider
          contract and revoke API keys.
        </li>
        <li>
          <strong>Update documentation:</strong> Update internal
          documentation, runbooks, and environment variable templates to
          reflect the new provider.
        </li>
        <li>
          <strong>Archive migration metrics:</strong> Save the comparative
          delivery metrics from the migration period. This data is valuable
          for future provider evaluations.
        </li>
        <li>
          <strong>Conduct a retrospective:</strong> Document what went well
          and what could be improved. This saves time on any future
          provider migrations.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>

      <p>
        Planning a migration to StartMessaging? Start by reviewing our{' '}
        <Link href="/otp-api">OTP API documentation</Link> to understand the
        integration points, then check our{' '}
        <Link href="/pricing">pricing page</Link> to compare costs with your
        current provider. For a broader view of your options, see our{' '}
        <Link href="/blog/best-otp-api-india">
          guide to the best OTP APIs in India
        </Link>
        .
      </p>
    </>
  ),
};
