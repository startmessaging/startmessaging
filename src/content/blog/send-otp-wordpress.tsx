import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-wordpress',
  title: 'How to Send OTP with WordPress (2026)',
  description:
    'WordPress OTP integration using StartMessaging. Custom plugin with REST API endpoints, options-page for the API key, and a shortcode-based login form. WooCommerce-friendly.',
  category: 'tutorials',
  keywords: [
    'send otp wordpress',
    'wordpress otp plugin',
    'woocommerce otp',
    'wp sms login',
    'wordpress sms otp',
  ],
  publishedAt: '2026-05-10',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'plugin', title: 'Plugin Skeleton' },
    { id: 'options', title: 'Options Page' },
    { id: 'rest', title: 'REST API Endpoints' },
    { id: 'shortcode', title: 'Login Shortcode' },
    { id: 'woocommerce', title: 'WooCommerce Notes' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-php-laravel',
    'send-otp-codeigniter',
    'send-otp-shopify',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Should I use an off-the-shelf WordPress OTP plugin?',
      answer:
        'For most sites yes — search the plugin directory for a maintained option that integrates with our API. The DIY path below is for teams that want full control.',
    },
  ],
  content: (
    <>
      <p>
        WordPress is still the dominant CMS in India. This tutorial shows
        how to wire{' '}
        <Link href="/otp-api">StartMessaging</Link> as a custom plugin with
        REST endpoints and a shortcode form.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Plugin file with a settings page for API key.</li>
        <li>Two REST routes: <code>/otp/send</code>, <code>/otp/verify</code>.</li>
        <li>Shortcode for the login form.</li>
        <li>WooCommerce checkout hook (optional).</li>
      </ol>

      <h2 id="plugin">Plugin Skeleton</h2>
      <pre>
        <code>{`<?php
/**
 * Plugin Name: StartMessaging OTP
 */
defined('ABSPATH') || exit;

require_once __DIR__ . '/inc/options.php';
require_once __DIR__ . '/inc/rest.php';
require_once __DIR__ . '/inc/shortcode.php';`}</code>
      </pre>

      <h2 id="options">Options Page</h2>
      <pre>
        <code>{`<?php
add_action('admin_menu', function () {
  add_options_page('StartMessaging', 'StartMessaging', 'manage_options', 'sm', function () {
    if (isset($_POST['sm_save'])) {
      update_option('sm_api_key', sanitize_text_field($_POST['sm_api_key']));
      echo '<div class="updated"><p>Saved.</p></div>';
    }
    $key = esc_attr(get_option('sm_api_key', ''));
    echo "<form method='post'><h1>StartMessaging</h1><input name='sm_api_key' value='$key' size=60 /><button name='sm_save'>Save</button></form>";
  });
});`}</code>
      </pre>

      <h2 id="rest">REST API Endpoints</h2>
      <pre>
        <code>{`<?php
add_action('rest_api_init', function () {
  register_rest_route('sm/v1', '/send-otp', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function (WP_REST_Request $req) {
      $phone = $req->get_param('phoneNumber');
      $r = wp_remote_post('https://api.startmessaging.com/otp/send', [
        'headers' => ['X-API-Key' => get_option('sm_api_key'), 'Content-Type' => 'application/json'],
        'body'    => json_encode(['phoneNumber' => $phone, 'idempotencyKey' => wp_generate_uuid4()]),
        'timeout' => 10,
      ]);
      $body = json_decode(wp_remote_retrieve_body($r), true);
      if (wp_remote_retrieve_response_code($r) !== 200) return new WP_REST_Response($body, 502);
      $data = $body['data'];
      setcookie('sm_otp_req', $data['requestId'], time() + 900, '/', '', true, true);
      return ['expiresAt' => $data['expiresAt']];
    },
  ]);
  register_rest_route('sm/v1', '/verify-otp', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function (WP_REST_Request $req) {
      $code = $req->get_param('otpCode');
      $rid  = $_COOKIE['sm_otp_req'] ?? null;
      if (!$rid) return new WP_REST_Response(['error' => 'no otp'], 400);
      $r = wp_remote_post('https://api.startmessaging.com/otp/verify', [
        'headers' => ['X-API-Key' => get_option('sm_api_key'), 'Content-Type' => 'application/json'],
        'body'    => json_encode(['requestId' => $rid, 'otpCode' => $code]),
      ]);
      return wp_remote_retrieve_response_code($r) === 200
        ? ['verified' => true]
        : new WP_REST_Response(['error' => 'invalid'], 401);
    },
  ]);
});`}</code>
      </pre>

      <h2 id="shortcode">Login Shortcode</h2>
      <pre>
        <code>{`<?php
add_shortcode('sm_login', function () {
  return '<form id="sm-phone"><input name="phoneNumber" /><button>Send OTP</button></form>
          <form id="sm-otp" hidden><input name="otpCode" /><button>Verify</button></form>
          <script>/* fetch /wp-json/sm/v1/send-otp etc */</script>';
});`}</code>
      </pre>

      <h2 id="woocommerce">WooCommerce Notes</h2>
      <p>
        Hook into <code>woocommerce_checkout_validation</code> to require a
        verified phone before order placement. The same REST endpoints
        plug in.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        For Shopify equivalent see{' '}
        <Link href="/blog/send-otp-shopify">our Shopify guide</Link>.
      </p>
    </>
  ),
};
