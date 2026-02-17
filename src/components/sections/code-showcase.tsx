'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CODE_SNIPPETS, LANGUAGE_TABS } from '@/lib/constants';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={copy}
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}

export function CodeShowcase() {
  const [lang, setLang] = useState('curl');

  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Send an OTP in One API Call
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Works with every language. Just a single POST request.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Tabs value={lang} onValueChange={setLang}>
            <TabsList className="flex flex-wrap">
              {LANGUAGE_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {LANGUAGE_TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="relative rounded-lg border bg-card">
                  <div className="absolute right-3 top-3">
                    <CopyButton
                      value={CODE_SNIPPETS[tab.value as keyof typeof CODE_SNIPPETS]}
                    />
                  </div>
                  <pre className="overflow-x-auto p-4 pr-14 text-sm">
                    <code className="font-mono text-foreground">
                      {CODE_SNIPPETS[tab.value as keyof typeof CODE_SNIPPETS]}
                    </code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
