import AuthenticatedLayout from '~/components/layouts/authenticated';
import CardNote from '~/components/modules/notes/card-note';
import CardNoteCreate from '~/components/modules/notes/card-note-create';

import { useTheme } from 'next-themes';

import { cn } from '~/lib/utils';
import { useEffect, useState } from 'react';
import Notes from '~/components/modules/notes/notes';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import useStoreWorkspaces from '~/store/workspaces';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { theme } = useTheme();

  const router = useRouter();

  const [editorTheme, setEditorTheme] = useState('dark-theme');

  const { defaultWorkspace } = useStoreWorkspaces();

  useEffect(() => {
    setEditorTheme(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }, [theme]);

  return (
    <>
      <AuthenticatedLayout>
        <div className="my-10">
          <div className={cn('container mx-auto', editorTheme)}>
            <div className="mx-auto max-w-screen-lg">
              <div className="mb-10 flex items-center gap-3">
                <Link href={`/dashboard/${defaultWorkspace?.slug}`}>
                  <ArrowLeft></ArrowLeft>
                </Link>
                <h1 className="border-b-2 border-transparent text-3xl font-medium focus:border-b-2 focus:border-white focus:outline-none">
                  Untitled
                </h1>
              </div>
              <Notes
                id={router.query?.id as string}
                workspaceId={defaultWorkspace?.id}
              ></Notes>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
