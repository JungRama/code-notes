import Header from './header';

export default function AuthenticatedLayout({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}
