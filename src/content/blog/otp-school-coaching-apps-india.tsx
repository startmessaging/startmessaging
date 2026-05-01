import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-school-coaching-apps-india',
  title: 'OTP for School and Coaching Apps in India',
  description:
    'OTP design for K-12 schools and coaching apps in India: parent-OTP for student attendance, fee-payment OTP, exam-day check-in OTP, and DPDP-aware data minimisation.',
  category: 'use-cases',
  keywords: [
    'school app otp',
    'coaching app otp india',
    'parent otp',
    'student attendance otp',
    'fee payment otp school',
    'exam day otp',
  ],
  publishedAt: '2026-04-30',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Education Apps Need Careful OTP Design' },
    { id: 'flows', title: 'OTP Flows in School / Coaching Apps' },
    { id: 'parent-otp', title: 'Parent-OTP for Minor Students' },
    { id: 'fees', title: 'Fee-Payment OTP' },
    { id: 'exam-day', title: 'Exam-Day Check-In' },
    { id: 'dpdp', title: 'DPDP and Minor-User Considerations' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-edtech-student-verification',
    'otp-data-privacy-india',
    'otp-coworking-membership-india',
    'otp-gym-fitness-apps-india',
  ],
  faq: [
    {
      question: 'Should the OTP go to the student or the parent?',
      answer:
        'For users under 18, send to the registered parent number. The student typically uses an in-app PIN, with parent OTP gating sensitive actions like fee payment and exam registration.',
    },
    {
      question: 'How do we handle teacher logins?',
      answer:
        'Teachers get a personal phone-OTP login with role-based permissions. Class lists, attendance and grade-edit are all OTP-step-up actions for the teacher.',
    },
    {
      question: 'Can OTPs be sent to school-allotted email instead of SMS?',
      answer:
        'For non-payment flows, yes. Email magic links work well for many education flows. Fee payment, exam registration and report-card unlock should still go via SMS for non-repudiation.',
    },
  ],
  content: (
    <>
      <p>
        K-12 schools and coaching institutes operate consumer-grade apps with
        institutional data. The OTP layer needs to reach parents (not always
        the student), gate fee payments cleanly, and respect DPDP rules
        around minor users.
      </p>

      <h2 id="context">Why Education Apps Need Careful OTP Design</h2>
      <ul>
        <li>Most users are minors; parents are the legal account-holder.</li>
        <li>Fees flow real money and need RBI-grade auth.</li>
        <li>DPDP Act has special protections for children&rsquo;s data.</li>
        <li>Teachers and admin staff need separate role-based access.</li>
      </ul>

      <h2 id="flows">OTP Flows in School / Coaching Apps</h2>
      <ol>
        <li>Parent sign-up OTP.</li>
        <li>Student PIN linked to parent account.</li>
        <li>Fee-payment OTP — bank-issued.</li>
        <li>Exam-registration OTP.</li>
        <li>Exam-day attendance OTP.</li>
        <li>Report-card view OTP.</li>
        <li>Teacher login OTP.</li>
      </ol>

      <h2 id="parent-otp">Parent-OTP for Minor Students</h2>
      <p>
        DPDP Act requires verifiable parental consent for minors. The OTP
        gives you that audit trail. Pattern:
      </p>
      <ul>
        <li>Parent registers their phone at admission.</li>
        <li>Student gets a PIN linked to the parent account.</li>
        <li>Sensitive actions push fresh OTP to parent.</li>
      </ul>

      <h2 id="fees">Fee-Payment OTP</h2>
      <p>
        Standard payment-gateway OTP applies. Layer:
      </p>
      <ul>
        <li>Application OTP to confirm parent identity.</li>
        <li>Bank-issued OTP for the actual payment.</li>
        <li>Receipt SMS to parent with UTR.</li>
      </ul>

      <h2 id="exam-day">Exam-Day Check-In</h2>
      <p>
        For coaching institutes running test series:
      </p>
      <ol>
        <li>Issue exam-OTP at T-1 hour.</li>
        <li>Centre admin scans student card; system asks for OTP.</li>
        <li>Verified entry mark in attendance log.</li>
      </ol>

      <h2 id="dpdp">DPDP and Minor-User Considerations</h2>
      <ul>
        <li>Minors&rsquo; data must be processed only with verifiable parental consent.</li>
        <li>OTP audit trail is the easiest way to prove this.</li>
        <li>Right to erasure must be honoured for parent-deletion requests.</li>
        <li>
          Read{' '}
          <Link href="/blog/otp-data-privacy-india">our DPDP / OTP guide</Link>.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles parent OTPs,
        teacher OTPs and exam-day OTPs on a single API — DLT-cleared so your
        institute can launch the app fully compliant on day one.
      </p>
    </>
  ),
};
