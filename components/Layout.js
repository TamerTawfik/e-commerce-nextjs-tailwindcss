import Head from 'next/head'

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' - Digital Marketplace' : 'Digital Marketplace'}</title>
                <meta name="description" content="Digital Marketplace" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>Navigation</header>
            <main>{children}</main>
            <footer>Footer</footer>
        </>
    )
}
