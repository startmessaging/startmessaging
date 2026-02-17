import { AlertTriangle, Clock, FileText, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const painPoints = [
  {
    icon: Building2,
    title: 'Entity Registration',
    description:
      'Register your business entity with the DLT platform. Requires company documents, GST certificate, and PAN card.',
  },
  {
    icon: FileText,
    title: 'Template Approval',
    description:
      'Submit every message template for approval. Each template takes 1-7 days to get approved. Changes need re-approval.',
  },
  {
    icon: AlertTriangle,
    title: 'Header Registration',
    description:
      'Register sender IDs (headers) with the DLT platform. Each header needs separate approval from your telco.',
  },
  {
    icon: Clock,
    title: '2-4 Week Wait',
    description:
      'The entire DLT registration process takes 2-4 weeks minimum. Any mistakes mean starting over.',
  },
];

export function DltExplainer() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What is DLT and Why is it a Problem?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            TRAI&apos;s Distributed Ledger Technology (DLT) framework requires
            every business to register before sending SMS in India. Here&apos;s
            what that involves:
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {painPoints.map((point) => (
            <Card key={point.title}>
              <CardHeader className="pb-3">
                <point.icon className="mb-2 h-8 w-8 text-destructive" />
                <CardTitle className="text-base">{point.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
