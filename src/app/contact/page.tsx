import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { WHATSAPP_URL } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageStructuredData } from "@/components/structured-data";
import { MessageCircle, Mail, Phone } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with StartMessaging. Reach us via WhatsApp, email, or phone. We are here to help with your OTP API integration.",
  path: "/contact",
});

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us directly on WhatsApp for quick support.",
    value: "+91-6376383348",
    href: WHATSAPP_URL,
    cta: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us an email for detailed inquiries or partnerships.",
    value: "startmessagingdotcom@gmail.com",
    href: "mailto:startmessagingdotcom@gmail.com",
    cta: "Send Email",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Call us during business hours (Mon-Sat, 10am-7pm IST).",
    value: "+91-6376383348",
    href: "tel:+916376383348",
    cta: "Call Us",
  },
];

export default function ContactPage() {
  return (
    <article>
      <PageStructuredData path="/contact" />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Have questions about the API, pricing, or integration? We&apos;re
              here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {contactMethods.map((method) => (
              <Card key={method.title} className="text-center">
                <CardHeader>
                  <method.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <CardTitle className="text-base">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                  <p className="font-mono text-sm pr-2">{method.value}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {method.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold">Common Questions</h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold">What is the response time?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We typically respond within a few hours on WhatsApp and within
                  24 hours via email.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Do you offer enterprise support?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Yes. Contact us for volume pricing, dedicated support, and
                  custom SLAs for high-volume senders.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">I need help with integration.</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Message us on WhatsApp or email with your question. We&apos;ll
                  help you get your integration working.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
