import {
  Shield,
  Zap,
  Code2,
  Globe,
  RefreshCw,
  CreditCard,
  Clock,
  Lock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'No DLT Required',
    description:
      'Skip the weeks-long DLT registration process. We handle all compliance so you can focus on building.',
  },
  {
    icon: Zap,
    title: '5-Minute Setup',
    description:
      'Sign up, get your API key, and start sending OTPs. No paperwork, no approvals, no waiting.',
  },
  {
    icon: Code2,
    title: 'Simple REST API',
    description:
      'One POST request to send an OTP. Clean JSON responses. Works with any language or framework.',
  },
  {
    icon: Globe,
    title: 'Multi-Provider Fallback',
    description:
      'Automatic failover between SMS providers ensures your OTPs always get delivered.',
  },
  {
    icon: RefreshCw,
    title: 'Idempotent Sends',
    description:
      'Built-in idempotency keys prevent duplicate OTP sends even with network retries.',
  },
  {
    icon: CreditCard,
    title: 'Pay As You Go',
    description:
      'No monthly fees. Add funds to your wallet and pay Rs 0.25 per OTP sent.',
  },
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    description:
      'Track every message with delivery status updates. Full audit trail for all OTP requests.',
  },
  {
    icon: Lock,
    title: 'Secure by Default',
    description:
      'OTP codes are bcrypt-hashed. API keys are SHA-256 hashed. Your data is always protected.',
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Send OTPs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete OTP platform designed for Indian developers who want
            reliability without complexity.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-none bg-muted/50 transition-colors hover:bg-muted/80">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
