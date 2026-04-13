import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'dlt-template-variables-rules-india',
  title: 'DLT Template Variable Rules in India (with Examples)',
  description:
    'How DLT template variables work in India: allowed character classes, length limits, common rejection reasons, and copy-paste-ready examples that pass the first time.',
  category: 'compliance',
  keywords: [
    'dlt template variables india',
    'dlt template rules',
    'dlt template rejected',
    'dlt template examples',
    'dlt variable length',
    'dlt template approval india',
    'sms template dlt india',
    'dlt template variable count',
    'dlt template alphanumeric',
    'dlt sms template approved',
  ],
  publishedAt: '2026-05-05',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Compliance' },
  tableOfContents: [
    { id: 'why-templates', title: 'Why DLT Templates Exist' },
    { id: 'variable-types', title: 'Variable Types' },
    { id: 'character-rules', title: 'Character and Length Rules' },
    { id: 'examples', title: 'Approved Template Examples' },
    { id: 'rejection-reasons', title: 'Common Rejection Reasons' },
    { id: 'startmessaging-route', title: 'How StartMessaging Skips This' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['what-is-dlt-registration-india', 'dlt-template-approval-guide', 'trai-message-scrubbing-india'],
  faq: [
    {
      question: 'Can I use emojis in a DLT template?',
      answer:
        'No. DLT templates are restricted to standard GSM and Unicode characters. Emojis are typically rejected. If you need emoji support, your message will be classified as Unicode SMS and may incur higher per-segment costs.',
    },
    {
      question: 'How many variables can a DLT template have?',
      answer:
        'There\'s no hard cap, but most operators recommend keeping it under 10 variables. Heavy variable use slows approval and increases the chance the template is flagged for content review.',
    },
    {
      question: 'Do variables count toward the 160-character SMS limit?',
      answer:
        'Yes. The expanded message — variables filled in — must fit within the SMS segment limit (160 chars GSM, 70 chars Unicode). Plan variable lengths so the worst-case expansion doesn\'t bust the segment.',
    },
  ],
  content: (
    <>
      <p>
        DLT (Distributed Ledger Technology) template variables are the part
        of TRAI&rsquo;s SMS framework that trips up the most teams. You
        register a template with placeholders, get it approved by your
        operator, and then your runtime fills the placeholders before
        sending. Get the variable rules wrong and the carrier will scrub
        your message at the gateway.
      </p>

      <h2 id="why-templates">Why DLT Templates Exist</h2>
      <p>
        TRAI introduced DLT templates to stop spam and unsolicited
        commercial communication. Every SMS body must match an
        operator-approved template, and the carrier&rsquo;s scrubbing engine
        checks the body at send time. See our companion guide on{' '}
        <Link href="/blog/trai-message-scrubbing-india">
          how scrubbing works
        </Link>
        .
      </p>

      <h2 id="variable-types">Variable Types</h2>
      <p>
        Operators support a small set of variable types &mdash; the exact
        names differ by operator portal but the categories are:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Allowed characters</th>
              <th>Typical max length</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Alphanumeric</td><td>A-Z, a-z, 0-9</td><td>30</td><td>Order ID</td></tr>
            <tr><td>Numeric</td><td>0-9</td><td>15</td><td>OTP code, amount</td></tr>
            <tr><td>Date</td><td>0-9, /, -</td><td>10</td><td>15-04-2026</td></tr>
            <tr><td>Time</td><td>0-9, :</td><td>8</td><td>14:30:00</td></tr>
            <tr><td>URL</td><td>Whitelisted domain</td><td>50</td><td>app.example.com/x</td></tr>
            <tr><td>Free text</td><td>Restricted, often disallowed</td><td>30</td><td>Customer name</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="character-rules">Character and Length Rules</h2>
      <ul>
        <li>Variable placeholders use the syntax <code>{`{#var#}`}</code> in most operator portals.</li>
        <li>The expanded message must fit one or two SMS segments (160 / 320 chars GSM).</li>
        <li>Numeric variables must not contain alphabets &mdash; even &ldquo;Rs&rdquo; in front of an amount must be in the static text, not the variable.</li>
        <li>Dates and times are validated against simple regex patterns.</li>
        <li>URLs must come from a domain whitelist registered alongside the template.</li>
      </ul>

      <h2 id="examples">Approved Template Examples</h2>
      <pre>
        <code>{`# OTP login template
Your OTP is {#var#}. Valid for 10 minutes. Do not share this with anyone. - YourBrand

# Order confirmation
Hi {#var#}, your order {#var#} of Rs {#var#} is confirmed. Track at {#var#}. - YourBrand

# Appointment reminder
Reminder: your appointment with {#var#} on {#var#} at {#var#}. Reschedule on {#var#}. - YourBrand`}</code>
      </pre>

      <h2 id="rejection-reasons">Common Rejection Reasons</h2>
      <ul>
        <li>Promotional language in a transactional template (&ldquo;Buy now&rdquo;, &ldquo;Discount&rdquo;).</li>
        <li>URL outside the approved whitelist.</li>
        <li>Variable placeholder syntax wrong for the operator portal.</li>
        <li>Header (sender ID) doesn&rsquo;t match the brand in the template body.</li>
        <li>Expanded worst-case message exceeds segment limit.</li>
      </ul>

      <h2 id="startmessaging-route">How StartMessaging Skips This</h2>
      <p>
        StartMessaging&rsquo;s standard route uses our pre-approved DLT
        templates so you never see the variable rules. You just call{' '}
        <code>/otp/send</code> with a phone number and we handle template
        selection. Skip this whole article if you&rsquo;re on{' '}
        <Link href="/dlt-free-otp">our DLT-free route</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        See also our full{' '}
        <Link href="/blog/dlt-template-approval-guide">
          DLT template approval guide
        </Link>
        .
      </p>
    </>
  ),
};
