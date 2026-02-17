import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DASHBOARD_URL } from '@/lib/constants';

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaSection({
  title = 'Ready to Start Sending OTPs?',
  description = 'Sign up for free, top up your wallet, and send your first OTP in under 5 minutes. No DLT registration needed.',
  primaryLabel = 'Get Started Free',
  primaryHref = DASHBOARD_URL,
  secondaryLabel = 'View Pricing',
  secondaryHref = '/pricing',
}: CtaSectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              {primaryHref.startsWith('http') ? (
                <a href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              ) : (
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
