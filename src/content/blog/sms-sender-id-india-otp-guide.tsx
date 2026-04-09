import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'sms-sender-id-india-otp-guide',
  title: 'SMS Sender ID in India: What Developers Need for OTP Traffic',
  description:
    'Understand Header, PE, and promotional sender types, TRAI rules, and how DLT registration affects OTP delivery. Practical guidance for Indian apps and SaaS teams.',
  category: 'compliance',
  keywords: [
    'SMS sender ID India',
    'OTP sender ID',
    'DLT sender ID',
    'TRAI SMS sender',
    'transactional SMS header',
    'PE ID SMS',
    'promotional vs transactional SMS',
    'OTP SMS compliance India',
    'DLT registration India TRAI',
    'Principal Entity registration SMS',
    'SMS DLT portal Airtel Jio Vi',
    'DLT template registration India',
    'SMS header registration DLT',
    'service implicit OTP template',
    'telemarketer DLT SMS chain',
    'bulk SMS sender ID approval',
  ],
  publishedAt: '2026-04-09',
  readingTime: 11,
  author: { name: 'StartMessaging Team', role: 'Compliance' },
  tableOfContents: [
    { id: 'what-is-sender-id', title: 'What Is an SMS Sender ID?' },
    { id: 'types-of-headers', title: 'Types of Headers in India' },
    { id: 'dlt-and-templates', title: 'DLT and Template Binding' },
    { id: 'otp-specific-rules', title: 'Rules That Matter for OTP' },
    { id: 'developer-checklist', title: 'Developer Checklist' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-dlt-registration-india',
    'transactional-vs-promotional-sms-india',
    'trai-sms-regulations-2026',
  ],
  faq: [
    {
      question: 'Can I use any text as my OTP sender name?',
      answer:
        'No. Sender IDs (headers) must be registered on operator DLT portals and approved for the category of traffic you send. Transactional and service OTP traffic generally uses a six-character alphabetic header tied to your entity. The exact format and availability depend on your registration and operator rules.',
    },
    {
      question: 'Why does my OTP sometimes show a numeric short code instead of my brand?',
      answer:
        'Operators may route certain traffic through approved short codes or long codes depending on template type, failover, and routing. If branding is inconsistent, verify your template is approved as transactional or service-implicit as applicable, and that your provider maps your header correctly for OTP flows.',
    },
    {
      question: 'Does using StartMessaging remove sender ID work for me?',
      answer:
        'StartMessaging operates as a DLT-registered provider and routes OTPs using compliant templates and infrastructure so you do not need your own DLT registration to send OTPs through our API. Your users still see traffic that complies with Indian rules; you integrate against our API instead of managing DLT yourself.',
    },
  ],
  content: (
    <>
      <p>
        If you send OTP SMS in India, you have probably seen terms like Header,
        PE ID, DLT template, and transactional route. Getting sender identity
        wrong does not just hurt branding; it can block delivery or trigger
        compliance issues. This guide explains how SMS sender IDs work for OTP
        traffic in India and what your engineering team should verify with any
        SMS or OTP provider.
      </p>
      <p>
        Nothing here is legal advice. Always confirm current TRAI and operator
        rules with your counsel or compliance team, especially when you change
        use cases or message content.
      </p>

      <h2 id="what-is-sender-id">What Is an SMS Sender ID?</h2>
      <p>
        An SMS sender ID is the label a subscriber sees as the origin of a text.
        On many Indian handsets, a six-letter header (for example, a short brand
        mnemonic) appears for approved transactional traffic. Marketing
        messages may use a different class of identifiers or numeric codes
        depending on registration and routing.
      </p>
      <p>
        For OTP and account-security messages, operators expect traffic to be
        classified correctly, registered on Distributed Ledger Technology (DLT)
        platforms, and sent only through approved templates that match the
        content you actually deliver.
      </p>

      <h2 id="types-of-headers">Types of Headers in India</h2>
      <p>
        Businesses typically distinguish between traffic classes such as
        transactional, service-implicit, and promotional. OTP and
        authentication codes usually fall under transactional or
        service-oriented categories, not promotional marketing.
      </p>
      <ul>
        <li>
          <strong>Transactional / service:</strong> Includes OTPs, order
          updates, and similar non-promotional alerts. Subject to DLT template
          registration and header rules.
        </li>
        <li>
          <strong>Promotional:</strong> Marketing and sales messages. Different
          consent and timing rules apply; OTP traffic should not be mixed into
          promotional routes.
        </li>
      </ul>
      <p>
        Your Principal Entity (PE) registration ties your organization to
        specific headers and templates on DLT. If you manage DLT yourself, you
        must keep entity details, documents, and template text aligned with what
        you send in production.
      </p>

      <h2 id="dlt-and-templates">DLT and Template Binding</h2>
      <p>
        Under TRAI&apos;s framework, SMS content is registered as templates with
        variables. OTP messages typically include a variable placeholder for
        the code and sometimes for an app or product name. Sending text that
        does not match an approved template can cause filtering or failure.
      </p>
      <p>
        When you use a provider like{' '}
        <Link href="/dlt-free-otp" className="text-primary hover:underline">
          StartMessaging without your own DLT registration
        </Link>
        , the provider&apos;s approved templates and routing cover compliance for
        standard OTP flows. You still pass the OTP value and metadata your API
        contract requires.
      </p>

      <h2 id="otp-specific-rules">Rules That Matter for OTP</h2>
      <p>
        For OTP delivery specifically, teams should pay attention to:
      </p>
      <ul>
        <li>
          <strong>Template accuracy:</strong> The live SMS body must match the
          registered pattern, including variable positions.
        </li>
        <li>
          <strong>Rate limits and retries:</strong> Flooding users with OTPs
          harms UX and can trigger abuse filters. Implement cooldowns and
          attempt limits (
          <Link
            href="/blog/otp-expiry-attempt-limits"
            className="text-primary hover:underline"
          >
            see our guide on expiry and limits
          </Link>
          ).
        </li>
        <li>
          <strong>International numbers:</strong> Indian DLT rules apply to
          traffic originated for Indian subscribers; cross-border or global
          routing may use different policies.
        </li>
      </ul>

      <h2 id="developer-checklist">Developer Checklist</h2>
      <ol>
        <li>
          Confirm whether you self-manage DLT or use a hosted OTP API that
          includes compliance.
        </li>
        <li>
          Store template IDs and variable maps exactly as your provider
          documents them.
        </li>
        <li>
          Monitor delivery and sender presentation in production on major
          operators, not only in sandbox.
        </li>
        <li>
          Align product and support copy with what your SMS actually says
          (brand name, language, expiry time).
        </li>
        <li>
          Revisit registration when you add new message types beyond OTP.
        </li>
      </ol>
      <p>
        For a deeper comparison of compliance responsibilities, read{' '}
        <Link
          href="/blog/what-is-dlt-registration-india"
          className="text-primary hover:underline"
        >
          what DLT registration means in India
        </Link>{' '}
        and our overview of{' '}
        <Link
          href="/blog/trai-sms-regulations-2026"
          className="text-primary hover:underline"
        >
          TRAI SMS regulations
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Common questions about sender IDs and OTP traffic are answered in the
        structured FAQ on this page for quick scanning.
      </p>
    </>
  ),
};
