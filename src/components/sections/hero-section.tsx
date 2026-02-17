import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DASHBOARD_URL } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            <span>No DLT registration required</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Send OTPs Without{' '}
            <span className="underline decoration-primary/50 decoration-2 underline-offset-4">
              DLT Registration
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            The simplest OTP API for Indian developers. Get started in 5
            minutes with a single API call. No DLT, no templates, no
            hassle — just working OTPs at Rs 0.25 each.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href={DASHBOARD_URL}>
                Start Sending OTPs
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/otp-api">View API Docs</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Free to sign up. Pay only for what you send.
          </p>
        </div>
      </div>
    </section>
  );
}
