import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-sms-gateway',
  title: 'What is an SMS Gateway? How It Works (Indian Context, 2026)',
  description:
    'SMS gateway explained: how messages travel from your application to the user’s phone, the role of SMPP, aggregators and DLT in India, and how SMS gateways differ from SMS APIs.',
  category: 'business',
  keywords: [
    'what is sms gateway',
    'sms gateway',
    'how sms gateway works',
    'sms gateway india',
    'smpp',
    'sms aggregator',
  ],
  publishedAt: '2026-04-24',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'SMS Gateway — Definition' },
    { id: 'how-it-works', title: 'How an SMS Gateway Routes a Message' },
    { id: 'gateway-vs-api', title: 'SMS Gateway vs SMS API' },
    { id: 'india', title: 'SMS Gateways in India (DLT)' },
    { id: 'choosing', title: 'How to Choose an SMS Gateway' },
    { id: 'cost', title: 'SMS Gateway Costs' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-sms-api',
    'what-is-dlt-registration-india',
    'best-otp-api-india',
    'reduce-sms-otp-cost-india',
    'otp-sms-deliverability-checklist',
  ],
  faq: [
    {
      question: 'Is an SMS gateway the same as an SMS API?',
      answer:
        'They are related but distinct. An SMS gateway is the infrastructure that hands messages off to telecom networks. An SMS API is the developer-facing HTTP interface that talks to one or more gateways. Most modern providers expose an API in front of their gateway.',
    },
    {
      question: 'What is SMPP and do I need to know it?',
      answer:
        'SMPP — Short Message Peer-to-Peer — is the binary protocol traditionally used between SMS gateways and telecom operators. Application developers never touch it directly. The gateway speaks SMPP upstream and HTTP/REST downstream to your code.',
    },
    {
      question: 'Do I need DLT to use an SMS gateway in India?',
      answer:
        'You either need DLT registration of your own — which takes 1–4 weeks plus ongoing template approvals — or you use a provider that has done it for you, such as a DLT-free OTP API.',
    },
  ],
  content: (
    <>
      <p>
        An SMS gateway is the piece of plumbing that lets your application send
        a text message to any mobile number on earth without you running cell
        towers. It is invisible to most developers because they only ever
        interact with the friendly REST or SDK layer that sits in front of it,
        but understanding what is happening behind that layer makes it much
        easier to debug delivery problems, choose a vendor, and reason about
        cost.
      </p>
      <p>
        This guide covers <strong>what an SMS gateway is</strong>, how a
        message travels from your code to the recipient&rsquo;s phone, the
        India-specific DLT layer that all gateways must navigate, and how an
        SMS gateway differs from an SMS API.
      </p>

      <h2 id="definition">SMS Gateway — Definition</h2>
      <p>
        An <strong>SMS gateway</strong> is software (or hosted service) that
        receives messages from applications and forwards them to mobile network
        operators (MNOs) for delivery. It performs three core jobs:
      </p>
      <ul>
        <li>
          <strong>Translation.</strong> Convert from the application
          protocol — usually HTTP/REST — to the telecom protocol — usually
          SMPP.
        </li>
        <li>
          <strong>Routing.</strong> Pick the right upstream operator or
          aggregator for the recipient&rsquo;s number.
        </li>
        <li>
          <strong>Reporting.</strong> Track delivery status (DLR) and surface it
          back to the application.
        </li>
      </ul>

      <h2 id="how-it-works">How an SMS Gateway Routes a Message</h2>
      <ol>
        <li>
          Your application makes an HTTP call to the gateway&rsquo;s API, e.g.{' '}
          <code>POST /sms</code> with phone number and body.
        </li>
        <li>
          The gateway authenticates the request, validates the recipient
          format, and checks DLT compliance (in India: matching template,
          approved sender ID).
        </li>
        <li>
          The gateway selects an upstream route — typically a telecom
          aggregator with bilateral agreements with Jio, Airtel, Vi, BSNL — and
          encodes the message into an SMPP <code>submit_sm</code> PDU.
        </li>
        <li>
          The aggregator forwards to the destination MNO&rsquo;s SMSC (Short
          Message Service Center).
        </li>
        <li>
          The SMSC delivers to the recipient&rsquo;s handset via the radio
          network.
        </li>
        <li>
          The MNO sends a delivery receipt (DLR) back up the chain to the
          gateway, which exposes it to your application via webhook or a
          status-polling endpoint.
        </li>
      </ol>

      <h2 id="gateway-vs-api">SMS Gateway vs SMS API</h2>
      <p>
        Confusingly, the two terms are sometimes used interchangeably. The
        precise distinction:
      </p>
      <ul>
        <li>
          <strong>SMS gateway</strong> — the infrastructure layer that handles
          SMPP, telecom routing, and DLR processing.
        </li>
        <li>
          <strong>SMS API</strong> — the developer-facing HTTP layer in front
          of one or more gateways.
        </li>
      </ul>
      <p>
        From an integration standpoint, you almost always want an{' '}
        <Link href="/blog/what-is-sms-api">SMS API</Link>, not raw SMPP.
        Multi-provider gateways like{' '}
        <Link href="/otp-api">StartMessaging</Link> add value on top of the
        underlying gateway by handling failover, idempotency, OTP-specific
        helpers, and DLT compliance.
      </p>

      <h2 id="india">SMS Gateways in India (DLT)</h2>
      <p>
        India layers an additional approval system on top of the standard SMS
        infrastructure: the{' '}
        <Link href="/blog/what-is-dlt-registration-india">
          DLT (Distributed Ledger Technology) platform
        </Link>
        . Before any commercial SMS leaves an Indian gateway, the operator
        validates:
      </p>
      <ul>
        <li>
          The sending business is registered as a Principal Entity (PE-ID).
        </li>
        <li>
          The exact text matches a pre-approved template tied to that PE-ID.
        </li>
        <li>
          The 6-character sender ID (header) is registered for that template
          category.
        </li>
        <li>
          The recipient is not on the National DND register for that category
          of message.
        </li>
      </ul>
      <p>
        Mismatches result in scrubbing — the message is silently dropped before
        delivery. See our breakdown of{' '}
        <Link href="/blog/trai-message-scrubbing-india">
          TRAI message scrubbing
        </Link>{' '}
        for the most common reasons messages disappear.
      </p>

      <h2 id="choosing">How to Choose an SMS Gateway</h2>
      <p>The factors that actually matter for OTP / transactional volume:</p>
      <ul>
        <li>
          <strong>Latency to handset.</strong> Look for P50 &lt; 5s and P95
          &lt; 15s on Indian networks. Anything slower kills login conversion.
        </li>
        <li>
          <strong>Multi-provider failover.</strong> A single bad route can take
          down your sign-ups for hours. The gateway should detect failure and
          re-route within seconds.
        </li>
        <li>
          <strong>DLT handling.</strong> Either built-in (preferred) or
          well-documented self-service.
        </li>
        <li>
          <strong>OTP-specific features.</strong> Idempotency, hashed storage,
          attempt-limit enforcement, automatic resends.
        </li>
        <li>
          <strong>Pricing model.</strong> Pay-as-you-go without monthly
          minimums beats committed contracts for variable workloads.
        </li>
        <li>
          <strong>Webhooks for DLR.</strong> Real-time delivery status without
          polling.
        </li>
      </ul>
      <p>
        Detailed comparison in{' '}
        <Link href="/blog/best-otp-api-india">
          our guide to the best OTP APIs in India
        </Link>
        .
      </p>

      <h2 id="cost">SMS Gateway Costs</h2>
      <p>India price ranges, roughly:</p>
      <ul>
        <li>
          <strong>Promotional SMS:</strong> Rs 0.10–0.15 per message.
        </li>
        <li>
          <strong>Transactional SMS:</strong> Rs 0.15–0.25 per message.
        </li>
        <li>
          <strong>OTP SMS:</strong> Rs 0.15–0.30 per message, depending on
          provider and volume.
        </li>
        <li>
          <strong>International SMS:</strong> highly variable, USD 0.02–0.10
          per message depending on destination.
        </li>
      </ul>
      <p>
        On top of the per-message charge, expect DLT subscription fees (Rs 5,000
        one-time + Rs 1,000–2,000/year per PE-ID) unless you use a provider
        like{' '}
        <Link href="/dlt-free-otp">StartMessaging that absorbs the DLT layer</Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Want to skip the SMPP plumbing and DLT paperwork entirely?{' '}
        <Link href="/otp-api">StartMessaging&rsquo;s API</Link> sits on top of
        a multi-provider Indian SMS gateway and exposes a clean two-call OTP
        interface. <Link href="/pricing">Rs 0.25 per OTP, no monthly fees</Link>.
      </p>
    </>
  ),
};
