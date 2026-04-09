import { KeyRound, Wallet, Send } from 'lucide-react';

const steps = [
  {
    icon: KeyRound,
    step: '1',
    title: 'Get Your API Key',
    description:
      'Sign up and create an API key from the dashboard. It takes less than a minute.',
  },
  {
    icon: Wallet,
    step: '2',
    title: 'Top Up Your Wallet',
    description:
      'Add funds to your wallet via Razorpay. Pay as you go for each OTP you send.',
  },
  {
    icon: Send,
    step: '3',
    title: 'Send OTPs',
    description:
      'Make a single POST request to our API. We handle delivery, retries, and tracking.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Go from zero to sending OTPs in three simple steps.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <item.icon className="h-7 w-7" />
              </div>
              <div className="mt-1 text-xs font-medium text-muted-foreground">
                Step {item.step}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
