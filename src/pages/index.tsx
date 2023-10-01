import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

import { api } from '~/utils/api';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dev Notes</title>
        <meta
          name="description"
          content="Simple notes for your dev journaling"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
}
