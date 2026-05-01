import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'cheapest-otp-api-india-2026',
  title: 'Cheapest OTP API in India (2026): Honest Comparison',
  description:
    'Real per-OTP pricing for the major Indian OTP API providers in 2026 — including DLT setup costs, hidden monthly fees, and total cost of ownership at 100k OTPs/month.',
  category: 'comparisons',
  keywords: [
    'cheapest otp api india',
    'cheap otp service india',
    'otp api pricing india',
    'lowest cost otp api',
    'free otp api',
    'otp api comparison india 2026',
  ],
  publishedAt: '2026-04-27',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'tldr', title: 'TL;DR' },
    { id: 'pricing-table', title: 'Headline Per-OTP Pricing' },
    { id: 'hidden-costs', title: 'Hidden Costs' },
    { id: 'tco-100k', title: 'TCO at 100,000 OTPs / Month' },
    { id: 'free-tier', title: 'Free / Sandbox Tiers' },
    { id: 'choosing', title: 'How to Pick Beyond Price' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-api-pricing-comparison-india',
    'best-otp-api-india',
    'reduce-sms-otp-cost-india',
    'twilio-vs-startmessaging',
    'msg91-vs-startmessaging',
  ],
  faq: [
    {
      question: 'Is there a truly free OTP API for India?',
      answer:
        'A few providers offer 100–500 free OTPs as a trial, but no production-grade Indian OTP API is free indefinitely. SMS itself costs money to deliver — Rs 0.10–0.30 per message — so any "free" tier eventually expects you to upgrade.',
    },
    {
      question: 'Does cheaper SMS mean worse delivery?',
      answer:
        'Not necessarily. The same telecom infrastructure delivers all OTPs; what differs is the gateway routing intelligence and failover. We have seen cheap providers with great delivery and expensive ones with bad. Test with 1,000 SMS at a representative spread of carriers before committing.',
    },
    {
      question: 'Does StartMessaging really have no monthly fee?',
      answer:
        'Yes — pure pay-as-you-go at Rs 0.25 per OTP, no monthly minimum, no setup charge, no DLT registration fee on your side. The only money you spend is per OTP actually delivered.',
    },
  ],
  content: (
    <>
      <p>
        &ldquo;What is the cheapest OTP API in India?&rdquo; is one of the
        most-Googled questions in this space. The headline rate per OTP is
        almost never the full picture — DLT setup fees, monthly minimums,
        platform charges and inflated international rates all hide inside the
        contract. This guide compares the headline rates and the actual total
        cost of ownership for a typical Indian product sending 100,000 OTPs a
        month.
      </p>

      <h2 id="tldr">TL;DR</h2>
      <ul>
        <li>
          <strong>Headline-cheapest:</strong> some providers advertise as low
          as Rs 0.12 per OTP at high volume.
        </li>
        <li>
          <strong>Cheapest at &lt; 100k/month, no commitments:</strong>{' '}
          StartMessaging at Rs 0.25 per OTP, no monthly fees, no DLT setup.
        </li>
        <li>
          <strong>Cheapest including DLT setup amortised:</strong>{' '}
          StartMessaging or any DLT-free provider always wins below 1M OTPs /
          month — the Rs 5,000 + Rs 1,000–2,000/year DLT cost is not free.
        </li>
        <li>
          <strong>Avoid Twilio for India-only volume.</strong> Pricing is in
          USD, latency is higher than India-native providers, and you still
          need DLT registration.
        </li>
      </ul>

      <h2 id="pricing-table">Headline Per-OTP Pricing</h2>
      <p>Approximate Indian-market list prices in 2026:</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Per-OTP (transactional)</th>
              <th>Monthly minimum</th>
              <th>DLT included?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>StartMessaging</td>
              <td>Rs 0.25</td>
              <td>None</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>MSG91</td>
              <td>Rs 0.18–0.22</td>
              <td>Wallet top-up</td>
              <td>Self-service</td>
            </tr>
            <tr>
              <td>Fast2SMS</td>
              <td>Rs 0.15–0.25</td>
              <td>Wallet top-up</td>
              <td>Self-service</td>
            </tr>
            <tr>
              <td>Textlocal</td>
              <td>Rs 0.18</td>
              <td>Bulk pack</td>
              <td>Self-service</td>
            </tr>
            <tr>
              <td>Gupshup</td>
              <td>Rs 0.20–0.30</td>
              <td>Variable</td>
              <td>Self-service</td>
            </tr>
            <tr>
              <td>Exotel</td>
              <td>Rs 0.22+</td>
              <td>Variable</td>
              <td>Self-service</td>
            </tr>
            <tr>
              <td>Plivo</td>
              <td>Rs 0.30+</td>
              <td>Variable</td>
              <td>Self-service</td>
            </tr>
            <tr>
              <td>Twilio</td>
              <td>USD 0.0083 ≈ Rs 0.70</td>
              <td>Wallet</td>
              <td>Customer</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Numbers shift quarterly with operator-pricing changes. For
        same-day-current numbers, look at each provider&rsquo;s pricing page —
        we keep a refreshed spreadsheet in our{' '}
        <Link href="/blog/otp-api-pricing-comparison-india">
          dedicated pricing comparison
        </Link>
        .
      </p>

      <h2 id="hidden-costs">Hidden Costs</h2>
      <ul>
        <li>
          <strong>DLT registration:</strong> Rs 5,000 one-time + Rs 1,000–2,000
          / year per PE-ID per operator. Multiply by 4 operators if you do not
          use an aggregator.
        </li>
        <li>
          <strong>Template approval delays:</strong> 1–4 weeks per template.
          Engineering time, delayed launches, missed promotions.
        </li>
        <li>
          <strong>Monthly platform fee:</strong> some providers add Rs
          500–5,000/month for &ldquo;dashboard&rdquo; or &ldquo;API
          access&rdquo;.
        </li>
        <li>
          <strong>International OTP markups:</strong> 2–10× domestic rates.
          Easy to overlook until your first signup from Dubai.
        </li>
        <li>
          <strong>Voice OTP fallback:</strong> Rs 0.40–0.80 per call. Add it
          to budget if SMS-only is not enough.
        </li>
      </ul>

      <h2 id="tco-100k">TCO at 100,000 OTPs / Month</h2>
      <p>
        Modelling with 5% voice fallback, 1 PE-ID, 5 templates, 8% international
        traffic at USD 0.05 / OTP:
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Per-OTP (incl. domestic + intl mix)</th>
              <th>Monthly fees</th>
              <th>DLT amortised / month</th>
              <th>Total / month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>StartMessaging</td>
              <td>Rs 28,750</td>
              <td>Rs 0</td>
              <td>Rs 0</td>
              <td><strong>Rs 28,750</strong></td>
            </tr>
            <tr>
              <td>MSG91 (DIY DLT)</td>
              <td>Rs 22,000</td>
              <td>Rs 0</td>
              <td>Rs 600</td>
              <td>Rs 22,600</td>
            </tr>
            <tr>
              <td>Fast2SMS (DIY DLT)</td>
              <td>Rs 21,000</td>
              <td>Rs 0</td>
              <td>Rs 600</td>
              <td>Rs 21,600</td>
            </tr>
            <tr>
              <td>Twilio</td>
              <td>Rs 75,000+</td>
              <td>Rs 0</td>
              <td>Rs 600</td>
              <td>Rs 75,600+</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        On pure rupees, MSG91 and Fast2SMS are cheaper for high domestic
        volume — but you carry the DLT, template-approval and template-rejection
        ops cost. StartMessaging trades a few rupees per thousand OTPs for
        zero ops overhead. For most early-stage and mid-market teams that is a
        net win.
      </p>

      <h2 id="free-tier">Free / Sandbox Tiers</h2>
      <p>
        Almost every provider has some kind of trial. Common shapes:
      </p>
      <ul>
        <li>Wallet sign-up bonus of Rs 50–100.</li>
        <li>Sandbox numbers that simulate delivery without sending.</li>
        <li>X free SMS per day to verified test numbers.</li>
      </ul>
      <p>
        Beware of marketing claims of &ldquo;100% free OTP API for India&rdquo;
        — there is no production-grade option that meets DLT compliance and
        SMS-delivery cost without ever charging.
      </p>

      <h2 id="choosing">How to Pick Beyond Price</h2>
      <ul>
        <li>
          <strong>Time to first OTP.</strong> StartMessaging and other DLT-free
          providers can ship today. DIY DLT is 1–4 weeks.
        </li>
        <li>
          <strong>Delivery rate (P95 latency).</strong> Test with 1,000 SMS
          across Jio / Airtel / Vi / BSNL spread.
        </li>
        <li>
          <strong>Failover routing.</strong> What happens when one operator
          path is down?
        </li>
        <li>
          <strong>Developer experience.</strong> Documented OpenAPI? Code
          samples in your stack? Idempotency keys?
        </li>
        <li>
          <strong>Support.</strong> WhatsApp / chat with engineers, or just a
          ticket queue?
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For most India-focused teams,{' '}
        <Link href="/dlt-free-otp">StartMessaging at Rs 0.25 per OTP, no DLT
        setup</Link> is the lowest <em>real</em> cost — the rate looks higher
        than the rock-bottom DIY-DLT options but the saved engineering and
        compliance time more than pays for the difference.
      </p>
    </>
  ),
};
