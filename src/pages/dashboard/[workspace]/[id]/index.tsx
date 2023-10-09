import AuthenticatedLayout from '~/components/layouts/authenticated';
import CardNote from '~/components/modules/note/card-note';
import CardNoteCreate from '~/components/modules/note/card-note-create';

import { useTheme } from 'next-themes';

import { cn } from '~/lib/utils';
import { useEffect, useState } from 'react';
import NotePlayground from '~/components/modules/note/note-playground';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import useStoreWorkspaces from '~/store/workspaces';
import { useRouter } from 'next/router';
import NoteTitle from '~/components/modules/note/note-title';
import { api } from '~/utils/api';
import Spinner from '~/components/ui/spinner';
import { useToast } from '~/components/ui/use-toast';

export default function Dashboard() {
  const { theme } = useTheme();

  const router = useRouter();

  const [editorTheme, setEditorTheme] = useState('dark-theme');
  const { toast } = useToast();

  const { defaultWorkspace } = useStoreWorkspaces();

  useEffect(() => {
    setEditorTheme(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }, [theme]);

  const note = api.note.getById.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: `${error.data?.code} - ${error.message}`,
        });
      },
    },
  );

  return (
    <>
      <AuthenticatedLayout>
        <div className="my-10">
          <div className={cn('container mx-auto', editorTheme)}>
            <div className="mx-auto max-w-screen-lg">
              {note.isLoading ? (
                <div className="flex h-[250px] items-center justify-center">
                  <Spinner></Spinner>
                </div>
              ) : (
                <>
                  <NoteTitle
                    id={note.data?.data.id ?? null}
                    title={note.data?.data.title ?? 'Untitled'}
                  ></NoteTitle>

                  <NotePlayground
                    id={router.query?.id as string}
                    defaultValue={note.data?.data.contentJson ?? ''}
                  ></NotePlayground>
                </>
              )}
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
