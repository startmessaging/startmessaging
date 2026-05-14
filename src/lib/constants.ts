/** Custom roadmap and enterprise integrations (displayed on marketing pages). */
export const CUSTOM_FEATURES_REQUEST_EMAIL = "startmessagingdotcom@gmail.com";
export const CUSTOM_FEATURES_REQUEST_MAILTO = `mailto:${CUSTOM_FEATURES_REQUEST_EMAIL}?subject=${encodeURIComponent("Custom feature request — StartMessaging")}`;

export const WHATSAPP_NUMBER = "916376383348";
export const WHATSAPP_MESSAGE = "Hi, I need help with StartMessaging";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.startmessaging.com";
export const API_DOCS_URL = "https://api.startmessaging.com/api/docs";

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/videos", label: "Videos" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dlt-free-otp", label: "DLT Free OTP" },
  { href: "/otp-api", label: "API Docs" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/videos", label: "Video guides" },
    { href: "/pricing", label: "Pricing" },
    { href: "/otp-api", label: "API Documentation" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/limits", label: "API Limits" },
  ],
  solutions: [
    { href: "/dlt-free-otp", label: "DLT Free OTP" },
    { href: "/send-otp-without-dlt", label: "Send OTP Without DLT" },
    { href: "/bulk-otp-api", label: "Bulk OTP API" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
} as const;

export const CODE_SNIPPETS = {
  curl: `curl -X POST https://api.startmessaging.com/otp/send \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: sm_live_your_api_key_here" \\
  -d '{
    "phoneNumber": "+919876543210",
    "templateId": "YOUR_TEMPLATE_ID",
    "variables": {
      "otp": "123456",
      "appName": "YourApp"
    }
  }'`,
  nodejs: `const response = await fetch("https://api.startmessaging.com/otp/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "sm_live_your_api_key_here",
  },
  body: JSON.stringify({
    phoneNumber: "+919876543210",
    templateId: "YOUR_TEMPLATE_ID",
    variables: {
      otp: "123456",
      appName: "YourApp",
    },
  }),
});

const data = await response.json();
console.log(data);`,
  python: `import requests

response = requests.post(
    "https://api.startmessaging.com/otp/send",
    headers={
        "Content-Type": "application/json",
        "X-API-Key": "sm_live_your_api_key_here",
    },
    json={
        "phoneNumber": "+919876543210",
        "templateId": "YOUR_TEMPLATE_ID",
        "variables": {
            "otp": "123456",
            "appName": "YourApp"
        },
    },
)

data = response.json()
print(data)`,
  php: `$ch = curl_init("https://api.startmessaging.com/otp/send");

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "X-API-Key: sm_live_your_api_key_here",
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "phoneNumber" => "+919876543210",
        "templateId" => "YOUR_TEMPLATE_ID",
        "variables" => [
            "otp" => "123456",
            "appName" => "YourApp"
        ]
    ]),
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);`,
  java: `import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();

String body = """
    {
      "phoneNumber": "+919876543210",
      "templateId": "YOUR_TEMPLATE_ID",
      "variables": {
        "otp": "123456",
        "appName": "YourApp"
      }
    }
    """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.startmessaging.com/otp/send"))
    .header("Content-Type", "application/json")
    .header("X-API-Key", "sm_live_your_api_key_here")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
  go: `package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "net/http"
  "io"
)

func main() {
  payload, _ := json.Marshal(map[string]interface{}{
    "phoneNumber": "+919876543210",
    "templateId":  "YOUR_TEMPLATE_ID",
    "variables": map[string]string{
      "otp":     "123456",
      "appName": "YourApp",
    },
  })

  req, _ := http.NewRequest("POST", "https://api.startmessaging.com/otp/send", bytes.NewBuffer(payload))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("X-API-Key", "sm_live_your_api_key_here")

  resp, _ := http.DefaultClient.Do(req)
  defer resp.Body.Close()

  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}`,
} as const;

export const LANGUAGE_TABS = [
  { value: "curl", label: "cURL" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "php", label: "PHP" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
] as const;
