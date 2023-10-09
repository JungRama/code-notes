import { StickyNote } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import GuestLayout from '~/components/layouts/guest';

import { api } from '~/utils/api';

export default function Home() {
  return (
    <>
      <GuestLayout>
        <section className="relative flex h-[100vh] items-center justify-center">
          {/* Illustration behind hero content */}
          <div
            className="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <svg
              width="1360"
              height="578"
              viewBox="0 0 1360 578"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="illustration-01"
                >
                  <stop stopColor="#1A1A20" offset="0%" />
                  <stop stopColor="#09090B" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="url(#illustration-01)" fillRule="evenodd">
                <circle cx="1232" cy="128" r="128" />
                <circle cx="155" cy="443" r="64" />
              </g>
            </svg>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Hero content */}
            <div className="pb-12 pt-32 md:pb-20 md:pt-40">
              {/* Section header */}
              <div className="pb-12 text-center md:pb-16">
                <h1
                  className="leading-tighter mb-4 text-8xl font-extrabold tracking-tighter"
                  data-aos="zoom-y-out"
                >
                  Takes your notes
                  <br />
                  <span className="bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text text-transparent">
                    without any b*llshit
                  </span>
                </h1>
                <div className="mx-auto max-w-3xl">
                  <p
                    className="mb-8 text-lg text-gray-600"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    With this minimalist note-taking solution, you will enjoy a
                    clean and distraction-free interface that prioritizes
                    simplicity and ease of use.
                  </p>
                  <div
                    className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay="300"
                  ></div>
                </div>
              </div>

              <div
                className="relative mb-8 flex justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="450"
              >
                <Link
                  href={'/dashboard'}
                  className="group absolute top-full flex -translate-y-1/2 transform items-center rounded-full bg-white p-4 font-medium text-gray-900 shadow-lg"
                >
                  <StickyNote className="text-gray-600"></StickyNote>
                  <span className="ml-3">Write your note now!</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main> */}
      </GuestLayout>
    </>
  );
}
