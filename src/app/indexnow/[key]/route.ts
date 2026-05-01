import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{ key: string }>;
}

export const dynamic = 'force-static';

export async function GET(_req: Request, { params }: Params) {
  const { key: filename } = await params;
  const expected = process.env.INDEXNOW_KEY;
  if (!expected || filename !== `${expected}.txt`) notFound();
  return new Response(expected, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
