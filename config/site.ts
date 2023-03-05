import { NavItem } from "@/types/nav"

interface SiteConfig {
    name: string
    description: string
    mainNav: NavItem[]
    links: {
        twitter: string
        github: string
        instagram: string
    }
}

export const siteConfig: SiteConfig = {
    name: " - Digital Marketplace",
    description:
        "Beautifully designed Digital Marketplace built with Radix UI and Tailwind CSS.",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
    ],
    links: {
        twitter: "",
        github: "",
        instagram: "",
    },
}
