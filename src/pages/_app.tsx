import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { api } from '~/utils/api';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import '~/styles/globals.css';

// Providers
import { ThemeProvider } from '~/context/theme-provider';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '~/components/ui/toaster';
import Head from 'next/head';

const MyApp: AppType<{ session: Session | null; dehydratedState: unknown }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = useQueryClient();

  return (
    <div className={inter.className}>
      <Head>
        <title>Dev Notes - Takes your notes without any b*llshit</title>
        <meta
          name="description"
          content="Simple notes for your dev journaling"
        />
        <meta
          property="og:title"
          content="Dev Notes - Takes your notes without any b*llshit"
        />
        <meta property="og:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Toaster />

      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <Hydrate state={pageProps?.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
