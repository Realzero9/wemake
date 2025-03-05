import { type RouteConfig, index, route } from "@react-router/dev/routes";

// 라우트 설정
// 라우트 설정은 라우트 컴포넌트의 설정을 정의
export default [
    index("routes/home.tsx"),
    route("/about", "potato/tomato.tsx"),
] satisfies RouteConfig;
