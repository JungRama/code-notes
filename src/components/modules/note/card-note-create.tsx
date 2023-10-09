import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardTitle } from '~/components/ui/card';
import Spinner from '~/components/ui/spinner';
import { useToast } from '~/components/ui/use-toast';
import useStoreWorkspaces from '~/store/workspaces';
import { api } from '~/utils/api';

export default function CardNoteCreate() {
  const router = useRouter();

  const { defaultWorkspace } = useStoreWorkspaces();
  const { toast } = useToast();

  const noteCreate = api.note.create.useMutation({
    onSuccess: (data) => {
      router.push(`/dashboard/${defaultWorkspace?.slug}/${data?.data.id}`);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${error.data?.code} - ${error.message}`,
      });
    },
  });

  const addNewNote = () => {
    if (!defaultWorkspace?.id) return;

    noteCreate.mutate({
      title: 'Untitled',
      workspaceId: defaultWorkspace?.id,
    });
  };

  return (
    <Card
      onClick={addNewNote}
      className="h-full cursor-pointer overflow-hidden border-dashed transition hover:border-gray-500"
    >
      <CardContent className="flex h-full min-h-[250px] w-full items-center justify-center p-5">
        <CardTitle className="flex gap-2 font-medium">
          {noteCreate.isLoading ? (
            <Spinner></Spinner>
          ) : (
            <PlusCircle></PlusCircle>
          )}
          {noteCreate.isLoading ? 'Creating new note ...' : 'Create New Note'}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
