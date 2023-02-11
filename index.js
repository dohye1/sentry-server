const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "https://bc704cfac9c4493696bce71e2f465929@o4504581152768000.ingest.sentry.io/4504638671159296",
  environment: "Production",
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  release: process.env.VERSION,
});

Sentry.addBreadcrumb({
  level: "info",
  category: "URL Endpoints",
  message: "In the handled function",
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

function foo() {
  console.log(123);
  throw new Error("hyewon server test");
}

function hyewonOcurredError() {
  throw new Error("this is my new ERRRRRRRORRRRR");
}

setTimeout(() => {
  try {
    hyewonOcurredError();
  } catch (e) {
    Sentry.addBreadcrumb({
      level: "error",
      category: "Intended Error",
      message: "this error ocurred by myself",
    });
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
