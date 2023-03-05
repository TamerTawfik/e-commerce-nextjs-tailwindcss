import Head from 'next/head'
import { siteConfig } from '@/config/site'
import { SiteHeader } from '@/components/site-header'

interface LayoutProps {
    children: React.ReactNode
    title: string
}

export default function Layout({ title, children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title ? title + siteConfig.description : siteConfig.name + siteConfig.description}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={siteConfig.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SiteHeader />
            <main>{children}</main>
        </>
    )
}