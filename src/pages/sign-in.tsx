import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

/* eslint-disable @next/next/no-img-element */
export default function SignIn() {
  const router = useRouter();
  const { status, data } = useSession();

  if (status === 'loading') {
    return <></>;
  }

  if (status === 'authenticated' && data.user.id) {
    router.push('/dashboard');
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-5">
      <p>👋 Hi, Sign in with method below!</p>
      <button
        onClick={() =>
          signIn('github', {
            redirect: false,
            callbackUrl: '/dashboard',
          })
        }
        className="flex gap-2 rounded-full bg-black px-10 py-3"
      >
        <img
          loading="lazy"
          height="24"
          width="24"
          alt="Sign in with Github"
          id="provider-logo-dark"
          src="https://authjs.dev/img/providers/github-dark.svg"
        ></img>
        Sign in with Github
      </button>
    </div>
  );
}
