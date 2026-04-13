import type { BlogPost } from '@/types/blog';

import { post as sendOtpNodejs } from './send-otp-nodejs';
import { post as sendOtpPython } from './send-otp-python';
import { post as sendOtpPhpLaravel } from './send-otp-php-laravel';
import { post as otpVerificationFlow } from './otp-verification-flow';
import { post as idempotencyKeysOtp } from './idempotency-keys-otp';
import { post as otpSecurityBestPractices } from './otp-security-best-practices';
import { post as otpRateLimitingGuide } from './otp-rate-limiting-guide';
import { post as smsOtpVsWhatsappOtp } from './sms-otp-vs-whatsapp-otp';
import { post as preventOtpFraud } from './prevent-otp-fraud';
import { post as otpExpiryAttemptLimits } from './otp-expiry-attempt-limits';
import { post as bestOtpApiIndia } from './best-otp-api-india';
import { post as twilioVsStartmessaging } from './twilio-vs-startmessaging';
import { post as msg91VsStartmessaging } from './msg91-vs-startmessaging';
import { post as firebaseAuthVsCustomOtp } from './firebase-auth-vs-custom-otp';
import { post as otpDeliveryRatesIndia } from './otp-delivery-rates-india';
import { post as whatIsDltRegistrationIndia } from './what-is-dlt-registration-india';
import { post as dltTemplateApprovalGuide } from './dlt-template-approval-guide';
import { post as traiSmsRegulations2026 } from './trai-sms-regulations-2026';
import { post as otpDataPrivacyIndia } from './otp-data-privacy-india';
import { post as transactionalVsPromotionalSmsIndia } from './transactional-vs-promotional-sms-india';
import { post as otpEcommerceIndia } from './otp-ecommerce-india';
import { post as otpFintechIndia } from './otp-fintech-india';
import { post as otpHealthcareTelemedicine } from './otp-healthcare-telemedicine';
import { post as otpEdtechStudentVerification } from './otp-edtech-student-verification';
import { post as otpFoodDeliveryLogistics } from './otp-food-delivery-logistics';
import { post as startSmsResellingBusinessIndia } from './start-sms-reselling-business-india';
import { post as smsReferralProgramGuide } from './sms-referral-program-guide';
import { post as otpApiPricingComparisonIndia } from './otp-api-pricing-comparison-india';
import { post as buildOtpSaasProduct } from './build-otp-saas-product';
import { post as migrateSmsProviderChecklist } from './migrate-sms-provider-checklist';
import { post as smsSenderIdIndiaOtpGuide } from './sms-sender-id-india-otp-guide';
import { post as phoneVerificationAtScaleBestPractices } from './phone-verification-at-scale-best-practices';
import { post as otpSmsDeliverabilityChecklist } from './otp-sms-deliverability-checklist';
import { post as otpAutofillAndroidIosSmsRetriever } from './otp-autofill-android-ios-sms-retriever';
import { post as smsOtpVsEmailMagicLinkVsTotp } from './sms-otp-vs-email-magic-link-vs-totp';
import { post as payAsYouGoWalletInrSmsApi } from './pay-as-you-go-wallet-inr-sms-api';
import { post as otpDeliveryStatusPollingVsWebhooks } from './otp-delivery-status-polling-vs-webhooks';
import { post as testingOtpFlowsStagingSandboxes } from './testing-otp-flows-staging-sandboxes';
import { post as smsApiKeyRotationDevelopers } from './sms-api-key-rotation-developers';
import { post as voiceOtpVsSmsOtpIndia } from './voice-otp-vs-sms-otp-india';
import { post as mobileAppOtpBackendReactNativeFlutter } from './mobile-app-otp-backend-react-native-flutter';
import { post as otpMonitoringSlosErrorBudgets } from './otp-monitoring-slos-error-budgets';
import { post as sendOtpJavaSpringBoot } from './send-otp-java-spring-boot';
import { post as sendOtpGoGolang } from './send-otp-go-golang';
import { post as sendOtpRubyOnRails } from './send-otp-ruby-on-rails';
import { post as sendOtpDotnetCsharp } from './send-otp-dotnet-csharp';
import { post as sendOtpNextjsAppRouter } from './send-otp-nextjs-app-router';
import { post as sendOtpDjango } from './send-otp-django';
import { post as sendOtpFlask } from './send-otp-flask';
import { post as sendOtpKotlinAndroid } from './send-otp-kotlin-android';
import { post as sendOtpSwiftIos } from './send-otp-swift-ios';
import { post as sendOtpRustAxum } from './send-otp-rust-axum';
import { post as sendOtpSupabaseEdgeFunctions } from './send-otp-supabase-edge-functions';
import { post as fast2smsVsStartmessaging } from './fast2sms-vs-startmessaging';
import { post as textlocalVsStartmessaging } from './textlocal-vs-startmessaging';
import { post as exotelVsStartmessaging } from './exotel-vs-startmessaging';
import { post as plivoVsStartmessaging } from './plivo-vs-startmessaging';
import { post as vonageVsStartmessaging } from './vonage-vs-startmessaging';
import { post as otpBotAttacksTrafficPumping } from './otp-bot-attacks-traffic-pumping';
import { post as simSwapOtpProtectionIndia } from './sim-swap-otp-protection-india';
import { post as otpSmishingPhishingPrevention } from './otp-smishing-phishing-prevention';
import { post as rbi2fa2026Mandate } from './rbi-2fa-2026-mandate';
import { post as silentAuthenticationVsOtpIndia } from './silent-authentication-vs-otp-india';
import { post as dltTemplateVariablesRulesIndia } from './dlt-template-variables-rules-india';
import { post as traiMessageScrubbingIndia } from './trai-message-scrubbing-india';
import { post as unicodeRegionalLanguageSmsIndia } from './unicode-regional-language-sms-india';
import { post as otpRealEstateIndia } from './otp-real-estate-india';
import { post as otpGamingFantasyIndia } from './otp-gaming-fantasy-india';
import { post as otpCryptoWeb3India } from './otp-crypto-web3-india';
import { post as otpGovernmentCitizenServicesIndia } from './otp-government-citizen-services-india';
import { post as otpHyperlocalServicesIndia } from './otp-hyperlocal-services-india';
import { post as reduceSmsOtpCostIndia } from './reduce-sms-otp-cost-india';
import { post as chooseOtpProviderStartupIndia } from './choose-otp-provider-startup-india';

