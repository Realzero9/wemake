import { Resend } from "resend";
import { render } from "@react-email/components";
import type { Route } from "./+types/welcome-page";
import { WelcomeUser } from "react-email-starter/emails/welcome-user";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({params}: Route.LoaderArgs) => {
    //const emailHtml = await render(<WelcomeUser username={params.username} />);
    const { data, error } = await client.emails.send({
        from : "rz <rz@mail.windinato.online>",
        to: "ninnk9@gmail.com",
        subject: "Welcome to windinato online the app",
        react: <WelcomeUser username={params.username} />,
    });
    return Response.json({ data, error });
};
