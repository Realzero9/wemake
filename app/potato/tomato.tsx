export default function AboutUs() {
    return (
        <div className="tomato-container">
            <h1 className="tomato-title">Tomato</h1>
        </div>
    );
}

export const links = () => [{ rel: "stylesheet", href: "/app/potato/tomato.css" }];
export const meta = () => [{
    title: "Tomato",
    description: "Tomato is a tomato"
}];
