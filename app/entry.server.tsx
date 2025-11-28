import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { type HandleErrorFunction } from 'react-router';
import * as Sentry from '@sentry/react-router';

Sentry.init({
  dsn: "https://be3b9ee5050e24354b7d1335c7f85f02@o4510436206444544.ingest.us.sentry.io/4510436216668160",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

const handleRequest = Sentry.createSentryHandleRequest({
  ServerRouter,
  renderToPipeableStream,
  createReadableStreamFromReadable,
 });
 
export default handleRequest;

export const handleError = Sentry.createSentryHandleError({
 logErrors: false
});