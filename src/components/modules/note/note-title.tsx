import { ArrowLeft, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ContentEditable, {
  type ContentEditableEvent,
} from 'react-contenteditable';
import ModalDelete from '~/components/shared/modal-delete';
import { Button } from '~/components/ui/button';
import Spinner from '~/components/ui/spinner';
import { useToast } from '~/components/ui/use-toast';
import useStoreWorkspaces from '~/store/workspaces';
import { api } from '~/utils/api';

export default function NoteTitle({
  title,
  id,
}: {
  title: string;
  id: string | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { defaultWorkspace } = useStoreWorkspaces();
  const utils = api.useContext();

  const noteUpdate = api.note.update.useMutation({
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${error.data?.code} - ${error.message}`,
      });
    },
  });

  const noteDelete = api.note.delete.useMutation({
    onSuccess: () => {
      if (defaultWorkspace) {
        router.push(`/dashboard/${defaultWorkspace?.slug}`);
      }
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${error.data?.code} - ${error.message}`,
      });
    },
  });

  const [noteTitle, setNoteTitle] = useState<string | null>(null);

  const handleChange = (event: ContentEditableEvent) => {
    setNoteTitle(event.target.value);
  };

  const updateNoteData = () => {
    if (!id) return;

    if ((noteTitle?.length ?? 0) <= 0) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `Please enter a title`,
      });

      return;
    }

    noteUpdate.mutate({
      params: {
        id: id,
      },
      body: {
        title: noteTitle ?? 'Default',
      },
    });
  };

  const deleteNoteData = () => {
    if (!id) return;
    noteDelete.mutate({
      id: id,
    });
  };

  useEffect(() => {
    setNoteTitle(title ?? 'Untitled');
  }, [title]);

  return (
    <div className="group mb-10 flex items-center gap-5">
      <Link href={`/dashboard/${defaultWorkspace?.slug}`}>
        <ArrowLeft></ArrowLeft>
      </Link>
      <ContentEditable
        html={noteTitle ?? 'default'} // innerHTML of the editable div
        onChange={(e) => handleChange(e)} // handle innerHTML change
        tagName="h1"
        className="inline-block cursor-text border-b-2 border-transparent bg-transparent text-3xl font-medium focus:border-b-2 focus:border-white focus:outline-none" // Use a custom HTML tag (uses a div by default)
      />
      {title != noteTitle && (
        <Button
          size={'sm'}
          disabled={noteUpdate.isLoading}
          variant={'secondary'}
          onClick={() => updateNoteData()}
        >
          Save
          {noteUpdate.isLoading && (
            <Spinner className="ml-2 text-white"></Spinner>
          )}
        </Button>
      )}
      <ModalDelete
        title="Are you sure want to delete this note"
        description="Please make sure, this action cannot be undone!"
        onOk={() => deleteNoteData()}
      >
        <Button
          variant={'destructive'}
          size={'sm'}
          className="hidden !bg-red-700 text-white group-hover:block"
          disabled={noteDelete.isLoading}
        >
          {!noteDelete.isLoading && <TrashIcon></TrashIcon>}
        </Button>
      </ModalDelete>
      {noteDelete.isLoading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.8)]">
          <Spinner className=" text-white"></Spinner>
        </div>
      )}
    </div>
  );
}
