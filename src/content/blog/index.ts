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
];

// Sort by publishedAt descending (newest first)
export const allPosts = posts.sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);
