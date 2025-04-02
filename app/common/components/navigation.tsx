import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { cn } from "~/lib/utils";

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
                    {menu.items?
                        <>
                            <Link to={menu.to}>
                                <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                            </Link>
                            <NavigationMenuContent>
                        <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                            {menu.items?.map(item => (
                                <NavigationMenuItem key={item.name} 
                                    className={cn([
                                        "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                                        item.to === "/products/promote" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                                        item.to === "/jobs/submit" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                                    ])}
                                >
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className="p-3 space-y-1 block leading-none no-underline outline-none"
                                            to={item.to}
                                        >
                                            <span className="text-sm font-medium leading-none">{item.name}</span>
                                            <p className="text-sm leading-snug text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                    </>
                    :
                    <Link className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent" to={menu.to}>{menu.name}</Link>
                    }
                </NavigationMenuItem>
            )}
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  </nav>
  );
}
