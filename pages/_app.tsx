import type { AppProps } from "next/app"
import { SessionProvider } from 'next-auth/react';

import { StoreProvider } from '@/utils/Store'
import { Fonts } from '@/components/fonts'

import '@/styles/globals.css'


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Fonts />
      <SessionProvider session={session}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SessionProvider>
    </>
  )
}
