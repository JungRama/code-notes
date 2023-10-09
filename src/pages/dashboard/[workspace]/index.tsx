import AuthenticatedLayout from '~/components/layouts/authenticated';
import CardNote from '~/components/modules/note/card-note';
import CardNoteCreate from '~/components/modules/note/card-note-create';
import WorkspaceTitle from '~/components/modules/workspace/workspace-title';
import { Skeleton } from '~/components/ui/skeleton';
import { useToast } from '~/components/ui/use-toast';
import useStoreWorkspaces from '~/store/workspaces';
import { api } from '~/utils/api';

export default function Workspace() {
  const { defaultWorkspace } = useStoreWorkspaces();
  const { toast } = useToast();

  const notes = api.note.getAll.useQuery(
    {
      workspaceId: defaultWorkspace?.id ?? '',
    },
    {
      enabled: !!defaultWorkspace,
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
          <div className="container mx-auto">
            <WorkspaceTitle></WorkspaceTitle>
            <div className="grid grid-cols-12 gap-[15px] lg:gap-[30px]">
              <div className="col-span-12 md:col-span-4 lg:col-span-4">
                <CardNoteCreate></CardNoteCreate>
              </div>

              {notes.isLoading &&
                [...Array(5)].map((_, index) => (
                  <div
                    key={'skeleton-note' + index}
                    className="col-span-12 md:col-span-4 lg:col-span-4"
                  >
                    <Skeleton className="flex h-[250px] flex-col justify-between overflow-hidden transition hover:border-gray-500"></Skeleton>
                  </div>
                ))}

              {notes.data?.data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-12 md:col-span-4 lg:col-span-4"
                  >
                    <CardNote
                      id={item.id}
                      url={`/dashboard/${defaultWorkspace?.slug}/${item.id}`}
                      title={item.title}
                      updatedAt={item.updatedAt}
                      description={item.description ?? ''}
                    ></CardNote>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
