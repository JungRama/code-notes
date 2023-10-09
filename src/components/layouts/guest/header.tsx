import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${
        !top ? 'bg-black shadow-lg backdrop-blur-sm' : ''
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <div className="mr-4 shrink-0">
            <Image
              src={'/logo.png'}
              alt="logo"
              width={160}
              height={100}
            ></Image>
          </div>

          {/* Desktop navigation */}
          <nav className="flex md:grow">
            <ul className="flex grow flex-wrap items-center justify-end">
              <li>
                <Link
                  href="/sign-in"
                  className="flex items-center px-5 py-3 font-medium text-gray-300 transition duration-150 ease-in-out hover:text-gray-50"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>

          {/* <MobileMenu /> */}
        </div>
      </div>
    </header>
  );
}
