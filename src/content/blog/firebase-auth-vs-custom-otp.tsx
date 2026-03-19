import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'firebase-auth-vs-custom-otp',
  title: 'Firebase Auth vs Custom OTP API: Pros & Cons',
  description:
    'When should you use Firebase phone auth versus a custom OTP API? Compare vendor lock-in, pricing, customization, India delivery, and data control.',
  category: 'comparisons',
  keywords: [
    'firebase auth vs custom otp',
    'firebase phone auth india',
    'firebase otp pricing',
    'custom otp api',
    'firebase alternative otp india',
    'firebase auth vendor lock-in',
    'otp verification api comparison',
    'firebase vs startmessaging',
  ],
  publishedAt: '2026-02-08',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'the-choice', title: 'The Choice: Managed Auth vs Custom OTP' },
    { id: 'how-firebase-phone-auth-works', title: 'How Firebase Phone Auth Works' },
    { id: 'how-custom-otp-api-works', title: 'How a Custom OTP API Works' },
    { id: 'pricing-comparison', title: 'Pricing Comparison' },
    { id: 'vendor-lock-in', title: 'Vendor Lock-in and Portability' },
    { id: 'customization-and-ux', title: 'Customization and UX Control' },
    { id: 'india-specific-delivery', title: 'India-Specific Delivery Performance' },
    { id: 'data-residency-and-privacy', title: 'Data Residency and Privacy' },
    { id: 'code-comparison', title: 'Code Comparison' },
    { id: 'comparison-table', title: 'Comparison Table' },
    { id: 'when-to-use-which', title: 'When to Use Which' },
  ],
  content: (
    <>
      <p>
        When you need phone number verification in your app, you have two fundamental approaches:
        use a managed authentication service like Firebase Phone Auth, or integrate a custom OTP API
        and build the verification flow yourself. Both approaches work, but they differ significantly
        in cost, flexibility, data control, and how well they serve the Indian market. This article
        helps you make an informed choice.
      </p>

      <h2 id="the-choice">The Choice: Managed Auth vs Custom OTP</h2>
      <p>
        Firebase Phone Auth is part of Google&apos;s Firebase platform. It handles the entire
        authentication flow: generating OTPs, sending SMS, verifying codes, and managing user sessions.
        You get a complete auth system with minimal code.
      </p>
      <p>
        A custom OTP API like <Link href="/otp-api">StartMessaging</Link> handles only the OTP part:
        sending a code to a phone number and verifying that the user entered the correct code. You build
        the authentication logic, session management, and user database yourself (or integrate it with
        your existing auth system).
      </p>
      <p>
        The right choice depends on where you are in your product journey and what trade-offs matter
        most to you.
      </p>

      <h2 id="how-firebase-phone-auth-works">How Firebase Phone Auth Works</h2>
      <p>Firebase Phone Auth provides:</p>
      <ul>
        <li>Client-side SDKs for web, iOS, and Android that manage the entire OTP flow</li>
        <li>Automatic SMS sending and code generation (you never see the OTP)</li>
        <li>reCAPTCHA verification to prevent abuse</li>
        <li>User management (Firebase creates and manages user records)</li>
        <li>JWT tokens for session management</li>
        <li>Integration with other Firebase services (Firestore, Cloud Functions, etc.)</li>
      </ul>
      <p>
        The developer experience is straightforward: add the Firebase SDK, call{' '}
        <code>signInWithPhoneNumber()</code>, and Firebase handles everything else. The trade-off is
        that Firebase controls the entire flow.
      </p>

      <h2 id="how-custom-otp-api-works">How a Custom OTP API Works</h2>
      <p>With a custom OTP API like StartMessaging, your backend:</p>
      <ol>
        <li>Receives a phone number from your frontend</li>
        <li>Calls the OTP API to send a code to that number</li>
        <li>Receives the code back from the user</li>
        <li>Calls the OTP API to verify the code</li>
        <li>Creates or authenticates the user in your own database</li>
        <li>Issues your own session token (JWT, cookie, etc.)</li>
      </ol>
      <p>
        You write more code, but you control every aspect of the flow: the UI, the timing, the retry
        logic, the user model, and the session management.
      </p>

      <h2 id="pricing-comparison">Pricing Comparison</h2>
      <p>
        Firebase Phone Auth uses a verification-based pricing model with a free tier:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Firebase Phone Auth</th>
              <th>StartMessaging</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Free tier</td>
              <td>50 verifications/day (Spark plan)</td>
              <td>None (pay as you go)</td>
            </tr>
            <tr>
              <td>Paid tier cost</td>
              <td>$0.01-0.06/verification (Blaze plan)</td>
              <td>Rs 0.25/OTP (~$0.003)</td>
            </tr>
            <tr>
              <td>10,000 OTPs/month</td>
              <td>~Rs 5,000-50,000</td>
              <td>Rs 2,500</td>
            </tr>
            <tr>
              <td>100,000 OTPs/month</td>
              <td>~Rs 50,000-5,00,000</td>
              <td>Rs 25,000</td>
            </tr>
            <tr>
              <td>Billing currency</td>
              <td>USD</td>
              <td>INR</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Firebase&apos;s free tier (50 verifications/day, approximately 1,500/month) is attractive for
        very early-stage projects. However, once you exceed the free tier, costs escalate quickly.
        Firebase charges $0.01 for the first 10,000 verifications in a region, then $0.06 per
        verification after that. For India at scale, this becomes significantly more expensive than a
        dedicated OTP API.
      </p>
      <p>
        StartMessaging has no free tier, but at Rs 0.25 per OTP, even 1,500 verifications per month
        costs only Rs 375. The predictable, flat pricing makes budgeting straightforward. See the full
        details on our <Link href="/pricing">pricing page</Link>.
      </p>

      <h2 id="vendor-lock-in">Vendor Lock-in and Portability</h2>
      <p>
        This is one of the most important considerations and is often overlooked when choosing Firebase.
      </p>
      <p>
        <strong>Firebase lock-in:</strong> When you use Firebase Phone Auth, your user identities live
        in Firebase. Your app depends on Firebase SDKs. Your auth tokens are Firebase JWTs. If you
        decide to migrate away from Firebase (to your own backend, to Supabase, to AWS Cognito, etc.),
        you need to:
      </p>
      <ul>
        <li>Export all user data from Firebase (limited by Firebase export capabilities)</li>
        <li>Rebuild your auth flow with a new provider</li>
        <li>Migrate user sessions without forcing everyone to re-authenticate</li>
        <li>Update all client-side SDK calls</li>
        <li>Handle the transition period where users might be on old or new auth</li>
      </ul>
      <p>
        <strong>Custom OTP API portability:</strong> When you use a custom OTP API, your user data lives
        in your own database. Your auth flow is in your own code. If you want to switch OTP providers
        (from StartMessaging to MSG91 or vice versa), you change a few API calls in your backend. Your
        user model, sessions, and frontend remain untouched. The OTP provider is a pluggable service,
        not a foundation.
      </p>

      <h2 id="customization-and-ux">Customization and UX Control</h2>
      <p>
        <strong>Firebase</strong> provides a pre-built UI flow. While you can customize the appearance
        somewhat, the fundamental flow is controlled by Firebase:
      </p>
      <ul>
        <li>reCAPTCHA is mandatory (visible or invisible) &mdash; you cannot remove it</li>
        <li>OTP length, format, and expiry are controlled by Firebase</li>
        <li>The SMS message template is fixed (&ldquo;Your verification code is...&rdquo;)</li>
        <li>Retry and rate limiting logic is Firebase&apos;s, not yours</li>
        <li>You cannot customise what happens between send and verify</li>
      </ul>
      <p>
        <strong>Custom OTP API</strong> gives you full control:
      </p>
      <ul>
        <li>Design your own verification UI exactly how you want it</li>
        <li>Control retry logic, cooldown periods, and attempt limits</li>
        <li>Implement custom rate limiting per user, IP, or device</li>
        <li>Add your own abuse prevention (no mandatory reCAPTCHA)</li>
        <li>Build custom flows like OTP + password, OTP + biometric, or OTP as second factor</li>
        <li>Use idempotency keys to prevent duplicate sends (StartMessaging supports this natively)</li>
      </ul>

      <h2 id="india-specific-delivery">India-Specific Delivery Performance</h2>
      <p>
        Firebase Phone Auth uses Google&apos;s own SMS infrastructure, which routes messages through
        international gateways. For India, this means:
      </p>
      <ul>
        <li>Messages may be routed internationally, adding latency</li>
        <li>DLT compliance is handled by Google but delivery routing may not be optimised for Indian carriers</li>
        <li>Delivery rates on some carriers (particularly BSNL and Vi) can be inconsistent</li>
        <li>Users occasionally report delays of 30-60 seconds for OTP delivery</li>
      </ul>
      <p>
        <Link href="/features">StartMessaging</Link> uses domestic Indian SMS providers with
        carrier-specific optimisations:
      </p>
      <ul>
        <li>Messages routed through domestic gateways for lower latency</li>
        <li>Automatic provider fallback if the primary route fails</li>
        <li>97-99% delivery rates across Jio, Airtel, Vi, and BSNL</li>
        <li>Typical delivery time of 3-8 seconds</li>
      </ul>
      <p>
        For a detailed breakdown by carrier, see our{' '}
        <Link href="/blog/otp-delivery-rates-india">OTP delivery rates in India</Link> guide.
      </p>

      <h2 id="data-residency-and-privacy">Data Residency and Privacy</h2>
      <p>
        Firebase stores user data on Google Cloud infrastructure. While Google has data centres in India
        (Mumbai region), Firebase does not guarantee that all user authentication data is stored
        exclusively in India. For companies with strict data residency requirements (fintech, healthcare,
        government projects), this can be a compliance concern.
      </p>
      <p>
        With a custom OTP API approach, your user data lives in your own database, hosted wherever you
        choose. The OTP provider (StartMessaging) only processes the phone number and OTP code
        transiently &mdash; it does not maintain a persistent user identity store. This separation of
        concerns makes it easier to comply with data localisation requirements.
      </p>

      <h2 id="code-comparison">Code Comparison</h2>

      <h3>Firebase Phone Auth (React)</h3>
      <pre><code>{`import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

// Setup reCAPTCHA (required)
const auth = getAuth();
const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'invisible',
});

// Send OTP
const confirmationResult = await signInWithPhoneNumber(
  auth,
  '+919876543210',
  recaptcha
);

// Verify OTP (user enters code)
const result = await confirmationResult.confirm('482916');
const user = result.user; // Firebase user object
const token = await user.getIdToken(); // Firebase JWT`}</code></pre>

      <h3>Custom OTP with StartMessaging (Node.js backend)</h3>
      <pre><code>{`// Backend: Send OTP
app.post('/auth/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  const response = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sm_live_your_api_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber }),
  });

  const { data } = await response.json();
  res.json({ requestId: data.requestId });
});

// Backend: Verify OTP
app.post('/auth/verify-otp', async (req, res) => {
  const { requestId, otp } = req.body;

  const response = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sm_live_your_api_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requestId, otp }),
  });

  const { data } = await response.json();

  if (data.verified) {
    // Create or find user in YOUR database
    const user = await findOrCreateUser(phoneNumber);
    // Issue YOUR JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  }
});`}</code></pre>

      <p>
        The Firebase approach is fewer lines of code and runs on the client side. The custom OTP
        approach requires a backend but gives you complete ownership of the user model and auth tokens.
      </p>

      <h2 id="comparison-table">Comparison Table</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Firebase Phone Auth</th>
              <th>Custom OTP API (StartMessaging)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Setup complexity</td>
              <td><strong>Low (SDK only)</strong></td>
              <td>Medium (backend required)</td>
            </tr>
            <tr>
              <td>Free tier</td>
              <td><strong>50/day (~1,500/month)</strong></td>
              <td>None</td>
            </tr>
            <tr>
              <td>Cost at scale (100K/month)</td>
              <td>Rs 50,000-5,00,000</td>
              <td><strong>Rs 25,000</strong></td>
            </tr>
            <tr>
              <td>Vendor lock-in</td>
              <td>High</td>
              <td><strong>Low (pluggable)</strong></td>
            </tr>
            <tr>
              <td>UX customisation</td>
              <td>Limited</td>
              <td><strong>Full control</strong></td>
            </tr>
            <tr>
              <td>reCAPTCHA required</td>
              <td>Yes</td>
              <td><strong>No (your choice)</strong></td>
            </tr>
            <tr>
              <td>DLT registration</td>
              <td>Handled by Google</td>
              <td><strong>Handled by StartMessaging</strong></td>
            </tr>
            <tr>
              <td>User data ownership</td>
              <td>Firebase (Google Cloud)</td>
              <td><strong>Your database</strong></td>
            </tr>
            <tr>
              <td>Data residency control</td>
              <td>Limited</td>
              <td><strong>Full (your infra)</strong></td>
            </tr>
            <tr>
              <td>India delivery speed</td>
              <td>Variable (5-60s)</td>
              <td><strong>Fast (3-8s)</strong></td>
            </tr>
            <tr>
              <td>Delivery rate (India)</td>
              <td>93-97%</td>
              <td><strong>97-99%</strong></td>
            </tr>
            <tr>
              <td>Multi-factor auth built-in</td>
              <td><strong>Yes</strong></td>
              <td>Build yourself</td>
            </tr>
            <tr>
              <td>Social login integration</td>
              <td><strong>Yes (Google, Facebook, etc.)</strong></td>
              <td>Build yourself</td>
            </tr>
            <tr>
              <td>Billing currency</td>
              <td>USD</td>
              <td><strong>INR</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="when-to-use-which">When to Use Which</h2>

      <h3>Use Firebase Phone Auth when:</h3>
      <ul>
        <li>You are building an MVP or prototype and need auth up and running in hours</li>
        <li>You are already invested in the Firebase ecosystem (Firestore, Functions, Hosting)</li>
        <li>Your volume is under 50 verifications per day (free tier)</li>
        <li>You need social login (Google, Apple, Facebook) alongside phone auth</li>
        <li>You do not have a backend or do not want to build auth logic</li>
      </ul>

      <h3>Use a custom OTP API (StartMessaging) when:</h3>
      <ul>
        <li>You are building for the Indian market and need the best delivery rates and speed</li>
        <li>You want to avoid vendor lock-in and own your user data</li>
        <li>You are scaling beyond the free tier and want predictable, low costs</li>
        <li>You need full control over the verification UX and flow</li>
        <li>You have data residency requirements that need Indian hosting</li>
        <li>You already have a backend and want OTP as a service, not a full auth system</li>
        <li>You want INR billing without forex overhead</li>
      </ul>

      <blockquote>
        <p>
          <strong>Hybrid approach:</strong> Some teams use Firebase for social login and account
          management, but use a custom OTP API for phone verification. This gives you the best of both
          worlds: Firebase for Google/Apple sign-in, and StartMessaging for reliable, affordable OTP in
          India.
        </p>
      </blockquote>

      <p>
        Ready to try the custom OTP approach? Check out the{' '}
        <Link href="/otp-api">StartMessaging API documentation</Link> or see how we compare to other
        providers in our <Link href="/blog/best-otp-api-india">best OTP API for India</Link> guide.
      </p>
    </>
  ),
  relatedSlugs: ['best-otp-api-india', 'otp-verification-flow'],
  faq: [
    {
      question: 'Is Firebase Phone Auth free?',
      answer:
        'Firebase Phone Auth offers a free tier of 50 verifications per day (approximately 1,500 per month) on the Spark plan. Beyond that, you need the Blaze (pay-as-you-go) plan, which charges $0.01-0.06 per verification depending on volume. Costs can escalate quickly at scale.',
    },
    {
      question: 'Can I migrate from Firebase Phone Auth to a custom OTP API later?',
      answer:
        'Yes, but it requires significant effort. You need to export user data from Firebase, build backend auth logic, migrate sessions, and update client-side code. Starting with a custom OTP API avoids this migration pain. If you are unsure, the custom approach is more portable.',
    },
    {
      question: 'Does Firebase Phone Auth work well in India?',
      answer:
        'Firebase Phone Auth works in India but delivery performance can be inconsistent. Some users report OTP delays of 30-60 seconds and lower delivery rates on certain carriers like BSNL and Vi. India-focused providers like StartMessaging typically offer faster and more reliable delivery.',
    },
    {
      question: 'Can I use StartMessaging with Firebase for other auth methods?',
      answer:
        'Yes. A common hybrid approach uses Firebase for social login (Google, Apple, Facebook) and StartMessaging for phone OTP verification. This gives you reliable Indian OTP delivery while keeping Firebase for social auth where it excels.',
    },
  ],
};
