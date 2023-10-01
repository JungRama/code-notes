import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { api } from '~/utils/api';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import '~/styles/globals.css';

// Providers
import { ThemeProvider } from '~/context/theme-provider';

import { getServerAuthSession } from '~/server/auth';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { db } from '~/server/db';
import { appRouter } from '~/server/api/root';

const MyApp: AppType<{ session: Session | null; dehydratedState: unknown }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className={inter.className}>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
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
