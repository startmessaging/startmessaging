import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-electron-desktop',
  title: 'How to Send OTP in an Electron Desktop App (2026)',
  description:
    'Electron OTP tutorial using StartMessaging. Calls a thin remote backend (never embed API keys in the desktop bundle), uses safeStorage for the session token.',
  category: 'tutorials',
  keywords: [
    'send otp electron',
    'electron desktop otp',
    'electron sms otp',
    'electron authentication',
  ],
  publishedAt: '2026-05-13',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'security', title: 'Security First' },
    { id: 'main', title: 'Main Process — Network Bridge' },
    { id: 'preload', title: 'Preload Bridge' },
    { id: 'renderer', title: 'Renderer UI' },
    { id: 'session', title: 'Session via safeStorage' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-nodejs',
    'send-otp-express',
    'send-otp-react-native-expo',
  ],
  faq: [
    {
      question: 'Should I put the API key in the Electron app?',
      answer:
        'Never. Anyone can unpack a .asar bundle and read it. Always call your own backend, which holds the API key.',
    },
  ],
  content: (
    <>
      <p>
        Electron desktop apps need OTP login like any other client — but the
        key rule is: API keys do not live in the desktop bundle. Always
        proxy through a backend.
      </p>

      <h2 id="security">Security First</h2>
      <ul>
        <li>Backend holds SM_API_KEY.</li>
        <li>Electron app calls backend over HTTPS.</li>
        <li>Use <code>contextIsolation: true</code> and <code>nodeIntegration: false</code>.</li>
      </ul>

      <h2 id="main">Main Process — Network Bridge</h2>
      <pre>
        <code>{`// src/main/handlers.ts
import { ipcMain, net } from 'electron';

ipcMain.handle('auth:send-otp', async (_e, phone: string) => {
  const r = await net.fetch('https://your-backend.example.com/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: phone }),
  });
  return r.json();
});`}</code>
      </pre>

      <h2 id="preload">Preload Bridge</h2>
      <pre>
        <code>{`// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('auth', {
  sendOtp: (phone: string) => ipcRenderer.invoke('auth:send-otp', phone),
  verifyOtp: (requestId: string, code: string) =>
    ipcRenderer.invoke('auth:verify-otp', { requestId, code }),
});`}</code>
      </pre>

      <h2 id="renderer">Renderer UI</h2>
      <pre>
        <code>{`// React component
const send = async () => {
  const r = await window.auth.sendOtp(phone);
  setRequestId(r.requestId);
};
const verify = async () => {
  await window.auth.verifyOtp(requestId, code);
};`}</code>
      </pre>

      <h2 id="session">Session via safeStorage</h2>
      <pre>
        <code>{`import { safeStorage } from 'electron';
const buf = safeStorage.encryptString(token);
// store buf in user data dir`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        For the backend half see{' '}
        <Link href="/blog/send-otp-express">our Express guide</Link>.
      </p>
    </>
  ),
};
