import type { AppProps } from "next/app"
import { Fonts } from '@/components/fonts'

import '@/styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Fonts />
      <Component {...pageProps} />
    </>
  )
}
