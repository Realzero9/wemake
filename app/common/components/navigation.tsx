import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

const menus = [
    {
        name: "Products",
        to: "/products",
        items: [
            {
                label: "Leaderboards",
                description: "See the top performers in the community",
                to: "/products/leaderboards",
            },
            {
                label: "Categories",
                description: "See the top categories in the community",
                to: "/products/categories",
            },
            {
                label: "Search",
                description: "Search for a product in the community",
                to: "/products/search",
            },
            {
                label: "Submit a product",
                description: "Submit a product to the community",
                to: "/products/submit",
            },
            {
                label: "Promote your product",
                description: "Promote your product to the community",
                to: "/products/promote",
            },
        ]
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            {
                label: "Remote Jobs",
                description: "See the top remote jobs in the community",
                to: "/jobs?location=remote",
            },
            {
                label: "Full-Time Jobs",
                description: "See the top full-time jobs in the community",
                to: "/jobs?type=full-time",
            },
            {
                label: "Freelance Jobs",
                description: "See the top freelance jobs in the community",
                to: "/jobs?type=freelance",
            },
            {
                label: "Internships",
                description: "See the top internships in the community",
                to: "/jobs?type=internship",
            },
            {
                label: "Submit a job",
                description: "Submit a job to the community",
                to: "/jobs/submit",
            },
            
        ]
    },
    {
        name: "Community",
        to: "/community",
        items: [
            {
                label: "All posts",
                description: "See all posts in the community",
                to: "/community/posts",
            },
            {
                label: "Top posts",
                description: "See the top posts in the community",
                to: "/community?sort=top",
            },
            {
                label: "New posts",
                description: "See the new posts in the community",
                to: "/community?sort=new",
            },
            {
                label: "Create a post",
                description: "Create a post in the community",
                to: "/community/create",
            }            
        ]
    },
    {
        name: "IdeasGPT",
        to: "/ideas",
    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            {
                label: "All teams",
                description: "See all teams in the community",
                to: "/teams",
            },
            {
                label: "Create a team",
                description: "Create a team in the community",
                to: "/teams/create",
            }
        ]
    }
]

export function Navigation() {
  return (
  <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
    <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-lg">
            wemake
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
            <NavigationMenuList>
                {menus.map(menu => 
                <NavigationMenuItem key={menu.name}>
                    <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {menu.items?.map(item => (
                            <NavigationMenuLink key={item.label}>
                                <Link to={item.to}>{item.label}</Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuContent>
                </NavigationMenuItem>
            )}
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  </nav>
  );
}
