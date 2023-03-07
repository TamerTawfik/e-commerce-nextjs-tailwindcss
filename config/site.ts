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
    name: "Storefront ",
    description:
        "Beautifully designed Storefront built by React, Next JS, and Tailwindcss.",
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
