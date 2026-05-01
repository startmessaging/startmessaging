import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-salon-spa-booking-india',
  title: 'OTP for Salon and Spa Booking Apps in India',
  description:
    'OTP patterns for salon and spa booking apps in India: appointment confirmation, no-show reduction, in-store check-in, and SMS templates that survive DLT scrubbing.',
  category: 'use-cases',
  keywords: [
    'salon booking otp',
    'spa booking sms',
    'appointment otp india',
    'no show reduction sms',
    'service booking otp',
  ],
  publishedAt: '2026-04-30',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Salon Apps Use OTP' },
    { id: 'flows', title: 'OTP Flows' },
    { id: 'no-show', title: 'No-Show Reduction with Confirmation OTPs' },
    { id: 'check-in', title: 'In-Store Check-In OTP' },
    { id: 'templates', title: 'SMS Templates That Survive Scrubbing' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-gym-fitness-apps-india',
    'otp-event-ticketing-india',
    'dlt-template-approval-guide',
    'otp-hyperlocal-services-india',
  ],
  faq: [
    {
      question: 'How does an OTP reduce no-shows?',
      answer:
        'Asking the user to enter a 1-tap OTP confirmation 2 hours before the appointment makes the booking real — they have committed an action. Apps that switched from passive reminders to interactive confirmation OTPs typically see 15–25% fewer no-shows.',
    },
    {
      question: 'Should I send a reminder OTP the morning of?',
      answer:
        'Send a transactional reminder SMS (no OTP needed) at T-24h, and an interactive confirmation OTP at T-2h. The OTP both reduces no-shows and confirms the customer is still reachable.',
    },
    {
      question: 'What about walk-ins?',
      answer:
        'Walk-ins skip the upfront OTP but should pass an OTP at check-in to capture the phone for receipts and loyalty.',
    },
  ],
  content: (
    <>
      <p>
        Salon and spa apps look simple but have surprising OTP nuance.
        Bookings are short-fuse, no-shows kill stylist utilisation, and
        check-in needs to be friction-free for the in-store team. SMS, not
        push, is the primary reach.
      </p>

      <h2 id="why">Why Salon Apps Use OTP</h2>
      <ul>
        <li>Sign-up via phone (most users do not download the app first).</li>
        <li>Appointment confirmation 2 hours before.</li>
        <li>Check-in at the chair without a stylist password.</li>
        <li>Loyalty point look-up at the counter.</li>
      </ul>

      <h2 id="flows">OTP Flows</h2>
      <ol>
        <li>Booking sign-up OTP.</li>
        <li>Appointment confirmation reminder.</li>
        <li>T-2h confirmation OTP (interactive).</li>
        <li>In-store check-in OTP.</li>
        <li>Post-visit feedback link SMS (transactional).</li>
      </ol>

      <h2 id="no-show">No-Show Reduction with Confirmation OTPs</h2>
      <p>
        The interactive confirmation OTP is the highest-impact change most
        salon apps can make. The mechanic:
      </p>
      <ul>
        <li>2 hours before slot, send OTP.</li>
        <li>Customer must enter to confirm — slot is held.</li>
        <li>No reply = release the slot to walk-ins.</li>
      </ul>

      <h2 id="check-in">In-Store Check-In OTP</h2>
      <p>
        At arrival, the receptionist asks the customer to share the OTP from
        their phone. This serves three purposes: validates identity for
        loyalty, marks attendance for stylist payout, and keeps the booking
        record consistent.
      </p>

      <h2 id="templates">SMS Templates That Survive Scrubbing</h2>
      <p>India DLT requires registered templates. Examples that pass:</p>
      <pre>
        <code>{`OTP {#var#} for your {#var#} booking at {#var#}. Valid 10 mins. - SALON
Your appointment at {#var#} on {#var#} is confirmed. Token: {#var#}. - SALON
Reminder: {#var#} appt today {#var#}. Reply Y to confirm. - SALON`}</code>
      </pre>
      <p>
        See{' '}
        <Link href="/blog/dlt-template-approval-guide">
          DLT template approval guide
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> ships under our
        DLT registration so your salon app can launch the same day, with
        confirmation and reminder SMS pre-cleared as transactional.
      </p>
    </>
  ),
};
