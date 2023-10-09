import { useSession } from 'next-auth/react';
import Header from './header';

export default function AuthenticatedLayout({
  children,
}: {
  children: JSX.Element;
}) {
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      window.location.href = '/sign-in';
    },
  });
  if (status === 'loading') {
    return <></>;
  }
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}
