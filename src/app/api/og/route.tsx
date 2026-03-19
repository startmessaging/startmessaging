import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "StartMessaging";
    const desc = searchParams.get("desc") || "DLT-Free OTP API for Indian Developers";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          {/* Left Section - White with Logo */}
          <div
            style={{
              width: "40%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              padding: 40,
            }}
          >
            {/* Custom Logo element */}
            <div style={{
               width: 160,
               height: 160,
               borderRadius: 32,
               backgroundColor: '#4338ca',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginBottom: 24,
               boxShadow: '0 8px 32px rgba(67, 56, 202, 0.2)',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
              </svg>
            </div>
            {/* Brand Name */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#4338ca",
                  letterSpacing: "-0.02em",
                }}
              >
                StartMessaging
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#6b7280",
                  marginTop: 4,
                }}
              >
                startmessaging.com
              </span>
            </div>
          </div>

          {/* Right Section - Indigo/Blue with Content */}
          <div
            style={{
              width: "60%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundImage: "linear-gradient(135deg, #4F46E5 0%, #312E81 100%)",
              padding: "60px 50px",
              position: "relative",
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -80,
                right: 100,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />

            {/* Main Title */}
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: 20,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: 28,
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {desc}
            </div>

            {/* Bottom tag */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 50,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 16, color: "#fff", fontWeight: 500 }}>
                🚀 Built for Indian Developers
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error("OG Image generation failed:", e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
