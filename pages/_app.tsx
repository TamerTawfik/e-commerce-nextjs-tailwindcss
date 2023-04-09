// @ts-nocheck comment
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { StoreProvider } from '@/utils/Store'
import { Fonts } from '@/components/fonts'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import '@/styles/globals.css'


function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Fonts />
      <SessionProvider session={session}>
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
                <Component {...pageProps} />
              )}
          </PayPalScriptProvider>
        </StoreProvider>
      </SessionProvider>
    </>
  )
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}

export default App;