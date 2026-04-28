import type { BreadcrumbItem } from "./breadcrumbs";
import { SITE_URL, SITE_NAME, SITE_OG_IMAGE } from "./metadata";

const PRODUCT_SKU = "SM-OTP-API-INR";

function merchantOfferFields() {
  return {
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/pricing`,
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      merchantReturnLink: `${SITE_URL}/refund-policy`,
      returnFees: "https://schema.org/FreeReturn",
      refundType: "https://schema.org/FullRefund",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "INR",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "IN",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 0,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 1,
          unitCode: "MIN",
        },
      },
    },
  };
}

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: SITE_OG_IMAGE,
    },
    image: SITE_OG_IMAGE,
    description:
      "DLT-free OTP API for Indian developers. Send OTPs via SMS without DLT registration.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-6376383348",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "StartMessaging OTP API",
    description:
      "Pay-as-you-go OTP API for Indian developers. No DLT registration required.",
    sku: PRODUCT_SKU,
    image: [SITE_OG_IMAGE],
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: "0.25",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      ...merchantOfferFields(),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "0.25",
        priceCurrency: "INR",
        unitText: "per OTP",
      },
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StartMessaging OTP API",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    image: SITE_OG_IMAGE,
    description:
      "RESTful API to send and verify OTPs via SMS. No DLT registration needed.",
    offers: {
      "@type": "Offer",
      price: "0.25",
      priceCurrency: "INR",
      ...merchantOfferFields(),
    },
  };
}

export function blogListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description:
      "Guides, tutorials, and updates about OTP APIs, SMS delivery, and phone verification for Indian developers.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function blogPostJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
}) {
  const imageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&desc=${encodeURIComponent(post.description)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: SITE_OG_IMAGE,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}
