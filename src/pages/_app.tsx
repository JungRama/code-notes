import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "~/styles/globals.css";

// Providers
import { ThemeProvider } from "~/context/theme-provider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={inter.className}>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
