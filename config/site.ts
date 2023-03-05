import { NavItem } from "@/types/nav"

interface SiteConfig {
    name: string
    description: string
    mainNav: NavItem[]
    links: {
        twitter: string
        github: string
    }
}

export const siteConfig: SiteConfig = {
    name: "Digital Marketplace ",
    description:
        "Beautifully designed Digital Marketplace built for Freelancers.",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
    ],
    links: {
        twitter: "http://twitter.com/TamerTawfik_Me",
        github: "https://github.com/TamerTawfik",
    },
}
