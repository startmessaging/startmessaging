import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'dlt-template-approval-guide',
  title: 'DLT Template Approval: Tips to Get Approved',
  description:
    'Learn how to write DLT SMS templates that get approved on the first attempt. Template types, variable syntax, rejection reasons, and operator-specific tips.',
  category: 'compliance',
  keywords: [
    'DLT template approval',
    'DLT template rejected',
    'DLT SMS template',
    'DLT template format',
    'DLT variable syntax',
    'TRAI DLT template',
    'DLT template tips',
    'transactional SMS template',
    'promotional SMS template',
  ],
  publishedAt: '2026-01-21',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'what-are-dlt-templates', title: 'What Are DLT Templates?' },
    { id: 'template-categories', title: 'Template Categories' },
    { id: 'variable-syntax', title: 'Variable Syntax Rules' },
    { id: 'content-policies', title: 'Content Policies' },
    { id: 'common-rejection-reasons', title: 'Common Rejection Reasons' },
    { id: 'operator-specific-tips', title: 'Operator-Specific Tips' },
    { id: 'approval-timelines', title: 'Approval Timelines' },
    { id: 'skip-templates-with-startmessaging', title: 'Skip Templates with StartMessaging' },
    { id: 'faq', title: 'FAQ' },
  ],
  content: (
    <>
      <p>
        DLT template approval is often the most frustrating part of getting SMS delivery working
        in India. You write a message, submit it for approval, wait several days, and then get a
        cryptic rejection with minimal explanation. This guide will help you write templates that
        get approved on the first attempt, understand the rules each operator enforces, and know
        what to do when things go wrong.
      </p>
      <p>
        If you are not familiar with the DLT registration process itself, start with our{' '}
        <Link href="/blog/what-is-dlt-registration-india">
          comprehensive DLT registration guide
        </Link>{' '}
        before diving into templates.
      </p>

      <h2 id="what-are-dlt-templates">What Are DLT Templates?</h2>
      <p>
        A DLT template is the pre-approved format of every commercial SMS you send in India. TRAI
        requires that all commercial messages match a registered template exactly. When a telecom
        operator receives an SMS for delivery, it runs the message through a{' '}
        <strong>scrubbing engine</strong> that compares it against your registered templates. If
        there is no match, the message is blocked.
      </p>
      <p>
        Templates consist of fixed text and variable placeholders. The fixed text must match
        character for character. Variable placeholders represent dynamic content like OTP codes,
        order numbers, or customer names. The operator verifies that only the variable portions
        differ between the template and the actual message.
      </p>
      <p>
        For example, an OTP template looks like this:
      </p>
      <pre>
        <code>Your OTP for {'{#var#}'} is {'{#var#}'}. Valid for {'{#var#}'} minutes. Do not share this code. - {'{#var#}'}</code>
      </pre>
      <p>
        When you send an actual SMS, it would read: &quot;Your OTP for login is 482917. Valid for
        10 minutes. Do not share this code. - AcmeCorp&quot;
      </p>

      <h2 id="template-categories">Template Categories</h2>
      <p>
        DLT templates are classified into categories that determine when and to whom they can be
        sent. Choosing the wrong category is one of the most common reasons for rejection.
      </p>

      <h3>Transactional Templates</h3>
      <p>
        Transactional templates are for messages triggered by a user action or required for
        service delivery. Examples include:
      </p>
      <ul>
        <li>OTP and verification codes</li>
        <li>Order confirmations and shipping updates</li>
        <li>Payment receipts and alerts</li>
        <li>Account activity notifications</li>
        <li>Appointment reminders</li>
      </ul>
      <p>
        Transactional messages can be sent 24/7, including to numbers on the Do Not Disturb
        (DND) registry. They use sender headers with specific operator-assigned prefixes. For a
        deep dive on how transactional SMS differs from promotional, see our guide on{' '}
        <Link href="/blog/transactional-vs-promotional-sms-india">
          transactional vs promotional SMS in India
        </Link>.
      </p>

      <h3>Promotional Templates</h3>
      <p>
        Promotional templates are for marketing messages, offers, discounts, and sales
        communications. These have significant restrictions:
      </p>
      <ul>
        <li>Cannot be sent to DND-registered numbers</li>
        <li>Restricted to 9 AM &ndash; 9 PM delivery window</li>
        <li>Require explicit opt-in consent from the recipient</li>
        <li>Use numeric sender IDs (not alphanumeric headers)</li>
      </ul>

      <h3>Service Implicit Templates</h3>
      <p>
        Service implicit templates cover messages to existing customers based on an ongoing
        relationship. Examples include subscription renewal reminders, loyalty program updates, or
        service change notifications. The customer does not need to explicitly opt in, but there
        must be an existing service relationship.
      </p>

      <h3>Service Explicit Templates</h3>
      <p>
        Service explicit templates are for messages where the customer has given explicit written
        or digital consent to receive communications. This is a middle ground between
        transactional and promotional.
      </p>

      <h2 id="variable-syntax">Variable Syntax Rules</h2>
      <p>
        Getting the variable syntax right is critical. DLT portals use a specific format for
        template variables, and any deviation will result in rejection.
      </p>

      <h3>Standard Variable Format</h3>
      <p>
        The standard variable placeholder is <code>{'{#var#}'}</code>. This represents any
        dynamic content in your message. Every piece of text that changes between messages must
        be wrapped in this placeholder.
      </p>

      <h3>Variable Rules</h3>
      <ul>
        <li>
          <strong>Minimum fixed text</strong> &mdash; at least 30% of your template must be
          fixed text. Templates that are mostly variables get rejected.
        </li>
        <li>
          <strong>No nested variables</strong> &mdash; you cannot place a variable inside another
          variable.
        </li>
        <li>
          <strong>Variable character limits</strong> &mdash; some operators enforce maximum
          character lengths per variable (typically 30 characters).
        </li>
        <li>
          <strong>No consecutive variables</strong> &mdash; placing two <code>{'{#var#}'}</code>{' '}
          placeholders next to each other without fixed text in between may be rejected on some
          portals.
        </li>
        <li>
          <strong>Unicode support</strong> &mdash; if your template uses Hindi or other regional
          languages, ensure the portal supports Unicode templates and select the correct encoding.
        </li>
      </ul>

      <h3>Examples of Correct Variable Usage</h3>
      <pre>
        <code>{`// Correct: OTP template
Your verification code is {#var#}. It expires in {#var#} minutes.

// Correct: Order update
Your order {#var#} has been shipped via {#var#}. Track at {#var#}.

// Incorrect: Too many variables
{#var#} {#var#} {#var#} {#var#} {#var#}

// Incorrect: Wrong syntax
Your OTP is {{otp}}. Valid for {{minutes}} minutes.`}</code>
      </pre>

      <h2 id="content-policies">Content Policies</h2>
      <p>
        DLT portals enforce strict content policies. Templates containing the following are
        typically rejected:
      </p>
      <ul>
        <li>
          <strong>Financial product promotions</strong> &mdash; loan offers, insurance schemes,
          credit card promotions (unless you are a registered financial institution)
        </li>
        <li>
          <strong>Gambling or betting references</strong> &mdash; any content related to
          gambling, lotteries, or betting
        </li>
        <li>
          <strong>Political content</strong> &mdash; messages with political party names or
          election-related content
        </li>
        <li>
          <strong>Alcohol or tobacco</strong> &mdash; promotions for restricted products
        </li>
        <li>
          <strong>Misleading content</strong> &mdash; fake urgency, misleading claims, or
          phishing-like language
        </li>
        <li>
          <strong>URL shorteners</strong> &mdash; many operators block templates with bit.ly or
          other URL shortener links
        </li>
      </ul>
      <p>
        For OTP templates specifically, keep the content straightforward. State the OTP purpose,
        the code placeholder, the expiry time, and a warning not to share the code. Avoid adding
        marketing content or links to OTP messages.
      </p>

      <h2 id="common-rejection-reasons">Common Rejection Reasons</h2>
      <p>
        Based on our experience processing thousands of DLT templates, here are the most frequent
        rejection reasons and how to fix them:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Rejection Reason</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Incorrect variable format</td>
            <td>Use <code>{'{#var#}'}</code> exactly. No spaces inside braces.</td>
          </tr>
          <tr>
            <td>Category mismatch</td>
            <td>OTPs must be transactional, not promotional or service.</td>
          </tr>
          <tr>
            <td>Content too generic</td>
            <td>Add specific context about what the message is for.</td>
          </tr>
          <tr>
            <td>Excessive variables</td>
            <td>Ensure at least 30% fixed text. Reduce dynamic portions.</td>
          </tr>
          <tr>
            <td>Restricted content detected</td>
            <td>Remove financial, gambling, or political references.</td>
          </tr>
          <tr>
            <td>URL shortener used</td>
            <td>Use full domain URLs instead of bit.ly or similar.</td>
          </tr>
          <tr>
            <td>Missing entity brand name</td>
            <td>Include your company/brand name in the template text.</td>
          </tr>
          <tr>
            <td>Template too long</td>
            <td>Keep under 160 characters for single SMS or clearly indicate multi-part.</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2 id="operator-specific-tips">Operator-Specific Tips</h2>

      <h3>Jio (Vilpower)</h3>
      <ul>
        <li>Generally the most lenient with template approvals</li>
        <li>Auto-approval for simple transactional templates is sometimes available</li>
        <li>Variable character limits are enforced at 30 characters by default</li>
        <li>Supports bulk template upload via CSV for large template sets</li>
      </ul>

      <h3>Airtel</h3>
      <ul>
        <li>Stricter on content policy enforcement than Jio</li>
        <li>Requires exact brand name match between entity and template</li>
        <li>Rejection messages tend to be more descriptive, which helps with fixes</li>
        <li>Processing time is slightly longer but more predictable</li>
      </ul>

      <h3>Vodafone Idea</h3>
      <ul>
        <li>Portal interface can be slow during peak hours</li>
        <li>Some developers report inconsistent approval criteria</li>
        <li>Save your work frequently as sessions may time out</li>
        <li>Template edits after approval require fresh submission</li>
      </ul>

      <h3>BSNL</h3>
      <ul>
        <li>Longest approval times, sometimes exceeding 7 business days</li>
        <li>Government-operated portal with limited support</li>
        <li>Best avoided if speed is a priority; register on Jio or Airtel instead</li>
      </ul>

      <h2 id="approval-timelines">Approval Timelines</h2>
      <p>
        Template approval times vary by operator and by how busy the review queue is. Here are
        realistic expectations:
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Operator</th>
            <th>First Submission</th>
            <th>After Rejection (Resubmission)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jio</td>
            <td>1&ndash;2 business days</td>
            <td>1&ndash;2 business days</td>
          </tr>
          <tr>
            <td>Airtel</td>
            <td>2&ndash;3 business days</td>
            <td>2&ndash;3 business days</td>
          </tr>
          <tr>
            <td>Vodafone Idea</td>
            <td>2&ndash;5 business days</td>
            <td>2&ndash;4 business days</td>
          </tr>
          <tr>
            <td>BSNL</td>
            <td>3&ndash;7 business days</td>
            <td>3&ndash;7 business days</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>
        If you need multiple templates (which most production applications do), the total wait
        time compounds. A typical application with five templates, assuming one rejection cycle,
        could easily take two to three weeks.
      </p>

      <h2 id="skip-templates-with-startmessaging">Skip Templates with StartMessaging</h2>
      <p>
        Every minute you spend writing, submitting, and fixing DLT templates is time not spent
        building your product. With <Link href="/features">StartMessaging</Link>, you skip the
        entire template process.
      </p>
      <p>
        Here is how it works: StartMessaging maintains a library of pre-approved OTP templates
        across all DLT portals. When you call our{' '}
        <Link href="/otp-api">OTP API</Link>, we automatically select the right template,
        inject your OTP code, and deliver through our compliant infrastructure. You never write a
        template, never wait for approval, and never deal with rejections.
      </p>
      <p>
        The entire integration takes under five minutes. Send your first OTP with a single API
        call at <strong>Rs 0.25 per message</strong>. No DLT entity registration, no header
        registration, no template registration.{' '}
        <Link href="/dlt-free-otp">Learn more about DLT-free OTP delivery</Link> or{' '}
        <Link href="/send-otp-without-dlt">see how to send OTPs without DLT</Link>.
      </p>
      <p>
        Check our <Link href="/pricing">pricing</Link> for volume discounts and see why
        thousands of Indian developers trust StartMessaging for their OTP needs.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>
    </>
  ),
  relatedSlugs: ['what-is-dlt-registration-india', 'transactional-vs-promotional-sms-india'],
  faq: [
    {
      question: 'How many DLT templates can I register?',
      answer:
        'There is no hard limit on the number of templates you can register on most DLT portals. However, each template goes through individual approval, so registering a large number of templates means a long wait. StartMessaging eliminates this by providing pre-approved templates for all OTP use cases.',
    },
    {
      question: 'Can I edit a DLT template after it is approved?',
      answer:
        'No, approved templates cannot be edited on most DLT portals. If you need to change the wording, you must submit a new template and wait for fresh approval. The old template can be deactivated once the new one is approved.',
    },
    {
      question: 'Why does my OTP template keep getting rejected?',
      answer:
        'The most common reasons are incorrect variable syntax (use {#var#} exactly), category mismatch (OTPs must be transactional), and missing brand name in the template body. Ensure at least 30% of your template is fixed text and avoid URL shorteners.',
    },
    {
      question: 'Do I need separate templates for different OTP use cases?',
      answer:
        'Yes, if you send OTPs for login, registration, and password reset with different message text, each requires a separate approved template. With StartMessaging, this complexity is handled for you automatically.',
    },
  ],
};
