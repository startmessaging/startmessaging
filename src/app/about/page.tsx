import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { CtaSection } from "@/components/sections";
import { PageStructuredData } from "@/components/structured-data";

export const metadata: Metadata = createMetadata({
  title: "About StartMessaging",
  description:
    "StartMessaging is building the simplest OTP API for Indian developers. Our mission is to make phone verification accessible without DLT complexity.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article>
      <PageStructuredData path="/about" />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About StartMessaging
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Making OTP verification simple for Indian developers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                Every Indian developer building a product that needs phone
                verification faces the same problem: DLT registration. The
                process takes weeks, involves multiple government platforms, and
                requires resubmission for every template change.
              </p>
              <p className="mt-4 text-muted-foreground">
                StartMessaging exists to eliminate that friction. We are a
                DLT-registered OTP provider that gives developers a simple REST
                API to send and verify OTPs. No registration, no templates, no
                paperwork — just a working API at Rs 0.25 per OTP.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">What We Believe</h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Simplicity wins.</strong>{" "}
                  One POST request to send an OTP. One POST request to verify.
                  That&apos;s it.
                </li>
                <li>
                  <strong className="text-foreground">
                    Pay for what you use.
                  </strong>{" "}
                  No monthly fees and no surprise charges—pay only for what you
                  send.
                </li>
                <li>
                  <strong className="text-foreground">
                    Security is not optional.
                  </strong>{" "}
                  Bcrypt-hashed OTPs, SHA-256 API keys, HTTPS everywhere.
                </li>
                <li>
                  <strong className="text-foreground">
                    Reliability matters.
                  </strong>{" "}
                  Multi-provider failover ensures your OTPs get delivered.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="mt-4 text-muted-foreground">
                Have questions or want to learn more? Reach out via{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  our contact page
                </Link>{" "}
                or message us on WhatsApp at +91-6376383348.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Get Started?"
        description="Join developers who are sending OTPs without DLT hassle."
        secondaryLabel="View Features"
        secondaryHref="/features"
      />
    </article>
  );
}