const posts: BlogPost[] = [
  sendOtpNodejs,
  sendOtpPython,
  sendOtpPhpLaravel,
  otpVerificationFlow,
  idempotencyKeysOtp,
  otpSecurityBestPractices,
  otpRateLimitingGuide,
  smsOtpVsWhatsappOtp,
  preventOtpFraud,
  otpExpiryAttemptLimits,
  bestOtpApiIndia,
  twilioVsStartmessaging,
  msg91VsStartmessaging,
  firebaseAuthVsCustomOtp,
  otpDeliveryRatesIndia,
  whatIsDltRegistrationIndia,
  dltTemplateApprovalGuide,
  traiSmsRegulations2026,
  otpDataPrivacyIndia,
  transactionalVsPromotionalSmsIndia,
  otpEcommerceIndia,
  otpFintechIndia,
  otpHealthcareTelemedicine,
  otpEdtechStudentVerification,
  otpFoodDeliveryLogistics,
  startSmsResellingBusinessIndia,
  smsReferralProgramGuide,
  otpApiPricingComparisonIndia,
  buildOtpSaasProduct,
  migrateSmsProviderChecklist,
  smsSenderIdIndiaOtpGuide,
  phoneVerificationAtScaleBestPractices,
  otpSmsDeliverabilityChecklist,
  otpAutofillAndroidIosSmsRetriever,
  smsOtpVsEmailMagicLinkVsTotp,
  payAsYouGoWalletInrSmsApi,
  otpDeliveryStatusPollingVsWebhooks,
  testingOtpFlowsStagingSandboxes,
  smsApiKeyRotationDevelopers,
  voiceOtpVsSmsOtpIndia,
  mobileAppOtpBackendReactNativeFlutter,
  otpMonitoringSlosErrorBudgets,
  sendOtpJavaSpringBoot,
  sendOtpGoGolang,
  sendOtpRubyOnRails,
  sendOtpDotnetCsharp,
  sendOtpNextjsAppRouter,
  sendOtpDjango,
  sendOtpFlask,
  sendOtpKotlinAndroid,
  sendOtpSwiftIos,
  sendOtpRustAxum,
  sendOtpSupabaseEdgeFunctions,
  fast2smsVsStartmessaging,
  textlocalVsStartmessaging,
  exotelVsStartmessaging,
  plivoVsStartmessaging,
  vonageVsStartmessaging,
  otpBotAttacksTrafficPumping,
  simSwapOtpProtectionIndia,
  otpSmishingPhishingPrevention,
  rbi2fa2026Mandate,
  silentAuthenticationVsOtpIndia,
  dltTemplateVariablesRulesIndia,
  traiMessageScrubbingIndia,
  unicodeRegionalLanguageSmsIndia,
  otpRealEstateIndia,
  otpGamingFantasyIndia,
  otpCryptoWeb3India,
  otpGovernmentCitizenServicesIndia,
  otpHyperlocalServicesIndia,
  reduceSmsOtpCostIndia,
  chooseOtpProviderStartupIndia,
];

// Sort by publishedAt descending (newest first)
export const allPosts = posts.sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);
