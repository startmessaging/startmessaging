import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'msg91-vs-startmessaging',
  title: 'MSG91 vs StartMessaging: OTP API Compared',
  description:
    'An honest comparison of MSG91 and StartMessaging for OTP verification in India. Pricing tiers, DLT handling, API simplicity, delivery rates, and support.',
  category: 'comparisons',
  keywords: [
    'msg91 vs startmessaging',
    'msg91 alternative',
    'msg91 otp api pricing',
    'otp api comparison india',
    'msg91 review',
    'startmessaging review',
    'best otp provider india',
    'msg91 dlt registration',
  ],
  publishedAt: '2026-02-06',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'two-india-focused-providers', title: 'Two India-Focused Providers' },
    { id: 'company-background', title: 'Company Background' },
    { id: 'pricing-comparison', title: 'Pricing Comparison' },
    { id: 'dlt-handling', title: 'DLT Handling' },
    { id: 'api-simplicity', title: 'API Simplicity and Integration' },
    { id: 'code-comparison', title: 'Code Comparison' },
    { id: 'feature-table', title: 'Feature-by-Feature Comparison' },
    { id: 'delivery-rates', title: 'Delivery Rates' },
    { id: 'documentation-and-support', title: 'Documentation and Support' },
    { id: 'which-should-you-choose', title: 'Which Should You Choose?' },
  ],
  content: (
    <>
      <p>
        When Indian developers search for an OTP API, two names frequently come up: MSG91 and
        StartMessaging. Both are India-focused, both support INR billing, and both are designed for the
        Indian telecom landscape. But they differ significantly in pricing structure, DLT requirements,
        API design philosophy, and target audience. In this comparison, we break down the differences
        honestly to help you choose the right provider for your project.
      </p>

      <h2 id="two-india-focused-providers">Two India-Focused Providers</h2>
      <p>
        Unlike comparing an Indian provider with a global platform like Twilio (see our{' '}
        <Link href="/blog/twilio-vs-startmessaging">Twilio vs StartMessaging</Link> comparison), this
        matchup is between two services built for the Indian market. Both understand TRAI regulations,
        Indian carrier nuances, and the need for INR billing. The differences lie in approach and
        philosophy.
      </p>

      <h2 id="company-background">Company Background</h2>
      <h3>MSG91</h3>
      <p>
        MSG91, operated by Walkover Web Solutions, has been in the Indian SMS market since 2010. It
        started as a bulk SMS provider and has expanded into a multi-channel communications platform
        offering SMS, email, voice, WhatsApp, and RCS. Its OTP product is part of a larger suite that
        includes a visual flow builder, segmentation tools, and campaign management. MSG91 serves
        enterprises and mid-market companies and has processed billions of messages.
      </p>

      <h3>StartMessaging</h3>
      <p>
        <Link href="/features">StartMessaging</Link> is a focused OTP API built specifically for
        developers. Rather than being a multi-channel platform, it does one thing: OTP verification for
        Indian phone numbers. This focus means a simpler API, faster setup, transparent pricing, and no
        features you do not need. It is designed for startups, indie developers, and SaaS companies that
        want reliable OTP without complexity.
      </p>

      <h2 id="pricing-comparison">Pricing Comparison</h2>
      <p>
        MSG91 uses a tiered pricing model where the per-SMS cost decreases as your volume increases.
        StartMessaging uses a flat rate regardless of volume.
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Volume (per month)</th>
              <th>MSG91 Cost/SMS</th>
              <th>StartMessaging Cost/OTP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Up to 10,000</td>
              <td>~Rs 0.40-0.50</td>
              <td>Rs 0.25</td>
            </tr>
            <tr>
              <td>10,001 - 100,000</td>
              <td>~Rs 0.25-0.35</td>
              <td>Rs 0.25</td>
            </tr>
            <tr>
              <td>100,001 - 500,000</td>
              <td>~Rs 0.20-0.28</td>
              <td>Rs 0.25</td>
            </tr>
            <tr>
              <td>500,001+</td>
              <td>~Rs 0.18-0.22</td>
              <td>Rs 0.25</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Key takeaway:</strong> StartMessaging is cheaper for volumes up to about 200,000 OTPs
        per month. At very high volumes (500,000+), MSG91 may offer lower per-SMS rates through
        negotiated enterprise pricing. However, MSG91&apos;s pricing is not always transparent &mdash;
        the exact rate depends on your plan, negotiation, and commitment.
      </p>

      <h3>Total Cost at Different Scales</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Monthly OTPs</th>
              <th>MSG91 (estimated)</th>
              <th>StartMessaging</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5,000</td>
              <td>Rs 2,250</td>
              <td><strong>Rs 1,250</strong></td>
              <td>Save Rs 1,000</td>
            </tr>
            <tr>
              <td>25,000</td>
              <td>Rs 7,500</td>
              <td><strong>Rs 6,250</strong></td>
              <td>Save Rs 1,250</td>
            </tr>
            <tr>
              <td>100,000</td>
              <td>Rs 25,000</td>
              <td><strong>Rs 25,000</strong></td>
              <td>Roughly equal</td>
            </tr>
            <tr>
              <td>500,000</td>
              <td><strong>Rs 1,00,000</strong></td>
              <td>Rs 1,25,000</td>
              <td>MSG91 saves Rs 25,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For the full StartMessaging pricing details, visit our <Link href="/pricing">pricing page</Link>.
      </p>

      <h2 id="dlt-handling">DLT Handling</h2>
      <p>
        This is one of the most significant differences between the two providers.
      </p>
      <p>
        <strong>MSG91</strong> requires you to complete DLT registration. You need to register your
        entity on a DLT platform (Jio, Airtel, Vi, or BSNL), get your business approved, register
        sender IDs, and submit message templates for approval. MSG91 provides guidance and some tools to
        help with the process, but you are responsible for completing the registration yourself. The
        process typically takes 3-7 business days.
      </p>
      <p>
        <strong>StartMessaging</strong> does not require you to register for DLT at all. We handle all
        DLT compliance internally using our pre-registered routes and templates. You sign up, get an API
        key, and start sending OTPs immediately. Learn more about our{' '}
        <Link href="/dlt-free-otp">DLT-free OTP approach</Link>.
      </p>
      <p>
        For startups and developers who want to ship fast, the DLT registration process can be a
        significant blocker. Even with MSG91&apos;s guidance, you still need to gather business
        documents, submit applications, and wait for approval before sending your first OTP.
      </p>

      <h2 id="api-simplicity">API Simplicity and Integration</h2>
      <p>
        MSG91 has evolved over the years and now offers multiple products: SendOTP, Campaign, Flow,
        Segmento, and more. While this breadth is valuable for enterprises, it means the API and
        dashboard can feel complex for developers who just want to send OTPs.
      </p>
      <p>
        MSG91&apos;s OTP API (SendOTP) requires:
      </p>
      <ol>
        <li>Creating an account and completing DLT registration</li>
        <li>Getting an authkey from the dashboard</li>
        <li>Configuring an OTP template (with DLT-approved template ID)</li>
        <li>Setting up sender ID, OTP length, and expiry</li>
        <li>Calling the send and verify endpoints</li>
      </ol>
      <p>
        StartMessaging&apos;s API requires:
      </p>
      <ol>
        <li>Signing up and generating an API key</li>
        <li>Calling <code>POST /otp/send</code> with a phone number</li>
        <li>Calling <code>POST /otp/verify</code> with the request ID and OTP code</li>
      </ol>
      <p>
        There is no template configuration, no sender ID setup, and no DLT linking. The API is designed
        to be as minimal as possible while still being production-ready.
      </p>

      <h2 id="code-comparison">Code Comparison</h2>

      <h3>StartMessaging: Send OTP</h3>
      <pre><code>{`const response = await fetch('https://api.startmessaging.com/otp/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sm_live_your_api_key',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
  }),
});

const { data } = await response.json();
// data.requestId -> use for verification`}</code></pre>

      <h3>MSG91: Send OTP</h3>
      <pre><code>{`const response = await fetch(
  'https://control.msg91.com/api/v5/otp?' +
  new URLSearchParams({
    template_id: 'YOUR_DLT_TEMPLATE_ID',
    mobile: '919876543210',
    authkey: 'YOUR_AUTH_KEY',
    otp_length: '6',
    otp_expiry: '10',
  }),
  { method: 'POST' }
);

const data = await response.json();`}</code></pre>

      <h3>StartMessaging: Verify OTP</h3>
      <pre><code>{`const response = await fetch('https://api.startmessaging.com/otp/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sm_live_your_api_key',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    requestId: 'req_abc123',
    otp: '482916',
  }),
});

const { data } = await response.json();
console.log(data.verified); // true`}</code></pre>

      <h3>MSG91: Verify OTP</h3>
      <pre><code>{`const response = await fetch(
  'https://control.msg91.com/api/v5/otp/verify?' +
  new URLSearchParams({
    mobile: '919876543210',
    otp: '482916',
    authkey: 'YOUR_AUTH_KEY',
  }),
  { method: 'POST' }
);

const data = await response.json();`}</code></pre>

      <p>
        Both APIs are functional, but StartMessaging uses a cleaner JSON body approach with standard
        Authorization headers rather than query parameters for authentication. StartMessaging also
        returns a <code>requestId</code> for tracking, which simplifies verification flows.
      </p>

      <h2 id="feature-table">Feature-by-Feature Comparison</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>MSG91</th>
              <th>StartMessaging</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OTP send + verify</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>DLT registration required</td>
              <td>Yes</td>
              <td><strong>No</strong></td>
            </tr>
            <tr>
              <td>Flat pricing</td>
              <td>No (tiered)</td>
              <td><strong>Yes (Rs 0.25)</strong></td>
            </tr>
            <tr>
              <td>INR billing</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Prepaid wallet</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Minimum commitment</td>
              <td>Varies by plan</td>
              <td><strong>None</strong></td>
            </tr>
            <tr>
              <td>Setup time</td>
              <td>15-30 min + DLT</td>
              <td><strong>&lt;5 minutes</strong></td>
            </tr>
            <tr>
              <td>Multi-channel (email, voice, WhatsApp)</td>
              <td><strong>Yes</strong></td>
              <td>No (SMS OTP only)</td>
            </tr>
            <tr>
              <td>Visual flow builder</td>
              <td><strong>Yes</strong></td>
              <td>No</td>
            </tr>
            <tr>
              <td>Campaign management</td>
              <td><strong>Yes</strong></td>
              <td>No</td>
            </tr>
            <tr>
              <td>Idempotent OTP sends</td>
              <td>Limited</td>
              <td><strong>Yes (idempotencyKey)</strong></td>
            </tr>
            <tr>
              <td>Automatic provider fallback</td>
              <td>Varies</td>
              <td><strong>Yes</strong></td>
            </tr>
            <tr>
              <td>Message logs and tracking</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Dashboard</td>
              <td>Yes (feature-rich)</td>
              <td>Yes (focused)</td>
            </tr>
            <tr>
              <td>Bulk SMS</td>
              <td><strong>Yes</strong></td>
              <td>No (OTP only)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="delivery-rates">Delivery Rates</h2>
      <p>
        Both MSG91 and StartMessaging achieve strong delivery rates across Indian carriers. MSG91 has
        years of experience and strong relationships with Indian telcos, achieving 96-98% delivery
        rates.
      </p>
      <p>
        StartMessaging achieves 97-99% delivery rates by using a multi-provider fallback system. If the
        primary SMS provider fails to deliver, the system automatically retries through a secondary
        provider. This approach provides a slight edge in overall reliability.
      </p>
      <p>
        For detailed carrier-specific information, see our guide on{' '}
        <Link href="/blog/otp-delivery-rates-india">OTP delivery rates in India</Link>.
      </p>

      <h2 id="documentation-and-support">Documentation and Support</h2>
      <p>
        <strong>MSG91</strong> has comprehensive documentation covering its full product suite, including
        Postman collections, SDKs for multiple languages, and integration guides. However, the breadth
        of products can make it harder to find exactly what you need for a simple OTP integration.
        Support is available via email, chat, and phone.
      </p>
      <p>
        <strong>StartMessaging</strong> documentation is focused entirely on OTP. The{' '}
        <Link href="/otp-api">API reference</Link> covers two endpoints with clear request and response
        examples. Because the product scope is narrow, the docs are straightforward and easy to navigate.
        Support is available via email and the dashboard.
      </p>

      <h2 id="which-should-you-choose">Which Should You Choose?</h2>

      <h3>Choose StartMessaging if:</h3>
      <ul>
        <li>You are a startup or developer who wants to ship OTP verification fast</li>
        <li>You do not want to deal with DLT registration</li>
        <li>You send fewer than 200,000 OTPs per month and want the simplest pricing</li>
        <li>You value API simplicity and want to minimize integration effort</li>
        <li>You only need SMS OTP for India (no bulk SMS, campaigns, or multi-channel)</li>
      </ul>

      <h3>Choose MSG91 if:</h3>
      <ul>
        <li>You need multi-channel messaging (email, voice, WhatsApp, RCS) in one platform</li>
        <li>You send 500,000+ OTPs per month and need volume discounts</li>
        <li>You want a visual flow builder to create complex messaging workflows</li>
        <li>You need bulk SMS and campaign management alongside OTP</li>
        <li>You have already completed DLT registration</li>
      </ul>

      <p>
        For a broader comparison including Twilio, Exotel, and Kaleyra, read our{' '}
        <Link href="/blog/best-otp-api-india">best OTP API for India in 2026</Link> guide. Ready to get
        started? Visit our <Link href="/pricing">pricing page</Link> or sign up at{' '}
        <a href="https://app.startmessaging.com" target="_blank" rel="noopener noreferrer">
          app.startmessaging.com
        </a>.
      </p>
    </>
  ),
  relatedSlugs: ['best-otp-api-india', 'twilio-vs-startmessaging'],
  faq: [
    {
      question: 'Is MSG91 or StartMessaging cheaper for OTPs?',
      answer:
        'For volumes up to about 200,000 OTPs per month, StartMessaging is cheaper at a flat Rs 0.25 per OTP. MSG91 uses tiered pricing that can be cheaper at very high volumes (500,000+) with negotiated enterprise rates. For most startups and mid-size apps, StartMessaging offers better value.',
    },
    {
      question: 'Does MSG91 require DLT registration?',
      answer:
        'Yes. MSG91 requires you to complete DLT registration with an Indian telecom operator before you can send OTPs. You need to register your entity, sender IDs, and message templates. StartMessaging handles DLT compliance on your behalf, so no registration is needed.',
    },
    {
      question: 'Can I use MSG91 just for OTPs or do I need the full platform?',
      answer:
        'MSG91 offers a dedicated OTP product called SendOTP that can be used independently. However, you still need to navigate the broader MSG91 dashboard and ecosystem. StartMessaging is focused entirely on OTP, making the experience simpler if that is your only use case.',
    },
    {
      question: 'Which has better delivery rates: MSG91 or StartMessaging?',
      answer:
        'Both achieve strong delivery rates in India. MSG91 reports 96-98% delivery rates. StartMessaging achieves 97-99% using a multi-provider fallback system that automatically retries failed deliveries through an alternate provider.',
    },
  ],
};
