import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-not-received-india',
  title: 'OTP Not Received? Common Causes and Fixes (India 2026)',
  description:
    'Diagnose why OTPs are not arriving in India. The full checklist: DND state, DLT mismatches, scrubbing, carrier-side filters, sender ID issues, network and device-side problems.',
  category: 'security',
  keywords: [
    'otp not received',
    'otp not coming',
    'otp not received india',
    'sms otp not arriving',
    'fix otp delivery',
    'otp delay india',
    'why otp not delivered',
  ],
  publishedAt: '2026-04-28',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'fast-checks', title: 'First — 60-Second User-Side Checks' },
    { id: 'server-side', title: 'Server-Side Issues' },
    { id: 'dlt-issues', title: 'DLT and Template Mismatches' },
    { id: 'scrubbing', title: 'TRAI Message Scrubbing' },
    { id: 'carrier', title: 'Carrier-Side Failures' },
    { id: 'device', title: 'Device-Side Issues' },
    { id: 'fix-checklist', title: 'A Production Triage Checklist' },
    { id: 'tools', title: 'Tools That Help' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-delivery-rates-india',
    'otp-sms-deliverability-checklist',
    'trai-message-scrubbing-india',
    'dlt-template-approval-guide',
    'what-is-dnd-sms',
  ],
  faq: [
    {
      question: 'Why does the user receive the OTP only after several minutes?',
      answer:
        'In a healthy gateway, OTP P95 should be under 15 seconds. Multi-minute delays usually mean the SMS was queued behind a backed-up route, or the carrier is throttling traffic to your sender ID. Switch providers or wait it out — there is rarely a quick user-side fix.',
    },
    {
      question: 'Are OTPs blocked by DND?',
      answer:
        'No. OTP traffic is registered as service-implicit / transactional under DLT and is exempt from DND. If the user has DND active and is missing OTP, the cause is something else — almost always template mismatch, sender ID mismatch, or device-side spam filtering.',
    },
    {
      question: 'Can I tell whether the OTP was delivered?',
      answer:
        'Yes — every gateway exposes a delivery receipt (DLR) per send, either via webhook or polling endpoint. The DLR will tell you whether the SMSC accepted, whether the carrier accepted, and whether the handset confirmed receipt.',
    },
    {
      question: 'My OTP arrived but the user typed it wrong twice. What now?',
      answer:
        'Most providers default to 3 attempts per request. After exhausting them, the requestId is invalidated and the user must trigger a new OTP. To make this less painful, surface the remaining-attempts count to the user UI.',
    },
  ],
  content: (
    <>
      <p>
        &ldquo;OTP not received&rdquo; is one of the top three support
        complaints for any Indian product that uses phone-number authentication.
        It is also the most ambiguous: the failure could be on the user&rsquo;s
        device, on the carrier network, in DLT scrubbing, on your provider, or
        in your own server code. Being able to triage which one is happening —
        fast — is the difference between a five-minute fix and a four-hour
        outage.
      </p>
      <p>
        This guide is an ordered checklist, starting with the fastest checks
        and progressing to the deeper ones. Use it both in production triage
        and in your support team&rsquo;s response macros.
      </p>

      <h2 id="fast-checks">First — 60-Second User-Side Checks</h2>
      <p>Before debugging your stack, ask the user:</p>
      <ul>
        <li>
          Phone has cellular signal? Aeroplane mode off? Roaming on if travelling?
        </li>
        <li>
          Could the OTP be in the &ldquo;Spam&rdquo; or &ldquo;Promotional&rdquo;
          folder? Some Android skins and iOS auto-categorise commercial SMS.
        </li>
        <li>
          Is the SIM blocked? Out-of-credit prepaid SIMs sometimes refuse
          inbound SMS.
        </li>
        <li>
          Is the SIM new (recently swapped or ported)? There can be a 24-hour
          delay before SMS resumes.
        </li>
        <li>
          Try voice OTP fallback if your provider supports it.
        </li>
      </ul>

      <h2 id="server-side">Server-Side Issues</h2>
      <ul>
        <li>
          <strong>Did your code call <code>/otp/send</code>?</strong> Check
          your application log for a successful 200 response with{' '}
          <code>requestId</code>.
        </li>
        <li>
          <strong>Wallet balance.</strong> 402 from your provider means you ran
          out of credit. Top up.
        </li>
        <li>
          <strong>Rate limited.</strong> 429 means provider throttled you, or
          your own per-phone limiter blocked the send.
        </li>
        <li>
          <strong>Wrong phone format.</strong> 400 means E.164 was malformed.
          Validate <code>+91</code> + 10 digits before calling.
        </li>
      </ul>

      <h2 id="dlt-issues">DLT and Template Mismatches</h2>
      <p>
        On Indian routes, DLT mismatch is the single most common cause of
        invisible failures. Check:
      </p>
      <ul>
        <li>
          The sender ID matches the registered ID for this category.
        </li>
        <li>
          The template ID corresponds to a TRAI-approved template, exact
          variables included.
        </li>
        <li>
          PE-ID is active (not suspended for previous violations).
        </li>
      </ul>
      <p>
        See our{' '}
        <Link href="/blog/dlt-template-approval-guide">
          DLT template approval guide
        </Link>{' '}
        and{' '}
        <Link href="/blog/dlt-template-variables-rules-india">
          template variable rules
        </Link>{' '}
        for the deep dives.
      </p>

      <h2 id="scrubbing">TRAI Message Scrubbing</h2>
      <p>
        Operators run a scrubber that silently drops messages that fail
        compliance checks. Reasons include:
      </p>
      <ul>
        <li>Body deviates from the registered template (extra spaces count).</li>
        <li>Template category is wrong (transactional vs service-implicit).</li>
        <li>Sender ID is suspended or de-registered.</li>
        <li>Body contains banned keywords for the category.</li>
      </ul>
      <p>
        See{' '}
        <Link href="/blog/trai-message-scrubbing-india">
          our complete scrubbing breakdown
        </Link>
        .
      </p>

      <h2 id="carrier">Carrier-Side Failures</h2>
      <ul>
        <li>
          Operator outage. Check carrier status pages and Twitter for similar
          complaints.
        </li>
        <li>
          Single-route degradation. A multi-provider OTP API will retry on
          another route automatically.
        </li>
        <li>
          Throttling on a sender ID flagged for previous abuse.
        </li>
        <li>
          Recipient&rsquo;s number ported recently — there is a 24-hour
          stabilisation window.
        </li>
      </ul>

      <h2 id="device">Device-Side Issues</h2>
      <ul>
        <li>
          Truecaller / Hiya / similar apps marking the SMS as spam.
        </li>
        <li>
          Inbox filtering — Indian Android skins (MIUI, OneUI) heavily
          auto-categorise commercial SMS.
        </li>
        <li>
          Storage full — older Android phones drop new SMS when storage is
          exhausted.
        </li>
        <li>
          Auto-delete by some battery-saver apps that mistake SMS for
          marketing.
        </li>
      </ul>

      <h2 id="fix-checklist">A Production Triage Checklist</h2>
      <ol>
        <li>
          Find the request in your logs by phone or requestId.
        </li>
        <li>Confirm <code>/otp/send</code> returned 200.</li>
        <li>
          Check the DLR webhook or polling endpoint — submitted? delivered?
          failed? scrubbed?
        </li>
        <li>
          If failed: read the failure code. Provider docs map codes to causes.
        </li>
        <li>
          Run the same number through a different sender ID or different
          provider as a control.
        </li>
        <li>
          If a single-number issue: ask the user to clear the SMS spam folder
          and retry, or fall back to voice OTP.
        </li>
        <li>
          If a carrier-wide spike: failover routing should kick in
          automatically with a multi-provider API.
        </li>
      </ol>

      <h2 id="tools">Tools That Help</h2>
      <ul>
        <li>
          A multi-provider OTP API (like{' '}
          <Link href="/dlt-free-otp">StartMessaging</Link>) — automatic
          failover when a route is degraded.
        </li>
        <li>
          A status dashboard with P50 / P95 by carrier, surfaced in your own
          monitoring (Datadog, Grafana, etc.). See{' '}
          <Link href="/blog/otp-monitoring-slos-error-budgets">
            OTP monitoring &amp; SLOs guide
          </Link>
          .
        </li>
        <li>
          Voice OTP fallback for the &lt;5% of cases where SMS fails persistently.
        </li>
        <li>
          A clear &ldquo;resend&rdquo; UX with a 30-second cooldown, not a
          spammable button.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Tired of fighting DLT and per-operator delivery quirks?{' '}
        <Link href="/dlt-free-otp">
          StartMessaging absorbs all of it
        </Link>{' '}
        — multi-provider failover, voice fallback, real-time DLR — at Rs
        0.25 per OTP, no monthly fees.
      </p>
    </>
  ),
};
