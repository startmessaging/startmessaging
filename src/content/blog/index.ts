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

// Batch 2026-04 — glossary, framework tutorials, troubleshooting, comparisons
import { post as whatIsOtp } from './what-is-otp';
import { post as whatIs2fa } from './what-is-2fa';
import { post as whatIsMfa } from './what-is-mfa';
import { post as whatIsTotp } from './what-is-totp';
import { post as whatIsHotp } from './what-is-hotp';
import { post as whatIsSmsGateway } from './what-is-sms-gateway';
import { post as whatIsSmsApi } from './what-is-sms-api';
import { post as whatIsSmsOtp } from './what-is-sms-otp';
import { post as whatIsVoiceOtp } from './what-is-voice-otp';
import { post as whatIsFlashCallAuth } from './what-is-flash-call-auth';
import { post as whatIsSilentAuthentication } from './what-is-silent-authentication';
import { post as whatIsDndSms } from './what-is-dnd-sms';
import { post as whatIsSmsSenderId } from './what-is-sms-sender-id';
import { post as sendOtpFastapi } from './send-otp-fastapi';
import { post as sendOtpExpress } from './send-otp-express';
import { post as sendOtpNestjs } from './send-otp-nestjs';
import { post as sendOtpSveltekit } from './send-otp-sveltekit';
import { post as howOtpWorksStepByStep } from './how-otp-works-step-by-step';
import { post as cheapestOtpApiIndia2026 } from './cheapest-otp-api-india-2026';
import { post as otpNotReceivedIndia } from './otp-not-received-india';

