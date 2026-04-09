import {
  HeroSection,
  CodeShowcase,
  FeaturesGrid,
  StatsSection,
  HowItWorks,
  FaqSection,
  CtaSection,
} from '@/components/sections';
import { PageStructuredData } from '@/components/structured-data';

const homeFaq = [
  {
    question: 'What is StartMessaging?',
    answer:
      'StartMessaging is an OTP API platform for Indian developers. It lets you send OTP codes via SMS without registering on the DLT platform. Just sign up, get an API key, and start sending.',
  },
  {
    question: 'Do I need DLT registration to use StartMessaging?',
    answer:
      'No. StartMessaging handles all DLT compliance on our end. You do not need to register on any DLT platform, submit templates, or register sender IDs.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Each OTP costs Rs 0.25. There are no monthly fees or setup charges. Add funds to your wallet and pay only for what you send.',
  },
  {
    question: 'How fast can I get started?',
    answer:
      'Under 5 minutes. Sign up, create an API key, add funds to your wallet, and make your first API call. No approval process or waiting period.',
  },
  {
    question: 'Which programming languages are supported?',
    answer:
      'StartMessaging provides a REST API that works with any language or framework. We have code examples for cURL, Node.js, Python, PHP, Java, and Go.',
  },
  {
    question: 'What happens if SMS delivery fails?',
    answer:
      'StartMessaging uses multi-provider failover. If one SMS provider fails to deliver, we automatically retry with a backup provider to maximize delivery rates.',
  },
];

export default function HomePage() {
  return (
    <>
      <PageStructuredData path="/" faq={homeFaq} />
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <CodeShowcase />
      <HowItWorks />
      <FaqSection items={homeFaq} />
      <CtaSection />
    </>
  );
}
