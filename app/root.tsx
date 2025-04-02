import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

// 라우트 컴포넌트의 타입 정의
import type { Route } from "./+types/root";

// 앱 스타일 정의
// "?url" 추가하면 스타일시트를 문자열로 반환(url 형식으로 반환)
import stylesheet from "./app.css?url";
import { Navigation } from "./common/components/navigation";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

/**
 * 레이아웃 컴포넌트
 * 모든 페이지에 공통적으로 들어가는 요소들을 정의합니다.
 * 
 * @component Layout
 * @param {Object} props
 * @param {React.ReactNode} props.children - 자식 컴포넌트들
 * 
 * head 태그 내부:
 * - Meta: 브라우저에서 사용되는 메타데이터(title, description, keywords 등)
 * - Links: 브라우저에서 사용되는 리소스(css, js 등)
 * 
 * body 태그 내부:
 * - ScrollRestoration: 스크롤 위치 복원 기능
 * - Scripts: 필요한 스크립트 로드
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * 메인 App 컴포넌트
 * Outlet을 통해 현재 라우트에 맞는 컴포넌트를 렌더링합니다.
 */
export default function App() {
    return (
      <div className="py-28">
        <Navigation isLoggedIn={true} hasNotifications={true} hasMessages={true} />
        <Outlet />
      </div>
    );
}

/**
 * 에러 바운더리 컴포넌트
 * 애플리케이션에서 발생하는 에러를 처리하고 표시합니다.
 * 
 * @component ErrorBoundary
 * @param {Object} props
 * @param {Error} props.error - 발생한 에러 객체
 * 
 * 처리하는 에러 타입:
 * 1. 라우트 에러 (404 등)
 * 2. 일반 런타임 에러
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
