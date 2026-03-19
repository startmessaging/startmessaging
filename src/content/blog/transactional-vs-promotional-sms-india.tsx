import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'transactional-vs-promotional-sms-india',
  title: 'Transactional vs Promotional SMS in India',
  description:
    'Key differences between transactional and promotional SMS in India. Header types, timing restrictions, DLT templates, DND rules, consent, routing, and costs explained.',
  category: 'compliance',
  keywords: [
    'transactional vs promotional SMS',
    'transactional SMS India',
    'promotional SMS India',
    'SMS header types India',
    'DND SMS India',
    'SMS timing restrictions India',
    'transactional SMS DLT',
    'promotional SMS rules',
    'OTP SMS category India',
  ],
  publishedAt: '2026-02-11',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-categories-matter', title: 'Why Categories Matter' },
    { id: 'header-types', title: 'Header Types (AX vs BX)' },
    { id: 'timing-restrictions', title: 'Timing Restrictions' },
    { id: 'dlt-template-categories', title: 'DLT Template Categories' },
    { id: 'consent-requirements', title: 'Consent Requirements' },
    { id: 'dnd-implications', title: 'DND Implications' },
    { id: 'routing-and-delivery', title: 'Routing and Delivery' },
    { id: 'cost-differences', title: 'Cost Differences' },
    { id: 'choosing-the-right-category', title: 'Choosing the Right Category' },
    { id: 'startmessaging-handles-it', title: 'StartMessaging Handles It' },
    { id: 'faq', title: 'FAQ' },
  ],
  content: (
    <>
      <p>
        Every commercial SMS sent in India falls into one of two broad categories: transactional
        or promotional. Getting this classification wrong can mean your messages are blocked,
        delivered at the wrong time, or flagged as non-compliant. For developers building
        OTP-based verification, understanding this distinction is critical.
      </p>
      <p>
        This guide breaks down the key differences between transactional and promotional SMS in
        India, covering sender headers, delivery timing, DLT templates, DND rules, routing
        paths, and costs.
      </p>

      <h2 id="why-categories-matter">Why Categories Matter</h2>
      <p>
        India&apos;s telecom infrastructure treats transactional and promotional messages
        fundamentally differently. They travel through different routing paths, are subject to
        different regulations, and have different delivery guarantees. If you register an OTP
        template as promotional instead of transactional, your OTPs will not be delivered to
        DND-registered numbers and will be blocked outside the 9 AM &ndash; 9 PM window. For a
        login flow, that is a critical failure.
      </p>
      <p>
        TRAI mandates this categorization through the DLT framework. Every registered header and
        template is tagged with a category, and telecom operators enforce category-specific rules
        at the network level. For a full explanation of the DLT system, see our{' '}
        <Link href="/blog/what-is-dlt-registration-india">DLT registration guide</Link>.
      </p>

      <h2 id="header-types">Header Types (AX vs BX)</h2>
      <p>
        The most visible difference between transactional and promotional SMS is the sender
        header &mdash; the alphanumeric name that appears as the sender on the recipient&apos;s
        phone.
      </p>

      <h3>Transactional Headers</h3>
      <p>
        Transactional headers are six-character alphanumeric sender IDs. On DLT portals, they
        are registered under specific prefixes that vary by operator but are generally understood
        as &quot;AX&quot; type headers (where the exact prefix code is assigned by the
        operator). These headers look professional and identifiable, for example:{' '}
        <code>ACMECO</code>, <code>STRMSG</code>, <code>HDFC</code>.
      </p>
      <p>Characteristics:</p>
      <ul>
        <li>Six alphanumeric characters</li>
        <li>Custom to your brand name</li>
        <li>Used for OTPs, alerts, confirmations, and service messages</li>
        <li>Registered on DLT portal with transactional category</li>
      </ul>

      <h3>Promotional Headers</h3>
      <p>
        Promotional messages use numeric sender IDs, typically random-looking numbers. These are
        sometimes referred to as &quot;BX&quot; type headers. The recipient sees a number like{' '}
        <code>VM-884521</code> or a similar format rather than a recognizable brand name.
      </p>
      <p>Characteristics:</p>
      <ul>
        <li>Numeric sender ID (not brand-identifiable)</li>
        <li>Used for marketing, offers, promotions</li>
        <li>Registered on DLT portal with promotional category</li>
        <li>Lower trust perception from recipients</li>
      </ul>

      <h3>Comparison Table</h3>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Transactional (AX)</th>
            <th>Promotional (BX)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sender ID</td>
            <td>Alphanumeric (e.g., ACMECO)</td>
            <td>Numeric (e.g., VM-884521)</td>
          </tr>
          <tr>
            <td>Brand visibility</td>
            <td>High</td>
            <td>Low</td>
          </tr>
          <tr>
            <td>Delivery hours</td>
            <td>24/7</td>
            <td>9 AM &ndash; 9 PM IST</td>
          </tr>
          <tr>
            <td>DND delivery</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Use cases</td>
            <td>OTP, alerts, confirmations</td>
            <td>Marketing, offers, sales</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2 id="timing-restrictions">Timing Restrictions</h2>
      <p>
        One of the most impactful differences is the delivery timing window:
      </p>

      <h3>Transactional: No Restrictions</h3>
      <p>
        Transactional messages, including OTPs, can be delivered at any time &mdash; 24 hours a
        day, 7 days a week, including weekends and holidays. This is essential for OTP use cases
        where users may need to verify their identity at 2 AM or on a Sunday.
      </p>

      <h3>Promotional: 9 AM to 9 PM Only</h3>
      <p>
        Promotional SMS can only be delivered between <strong>9:00 AM and 9:00 PM IST</strong>.
        Messages submitted outside this window are queued by telecom operators and delivered when
        the window opens. Some operators discard queued promotional messages after 24 hours.
      </p>
      <p>
        This restriction exists to protect consumers from receiving marketing messages at
        inconvenient hours. It is strictly enforced at the network level, so there is no
        workaround. If your use case requires 24/7 delivery (like OTPs), you must use
        transactional category.
      </p>
      <p>
        For the latest on timing rules and other regulatory changes, see our article on{' '}
        <Link href="/blog/trai-sms-regulations-2026">TRAI SMS regulations in 2026</Link>.
      </p>

      <h2 id="dlt-template-categories">DLT Template Categories</h2>
      <p>
        When you register templates on a DLT portal, you must assign each template to a
        category. The main categories are:
      </p>
      <ul>
        <li>
          <strong>Transactional</strong> &mdash; triggered by user action, essential for service.
          OTPs, order confirmations, payment alerts.
        </li>
        <li>
          <strong>Promotional</strong> &mdash; marketing intent. Offers, discounts, product
          announcements.
        </li>
        <li>
          <strong>Service Implicit</strong> &mdash; service messages to existing customers based
          on an existing relationship. Renewal reminders, account updates.
        </li>
        <li>
          <strong>Service Explicit</strong> &mdash; service messages where the customer has
          given explicit consent. Similar to promotional but with documented consent.
        </li>
      </ul>
      <p>
        Miscategorizing a template is a common mistake. Registering an OTP as &quot;promotional&quot;
        means it will be subject to DND blocking and timing restrictions, effectively breaking
        your login flow for a large percentage of users. For detailed template guidance, read our{' '}
        <Link href="/blog/dlt-template-approval-guide">DLT template approval guide</Link>.
      </p>

      <h2 id="consent-requirements">Consent Requirements</h2>
      <p>
        The consent requirements differ significantly between categories:
      </p>

      <h3>Transactional Messages</h3>
      <ul>
        <li>Implied consent from the service relationship is sufficient</li>
        <li>
          For OTPs, the user&apos;s action of requesting an OTP constitutes consent
        </li>
        <li>No separate opt-in form required</li>
        <li>Can be sent to DND numbers (consent overrides DND preference)</li>
      </ul>

      <h3>Promotional Messages</h3>
      <ul>
        <li>Explicit opt-in consent required from the recipient</li>
        <li>Consent must be documented and auditable</li>
        <li>Cannot be sent to DND-registered numbers</li>
        <li>Must include opt-out instructions in every message</li>
        <li>Consent can be revoked by the recipient at any time</li>
      </ul>
      <p>
        Under the DPDP Act, the consent requirements for promotional messages are even more
        stringent. Read about the intersection of data privacy and OTP in our{' '}
        <Link href="/blog/otp-data-privacy-india">DPDP Act compliance guide</Link>.
      </p>

      <h2 id="dnd-implications">DND Implications</h2>
      <p>
        India&apos;s Do Not Disturb (DND) registry, managed by TRAI, allows consumers to opt out
        of receiving commercial communications. As of recent data, a significant percentage of
        Indian mobile numbers are registered on DND.
      </p>
      <p>
        The DND implications for each category:
      </p>
      <ul>
        <li>
          <strong>Transactional SMS</strong>: delivered to DND numbers. TRAI recognizes that
          transactional messages are essential for service delivery and exempts them from DND
          blocking.
        </li>
        <li>
          <strong>Promotional SMS</strong>: blocked for DND numbers. If a recipient is on the DND
          list, your promotional message will not be delivered. This can result in up to 30&ndash;40%
          of your target audience being unreachable through promotional SMS.
        </li>
        <li>
          <strong>Service Implicit</strong>: delivered to DND numbers for categories the consumer
          has not specifically blocked. Consumers can selectively block categories (banking,
          real estate, health, etc.).
        </li>
        <li>
          <strong>Service Explicit</strong>: delivered to DND numbers if documented consent
          exists.
        </li>
      </ul>
      <p>
        For OTP delivery, this is a non-issue as long as you categorize correctly. OTPs are
        transactional and will always be delivered regardless of DND status.
      </p>

      <h2 id="routing-and-delivery">Routing and Delivery</h2>
      <p>
        Telecom operators route transactional and promotional messages through different
        infrastructure:
      </p>

      <h3>Transactional Routing</h3>
      <ul>
        <li>Priority routing with lower latency</li>
        <li>Higher delivery success rate (typically 95%+ for properly formatted messages)</li>
        <li>Real-time delivery with no queuing (outside of network congestion)</li>
        <li>Direct routing through enterprise SMS gateways</li>
      </ul>

      <h3>Promotional Routing</h3>
      <ul>
        <li>Lower priority routing</li>
        <li>Higher latency, especially during peak hours</li>
        <li>Subject to queuing during off-hours (delivered next morning)</li>
        <li>Lower delivery rates due to DND blocking and timing restrictions</li>
        <li>May be routed through aggregator pools, adding latency</li>
      </ul>
      <p>
        For OTP delivery where speed matters (users are waiting on a login screen), transactional
        routing is essential. A 5&ndash;10 second delivery delay on a promotional route can feel
        like an eternity to a user trying to log in.
      </p>

      <h2 id="cost-differences">Cost Differences</h2>
      <p>
        The cost structure differs between transactional and promotional SMS:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Transactional</th>
            <th>Promotional</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Per-SMS cost</td>
            <td>Higher (Rs 0.15&ndash;0.30 typical)</td>
            <td>Lower (Rs 0.10&ndash;0.20 typical)</td>
          </tr>
          <tr>
            <td>DLT compliance cost</td>
            <td>Entity + header + template registration time</td>
            <td>Entity + header + template registration time</td>
          </tr>
          <tr>
            <td>Effective delivery cost</td>
            <td>Lower (higher success rate)</td>
            <td>Higher (DND blocking wastes budget)</td>
          </tr>
          <tr>
            <td>StartMessaging OTP price</td>
            <td>Rs 0.25 flat (no DLT needed)</td>
            <td>N/A (we handle OTPs only)</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        While the per-message cost for transactional SMS is higher, the effective cost is often
        lower because nearly all messages are delivered. Promotional messages have a lower
        per-unit cost but DND blocking means you pay for messages that never reach recipients.
      </p>

      <h2 id="choosing-the-right-category">Choosing the Right Category</h2>
      <p>
        Here is a quick guide to categorizing your messages correctly:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Message Type</th>
            <th>Correct Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OTP / verification code</td>
            <td>Transactional</td>
          </tr>
          <tr>
            <td>Order confirmation</td>
            <td>Transactional</td>
          </tr>
          <tr>
            <td>Payment receipt</td>
            <td>Transactional</td>
          </tr>
          <tr>
            <td>Delivery update</td>
            <td>Transactional</td>
          </tr>
          <tr>
            <td>Password reset</td>
            <td>Transactional</td>
          </tr>
          <tr>
            <td>Account activity alert</td>
            <td>Transactional</td>
          </tr>
          <tr>
            <td>Discount or offer</td>
            <td>Promotional</td>
          </tr>
          <tr>
            <td>Product announcement</td>
            <td>Promotional</td>
          </tr>
          <tr>
            <td>Sale notification</td>
            <td>Promotional</td>
          </tr>
          <tr>
            <td>Subscription renewal reminder</td>
            <td>Service Implicit</td>
          </tr>
          <tr>
            <td>Loyalty program update</td>
            <td>Service Explicit</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2 id="startmessaging-handles-it">StartMessaging Handles It</h2>
      <p>
        If you are building OTP-based verification, you should not have to think about SMS
        categories, headers, DND lists, or timing windows. That is infrastructure complexity,
        not product development.
      </p>
      <p>
        <Link href="/features">StartMessaging</Link> handles all of this for you:
      </p>
      <ul>
        <li>All OTPs are sent through transactional routes for 24/7 delivery</li>
        <li>DND-registered numbers receive OTPs without issues</li>
        <li>Pre-registered transactional headers and templates via our DLT infrastructure</li>
        <li>Priority routing for fast delivery (typically under 5 seconds)</li>
        <li>No DLT registration, headers, or templates needed from your end</li>
      </ul>
      <p>
        Start sending OTPs at <strong>Rs 0.25 per message</strong> with zero DLT overhead.{' '}
        <Link href="/dlt-free-otp">Learn about our DLT-free OTP delivery</Link>, read the{' '}
        <Link href="/send-otp-without-dlt">no-DLT integration guide</Link>, or check{' '}
        <Link href="/pricing">pricing</Link> for your volume. Explore the full{' '}
        <Link href="/otp-api">API documentation</Link> to integrate in minutes.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>
    </>
  ),
  relatedSlugs: ['what-is-dlt-registration-india', 'dlt-template-approval-guide'],
  faq: [
    {
      question: 'Can OTPs be sent to DND-registered numbers?',
      answer:
        'Yes. OTPs are classified as transactional messages and are exempt from DND blocking. As long as your OTP template is correctly registered as transactional on the DLT portal, it will be delivered to DND numbers. StartMessaging handles this automatically for all OTPs sent through our API.',
    },
    {
      question: 'What happens if I register an OTP template as promotional?',
      answer:
        'If your OTP template is registered as promotional, your OTPs will be blocked for DND-registered numbers (potentially 30-40% of your users) and will not be delivered outside the 9 AM to 9 PM window. This effectively breaks login and verification flows. Always register OTP templates as transactional.',
    },
    {
      question: 'Why are promotional SMS cheaper per message than transactional?',
      answer:
        'Promotional SMS has a lower per-unit cost because it uses lower-priority routing, has timing restrictions, and is blocked for DND numbers. However, the effective cost per delivered message is often higher due to failed deliveries. Transactional SMS costs more per unit but has near-100% deliverability.',
    },
    {
      question: 'Does StartMessaging support promotional SMS?',
      answer:
        'StartMessaging focuses on OTP and transactional messaging. All OTPs sent through our API use transactional routing with pre-approved DLT templates, ensuring 24/7 delivery to all numbers including DND-registered ones at Rs 0.25 per OTP.',
    },
  ],
};
