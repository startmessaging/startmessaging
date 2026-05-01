import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-nestjs',
  title: 'How to Send OTP with NestJS (2026 Tutorial)',
  description:
    'Complete NestJS guide to send and verify SMS OTPs via StartMessaging. Covers a typed service, DTOs, ConfigModule, ThrottlerGuard, exception filters and Jest tests.',
  category: 'tutorials',
  keywords: [
    'send otp nestjs',
    'nestjs otp api',
    'nestjs sms otp',
    'nestjs authentication',
    'nestjs throttler otp',
    'startmessaging nestjs',
  ],
  publishedAt: '2026-04-26',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'project-setup', title: 'Project Setup' },
    { id: 'config', title: 'Configuration Module' },
    { id: 'service', title: 'StartMessaging Service' },
    { id: 'controller', title: 'Auth Controller and DTOs' },
    { id: 'throttling', title: 'Throttling per Phone' },
    { id: 'exception-filter', title: 'Exception Filter' },
    { id: 'tests', title: 'Tests with Jest' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-nodejs',
    'send-otp-express',
    'send-otp-nextjs-app-router',
    'send-otp-fastapi',
    'otp-rate-limiting-guide',
  ],
  faq: [
    {
      question: 'Should I use HttpModule or fetch?',
      answer:
        'Either works. HttpModule wraps Axios and integrates nicely with NestJS interceptors. Native fetch with AbortSignal.timeout is simpler and has fewer dependencies. We use fetch in this guide for portability.',
    },
    {
      question: 'How do I share the OTP service across multiple modules?',
      answer:
        'Make StartMessagingService global by exporting it from a module decorated with @Global(). Most teams keep it scoped to AuthModule and explicitly import it where needed.',
    },
    {
      question: 'Can I integrate this with Passport.js?',
      answer:
        'Yes. After OTP verification, issue a JWT and use Passport-jwt for downstream guards. The OTP step replaces the password step, not the session step.',
    },
  ],
  content: (
    <>
      <p>
        NestJS gives you typed dependency injection, declarative controllers,
        and a healthy testing story out of the box — all good things for an
        auth flow. This tutorial wires up{' '}
        <Link href="/otp-api">StartMessaging</Link> as a first-class service
        with DTOs, throttling, exception mapping, and Jest unit tests.
      </p>

      <h2 id="project-setup">Project Setup</h2>
      <pre>
        <code>{`npx @nestjs/cli new otp-nestjs --package-manager pnpm
cd otp-nestjs
pnpm add @nestjs/config @nestjs/throttler class-validator class-transformer
pnpm add -D @types/node`}</code>
      </pre>

      <h2 id="config">Configuration Module</h2>
      <pre>
        <code>{`// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 3600_000, limit: 5 }]),
    AuthModule,
  ],
})
export class AppModule {}`}</code>
      </pre>
      <p>Add to <code>.env</code>:</p>
      <pre>
        <code>{`SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx
SM_BASE_URL=https://api.startmessaging.com`}</code>
      </pre>

      <h2 id="service">StartMessaging Service</h2>
      <pre>
        <code>{`// src/auth/sm.service.ts
import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

interface SmEnvelope<T> { data: T; }
interface SendData { requestId: string; expiresAt: string; attemptsLeft: number; }
interface VerifyData { verified: true; }

@Injectable()
export class StartMessagingService {
  constructor(private readonly cfg: ConfigService) {}

  async sendOtp(phoneNumber: string): Promise<SendData> {
    return this.post<SendData>('/otp/send', {
      phoneNumber,
      idempotencyKey: randomUUID(),
    });
  }

  async verifyOtp(requestId: string, otpCode: string): Promise<VerifyData> {
    return this.post<VerifyData>('/otp/verify', { requestId, otpCode });
  }

  private async post<T>(path: string, body: object): Promise<T> {
    const url = this.cfg.getOrThrow<string>('SM_BASE_URL') + path;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.cfg.getOrThrow<string>('SM_API_KEY'),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    const json: SmEnvelope<T> & { message?: string } = await res
      .json()
      .catch(() => ({} as any));
    if (!res.ok) {
      throw new HttpException(json.message ?? 'OTP API error', res.status);
    }
    return json.data;
  }
}`}</code>
      </pre>

      <h2 id="controller">Auth Controller and DTOs</h2>
      <pre>
        <code>{`// src/auth/dto/send-otp.dto.ts
import { Matches } from 'class-validator';

export class SendOtpDto {
  @Matches(/^\\+91\\d{10}$/, { message: 'phoneNumber must be E.164 (+91XXXXXXXXXX)' })
  phoneNumber!: string;
}

// src/auth/dto/verify-otp.dto.ts
import { IsString, Length, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  requestId!: string;

  @Matches(/^\\d{4,8}$/, { message: 'otpCode must be 4–8 digits' })
  otpCode!: string;
}

// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { StartMessagingService } from './sm.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly sm: StartMessagingService) {}

  @Post('send-otp')
  send(@Body() body: SendOtpDto) {
    return this.sm.sendOtp(body.phoneNumber);
  }

  @Post('verify-otp')
  verify(@Body() body: VerifyOtpDto) {
    return this.sm.verifyOtp(body.requestId, body.otpCode);
  }
}`}</code>
      </pre>

      <h2 id="throttling">Throttling per Phone</h2>
      <p>
        Use Nest&rsquo;s ThrottlerGuard to cap per-IP, then layer a per-phone
        check inside the controller using a small Redis-backed map. See our{' '}
        <Link href="/blog/otp-rate-limiting-guide">rate-limiting guide</Link>.
      </p>

      <h2 id="exception-filter">Exception Filter</h2>
      <pre>
        <code>{`// src/common/sm-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class SmExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const userMessage =
      status === 402 ? 'Service temporarily unavailable.' :
      status === 410 ? 'OTP expired. Request a new one.' :
      exception.message;

    host.switchToHttp().getResponse<Response>()
      .status(status === 402 ? 503 : status)
      .json({ error: userMessage });
  }
}`}</code>
      </pre>

      <h2 id="tests">Tests with Jest</h2>
      <pre>
        <code>{`// src/auth/sm.service.spec.ts
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { StartMessagingService } from './sm.service';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ data: { requestId: 'req_abc', expiresAt: 'X', attemptsLeft: 3 } }),
    status: 200,
  } as any);
});

it('sends an OTP', async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ ignoreEnvFile: true, load: [() => ({
      SM_API_KEY: 'k', SM_BASE_URL: 'https://api.startmessaging.com',
    })] })],
    providers: [StartMessagingService],
  }).compile();

  const svc = moduleRef.get(StartMessagingService);
  const data = await svc.sendOtp('+919876543210');
  expect(data.requestId).toBe('req_abc');
});`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        For more flavours of the same recipe see{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link>,{' '}
        <Link href="/blog/send-otp-express">Express</Link>,{' '}
        <Link href="/blog/send-otp-nextjs-app-router">Next.js App Router</Link>,
        and the full <Link href="/blog">tutorial library</Link>. Our{' '}
        <Link href="/otp-api">API reference</Link> has the canonical request /
        response shapes.
      </p>
    </>
  ),
};
