import type { AppProps } from "next/app"
import { StoreProvider } from '@/utils/Store'
import { Fonts } from '@/components/fonts'

import '@/styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Fonts />
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  )
}
