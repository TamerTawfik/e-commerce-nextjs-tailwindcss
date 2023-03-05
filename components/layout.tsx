import Head from 'next/head'
import { siteConfig } from '@/config/site'

interface LayoutProps {
    children: React.ReactNode
    title: string
}

export default function Layout({ title, children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title ? title + siteConfig.name : siteConfig.name}</title>
                <meta name="description" content={siteConfig.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </>
    )
}