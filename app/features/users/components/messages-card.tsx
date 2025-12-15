import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { SidebarMenuItem, SidebarMenuButton, useSidebar } from "~/common/components/ui/sidebar";

interface MessagesCardProps {
    avatarUrl: string;
    avatarFallback: string;
    name: string;
    lastMessage: string;
    id: string;
}

export function MessagesCard({ avatarUrl, avatarFallback, name, lastMessage, id }: MessagesCardProps) {
    const location = useLocation();
    const { isMobile, setOpenMobile } = useSidebar();

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                className="h-18"
                asChild
                isActive={location.pathname === `/my/messages/${id}`}
            >
                <Link to={`/my/messages/${id}`} onClick={handleClick}>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="text-xs text-muted-foreground">{lastMessage}</span>
                        </div>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}