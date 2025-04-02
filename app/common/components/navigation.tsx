import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

const menus = [
    {
        name: "Products",
        to: "/products",
        items: [
            {
                name: "Leaderboards",
                description: "See the top performers in the community",
                to: "/products/leaderboards",
            },
            {
                name: "Categories",
                description: "See the top categories in the community",
                to: "/products/categories",
            },
            {
                name: "Search",
                description: "Search for a product in the community",
                to: "/products/search",
            },
            {
                name: "Submit a product",
                description: "Submit a product to the community",
                to: "/products/submit",
            },
            {
                name: "Promote your product",
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
                name: "Remote Jobs",
                description: "See the top remote jobs in the community",
                to: "/jobs?location=remote",
            },
            {
                name: "Full-Time Jobs",
                description: "See the top full-time jobs in the community",
                to: "/jobs?type=full-time",
            },
            {
                name: "Freelance Jobs",
                description: "See the top freelance jobs in the community",
                to: "/jobs?type=freelance",
            },
            {
                name: "Internships",
                description: "See the top internships in the community",
                to: "/jobs?type=internship",
            },
            {
                name: "Submit a job",
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
                name: "All posts",
                description: "See all posts in the community",
                to: "/community/posts",
            },
            {
                name: "Top posts",
                description: "See the top posts in the community",
                to: "/community?sort=top",
            },
            {
                name: "New posts",
                description: "See the new posts in the community",
                to: "/community?sort=new",
            },
            {
                name: "Create a post",
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
                name: "All teams",
                description: "See all teams in the community",
                to: "/teams",
            },
            {
                name: "Create a team",
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
