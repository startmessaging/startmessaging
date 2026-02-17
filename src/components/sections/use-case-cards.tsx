import {
  LogIn,
  ShieldCheck,
  CreditCard,
  UserPlus,
  Bell,
  Package,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const useCases = [
  {
    icon: LogIn,
    title: 'User Login',
    description:
      'Verify users during login with SMS OTP. Add a second factor of authentication without passwords.',
  },
  {
    icon: ShieldCheck,
    title: 'Two-Factor Authentication',
    description:
      'Add 2FA to sensitive actions like password changes, settings updates, or admin access.',
  },
  {
    icon: CreditCard,
    title: 'Payment Verification',
    description:
      'Verify high-value transactions, wallet top-ups, or UPI mandate approvals with OTP confirmation.',
  },
  {
    icon: UserPlus,
    title: 'User Registration',
    description:
      'Verify phone numbers during signup to prevent fake accounts and ensure real users.',
  },
  {
    icon: Bell,
    title: 'Order Confirmations',
    description:
      'Send order confirmation codes for delivery verification or pickup authorization.',
  },
  {
    icon: Package,
    title: 'Delivery Verification',
    description:
      'Confirm delivery handoffs with OTP codes shared between delivery agents and customers.',
  },
];

export function UseCaseCards() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Every Use Case
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From simple login OTPs to complex payment flows, StartMessaging
            handles it all.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.title}>
              <CardHeader className="pb-3">
                <useCase.icon className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
