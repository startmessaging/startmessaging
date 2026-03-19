import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'build-otp-saas-product',
  title: 'Build a SaaS Product with OTP Auth',
  description:
    'Technical guide for SaaS founders on implementing OTP authentication. Covers architecture, UX design, cost projections, scaling, and integration with StartMessaging API.',
  category: 'business',
  keywords: [
    'otp authentication saas',
    'build saas otp login',
    'otp vs password saas',
    'phone verification saas product',
    'otp auth architecture',
    'saas authentication india',
    'startmessaging otp saas',
  ],
  publishedAt: '2026-02-10',
  readingTime: 14,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-otp-for-saas', title: 'Why OTP for SaaS Authentication' },
    { id: 'otp-vs-password', title: 'OTP vs Password: The Trade-offs' },
    { id: 'architecture-decisions', title: 'Architecture Decisions' },
    { id: 'ux-design', title: 'User Experience Design for OTP Flows' },
    { id: 'implementation', title: 'Implementation with StartMessaging' },
    { id: 'cost-projections', title: 'Cost Projections for SaaS Founders' },
    { id: 'security-considerations', title: 'Security Considerations' },
    { id: 'scaling', title: 'Scaling OTP Auth' },
    { id: 'hybrid-approaches', title: 'Hybrid Authentication Approaches' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-verification-flow', 'send-otp-nodejs'],
  faq: [
    {
      question: 'Should I use OTP-only auth or OTP plus password?',
      answer:
        'For most consumer-facing SaaS products in India, OTP-only auth works well because it eliminates password-related support burden and improves conversion. For B2B SaaS with compliance requirements, a hybrid approach (password plus OTP for sensitive actions) is more appropriate. Consider your audience: Indian users are very comfortable with OTP login from apps like Swiggy and PhonePe.',
    },
    {
      question: 'How do I handle users without phone numbers?',
      answer:
        'If you need to support users without Indian phone numbers (international users or enterprise accounts), offer email-based magic links as a fallback alongside phone OTP. Your architecture should abstract the verification method behind an interface so you can support multiple channels without rewriting your auth logic.',
    },
    {
      question: 'What happens if the OTP provider goes down?',
      answer:
        'Build your OTP integration behind an abstraction layer that supports provider fallback. StartMessaging already handles provider failover internally (switching between Twilio and MSG91 for delivery), but for extreme scenarios, your abstraction layer can route to a backup provider. Also implement session extension so users already logged in are not immediately affected by an OTP outage.',
    },
    {
      question: 'How much should I budget for OTP costs at launch?',
      answer:
        'At launch, budget Rs 500 to Rs 2,500 per month (2,000 to 10,000 OTPs). Most early-stage SaaS products have a small active user base with low login frequency. With StartMessaging at Rs 0.25 per OTP and a wallet-based model, you only pay for actual usage. Budget conservatively and scale your wallet balance as user growth materializes.',
    },
  ],
  content: (
    <>
      <p>
        When you are building a SaaS product targeting Indian users, one of the
        first decisions you face is how users will authenticate. Passwords have
        been the default for decades, but OTP-based authentication has become
        the standard for Indian consumer apps. Services from Swiggy to PhonePe
        to Aadhaar verification all use OTP as a primary authentication method.
      </p>
      <p>
        This guide is for SaaS founders and technical leads who are evaluating
        OTP as their primary or secondary authentication method. We cover the
        architecture decisions, user experience patterns, cost implications,
        and practical implementation details you need to make an informed
        choice.
      </p>

      <h2 id="why-otp-for-saas">Why OTP for SaaS Authentication</h2>
      <p>
        OTP-based authentication offers several advantages that are
        particularly relevant for Indian SaaS products:
      </p>
      <ul>
        <li>
          <strong>No password management overhead:</strong> No password
          hashing, no reset flows, no breach notifications when a password
          database is compromised. The OTP is generated, delivered, verified,
          and discarded. There is nothing to store or protect long-term.
        </li>
        <li>
          <strong>Higher conversion rates:</strong> Registration requires only
          a phone number. No email verification, no password creation with
          complexity requirements, no CAPTCHA. Every additional form field
          you remove increases your sign-up conversion rate.
        </li>
        <li>
          <strong>Verified phone number from day one:</strong> You know the
          user controls the phone number they provided. This is valuable for
          communication (transactional SMS, support), fraud prevention, and
          compliance requirements like KYC.
        </li>
        <li>
          <strong>Familiarity for Indian users:</strong> OTP login is the
          dominant pattern in India. Users expect it and are comfortable with
          the flow. Choosing passwords over OTP would actually feel unusual to
          most Indian consumers.
        </li>
        <li>
          <strong>Reduced support burden:</strong> Password reset is
          consistently one of the top support tickets for SaaS products. OTP
          auth eliminates this category entirely.
        </li>
      </ul>

      <h2 id="otp-vs-password">OTP vs Password: The Trade-offs</h2>
      <p>
        OTP is not strictly superior to passwords in every situation. Here is
        an honest comparison:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>OTP Auth</th>
            <th>Password Auth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sign-up friction</td>
            <td>Low (phone number only)</td>
            <td>Medium (email + password + verification)</td>
          </tr>
          <tr>
            <td>Login speed</td>
            <td>Depends on SMS delivery (5-30 seconds)</td>
            <td>Instant (type password)</td>
          </tr>
          <tr>
            <td>Offline login</td>
            <td>Not possible</td>
            <td>Possible with cached credentials</td>
          </tr>
          <tr>
            <td>Per-login cost</td>
            <td>Rs 0.25 per OTP</td>
            <td>Zero marginal cost</td>
          </tr>
          <tr>
            <td>Security surface</td>
            <td>SIM swap, SS7 attacks (rare)</td>
            <td>Credential stuffing, phishing, breaches</td>
          </tr>
          <tr>
            <td>Support burden</td>
            <td>Low (no password resets)</td>
            <td>High (password resets dominate)</td>
          </tr>
          <tr>
            <td>User familiarity (India)</td>
            <td>Very high</td>
            <td>High</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        The most significant trade-off is cost. Password auth has zero
        marginal cost per login, while OTP auth costs Rs 0.25 per login with{' '}
        <Link href="/pricing">StartMessaging</Link>. For a SaaS product with
        10,000 daily logins, that is Rs 2,500 per day or about Rs 75,000 per
        month. Whether this cost is acceptable depends on your product&rsquo;s
        revenue per user and login frequency.
      </p>

      <h2 id="architecture-decisions">Architecture Decisions</h2>
      <p>
        Before writing any code, make these architectural decisions:
      </p>
      <h3>OTP as Primary vs Secondary Auth</h3>
      <p>
        <strong>Primary:</strong> OTP is the only way to log in. No passwords
        exist. Best for consumer apps, delivery platforms, and services where
        simplicity and phone verification are paramount.
      </p>
      <p>
        <strong>Secondary:</strong> Users have passwords, and OTP is used for
        two-factor authentication, high-risk actions (payment, profile changes),
        or as a password-reset mechanism. Best for B2B SaaS, fintech, and
        products with compliance requirements.
      </p>
      <h3>Session Strategy</h3>
      <p>
        OTP-based systems need thoughtful session management because every
        re-authentication costs money:
      </p>
      <ul>
        <li>
          <strong>Long-lived sessions:</strong> Issue JWT tokens with longer
          expiry (7 to 30 days) and use refresh tokens. This reduces re-login
          frequency and OTP costs but requires robust token revocation.
        </li>
        <li>
          <strong>Short sessions with remember-me:</strong> Default to short
          sessions (24 hours) but offer a &quot;remember this device&quot;
          option that extends the session. Users who opt in avoid repeated
          OTP prompts.
        </li>
        <li>
          <strong>Device fingerprinting:</strong> Trust recognized devices for
          longer sessions and only require OTP for new or unrecognized
          devices. This significantly reduces OTP volume for returning users.
        </li>
      </ul>
      <h3>Provider Abstraction</h3>
      <p>
        Do not hardcode a single OTP provider into your application. Build an
        abstraction layer:
      </p>
      <pre>
        <code>{`// OTP provider interface
interface OtpProvider {
  sendOtp(phoneNumber: string): Promise<{ requestId: string }>;
  verifyOtp(requestId: string, code: string): Promise<{ verified: boolean }>;
}

// StartMessaging implementation
class StartMessagingProvider implements OtpProvider {
  async sendOtp(phoneNumber: string) {
    const response = await fetch('https://api.startmessaging.com/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.STARTMESSAGING_API_KEY,
      },
      body: JSON.stringify({ phoneNumber }),
    });
    const { data } = await response.json();
    return { requestId: data.requestId };
  }

  async verifyOtp(requestId: string, code: string) {
    const response = await fetch('https://api.startmessaging.com/otp/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.STARTMESSAGING_API_KEY,
      },
      body: JSON.stringify({ requestId, otpCode: code }),
    });
    const { data } = await response.json();
    return { verified: data.verified };
  }
}`}</code>
      </pre>
      <p>
        This pattern makes it straightforward to add fallback providers, run
        A/B tests on delivery, or{' '}
        <Link href="/blog/migrate-sms-provider-checklist">
          migrate providers
        </Link>{' '}
        without touching your core auth logic.
      </p>

      <h2 id="ux-design">User Experience Design for OTP Flows</h2>
      <p>
        The UX of your OTP flow directly impacts conversion, support volume,
        and user satisfaction. Here are the patterns that work:
      </p>
      <h3>Registration Flow</h3>
      <ol>
        <li>
          User enters phone number on a clean, single-input screen.
        </li>
        <li>
          Show a loading indicator while the OTP is being sent (typically 2 to
          5 seconds).
        </li>
        <li>
          Redirect to a 4 to 6-digit code input screen. Auto-focus the first
          input field.
        </li>
        <li>
          Support auto-read on Android (using the SMS Retriever API) so the
          code is filled automatically.
        </li>
        <li>
          Show a countdown timer (60 seconds) before allowing a resend.
        </li>
        <li>
          After successful verification, go directly to onboarding. Do not
          ask for a password.
        </li>
      </ol>
      <h3>Login Flow</h3>
      <ol>
        <li>
          User enters their registered phone number.
        </li>
        <li>
          Send OTP immediately (do not confirm before sending).
        </li>
        <li>
          Code entry screen with auto-read support.
        </li>
        <li>
          On success, issue a session token and redirect to the dashboard.
        </li>
      </ol>
      <h3>Key UX Principles</h3>
      <ul>
        <li>
          <strong>Pre-fill the country code:</strong> Default to +91 for Indian
          apps. Do not make users type it.
        </li>
        <li>
          <strong>Format the phone number visually:</strong> Display as
          +91 98765 43210 for readability while storing as +919876543210
          internally.
        </li>
        <li>
          <strong>Show the masked number on the OTP screen:</strong> &quot;OTP
          sent to +91 ****3210&quot; confirms the user did not mistype.
        </li>
        <li>
          <strong>Allow editing the phone number:</strong> If the user made a
          typo, let them go back and correct it without starting over.
        </li>
        <li>
          <strong>Handle errors gracefully:</strong> Wrong code? Show how many
          attempts remain. Expired? Offer a resend button. Failed delivery?
          Suggest checking the number.
        </li>
      </ul>

      <h2 id="implementation">Implementation with StartMessaging</h2>
      <p>
        Here is a practical implementation outline using the{' '}
        <Link href="/otp-api">StartMessaging OTP API</Link>:
      </p>
      <h3>Backend: Auth Service</h3>
      <pre>
        <code>{`// auth.service.ts
class AuthService {
  async initiateLogin(phoneNumber: string) {
    // 1. Send OTP via StartMessaging
    const otpResult = await this.otpProvider.sendOtp(phoneNumber);

    // 2. Create or find user record
    let user = await this.userRepo.findByPhone(phoneNumber);
    if (!user) {
      user = await this.userRepo.create({ phoneNumber });
    }

    // 3. Store requestId for verification
    await this.sessionStore.set(
      \`otp:\${phoneNumber}\`,
      otpResult.requestId,
      { ttl: 600 } // 10 minutes
    );

    return { message: 'OTP sent', expiresInSeconds: 600 };
  }

  async verifyLogin(phoneNumber: string, code: string) {
    // 1. Retrieve stored requestId
    const requestId = await this.sessionStore.get(\`otp:\${phoneNumber}\`);
    if (!requestId) throw new Error('OTP expired or not found');

    // 2. Verify via StartMessaging
    const result = await this.otpProvider.verifyOtp(requestId, code);
    if (!result.verified) throw new Error('Invalid OTP');

    // 3. Issue session token
    const user = await this.userRepo.findByPhone(phoneNumber);
    const token = this.jwt.sign({ userId: user.id, phone: phoneNumber });

    // 4. Clean up
    await this.sessionStore.delete(\`otp:\${phoneNumber}\`);

    return { token, user };
  }
}`}</code>
      </pre>
      <h3>Frontend: React Login Component</h3>
      <pre>
        <code>{`// Simplified React OTP login flow
function LoginPage() {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');

  async function handleSendOtp() {
    await apiPost('/auth/send-otp', { phoneNumber: \`+91\${phone}\` });
    setStep('otp');
  }

  async function handleVerify(code: string) {
    const { token } = await apiPost('/auth/verify-otp', {
      phoneNumber: \`+91\${phone}\`,
      otpCode: code,
    });
    localStorage.setItem('token', token);
    window.location.href = '/dashboard';
  }

  return step === 'phone'
    ? <PhoneInput value={phone} onChange={setPhone} onSubmit={handleSendOtp} />
    : <OtpInput phone={phone} onVerify={handleVerify} onBack={() => setStep('phone')} />;
}`}</code>
      </pre>

      <h2 id="cost-projections">Cost Projections for SaaS Founders</h2>
      <p>
        Understanding your OTP costs at different growth stages helps with
        financial planning. Here is a projection based on Rs 0.25 per OTP
        with StartMessaging:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Growth Stage</th>
            <th>Monthly Active Users</th>
            <th>Logins/Month*</th>
            <th>OTP Cost/Month</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pre-launch</td>
            <td>100</td>
            <td>400</td>
            <td>Rs 100</td>
          </tr>
          <tr>
            <td>Early Traction</td>
            <td>1,000</td>
            <td>4,000</td>
            <td>Rs 1,000</td>
          </tr>
          <tr>
            <td>Product-Market Fit</td>
            <td>10,000</td>
            <td>40,000</td>
            <td>Rs 10,000</td>
          </tr>
          <tr>
            <td>Growth</td>
            <td>50,000</td>
            <td>150,000</td>
            <td>Rs 37,500</td>
          </tr>
          <tr>
            <td>Scale</td>
            <td>200,000</td>
            <td>400,000</td>
            <td>Rs 1,00,000</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        <em>
          *Assumes an average of 3 to 4 logins per user per month. Actual
          frequency depends on your product. Note that device trust and
          long-lived sessions significantly reduce the OTP-to-login ratio.
        </em>
      </p>
      <p>
        Compare these numbers against the cost of password-related support
        tickets (typically $5 to $15 per ticket in support staff time) and
        the conversion improvement from simplified registration. For most SaaS
        products, the OTP cost is offset by reduced support expenses and higher
        conversion.
      </p>

      <h2 id="security-considerations">Security Considerations</h2>
      <p>
        OTP auth has its own security profile. Address these threats:
      </p>
      <ul>
        <li>
          <strong>OTP bombing / enumeration:</strong> Rate-limit OTP requests
          per phone number (maximum 3 per hour) and per IP address. This
          prevents abuse and protects your wallet balance.
        </li>
        <li>
          <strong>Brute force:</strong> The{' '}
          <Link href="/otp-api">StartMessaging API</Link> limits verification
          attempts per OTP request (default 3 attempts). After exhaustion, a
          new OTP must be requested.
        </li>
        <li>
          <strong>SIM swap attacks:</strong> For high-value accounts (admin
          users, financial actions), consider adding a second factor like
          email confirmation or authenticator apps.
        </li>
        <li>
          <strong>Session fixation:</strong> Generate a new session token on
          every successful OTP verification. Never reuse session identifiers.
        </li>
        <li>
          <strong>Phone number recycling:</strong> Telecom operators recycle
          inactive numbers. If a user has not logged in for 12+ months,
          consider requiring re-verification of identity when they return.
        </li>
      </ul>

      <h2 id="scaling">Scaling OTP Auth</h2>
      <p>
        As your SaaS product grows, OTP authentication introduces specific
        scaling challenges:
      </p>
      <ul>
        <li>
          <strong>Reduce OTP frequency:</strong> Use device trust tokens
          to skip OTP for recognized devices. This can reduce your OTP
          volume by 60% to 80% as most logins come from returning users on
          the same device.
        </li>
        <li>
          <strong>Implement session refresh:</strong> Instead of expiring
          sessions and forcing a new OTP, use refresh tokens that extend the
          session seamlessly. Reserve OTP for new device logins.
        </li>
        <li>
          <strong>Monitor delivery rates:</strong> Track OTP delivery success
          rates by carrier. If delivery to a specific carrier degrades, you
          need to know immediately. StartMessaging uses priority-based
          provider fallback to maintain high delivery rates.
        </li>
        <li>
          <strong>Wallet balance automation:</strong> Set up automated
          wallet top-ups or alerts when your balance drops below a threshold.
          At scale, a depleted wallet means no user can log in.
        </li>
        <li>
          <strong>Graceful degradation:</strong> If SMS delivery fails, offer
          a fallback (email OTP, voice call, retry after 30 seconds). Do not
          leave users locked out.
        </li>
      </ul>

      <h2 id="hybrid-approaches">Hybrid Authentication Approaches</h2>
      <p>
        Many successful Indian SaaS products use a hybrid model:
      </p>
      <ul>
        <li>
          <strong>OTP for registration, password for login:</strong> Users
          verify their phone number via OTP during sign-up, then set a
          password for future logins. This gives you a verified phone number
          and zero-cost logins.
        </li>
        <li>
          <strong>Password primary, OTP for 2FA:</strong> Standard password
          login with OTP as the second factor for sensitive operations. This
          is common in fintech and B2B SaaS.
        </li>
        <li>
          <strong>OTP for mobile, password for web:</strong> Optimize
          for the platform. Mobile users expect OTP (with auto-read). Desktop
          users may prefer passwords.
        </li>
        <li>
          <strong>Magic link plus OTP:</strong> Email a magic link as the
          primary login method and use OTP for phone verification and
          sensitive actions. This balances cost and security.
        </li>
      </ul>
      <p>
        The right combination depends on your user base, security requirements,
        and cost sensitivity. Start with the simplest approach that meets your
        requirements and add complexity only when needed.
      </p>

      <h2 id="faq">FAQ</h2>

      <p>
        Ready to build? Check the{' '}
        <Link href="/otp-api">StartMessaging API documentation</Link> for
        endpoint details, or read our{' '}
        <Link href="/blog/otp-verification-flow">
          OTP verification flow guide
        </Link>{' '}
        for deeper implementation patterns. Start with{' '}
        <Link href="/pricing">Rs 0.25 per OTP</Link> and scale your auth as
        your product grows.
      </p>
    </>
  ),
};
