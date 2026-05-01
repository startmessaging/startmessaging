import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-symfony',
  title: 'How to Send OTP with Symfony (2026)',
  description:
    'Symfony OTP tutorial using StartMessaging. Uses HttpClient, ParameterBag for secrets, Form component for validation, and Session for storing the request ID.',
  category: 'tutorials',
  keywords: [
    'send otp symfony',
    'symfony otp tutorial',
    'symfony sms otp',
    'symfony authentication',
  ],
  publishedAt: '2026-05-10',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'config', title: 'Service Configuration' },
    { id: 'service', title: 'StartMessagingService' },
    { id: 'controller', title: 'Auth Controller' },
    { id: 'forms', title: 'Form Types' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-php-laravel',
    'send-otp-codeigniter',
    'send-otp-wordpress',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Should I use Symfony Messenger for OTP send?',
      answer:
        'OTP send is synchronous (the user is waiting). Messenger only adds value for retry / failover orchestration. Start synchronous, queue if you need it.',
    },
  ],
  content: (
    <>
      <p>
        Symfony&rsquo;s service-container model and HttpClient make OTP
        integration straightforward. This tutorial uses{' '}
        <Link href="/otp-api">StartMessaging</Link>.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`symfony new otp-symfony --webapp
cd otp-symfony
composer require symfony/http-client`}</code>
      </pre>

      <h2 id="config">Service Configuration</h2>
      <pre>
        <code>{`# .env
SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx
SM_BASE_URL=https://api.startmessaging.com`}</code>
      </pre>
      <pre>
        <code>{`# config/services.yaml
services:
  App\\Service\\StartMessagingService:
    arguments:
      $apiKey: '%env(SM_API_KEY)%'
      $baseUrl: '%env(SM_BASE_URL)%'`}</code>
      </pre>

      <h2 id="service">StartMessagingService</h2>
      <pre>
        <code>{`<?php
// src/Service/StartMessagingService.php
namespace App\\Service;

use Symfony\\Contracts\\HttpClient\\HttpClientInterface;
use Symfony\\Component\\Uid\\Uuid;

class StartMessagingService
{
    public function __construct(
        private HttpClientInterface $client,
        private string $apiKey,
        private string $baseUrl,
    ) {}

    public function sendOtp(string $phoneNumber): array
    {
        $r = $this->client->request('POST', $this->baseUrl.'/otp/send', [
            'headers' => ['X-API-Key' => $this->apiKey, 'Content-Type' => 'application/json'],
            'json' => ['phoneNumber' => $phoneNumber, 'idempotencyKey' => Uuid::v4()->toRfc4122()],
            'timeout' => 10,
        ]);
        return $r->toArray()['data'];
    }

    public function verifyOtp(string $requestId, string $otpCode): bool
    {
        $r = $this->client->request('POST', $this->baseUrl.'/otp/verify', [
            'headers' => ['X-API-Key' => $this->apiKey, 'Content-Type' => 'application/json'],
            'json' => ['requestId' => $requestId, 'otpCode' => $otpCode],
        ]);
        return $r->getStatusCode() === 200;
    }
}`}</code>
      </pre>

      <h2 id="controller">Auth Controller</h2>
      <pre>
        <code>{`<?php
// src/Controller/AuthController.php
namespace App\\Controller;

use App\\Service\\StartMessagingService;
use Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;
use Symfony\\Component\\HttpFoundation\\Request;
use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Attribute\\Route;

class AuthController extends AbstractController
{
    #[Route('/auth/send-otp', methods: ['POST'])]
    public function send(Request $request, StartMessagingService $sm): Response
    {
        $phone = $request->getPayload()->getString('phoneNumber');
        $data = $sm->sendOtp($phone);
        $request->getSession()->set('otp_req', $data['requestId']);
        return $this->json(['expiresAt' => $data['expiresAt']]);
    }

    #[Route('/auth/verify-otp', methods: ['POST'])]
    public function verify(Request $request, StartMessagingService $sm): Response
    {
        $code = $request->getPayload()->getString('otpCode');
        $rid = $request->getSession()->get('otp_req');
        if (!$rid) return $this->json(['error' => 'no active otp'], 400);
        $ok = $sm->verifyOtp($rid, $code);
        if (!$ok) return $this->json(['error' => 'invalid'], 401);
        $request->getSession()->remove('otp_req');
        $request->getSession()->set('userPhone', 'verified');
        return $this->json(['verified' => true]);
    }
}`}</code>
      </pre>

      <h2 id="forms">Form Types</h2>
      <p>
        Use <code>Symfony\Component\Validator\Constraints</code> to enforce
        E.164 phone shape and 4–8 digit OTP shape on incoming requests.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Same flow in PHP/Laravel? See{' '}
        <Link href="/blog/send-otp-php-laravel">our Laravel guide</Link>.
      </p>
    </>
  ),
};
