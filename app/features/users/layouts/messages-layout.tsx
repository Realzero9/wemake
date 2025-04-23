import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu } from "~/common/components/ui/sidebar";
import { Outlet } from "react-router";
import { MessagesCard } from "../components/messages-card";

export default function MessagesLayout() {
    return (
        <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full">
            <Sidebar variant="floating" className="pt-16">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {Array.from({ length: 20 }).map((_, index) => (
                                <MessagesCard 
                                    key={index}
                                    id={index.toString()}
                                    avatarUrl={"https://github.com/shadcn.png"}
                                    avatarFallback={`${index}`}
                                    name={`User ${index}`}
                                    lastMessage={`Last message ${index}`}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className="h-full flex-1">
                <Outlet />
            </div>
        </SidebarProvider>
    )
};
