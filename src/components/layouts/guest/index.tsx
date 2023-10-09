import Header from './header';

export default function GuestLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}
