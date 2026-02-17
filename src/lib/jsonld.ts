import { SITE_URL, SITE_NAME } from './metadata';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'DLT-free OTP API for Indian developers. Send OTPs via SMS without DLT registration.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9034036789',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function productJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'StartMessaging OTP API',
    description:
      'Pay-as-you-go OTP API for Indian developers. No DLT registration required.',
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      price: '0.25',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '0.25',
        priceCurrency: 'INR',
        unitText: 'per OTP',
      },
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'StartMessaging OTP API',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description:
      'RESTful API to send and verify OTPs via SMS. No DLT registration needed.',
    offers: {
      '@type': 'Offer',
      price: '0.25',
      priceCurrency: 'INR',
    },
  };
}
