import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// tailwindcss 설정
// 테일윈드 설정을 추가합니다.
// Build System
// 코드를 가져다가 다른것으로 변환해줌
export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
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
});
