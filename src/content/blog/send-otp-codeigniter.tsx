import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-codeigniter',
  title: 'How to Send OTP with CodeIgniter 4 (2026)',
  description:
    'CodeIgniter 4 OTP tutorial using StartMessaging. Uses CURLRequest, Config files for keys, and Session for the request ID. Drop-in patterns for Indian dev shops.',
  category: 'tutorials',
  keywords: [
    'send otp codeigniter',
    'codeigniter 4 otp',
    'ci4 sms otp',
    'codeigniter authentication',
  ],
  publishedAt: '2026-05-10',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'config', title: 'Config' },
    { id: 'library', title: 'StartMessaging Library' },
    { id: 'controller', title: 'Auth Controller' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-php-laravel',
    'send-otp-symfony',
    'send-otp-wordpress',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Why is CodeIgniter still common in India?',
      answer:
        'Many Indian agencies and SMB SaaS run on CI 3 / 4 — light-weight, simple to host on shared infra, and well-documented. OTP integration is just an HTTP call, so any framework works.',
    },
  ],
  content: (
    <>
      <p>
        CodeIgniter 4 is widely used by Indian agencies. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> via CURLRequest.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`composer create-project codeigniter4/appstarter otp-ci
cd otp-ci`}</code>
      </pre>

      <h2 id="config">Config</h2>
      <pre>
        <code>{`# .env
SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx
SM_BASE_URL=https://api.startmessaging.com`}</code>
      </pre>

      <h2 id="library">StartMessaging Library</h2>
      <pre>
        <code>{`<?php
// app/Libraries/StartMessaging.php
namespace App\\Libraries;

use CodeIgniter\\HTTP\\CURLRequest;

class StartMessaging
{
    private CURLRequest $client;

    public function __construct()
    {
        $this->client = service('curlrequest', [
            'baseURI' => env('SM_BASE_URL'),
            'headers' => [
                'X-API-Key'    => env('SM_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'timeout' => 10,
        ]);
    }

    public function sendOtp(string $phone): array
    {
        $r = $this->client->post('/otp/send', [
            'json' => ['phoneNumber' => $phone, 'idempotencyKey' => bin2hex(random_bytes(16))],
        ]);
        return json_decode((string) $r->getBody(), true)['data'];
    }

    public function verifyOtp(string $rid, string $code): bool
    {
        $r = $this->client->post('/otp/verify', [
            'json' => ['requestId' => $rid, 'otpCode' => $code],
            'http_errors' => false,
        ]);
        return $r->getStatusCode() === 200;
    }
}`}</code>
      </pre>

      <h2 id="controller">Auth Controller</h2>
      <pre>
        <code>{`<?php
// app/Controllers/Auth.php
namespace App\\Controllers;

use App\\Libraries\\StartMessaging;

class Auth extends BaseController
{
    public function sendOtp()
    {
        $sm = new StartMessaging();
        $data = $sm->sendOtp($this->request->getJsonVar('phoneNumber'));
        session()->set('otp_req', $data['requestId']);
        return $this->response->setJSON(['expiresAt' => $data['expiresAt']]);
    }

    public function verifyOtp()
    {
        $sm = new StartMessaging();
        $rid = session()->get('otp_req');
        if (!$rid) return $this->response->setStatusCode(400)->setJSON(['error' => 'no otp']);
        $ok = $sm->verifyOtp($rid, $this->request->getJsonVar('otpCode'));
        return $this->response->setStatusCode($ok ? 200 : 401)->setJSON(['verified' => $ok]);
    }
}`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Looking for the same thing in Laravel?{' '}
        <Link href="/blog/send-otp-php-laravel">Our Laravel guide</Link>.
      </p>
    </>
  ),
};