// Batch 2 — industry / comparisons / compliance / tutorials / troubleshooting / security / advanced
import { post as otpTravelHotelBookingIndia } from './otp-travel-hotel-booking-india';
import { post as otpEventTicketingIndia } from './otp-event-ticketing-india';
import { post as otpNbfcLoanAppsIndia } from './otp-nbfc-loan-apps-india';
import { post as otpInsuranceAppsIndia } from './otp-insurance-apps-india';
import { post as otpMatrimonyAppsIndia } from './otp-matrimony-apps-india';
import { post as otpClassifiedsOlxIndia } from './otp-classifieds-olx-india';
import { post as otpSalonSpaBookingIndia } from './otp-salon-spa-booking-india';
import { post as otpGymFitnessAppsIndia } from './otp-gym-fitness-apps-india';
import { post as otpSchoolCoachingAppsIndia } from './otp-school-coaching-apps-india';
import { post as otpNgoDonorVerificationIndia } from './otp-ngo-donor-verification-india';
import { post as otpStockBrokingAppsIndia } from './otp-stock-broking-apps-india';
import { post as otpMutualFundAppsIndia } from './otp-mutual-fund-apps-india';
import { post as otpDatingAppsIndia } from './otp-dating-apps-india';
import { post as otpJobPortalIndia } from './otp-job-portal-india';
import { post as otpCoworkingMembershipIndia } from './otp-coworking-membership-india';
import { post as freeOtpApiIndiaSafe } from './free-otp-api-india-safe';
import { post as otpApiWithoutKycIndia } from './otp-api-without-kyc-india';
import { post as otpApiNoMonthlyFeesIndia } from './otp-api-no-monthly-fees-india';
import { post as gupshupVsStartmessaging } from './gupshup-vs-startmessaging';
import { post as infobipVsStartmessaging } from './infobip-vs-startmessaging';
import { post as solutionsInfiniVsStartmessaging } from './solutions-infini-vs-startmessaging';
import { post as kaleyraVsStartmessaging } from './kaleyra-vs-startmessaging';
import { post as clickatellVsStartmessaging } from './clickatell-vs-startmessaging';
import { post as bulksmsVsStartmessaging } from './bulksms-vs-startmessaging';
import { post as dltRegistrationStepByStepIndia } from './dlt-registration-step-by-step-india';
import { post as peidRegistrationIndia } from './peid-registration-india';
import { post as traiOtpRules2026Update } from './trai-otp-rules-2026-update';
import { post as dpdpActOtpComplianceIndia } from './dpdp-act-otp-compliance-india';
import { post as rbiAfaGuidelinesOtp2026 } from './rbi-afa-guidelines-otp-2026';
import { post as sebi2faTradingAppsIndia } from './sebi-2fa-trading-apps-india';
import { post as irdaiOtpRulesInsuranceIndia } from './irdai-otp-rules-insurance-india';
import { post as uidaiAadhaarOtpRules } from './uidai-aadhaar-otp-rules';
import { post as gdprOtpIndiaEuCustomers } from './gdpr-otp-india-eu-customers';
import { post as pciDssOtpIndia } from './pci-dss-otp-india';
import { post as sendOtpRemix } from './send-otp-remix';
import { post as sendOtpAstro } from './send-otp-astro';
import { post as sendOtpNuxt } from './send-otp-nuxt';
import { post as sendOtpHono } from './send-otp-hono';
import { post as sendOtpBun } from './send-otp-bun';
import { post as sendOtpDeno } from './send-otp-deno';
import { post as sendOtpCloudflareWorkers } from './send-otp-cloudflare-workers';
import { post as sendOtpAwsLambda } from './send-otp-aws-lambda';
import { post as sendOtpVercelFunctions } from './send-otp-vercel-functions';
import { post as sendOtpSymfony } from './send-otp-symfony';
import { post as sendOtpCodeigniter } from './send-otp-codeigniter';
import { post as sendOtpWordpress } from './send-otp-wordpress';
import { post as sendOtpShopify } from './send-otp-shopify';
import { post as sendOtpFirebaseFunctions } from './send-otp-firebase-functions';
import { post as sendOtpGoogleCloudRun } from './send-otp-google-cloud-run';
import { post as sendOtpFlutterFirebase } from './send-otp-flutter-firebase';
import { post as sendOtpReactNativeExpo } from './send-otp-react-native-expo';
import { post as sendOtpIonic } from './send-otp-ionic';
import { post as sendOtpJetpackCompose } from './send-otp-jetpack-compose';
import { post as sendOtpSwiftui } from './send-otp-swiftui';
import { post as sendOtpElectronDesktop } from './send-otp-electron-desktop';
import { post as otpDeliveryDelayFix } from './otp-delivery-delay-fix';
import { post as otpFailingJioAirtelVi } from './otp-failing-jio-airtel-vi';
import { post as otpGoingToSpamFix } from './otp-going-to-spam-fix';
import { post as otpRateLimitErrorFix } from './otp-rate-limit-error-fix';
import { post as dltTemplateRejectedFix } from './dlt-template-rejected-fix';
import { post as internationalOtpNotDelivering } from './international-otp-not-delivering';
import { post as duplicateOtpIssueFix } from './duplicate-otp-issue-fix';
import { post as otp160CharacterLimitFix } from './otp-160-character-limit-fix';
import { post as unicodeOtpEncodingIssue } from './unicode-otp-encoding-issue';
import { post as isOtpSecureStrengthsWeaknesses } from './is-otp-secure-strengths-weaknesses';
import { post as otpVsPasswordWhichSafer } from './otp-vs-password-which-safer';
import { post as testOtpLocallyWithoutSmsCost } from './test-otp-locally-without-sms-cost';
import { post as otpDatabaseSchemaBestPractices } from './otp-database-schema-best-practices';
import { post as otpRedisVsSqlStorage } from './otp-redis-vs-sql-storage';
import { post as shouldYouHashOtpInDatabase } from './should-you-hash-otp-in-database';
import { post as otpSessionManagementBestPractices } from './otp-session-management-best-practices';
import { post as otpResendCooldownImplementation } from './otp-resend-cooldown-implementation';
import { post as otpFailedAttemptLockoutStrategies } from './otp-failed-attempt-lockout-strategies';
import { post as webhooksOtpDeliveryStatusGuide } from './webhooks-otp-delivery-status-guide';
import { post as loadTestingOtpEndpointsK6Locust } from './load-testing-otp-endpoints-k6-locust';
import { post as circuitBreakerPatternOtpServices } from './circuit-breaker-pattern-otp-services';
import { post as multiRegionFailoverOtpApi } from './multi-region-failover-otp-api';
import { post as otpOutagePostmortemTemplate } from './otp-outage-postmortem-template';
import { post as whatIsSmsTps } from './what-is-sms-tps';

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
  whatIsOtp,
  whatIs2fa,
  whatIsMfa,
  whatIsTotp,
  whatIsHotp,
  whatIsSmsGateway,
  whatIsSmsApi,
  whatIsSmsOtp,
  whatIsVoiceOtp,
  whatIsFlashCallAuth,
  whatIsSilentAuthentication,
  whatIsDndSms,
  whatIsSmsSenderId,
  sendOtpFastapi,
  sendOtpExpress,
  sendOtpNestjs,
  sendOtpSveltekit,
  howOtpWorksStepByStep,
  cheapestOtpApiIndia2026,
  otpNotReceivedIndia,
  otpTravelHotelBookingIndia,
  otpEventTicketingIndia,
  otpNbfcLoanAppsIndia,
  otpInsuranceAppsIndia,
  otpMatrimonyAppsIndia,
  otpClassifiedsOlxIndia,
  otpSalonSpaBookingIndia,
  otpGymFitnessAppsIndia,
  otpSchoolCoachingAppsIndia,
  otpNgoDonorVerificationIndia,
  otpStockBrokingAppsIndia,
  otpMutualFundAppsIndia,
  otpDatingAppsIndia,
  otpJobPortalIndia,
  otpCoworkingMembershipIndia,
  freeOtpApiIndiaSafe,
  otpApiWithoutKycIndia,
  otpApiNoMonthlyFeesIndia,
  gupshupVsStartmessaging,
  infobipVsStartmessaging,
  solutionsInfiniVsStartmessaging,
  kaleyraVsStartmessaging,
  clickatellVsStartmessaging,
  bulksmsVsStartmessaging,
  dltRegistrationStepByStepIndia,
  peidRegistrationIndia,
  traiOtpRules2026Update,
  dpdpActOtpComplianceIndia,
  rbiAfaGuidelinesOtp2026,
  sebi2faTradingAppsIndia,
  irdaiOtpRulesInsuranceIndia,
  uidaiAadhaarOtpRules,
  gdprOtpIndiaEuCustomers,
  pciDssOtpIndia,
  sendOtpRemix,
  sendOtpAstro,
  sendOtpNuxt,
  sendOtpHono,
  sendOtpBun,
  sendOtpDeno,
  sendOtpCloudflareWorkers,
  sendOtpAwsLambda,
  sendOtpVercelFunctions,
  sendOtpSymfony,
  sendOtpCodeigniter,
  sendOtpWordpress,
  sendOtpShopify,
  sendOtpFirebaseFunctions,
  sendOtpGoogleCloudRun,
  sendOtpFlutterFirebase,
  sendOtpReactNativeExpo,
  sendOtpIonic,
  sendOtpJetpackCompose,
  sendOtpSwiftui,
  sendOtpElectronDesktop,
  otpDeliveryDelayFix,
  otpFailingJioAirtelVi,
  otpGoingToSpamFix,
  otpRateLimitErrorFix,
  dltTemplateRejectedFix,
  internationalOtpNotDelivering,
  duplicateOtpIssueFix,
  otp160CharacterLimitFix,
  unicodeOtpEncodingIssue,
  isOtpSecureStrengthsWeaknesses,
  otpVsPasswordWhichSafer,
  testOtpLocallyWithoutSmsCost,
  otpDatabaseSchemaBestPractices,
  otpRedisVsSqlStorage,
  shouldYouHashOtpInDatabase,
  otpSessionManagementBestPractices,
  otpResendCooldownImplementation,
  otpFailedAttemptLockoutStrategies,
  webhooksOtpDeliveryStatusGuide,
  loadTestingOtpEndpointsK6Locust,
  circuitBreakerPatternOtpServices,
  multiRegionFailoverOtpApi,
  otpOutagePostmortemTemplate,
  whatIsSmsTps,
];

// Sort by publishedAt descending (newest first)
export const allPosts = posts.sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);
