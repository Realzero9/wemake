import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu } from "~/common/components/ui/sidebar";
import { Outlet, useOutletContext } from "react-router";
import { MessagesCard } from "../components/messages-card";
import { getLoggedInUserId, getMessages } from "../queries";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/messages-layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const messages = await getMessages(client, { userId });
    return { messages };
}

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
    const { userId, name, avatar } = useOutletContext<{ userId: string, name: string, avatar: string }>();
    return (
        <SidebarProvider 
            className="flex max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full"
            style={{ '--sidebar-width': '8rem' } as React.CSSProperties}
        >
            <Sidebar variant="floating" className="pt-16">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {loaderData.messages.map((message) => (
                                <MessagesCard
                                    key={message.message_room_id}
                                    id={message.message_room_id.toString()}
                                    name={message.name}
                                    avatarUrl={message.avatar}
                                    lastMessage={message.last_message}
                                    avatarFallback={message.name.charAt(0)}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className="h-full flex-1 md:ml-[8rem]">
                <Outlet context={{ userId, name, avatar }} />
            </div>
        </SidebarProvider>
    )
};
