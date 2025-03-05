/**
 * Tomato 페이지의 메인 컴포넌트
 * 토마토에 대한 정보를 보여주는 페이지입니다.
 * 
 * @component AboutUs
 * @returns {JSX.Element} 토마토 컨테이너와 제목을 포함한 컴포넌트
 */
export default function AboutUs() {
    return (
        <div className="tomato-container">
            <h1 className="tomato-title">Tomato</h1>
        </div>
    );
}

/**
 * 페이지에서 사용할 스타일시트를 정의합니다.
 * tomato.css 파일을 불러와 스타일을 적용합니다.
 * 
 * @returns {Array<{rel: string, href: string}>} 스타일시트 링크 설정
 */
export const links = () => [{ rel: "stylesheet", href: "/app/potato/tomato.css" }];

/**
 * 페이지의 메타 정보를 정의합니다.
 * SEO와 브라우저 탭에 표시될 정보를 설정합니다.
 * 
 * @returns {Array<{title: string, description: string}>} 페이지 메타 데이터
 */
export const meta = () => [{
    title: "Tomato",
    description: "Tomato is a tomato"
}];
