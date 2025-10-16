import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: "https://eea0c31545f9724a631fd403146dedcd@o4507666684641280.ingest.us.sentry.io/4510197770944512",

    integrations: [
        Sentry.consoleLoggingIntegration({ levels: ["log","warn","error"]})
    ],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Enable sending user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
});