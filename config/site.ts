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
    name: "E-Commerce Next.js Tailwindcss",
    description:
        "Beautifully designed e-commerce app built with Radix UI and Tailwind CSS.",
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
