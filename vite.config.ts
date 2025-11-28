import { reactRouter } from '@react-router/dev/vite';
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "windinato",
  project: "wemake",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // ...
};

// tailwindcss 설정
// 테일윈드 설정을 추가합니다.
// Build System
// 코드를 가져다가 다른것으로 변환해줌
export default defineConfig((config) => ({
  plugins: [reactRouter(), tsconfigPaths(), sentryReactRouter(sentryConfig, config)],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
  server: {
    headers: {
      "X-POTATO": "X-TOMATO",
    },
    allowedHosts: ["exams-adopt-sms-irc.trycloudflare.com"],
  },
})
);
