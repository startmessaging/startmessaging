import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'should-you-hash-otp-in-database',
  title: 'Should You Hash OTPs in Your Database?',
  description:
    'Yes, always — and bcrypt or scrypt, not SHA-256. Why hashing OTPs matters even though they\'re short-lived, and concrete code patterns.',
  category: 'security',
  keywords: [
    'hash otp',
    'bcrypt otp',
    'should i hash otp',
    'otp hashing best practice',
    'sha256 otp',
  ],
  publishedAt: '2026-05-19',
  readingTime: 6,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Hash an Ephemeral Code?' },
    { id: 'algorithm', title: 'Which Algorithm' },
    { id: 'cost', title: 'Cost Factor' },
    { id: 'managed', title: 'If You Use a Managed Provider' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-database-schema-best-practices',
    'otp-redis-vs-sql-storage',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'SHA-256 is fast — why not use it for OTPs?',
      answer:
        'SHA-256 is fast on both sides — including the attacker. A 6-digit OTP space is only 10^6. SHA-256 lets an attacker brute-force the entire space in milliseconds. Use bcrypt cost 10+ instead.',
    },
  ],
  content: (
    <>
      <p>
        Even ephemeral codes deserve hashing. A database leak with hashed
        OTPs gives you breathing room; with plaintext OTPs every active
        session is at immediate risk.
      </p>

      <h2 id="why">Why Hash an Ephemeral Code?</h2>
      <ul>
        <li>Database leak protection during the validity window.</li>
        <li>DPDP / PCI-DSS &ldquo;reasonable security&rdquo; obligations.</li>
        <li>Defence-in-depth.</li>
      </ul>

      <h2 id="algorithm">Which Algorithm</h2>
      <ul>
        <li>Bcrypt cost 10–12.</li>
        <li>Scrypt or Argon2 if you have Argon2 native bindings.</li>
        <li>Never SHA-256 / MD5 / SHA-1.</li>
      </ul>

      <h2 id="cost">Cost Factor</h2>
      <p>
        Bcrypt cost 10 is ~70ms on modern hardware. The user can&rsquo;t
        feel it; the attacker really can.
      </p>

      <h2 id="managed">If You Use a Managed Provider</h2>
      <p>
        StartMessaging hashes the OTP server-side with bcrypt cost 12 by
        default. You never see plaintext on your servers; nothing to hash
        on your side.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Even with managed provider, hash any locally-stored OTP-adjacent
        data (PINs, recovery codes, etc.).
      </p>
    </>
  ),
};
