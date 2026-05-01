import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-ngo-donor-verification-india',
  title: 'OTP for NGO Donor Verification in India',
  description:
    'How NGOs in India use OTP for donor sign-up, recurring-donation e-mandate, 80G receipt issuance and audit-grade record keeping under FCRA and Section 80G rules.',
  category: 'use-cases',
  keywords: [
    'ngo donor otp',
    'donation otp india',
    '80g otp receipt',
    'fcra donor verification',
    'recurring donation otp',
    'monthly giving sms',
  ],
  publishedAt: '2026-04-30',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why NGOs Need OTP' },
    { id: 'flows', title: 'Donor OTP Flows' },
    { id: 'recurring', title: 'Recurring-Donation e-Mandate OTP' },
    { id: 'receipts', title: '80G Receipt Issuance' },
    { id: 'fcra', title: 'FCRA Donors and Audit Trail' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-fintech-india',
    'otp-data-privacy-india',
    'otp-nbfc-loan-apps-india',
  ],
  faq: [
    {
      question: 'Do small donations need OTP?',
      answer:
        'Strictly required only on payment side. Best-practice NGOs send a confirmation SMS for every donation regardless of size — both for donor reassurance and audit trail.',
    },
    {
      question: 'Can the donor opt out of receiving SMS?',
      answer:
        'Transactional confirmations and 80G receipts go regardless of DND. Promotional appeals and event invites require explicit opt-in.',
    },
    {
      question: 'What about anonymous donations?',
      answer:
        'Anonymous donations skip personalised SMS but still benefit from a generic transactional confirmation SMS to prevent payment-disputed fraud.',
    },
  ],
  content: (
    <>
      <p>
        Donor experience is what separates a one-time gift from monthly
        giving. OTP plays a quiet but essential role: confirming the donation
        was real, gating recurring e-mandate consent, and producing the
        receipts donors need at tax time.
      </p>

      <h2 id="context">Why NGOs Need OTP</h2>
      <ul>
        <li>Donor identity confirmation.</li>
        <li>e-Mandate registration for recurring giving.</li>
        <li>80G certificate dispatch.</li>
        <li>Audit trail for FCRA-eligible donors.</li>
      </ul>

      <h2 id="flows">Donor OTP Flows</h2>
      <ol>
        <li>Donor sign-up / email-claim OTP.</li>
        <li>One-time donation confirmation SMS.</li>
        <li>e-Mandate authorization OTP for recurring giving.</li>
        <li>80G PDF receipt link SMS.</li>
        <li>Cancel-recurring OTP.</li>
      </ol>

      <h2 id="recurring">Recurring-Donation e-Mandate OTP</h2>
      <p>
        Recurring giving uses NPCI&rsquo;s e-NACH or eMandate flow. The OTP is
        issued by the donor&rsquo;s bank, not your NGO. Your job is to:
      </p>
      <ul>
        <li>Display amount, frequency and beneficiary clearly.</li>
        <li>Capture the consent screen for audit.</li>
        <li>Send a transactional confirmation SMS afterwards.</li>
      </ul>

      <h2 id="receipts">80G Receipt Issuance</h2>
      <p>
        On donation success, send a transactional SMS with a one-tap link to
        download the 80G receipt PDF. Include the financial year and donation
        ID in the SMS body.
      </p>

      <h2 id="fcra">FCRA Donors and Audit Trail</h2>
      <ul>
        <li>Foreign donors fall under FCRA — separate bank account, separate audit trail.</li>
        <li>OTP/SMS audit logs are admissible in FCRA reviews.</li>
        <li>Retain (donorId, donationId, OTPrequestId, timestamp) for 7+ years.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> works for NGO sign-up,
        confirmation and 80G dispatch SMS — pay-as-you-go means even a small
        NGO can run professional-grade donor comms without monthly minimums.
      </p>
    </>
  ),
};
