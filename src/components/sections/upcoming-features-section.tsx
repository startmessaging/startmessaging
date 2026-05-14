import Link from 'next/link';
import { CalendarClock, Layers, MessageCircle, Smartphone } from 'lucide-react';
import {
  CUSTOM_FEATURES_REQUEST_EMAIL,
  CUSTOM_FEATURES_REQUEST_MAILTO,
} from '@/lib/constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const roadmapItems = [
  {
    icon: Layers,
    title: 'DLT integrations',
    description:
      'Deeper connectors for enterprise DLT workflows: header and template lifecycle, scrubbing-aware retries, and operator-specific observability from the same API surface you use today.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp messaging and campaign scheduling',
    description:
      'Transactional and campaign-style WhatsApp with consent-aware scheduling, quiet hours, and shared wallet semantics next to SMS OTP.',
  },
  {
    icon: Smartphone,
    title: 'Direct mobile SDK integration',
    description:
      'First-party SDKs so Android and iOS apps can verify, autofill, and report delivery without re-plumbing REST for every release train.',
  },
];

export function UpcomingFeaturesSection() {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5" aria-hidden />
            Roadmap
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Upcoming features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We are investing beyond core SMS OTP: deeper DLT tooling,
            WhatsApp with campaign scheduling, and SDK-first integrations for
            mobile teams. Timelines will ship in product changelog order—this
            is what we are building toward next.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roadmapItems.map((item) => (
            <Card key={item.title} className="border bg-background/80">
              <CardHeader>
                <item.icon className="h-8 w-8 text-primary" aria-hidden />
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="text-pretty">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="mx-auto mt-12 max-w-3xl border-primary/20 bg-background/90">
          <CardHeader>
            <CardTitle className="text-lg">Custom feature requests</CardTitle>
            <CardDescription className="text-pretty">
              Many messaging vendors only sell fixed bundles. StartMessaging
              is different: we are opening a{' '}
              <strong>custom engineering lane</strong> for serious teams that
              need bespoke routing, compliance, or channel behaviour.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              If you need something that is not on the public roadmap yet,
              email us at{' '}
              <a
                href={CUSTOM_FEATURES_REQUEST_MAILTO}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {CUSTOM_FEATURES_REQUEST_EMAIL}
              </a>{' '}
              with your volume, timelines, and a short technical brief—we reply
              to qualified requests with a feasibility note and next steps.
            </p>
            <p>
              Already live today:{' '}
              <Link href="/otp-api" className="text-primary hover:underline">
                OTP API
              </Link>
              ,{' '}
              <Link href="/pricing" className="text-primary hover:underline">
                wallet pricing
              </Link>
              , and{' '}
              <Link href="/videos" className="text-primary hover:underline">
                video walkthroughs
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
