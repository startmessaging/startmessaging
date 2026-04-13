import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'trai-message-scrubbing-india',
  title: 'TRAI Message Scrubbing in India: PE, Header, Template Failures',
  description:
    'How TRAI message scrubbing works in India: the PE, header, and template checks every SMS goes through, common failure codes, and how to debug delivery loss.',
  category: 'compliance',
  keywords: [
    'trai message scrubbing',
    'sms scrubbing india',
    'dlt scrubbing failure',
    'sms scrubbed india',
    'pe scrubbed sms',
    'header scrubbed sms',
    'template scrubbed sms',
    'sms delivery failed dlt',
    'why sms not delivered india',
    'trai sms compliance',
  ],
  publishedAt: '2026-05-06',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Compliance' },
  tableOfContents: [
    { id: 'what-is-scrubbing', title: 'What is Scrubbing' },
    { id: 'three-checks', title: 'The Three Scrubbing Checks' },
    { id: 'failure-codes', title: 'Common Failure Codes' },
    { id: 'debugging', title: 'Debugging Lost Messages' },
    { id: 'dlt-free-route', title: 'How a DLT-Free Route Avoids This' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['what-is-dlt-registration-india', 'dlt-template-variables-rules-india', 'otp-delivery-rates-india'],
  faq: [
    {
      question: 'Who runs the scrubbing engines?',
      answer:
        'Each Indian operator (Jio, Airtel, Vi, BSNL) runs its own scrubbing engine on the DLT platform. A message is scrubbed by the engine of the recipient\'s home operator, not the sender\'s.',
    },
    {
      question: 'Can I appeal a scrubbing failure?',
      answer:
        'Indirectly. You can\'t override a scrub at runtime, but you can update your template, header, or PE registration to fix the underlying mismatch and try the message again. Most scrubbing issues are caused by outdated template content rather than infrastructure bugs.',
    },
    {
      question: 'Does scrubbing happen on transactional or promotional too?',
      answer:
        'Both. Every SMS to an Indian mobile number passes through scrubbing, regardless of category. The rules differ — transactional has fewer content restrictions but stricter sender ID checks.',
    },
  ],
  content: (
    <>
      <p>
        Scrubbing is the silent reason your &ldquo;sent&rdquo; SMS never
        reaches the user. Every SMS to an Indian mobile number passes
        through TRAI&rsquo;s scrubbing engine, which validates three things
        before letting the message reach the carrier. If any check fails,
        the carrier marks it &ldquo;scrubbed&rdquo; and the user never sees
        it &mdash; but your provider&rsquo;s logs may say
        &ldquo;sent.&rdquo;
      </p>

      <h2 id="what-is-scrubbing">What is Scrubbing</h2>
      <p>
        Scrubbing is the runtime enforcement layer of the DLT framework.
        Where{' '}
        <Link href="/blog/what-is-dlt-registration-india">
          DLT registration
        </Link>{' '}
        is one-time paperwork, scrubbing happens on every single message and
        decides whether it actually goes out.
      </p>

      <h2 id="three-checks">The Three Scrubbing Checks</h2>
      <ol>
        <li>
          <strong>Principal Entity (PE) check.</strong> Is the sender PE
          registered and active on this operator? Is the entity ID present
          in the request?
        </li>
        <li>
          <strong>Header (sender ID) check.</strong> Is the alphanumeric
          header registered to this PE? Is it a valid category for this
          message (transactional vs promotional)?
        </li>
        <li>
          <strong>Template check.</strong> Does the message body match an
          approved template byte-for-byte (after variable substitution)?
          Are the variables within their declared length limits?
        </li>
      </ol>

      <h2 id="failure-codes">Common Failure Codes</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Code (varies by operator)</th>
              <th>Meaning</th>
              <th>Fix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PE_MISMATCH</td>
              <td>PE not registered for this header</td>
              <td>Re-link the header to the PE in the operator portal</td>
            </tr>
            <tr>
              <td>HEADER_INACTIVE</td>
              <td>Header expired or suspended</td>
              <td>Re-activate or re-register the header</td>
            </tr>
            <tr>
              <td>TEMPLATE_MISMATCH</td>
              <td>Body doesn&rsquo;t match approved template</td>
              <td>Submit a new template with the exact wording</td>
            </tr>
            <tr>
              <td>VAR_LENGTH</td>
              <td>One variable exceeded its declared max length</td>
              <td>Truncate at the application layer or update the template</td>
            </tr>
            <tr>
              <td>CATEGORY_MISMATCH</td>
              <td>Promo content sent on transactional header</td>
              <td>Move to a promotional header or rewrite the content</td>
            </tr>
            <tr>
              <td>NDNC_BLOCKED</td>
              <td>Recipient is on the do-not-disturb registry</td>
              <td>Honor the NDNC list; don&rsquo;t resend</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="debugging">Debugging Lost Messages</h2>
      <p>
        If your delivery rate suddenly drops, walk through this checklist:
      </p>
      <ol>
        <li>
          Pull the operator-specific delivery report from your provider
          (DLR webhook payload).
        </li>
        <li>Look for a non-200 carrier error or a scrub code.</li>
        <li>Compare the delivered SMS body against the approved template.</li>
        <li>
          Check whether your template was edited or expired in the operator
          portal recently.
        </li>
        <li>Test with a number on a different operator to isolate the issue.</li>
      </ol>
      <p>
        See our{' '}
        <Link href="/blog/otp-delivery-rates-india">
          OTP delivery rates article
        </Link>{' '}
        for the broader troubleshooting flow.
      </p>

      <h2 id="dlt-free-route">How a DLT-Free Route Avoids This</h2>
      <p>
        StartMessaging&rsquo;s standard route runs through pre-approved
        templates and headers we maintain on every operator. You don&rsquo;t
        get scrubbed because there&rsquo;s nothing in your message body that
        differs from the registered template. See{' '}
        <Link href="/dlt-free-otp">DLT-free OTP</Link> for the architectural
        details.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Read our{' '}
        <Link href="/blog/dlt-template-variables-rules-india">
          DLT template variable rules
        </Link>{' '}
        to keep your templates scrub-clean.
      </p>
    </>
  ),
};
