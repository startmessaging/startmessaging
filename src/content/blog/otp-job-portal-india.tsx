import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-job-portal-india',
  title: 'OTP for Job Portal Apps in India',
  description:
    'OTP design for Indian job portals: candidate phone verification, recruiter contact-unlock, application-confirmation SMS, and resume-fraud defences.',
  category: 'use-cases',
  keywords: [
    'job portal otp',
    'naukri otp',
    'recruiter otp',
    'job application sms',
    'resume verification otp',
    'recruitment otp india',
  ],
  publishedAt: '2026-05-01',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Job Portals Use OTP' },
    { id: 'flows', title: 'OTP Flows on Both Sides' },
    { id: 'recruiter', title: 'Recruiter Contact-Unlock' },
    { id: 'fraud', title: 'Resume / Recruitment Fraud Defences' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-matrimony-apps-india',
    'otp-classifieds-olx-india',
    'otp-coworking-membership-india',
  ],
  faq: [
    {
      question: 'Should we charge recruiters per contact-unlock OTP?',
      answer:
        'The OTP is internal control; charge for the contact reveal in your billing model. The OTP itself is just verification that the recruiter authorised the reveal.',
    },
    {
      question: 'How do we handle bulk recruiter accounts?',
      answer:
        'Per-recruiter rate limits. Bulk-unlock attempts within a short window flag the account for review.',
    },
    {
      question: 'Do candidates need OTP for every login?',
      answer:
        'No — adaptive 2FA. New device, IP change or password reset triggers OTP; routine logins from a known device do not need it.',
    },
  ],
  content: (
    <>
      <p>
        Indian job portals are two-sided marketplaces where the OTP layer has
        to satisfy candidates (low friction sign-up), recruiters (high
        accountability for contact unlocks), and platform-side fraud teams
        (defending the reputation of both).
      </p>

      <h2 id="context">Why Job Portals Use OTP</h2>
      <ul>
        <li>Candidate phone verification at sign-up.</li>
        <li>Recruiter login + sensitive-action step-up.</li>
        <li>Application-confirmation SMS to candidate.</li>
        <li>Recruiter contact-unlock for premium tiers.</li>
      </ul>

      <h2 id="flows">OTP Flows on Both Sides</h2>
      <p>Candidate side:</p>
      <ol>
        <li>Sign-up OTP.</li>
        <li>Application-submit confirmation SMS.</li>
        <li>Interview-reminder SMS.</li>
        <li>Account-recovery OTP.</li>
      </ol>
      <p>Recruiter side:</p>
      <ol>
        <li>Sign-up OTP.</li>
        <li>Contact-unlock OTP per candidate.</li>
        <li>Bulk-action step-up OTP.</li>
      </ol>

      <h2 id="recruiter">Recruiter Contact-Unlock</h2>
      <p>
        Pattern: when a recruiter requests a candidate&rsquo;s contact, system
        emits OTP to recruiter&rsquo;s phone. Recruiter enters; system
        delivers contact and logs the transaction. This both audit-trails the
        unlock and defeats casual session-hijacking.
      </p>

      <h2 id="fraud">Resume / Recruitment Fraud Defences</h2>
      <ul>
        <li>Phone-verified resumes win trust signals on listings.</li>
        <li>Disposable-number sign-ups flagged via virtual-number lists.</li>
        <li>Recruiter accounts with abnormal unlock-rate auto-paused.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles candidate
        and recruiter OTP traffic on a single API key — bulk-unlock workflows
        get the same idempotency guarantees as one-at-a-time.
      </p>
    </>
  ),
};
