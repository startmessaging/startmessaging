import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'esim-dual-sim-otp-not-delivered-india',
  title: 'eSIM and Dual-SIM OTP Issues in India: A Developer Debugging Guide',
  description:
    'Why OTP SMS sometimes lands on the wrong subscription, disappears after eSIM migration, or fails on dual-SIM phones in India — with practical checks for support and engineering teams.',
  category: 'tutorials',
  keywords: [
    'eSIM OTP not received India',
    'dual SIM OTP wrong number',
    'OTP not coming secondary SIM',
    'eSIM porting OTP issue',
    'Jio eSIM OTP',
    'Airtel eSIM OTP problem',
    'SMS routing dual SIM India',
  ],
  publishedAt: '2026-05-13',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'how-routing', title: 'How Android and iOS Pick a Subscription' },
    { id: 'esim-migration', title: 'eSIM Migration and Silent Profile Switches' },
    { id: 'dual-sim', title: 'Dual-SIM Data vs SMS Default' },
    { id: 'debug', title: 'Support Playbook: Questions to Ask' },
    { id: 'product', title: 'Product Mitigations' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-not-received-india',
    'otp-failing-jio-airtel-vi',
    'international-otp-not-delivering',
    'otp-autofill-android-ios-sms-retriever',
  ],
  faq: [
    {
      question: 'Why does OTP arrive on SIM 2 when the user entered SIM 1?',
      answer:
        'The number you send to is owned by one subscription ID inside the phone OS. If the user recently swapped default SMS or data SIM, or converted a physical SIM to eSIM, the OS may route inbound SMS differently than the user expects. Ask which SIM shows the signal indicator for data at the moment of the request.',
    },
    {
      question: 'Does eSIM conversion break OTP temporarily?',
      answer:
        'Sometimes. During profile download and activation, there can be a short window where the old IMSI is detached and the new one is not yet attached. Ask users to retry after the eSIM shows "Active" and airplane mode toggle once.',
    },
    {
      question: 'Should we send OTP to email if SMS fails?',
      answer:
        'Email fallback can reduce support load but changes your threat model. If you add it, treat email as a separate factor with its own rate limits and audit trail.',
    },
  ],
  content: (
    <>
      <p>
        &ldquo;OTP not received&rdquo; tickets spike whenever carriers push
        eSIM self-service or users enable dual-SIM for work. The SMS often
        delivered correctly — but to the{' '}
        <strong>subscription the OS considers primary for SMS</strong>, not
        the line the user thinks they used. This article gives a debugging
        lens for Indian apps on Jio, Airtel, Vi, and BSNL networks.
      </p>

      <h2 id="how-routing">How Android and iOS Pick a Subscription</h2>
      <p>
        Modern phones maintain separate <strong>subscription IDs</strong> per
        SIM/eSIM profile. Your backend only sees the MSISDN the user typed.
        The OS maps that MSISDN to a subscription for inbound SMS. If the
        user has two Indian numbers, mis-taps, or has an old eSIM still
        installed, your message can surface in a thread they are not watching.
      </p>

      <h2 id="esim-migration">eSIM Migration and Silent Profile Switches</h2>
      <ul>
        <li>
          <strong>QR conversion flows:</strong> After scanning an eSIM QR,
          some devices keep the physical SIM active until the user explicitly
          disables it — both lines can receive SMS during overlap windows.
        </li>
        <li>
          <strong>Profile redownload:</strong> If a user deletes and
          re-adds an eSIM, HLR/VLR state can lag minutes behind UI state.
        </li>
        <li>
          <strong>Travel:</strong> Inbound roamers can see delayed SMS when
          the visited network routes home-country SMS slowly; pair with{' '}
          <Link href="/blog/international-otp-not-delivering">
            international delivery guidance
          </Link>
          .
        </li>
      </ul>

      <h2 id="dual-sim">Dual-SIM Data vs SMS Default</h2>
      <p>
        Many users set <strong>Data = SIM A</strong> but expect{' '}
        <strong>SMS = SIM B</strong>. Android exposes per-SIM SMS apps;
        iMessage and filtering can hide unknown senders. Ask the user to
        confirm: (1) which SIM shows your OTP sender in the native SMS app,
        (2) whether spam filters or{' '}
        <Link href="/blog/otp-going-to-spam-fix">Truecaller-style</Link>{' '}
        apps blocked the sender.
      </p>

      <h2 id="debug">Support Playbook: Questions to Ask</h2>
      <ol>
        <li>Exact phone model + Android/iOS version.</li>
        <li>Physical SIM, eSIM, or both installed?</li>
        <li>Which SIM slot is default for SMS (screenshot settings page).</li>
        <li>Any SMS forwarding / Google Messages web pairing enabled?</li>
        <li>Timestamp of last successful OTP on this device.</li>
      </ol>

      <h2 id="product">Product Mitigations</h2>
      <ul>
        <li>
          Show the masked number you will SMS before send; let the user
          correct the line prefix (+91) early.
        </li>
        <li>
          Offer{' '}
          <Link href="/blog/voice-otp-vs-sms-otp-india">voice OTP</Link> for
          high-friction cohorts where SMS routing is noisy.
        </li>
        <li>
          Log delivery receipts (DLR) and map failure codes to user-facing
          hints — see{' '}
          <Link href="/blog/webhooks-otp-delivery-status-guide">
            webhook DLR patterns
          </Link>
          .
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        eSIM and dual-SIM issues are mostly <strong>client-side routing</strong>{' '}
        problems. Your provider can still show &ldquo;delivered&rdquo; to the
        handset while the user looks at the wrong inbox. Train support to
        verify subscription settings before escalating to carrier tickets.
      </p>
    </>
  ),
};
