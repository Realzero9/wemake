import { type RouteConfig, index, route } from "@react-router/dev/routes";

/**
 * 애플리케이션의 라우트 구조를 정의합니다.
 * 각 경로는 해당하는 컴포넌트 파일과 매핑됩니다.
 * 
 * @type {RouteConfig[]}
 * 
 * @example
 * URL 구조:
 * - / -> routes/home.tsx (메인 페이지)
 * 
 * @description
 * - index(): 인덱스 라우트를 생성합니다 (경로의 기본 페이지)
 * - route(): 중첩 라우트를 생성합니다
 */
export default [
    index("routes/home.tsx"),
    route("/about", "potato/tomato.tsx"),
] satisfies RouteConfig;
