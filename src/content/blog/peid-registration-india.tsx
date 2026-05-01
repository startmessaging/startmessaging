import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'peid-registration-india',
  title: 'PE-ID Registration for SMS in India: A Complete Guide',
  description:
    'PE-ID (Principal Entity ID) registration explained: what it is, why it is required for SMS in India, how to register on each operator portal, and how a DLT-free provider absorbs it.',
  category: 'compliance',
  keywords: [
    'pe id registration',
    'principal entity id',
    'pe id india',
    'pe id sms',
    'how to get pe id',
    'pe id approval',
  ],
  publishedAt: '2026-05-04',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'PE-ID Definition' },
    { id: 'why', title: 'Why PE-ID is Required' },
    { id: 'how-to', title: 'How to Register' },
    { id: 'docs', title: 'Documents' },
    { id: 'multi-op', title: 'Multi-Operator Considerations' },
    { id: 'lifecycle', title: 'PE-ID Lifecycle' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'dlt-registration-step-by-step-india',
    'what-is-dlt-registration-india',
    'sms-sender-id-india-otp-guide',
    'dlt-template-approval-guide',
  ],
  faq: [
    {
      question: 'Is the PE-ID portable across operators?',
      answer:
        'The principal entity remains the same business, but each operator portal validates and stores its own copy. Practically, you submit registration to each operator separately.',
    },
    {
      question: 'Can the same business have multiple PE-IDs?',
      answer:
        'Yes — one per legal entity is typical. Subsidiaries register separately. Some operators allow brand-level sub-PE-IDs under one parent.',
    },
  ],
  content: (
    <>
      <p>
        PE-ID — Principal Entity ID — is the identifier under which Indian
        DLT regulation tracks senders of commercial SMS. It is the
        foundation step before sender IDs and templates. This guide explains
        what it is and how to get one.
      </p>

      <h2 id="definition">PE-ID Definition</h2>
      <p>
        A PE-ID identifies the business sending SMS. It is registered on
        operator DLT portals (Jio, Airtel, Vi, BSNL) and is linked to the
        legal entity&rsquo;s PAN, GST and incorporation documents.
      </p>

      <h2 id="why">Why PE-ID is Required</h2>
      <ul>
        <li>TRAI compliance — accountable identification of senders.</li>
        <li>DND enforcement — operators cross-check PE-ID against complaint history.</li>
        <li>Sender ID and template binding.</li>
        <li>Audit trail for regulatory review.</li>
      </ul>

      <h2 id="how-to">How to Register</h2>
      <ol>
        <li>Pick an operator portal as the primary.</li>
        <li>Create an account with business email and authorised contact.</li>
        <li>Upload documents (PAN, GST, incorporation, declaration).</li>
        <li>Pay the registration fee.</li>
        <li>Wait for approval (3–7 working days).</li>
        <li>Repeat on remaining operators.</li>
      </ol>

      <h2 id="docs">Documents</h2>
      <ul>
        <li>PAN.</li>
        <li>GST.</li>
        <li>Incorporation certificate.</li>
        <li>Letter of authorisation.</li>
        <li>Authorised signatory ID.</li>
      </ul>

      <h2 id="multi-op">Multi-Operator Considerations</h2>
      <p>
        Each portal requires its own PE-ID record. Sender IDs and templates
        are bound to the PE-ID per operator. A multi-operator aggregator
        smooths this out; alternatively, a DLT-free provider absorbs it
        entirely.
      </p>

      <h2 id="lifecycle">PE-ID Lifecycle</h2>
      <ul>
        <li>Annual renewal — operator-dependent fee.</li>
        <li>Address / authorised-person changes require update.</li>
        <li>Repeat compliance violations can deactivate a PE-ID.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Skip PE-ID registration entirely with{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> — we route under
        our PE-IDs across all four operators.
      </p>
    </>
  ),
};
