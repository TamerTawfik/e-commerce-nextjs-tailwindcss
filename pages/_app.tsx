// @ts-nocheck comment
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { StoreProvider } from '@/utils/Store'
import { Fonts } from '@/components/fonts'

import '@/styles/globals.css'


function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Fonts />
      <SessionProvider session={session}>
        <StoreProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
              <Component {...pageProps} />
            )}
        </StoreProvider>
      </SessionProvider>
    </>
  )
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

export default App;