import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DASHBOARD_URL } from "@/lib/constants";
import { OtpIllustration } from "@/components/ui/otp-illustration";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-12 lg:pt-16 lg:pb-20">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Left Column Text */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              <span>No DLT registration required</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Send OTPs
              </span>{" "}
              Without{" "}
              <span className="underline decoration-primary/50 decoration-4 underline-offset-8">
                DLT Registration
              </span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              The most developer-friendly OTP API for India. Authenticate users
              in minutes with our high-delivery SMS infrastructure. 4-6 digit
              OTP support, multi-provider failover, and zero DLT registration —
              all at just ₹0.25 each.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
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
              Free to sign up.{" "}
              <span className="font-semibold text-foreground">
                40 test messages credited on signup.
              </span>{" "}
              Pay only for what you send.
            </p>
          </div>

          {/* Right Column Illustration */}
          <div className="mx-auto w-full max-w-[500px] lg:max-w-none flex justify-center lg:justify-end">
            <OtpIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
