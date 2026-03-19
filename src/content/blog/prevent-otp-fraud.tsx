import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'prevent-otp-fraud',
  title: 'How to Prevent OTP Fraud and SMS Pumping',
  description:
    'Learn what SMS pumping and OTP fraud are, how artificial inflation attacks work, detection signals, prevention techniques, and how to protect your SMS budget.',
  category: 'security',
  keywords: [
    'SMS pumping',
    'OTP fraud',
    'SMS fraud prevention',
    'artificial inflation attack',
    'SMS toll fraud',
    'OTP abuse prevention',
    'SMS pumping India',
    'prevent OTP spam',
  ],
  publishedAt: '2026-02-01',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'what-is-sms-pumping', title: 'What is SMS Pumping?' },
    { id: 'how-the-attack-works', title: 'How the Attack Works' },
    { id: 'real-cost-of-sms-pumping', title: 'The Real Cost of SMS Pumping' },
    { id: 'detection-signals', title: 'Detection Signals' },
    { id: 'prevention-techniques', title: 'Prevention Techniques' },
    { id: 'rate-limiting-as-first-defence', title: 'Rate Limiting as First Defence' },
    { id: 'phone-number-intelligence', title: 'Phone Number Intelligence' },
    { id: 'captcha-and-proof-of-work', title: 'CAPTCHA and Proof of Work' },
    { id: 'geographic-restrictions', title: 'Geographic Restrictions' },
    { id: 'monitoring-and-alerting', title: 'Monitoring and Alerting' },
    { id: 'how-startmessaging-protects-you', title: 'How StartMessaging Protects You' },
    { id: 'incident-response-plan', title: 'Incident Response Plan' },
  ],
  content: (
    <>
      <p>
        SMS pumping is one of the most financially damaging attacks targeting OTP systems. Unlike
        traditional hacking attempts that aim to steal data, SMS pumping exploits your OTP
        infrastructure to generate profit for the attacker at your expense. If your OTP system lacks
        proper protections, a single attack can cost thousands of rupees in minutes.
      </p>
      <p>
        This guide explains how SMS pumping works, how to detect it, and the layered prevention
        techniques that protect your application and budget.
      </p>

      <h2 id="what-is-sms-pumping">What is SMS Pumping?</h2>
      <p>
        SMS pumping (also called Artificially Inflated Traffic or AIT) is a fraud scheme where an
        attacker triggers large volumes of SMS messages from your application to phone numbers they
        control or have revenue-sharing agreements with. The attacker profits from the traffic while
        you pay the SMS delivery costs.
      </p>
      <p>
        The attack specifically targets OTP and verification endpoints because these are designed to
        send SMS to any phone number provided, with minimal validation. An attacker does not need to
        compromise your system; they simply use your OTP endpoint as designed, but with fraudulent
        phone numbers.
      </p>
      <p>
        SMS pumping has become increasingly prevalent globally, with businesses losing an estimated
        $2-3 billion annually to this type of fraud. In India, the relatively low cost of SMS makes
        individual attacks smaller, but the volume can still be significant.
      </p>

      <h2 id="how-the-attack-works">How the Attack Works</h2>
      <p>
        The anatomy of an SMS pumping attack follows a consistent pattern:
      </p>
      <ol>
        <li>
          <strong>Target identification:</strong> The attacker finds a website or API endpoint that
          sends SMS OTPs. They test it to confirm there are no rate limits or verification
          requirements before the SMS is sent.
        </li>
        <li>
          <strong>Number acquisition:</strong> The attacker obtains a set of phone numbers. These
          might be premium-rate numbers where the attacker receives a per-message payment, numbers
          from complicit telecom operators who share revenue, or simply random numbers used to inflate
          traffic volumes that benefit a middleman in the SMS delivery chain.
        </li>
        <li>
          <strong>Automated triggering:</strong> Using scripts or bots, the attacker sends
          hundreds or thousands of OTP requests to your endpoint, each with a different phone
          number from their list.
        </li>
        <li>
          <strong>Revenue collection:</strong> The attacker or their telecom partner receives a
          portion of the SMS delivery fee for each message sent to their numbers.
        </li>
        <li>
          <strong>You pay the bill:</strong> Your SMS provider charges you for every message
          delivered, regardless of whether the recipient was a legitimate user.
        </li>
      </ol>
      <p>
        The attack is especially insidious because each individual request looks legitimate: a single
        OTP sent to a single phone number. Only the pattern across many requests reveals the fraud.
      </p>

      <h2 id="real-cost-of-sms-pumping">The Real Cost of SMS Pumping</h2>
      <p>
        The financial impact goes beyond the direct SMS charges:
      </p>
      <ul>
        <li>
          <strong>SMS costs:</strong> At Rs 0.25-0.35 per SMS, 10,000 fraudulent messages cost
          Rs 2,500-3,500. Larger attacks can reach 100,000+ messages.
        </li>
        <li>
          <strong>Provider penalties:</strong> SMS providers may suspend your account if they detect
          abnormal traffic patterns, blocking OTP delivery to your real users.
        </li>
        <li>
          <strong>Delivery degradation:</strong> High-volume abuse can trigger spam filters at the
          telecom operator level, reducing delivery rates for your legitimate OTPs.
        </li>
        <li>
          <strong>Reputation damage:</strong> If your sender ID is flagged for spam, rebuilding
          trust with telecom operators takes weeks or months.
        </li>
        <li>
          <strong>Engineering time:</strong> Investigating the attack, implementing fixes, and
          coordinating with your SMS provider consumes valuable engineering resources.
        </li>
      </ul>

      <h2 id="detection-signals">Detection Signals</h2>
      <p>
        Detecting SMS pumping requires monitoring patterns rather than individual requests. Watch for
        these signals:
      </p>

      <h3>Volume Anomalies</h3>
      <ul>
        <li>
          <strong>Sudden traffic spikes:</strong> OTP send volume jumps 5-10x above your baseline
          within minutes.
        </li>
        <li>
          <strong>Off-peak surges:</strong> High OTP volume during hours when your user base is
          typically inactive (e.g., 2-5 AM IST for a consumer app).
        </li>
        <li>
          <strong>Steady high-rate traffic:</strong> Unusually consistent request rates (e.g.,
          exactly 10 requests per second for 30 minutes), which indicate bot behaviour rather than
          organic human traffic.
        </li>
      </ul>

      <h3>Number Patterns</h3>
      <ul>
        <li>
          <strong>Sequential numbers:</strong> OTP requests for +91-9000000001, +91-9000000002,
          +91-9000000003 in rapid succession.
        </li>
        <li>
          <strong>Same number prefix:</strong> Many requests targeting numbers that share the same
          first 7-8 digits, suggesting a block of numbers owned by the same entity.
        </li>
        <li>
          <strong>International numbers:</strong> A sudden increase in OTP requests for non-Indian
          numbers when your user base is primarily Indian.
        </li>
        <li>
          <strong>Premium-rate number ranges:</strong> Numbers belonging to known premium-rate
          ranges or country codes associated with SMS fraud.
        </li>
      </ul>

      <h3>Conversion Anomalies</h3>
      <ul>
        <li>
          <strong>Zero verification rate:</strong> OTPs are sent but never verified. A normal
          verification rate is 60-80%. During an attack, it drops to near 0%.
        </li>
        <li>
          <strong>No preceding user activity:</strong> OTP requests arrive without corresponding
          page views, app opens, or registration attempts.
        </li>
        <li>
          <strong>Single IP, multiple numbers:</strong> Hundreds of OTP requests from the same IP
          address for different phone numbers.
        </li>
      </ul>

      <h2 id="prevention-techniques">Prevention Techniques</h2>
      <p>
        Effective SMS pumping prevention requires multiple layers. No single technique is sufficient,
        because attackers adapt to each individual defence.
      </p>

      <h2 id="rate-limiting-as-first-defence">Rate Limiting as First Defence</h2>
      <p>
        Rate limiting is your most impactful protection. Apply limits at every level:
      </p>
      <pre>
        <code>{`// Multi-layer rate limiting for OTP sends
const rateLimits = {
  // Per phone number: prevents flooding a single number
  perPhone: { window: '10m', max: 3 },

  // Per IP address: catches single-source attacks
  perIp: { window: '10m', max: 20 },

  // Per API key: caps total sends for your application
  perApiKey: { window: '1h', max: 500 },

  // Global: circuit breaker for your entire system
  global: { window: '1m', max: 100 },
};

async function checkAllRateLimits(
  phoneNumber: string,
  ip: string,
  apiKey: string
): Promise<{ allowed: boolean; reason?: string }> {
  const checks = await Promise.all([
    checkLimit(\`phone:\${phoneNumber}\`, rateLimits.perPhone),
    checkLimit(\`ip:\${ip}\`, rateLimits.perIp),
    checkLimit(\`apikey:\${apiKey}\`, rateLimits.perApiKey),
    checkLimit('global', rateLimits.global),
  ]);

  const blocked = checks.find(c => !c.allowed);
  return blocked || { allowed: true };
}`}</code>
      </pre>
      <p>
        For a detailed guide on implementing each layer, see our{' '}
        <Link href="/blog/otp-rate-limiting-guide">OTP rate limiting guide</Link>.
      </p>

      <h2 id="phone-number-intelligence">Phone Number Intelligence</h2>
      <p>
        Before sending an OTP, validate the phone number for signs of fraud:
      </p>
      <ul>
        <li>
          <strong>Format validation:</strong> Reject numbers that do not match a valid E.164 format
          for the expected country.
        </li>
        <li>
          <strong>Country filtering:</strong> If your application serves Indian users, restrict OTP
          sends to +91 numbers. Block or require additional verification for international numbers.
        </li>
        <li>
          <strong>Number type lookup:</strong> Use a phone number intelligence API to determine
          whether the number is a mobile, landline, VoIP, or premium-rate number. Block OTPs to
          non-mobile numbers.
        </li>
        <li>
          <strong>Disposable number detection:</strong> Maintain or subscribe to a list of known
          disposable/virtual number ranges and block OTPs to these.
        </li>
      </ul>
      <pre>
        <code>{`// Phone number validation before OTP send
function validatePhoneNumber(phoneNumber: string): {
  valid: boolean;
  reason?: string;
} {
  // Must be E.164 format
  if (!/^\\+\\d{10,15}$/.test(phoneNumber)) {
    return { valid: false, reason: 'Invalid phone number format' };
  }

  // Restrict to Indian numbers if applicable
  if (!phoneNumber.startsWith('+91')) {
    return { valid: false, reason: 'Only Indian numbers are supported' };
  }

  // Indian mobile numbers: +91 followed by 6-9 and 9 more digits
  if (!/^\\+91[6-9]\\d{9}$/.test(phoneNumber)) {
    return { valid: false, reason: 'Invalid Indian mobile number' };
  }

  // Block known disposable number ranges (example)
  const disposableRanges = ['+919000000', '+919999999'];
  if (disposableRanges.some(range => phoneNumber.startsWith(range))) {
    return { valid: false, reason: 'Number range not allowed' };
  }

  return { valid: true };
}`}</code>
      </pre>

      <h2 id="captcha-and-proof-of-work">CAPTCHA and Proof of Work</h2>
      <p>
        Adding a CAPTCHA before the OTP send step dramatically reduces automated attacks. The
        attacker&apos;s script cannot solve CAPTCHAs at scale without significant cost, making the
        attack unprofitable.
      </p>
      <p>Options in order of user experience impact (lowest friction first):</p>
      <ol>
        <li>
          <strong>Invisible reCAPTCHA or hCaptcha:</strong> Runs in the background with no user
          interaction in most cases. Only shows a challenge for suspicious traffic.
        </li>
        <li>
          <strong>Turnstile (Cloudflare):</strong> Non-interactive challenge that validates
          browser behaviour. No visual puzzle for the user.
        </li>
        <li>
          <strong>Interactive CAPTCHA:</strong> Image selection or text challenges. Higher friction
          but most effective against sophisticated bots.
        </li>
        <li>
          <strong>Client-side proof of work:</strong> Require the browser to solve a computational
          puzzle before the OTP request is accepted. This adds a small delay (1-3 seconds) for
          legitimate users but makes bulk requests extremely slow for attackers.
        </li>
      </ol>
      <p>
        For API-only integrations (where there is no browser), require authenticated sessions
        (JWT or API key) before allowing OTP sends. This ensures that only your application can
        trigger OTPs, not an attacker hitting your endpoint directly.
      </p>

      <h2 id="geographic-restrictions">Geographic Restrictions</h2>
      <p>
        If your user base is primarily in India, restrict OTP delivery to Indian phone numbers. This
        eliminates an entire class of SMS pumping attacks that target international premium-rate
        numbers.
      </p>
      <ul>
        <li>
          Block all OTP sends to numbers outside your supported countries.
        </li>
        <li>
          If you must support international numbers, require additional verification (email
          confirmation, CAPTCHA) before sending an international OTP.
        </li>
        <li>
          Apply stricter rate limits to international numbers (e.g., 1 per hour instead of 3 per
          10 minutes).
        </li>
        <li>
          Monitor the country distribution of OTP sends. A sudden spike in any country you do not
          actively serve is a strong fraud signal.
        </li>
      </ul>

      <h2 id="monitoring-and-alerting">Monitoring and Alerting</h2>
      <p>
        Detection is as important as prevention. Set up the following monitors:
      </p>

      <h3>Real-Time Alerts</h3>
      <ul>
        <li>
          <strong>Volume threshold:</strong> Alert when OTP sends exceed 2x your normal peak within
          any 5-minute window.
        </li>
        <li>
          <strong>Verification rate drop:</strong> Alert when the send-to-verify ratio drops below
          30% over a 15-minute window (normal is 60-80%).
        </li>
        <li>
          <strong>New country detected:</strong> Alert when OTPs are sent to a country code that has
          not appeared in the last 30 days.
        </li>
        <li>
          <strong>Cost threshold:</strong> Alert when daily SMS spend exceeds a configurable limit.
        </li>
      </ul>

      <h3>Daily Reports</h3>
      <ul>
        <li>Top 10 phone numbers by OTP volume (identify persistent abuse)</li>
        <li>Top 10 IP addresses by OTP volume (identify bot sources)</li>
        <li>OTP send volume by hour (spot off-peak anomalies)</li>
        <li>Verification success rate by hour (correlate with potential attacks)</li>
        <li>Country distribution of OTP sends (catch geographic anomalies)</li>
      </ul>
      <pre>
        <code>{`// Monitoring query: detect potential SMS pumping
// Run every 5 minutes
async function detectSmsPumping() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  // Check volume spike
  const recentSends = await db.otpRequests.count({
    where: { createdAt: MoreThan(fiveMinutesAgo) },
  });

  const baselinePerFiveMin = await getBaselineOtpVolume(); // Your normal rate
  if (recentSends > baselinePerFiveMin * 2) {
    await alertTeam('OTP volume spike detected', {
      current: recentSends,
      baseline: baselinePerFiveMin,
      multiplier: (recentSends / baselinePerFiveMin).toFixed(1),
    });
  }

  // Check verification rate
  const recentVerified = await db.otpRequests.count({
    where: {
      createdAt: MoreThan(fiveMinutesAgo),
      verifiedAt: Not(IsNull()),
    },
  });

  const verifyRate = recentSends > 0 ? recentVerified / recentSends : 1;
  if (verifyRate < 0.3 && recentSends > 20) {
    await alertTeam('Low OTP verification rate — possible SMS pumping', {
      sends: recentSends,
      verified: recentVerified,
      rate: (verifyRate * 100).toFixed(1) + '%',
    });
  }
}`}</code>
      </pre>

      <h2 id="how-startmessaging-protects-you">How StartMessaging Protects You</h2>
      <p>
        <Link href="/features">StartMessaging</Link> implements multiple layers of SMS pumping
        protection automatically:
      </p>
      <ul>
        <li>
          <strong>Built-in rate limiting:</strong> Per-phone, per-IP, and per-API-key rate limits
          are applied on every OTP send request, with thresholds tuned for the Indian market.
        </li>
        <li>
          <strong>Pattern detection:</strong> Our system monitors for sequential number patterns,
          abnormal volume spikes, and low-verification-rate traffic in real time.
        </li>
        <li>
          <strong>Country restrictions:</strong> Configure allowed destination countries per API key.
          By default, only Indian numbers (+91) are enabled.
        </li>
        <li>
          <strong>Spend alerts:</strong> Set daily and monthly budget thresholds. StartMessaging
          alerts you and can optionally pause sends when thresholds are reached.
        </li>
        <li>
          <strong>Idempotency protection:</strong> Duplicate OTP requests with the same
          idempotency key do not generate additional SMS sends or charges.
        </li>
        <li>
          <strong>Smart fallback:</strong> Our SMS provider system only retries on service errors
          (5xx, timeouts), not on validation errors, preventing fraudulent requests from being
          amplified across multiple providers.
        </li>
      </ul>
      <p>
        At <Link href="/pricing">Rs 0.25 per OTP</Link>, every prevented fraudulent message
        directly saves you money. Combined with{' '}
        <Link href="/blog/otp-security-best-practices">comprehensive OTP security practices</Link>,
        StartMessaging gives you a production-ready anti-fraud layer from day one.
      </p>

      <h2 id="incident-response-plan">Incident Response Plan</h2>
      <p>
        If you detect an active SMS pumping attack, follow this response sequence:
      </p>
      <ol>
        <li>
          <strong>Immediate:</strong> Enable emergency rate limiting. Drop your global OTP send
          limit to 50% of normal peak capacity.
        </li>
        <li>
          <strong>Within 5 minutes:</strong> Identify the top attacking IPs and phone number ranges
          from your logs. Block them at the application level.
        </li>
        <li>
          <strong>Within 15 minutes:</strong> Enable CAPTCHA on all OTP send forms if not already
          active. This stops the automated scripts immediately.
        </li>
        <li>
          <strong>Within 1 hour:</strong> Review your SMS provider dashboard for cost impact.
          Contact your provider to flag the traffic as fraudulent (some providers offer credits for
          confirmed fraud).
        </li>
        <li>
          <strong>Post-incident:</strong> Analyse the attack pattern to strengthen your defences.
          Update rate limits, add the attacking number ranges to your blocklist, and review your
          monitoring thresholds.
        </li>
      </ol>
      <p>
        Document each incident. Over time, your blocklists and detection rules will become
        increasingly effective at catching attacks early.
      </p>
      <p>
        For more on building robust OTP systems, read our guides on{' '}
        <Link href="/blog/otp-rate-limiting-guide">OTP rate limiting</Link> and{' '}
        <Link href="/blog/otp-security-best-practices">OTP security best practices</Link>.
      </p>
    </>
  ),
  relatedSlugs: ['otp-rate-limiting-guide', 'otp-security-best-practices'],
  faq: [
    {
      question: 'What is SMS pumping and how does it affect my business?',
      answer:
        'SMS pumping (Artificially Inflated Traffic) is a fraud scheme where attackers trigger large volumes of OTP SMS messages to phone numbers they control or have revenue-sharing agreements with. The attacker profits from the message traffic while your business pays the SMS delivery costs. A single attack can generate thousands of fraudulent messages, costing Rs 2,500-35,000+ depending on volume.',
    },
    {
      question: 'How can I tell if my OTP system is being attacked by SMS pumping?',
      answer:
        'Key signals include: sudden spikes in OTP send volume (5-10x above baseline), extremely low verification rates (below 30% when normal is 60-80%), OTP requests to sequential phone numbers, high volume from single IP addresses, and traffic during off-peak hours. Monitoring these metrics in real-time with automated alerts is the most effective detection method.',
    },
    {
      question: 'Is CAPTCHA enough to prevent SMS pumping?',
      answer:
        'CAPTCHA is highly effective but should not be your only defence. Sophisticated attackers use CAPTCHA-solving services that can bypass challenges at Rs 0.50-1 per solve. Layer CAPTCHA with rate limiting (per-phone, per-IP, and global), phone number validation, geographic restrictions, and real-time monitoring for comprehensive protection.',
    },
    {
      question: 'Does StartMessaging protect against SMS pumping automatically?',
      answer:
        'Yes. StartMessaging includes built-in rate limiting, pattern detection for sequential and suspicious numbers, configurable country restrictions, spend threshold alerts, and idempotency protection. These defences are active by default on every API key, with no additional configuration required.',
    },
  ],
};
