import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'pci-dss-otp-india',
  title: 'PCI-DSS and OTP: What Indian Payment Apps Need to Know',
  description:
    'How PCI-DSS applies to OTP and SMS workflows in Indian payment apps: scope, segregation, audit-trail expectations, and where OTP fits relative to RBI AFA.',
  category: 'compliance',
  keywords: [
    'pci dss otp',
    'pci dss india',
    'payment app otp compliance',
    'pci dss sms',
    'card otp compliance',
  ],
  publishedAt: '2026-05-06',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'scope', title: 'PCI-DSS Scope and OTP' },
    { id: 'segregation', title: 'Cardholder Data Segregation' },
    { id: 'audit', title: 'Audit Trail' },
    { id: 'rbi-overlap', title: 'PCI-DSS + RBI AFA' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'rbi-afa-guidelines-otp-2026',
    'rbi-2fa-2026-mandate',
    'otp-fintech-india',
    'dpdp-act-otp-compliance-india',
  ],
  faq: [
    {
      question: 'Does sending an OTP via SMS bring my SMS provider into PCI-DSS scope?',
      answer:
        'Only if cardholder data is in the SMS body — which it should never be. OTPs themselves are not cardholder data. Keep SMS content limited to OTP code + brand and the SMS provider stays out of scope.',
    },
    {
      question: 'Should I include the last-4 digits of the card in the SMS?',
      answer:
        'Last-4 alone is permitted; full card number is forbidden. Be conservative — &ldquo;your code is X for the payment of Rs Y&rdquo; is enough.',
    },
  ],
  content: (
    <>
      <p>
        PCI-DSS focuses on cardholder data. OTP is rarely in scope unless
        you actively put card data into SMS. This guide explains where OTP
        sits and how to keep your SMS provider out of scope.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>PCI-DSS scope is cardholder data.</li>
        <li>OTPs themselves are not cardholder data.</li>
        <li>Keep SMS bodies free of PAN.</li>
      </ul>

      <h2 id="scope">PCI-DSS Scope and OTP</h2>
      <p>
        OTP is part of authentication; cardholder data is the PAN. Send the
        OTP via SMS, send the payment-result SMS via the same provider —
        nothing PAN-bearing leaves the PCI environment.
      </p>

      <h2 id="segregation">Cardholder Data Segregation</h2>
      <ul>
        <li>Cardholder data lives only in PCI-DSS-scoped systems.</li>
        <li>SMS provider never sees PAN.</li>
        <li>Authorisation responses stay inside the scope.</li>
      </ul>

      <h2 id="audit">Audit Trail</h2>
      <p>
        Retain (transactionId, OTPrequestId, status, timestamp). 12+ months
        for PCI-DSS, longer for RBI-side requirements.
      </p>

      <h2 id="rbi-overlap">PCI-DSS + RBI AFA</h2>
      <p>
        PCI-DSS is global; RBI AFA is India-specific. Both align on OTP as
        the second factor. Read our{' '}
        <Link href="/blog/rbi-afa-guidelines-otp-2026">RBI AFA guide</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> stays out of your
        PCI-DSS scope by design — we never see PAN, only the OTP request
        ID and result.
      </p>
    </>
  ),
};
