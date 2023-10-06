import { TrashIcon } from 'lucide-react';
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

export default function WorkspaceTitle() {
  const router = useRouter();
  const { toast } = useToast();
  const { defaultWorkspace } = useStoreWorkspaces();
  const utils = api.useContext();

  const workspaceUpdate = api.workspace.update.useMutation({
    onSuccess: (data) => {
      utils.workspace.getAll.invalidate();
      router.push(`/dashboard/${data?.data?.slug}`);
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${error.data?.code} - ${error.message}`,
      });
    },
  });

  const workspaceDelete = api.workspace.delete.useMutation({
    onSuccess: (data) => {
      utils.workspace.getAll.invalidate();

      const workspaces = utils.workspace.getAll.getData()?.data;

      if (workspaces) {
        const selected = workspaces.find((item) => item.id !== data.data?.id);

        router.push(`/dashboard/${selected?.slug}`);
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

  const [workspaceName, setWorkspaceName] = useState<string | null>(null);

  const handleChange = (event: ContentEditableEvent) => {
    setWorkspaceName(event.target.value);
  };

  const updateWorkspaceData = () => {
    if (!defaultWorkspace?.id) return;

    if ((workspaceName?.length ?? 0) <= 0) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `Please enter a workspace name`,
      });

      return;
    }

    workspaceUpdate.mutate({
      params: {
        id: defaultWorkspace?.id,
      },
      body: {
        title: workspaceName ?? 'Default',
      },
    });
  };

  const deleteWorkspaceData = () => {
    if (!defaultWorkspace?.id) return;

    const workspaces = utils.workspace.getAll.getData()?.data;

    if ((workspaces?.length ?? 0) <= 1) {
      toast({
        variant: 'destructive',
        title: 'Warning!',
        description: `Can't delete since this is the only one workspace left.`,
      });
      return;
    }

    workspaceDelete.mutate({
      id: defaultWorkspace?.id,
    });
  };

  useEffect(() => {
    setWorkspaceName(defaultWorkspace?.title ?? 'Default');
  }, [defaultWorkspace]);

  return (
    <div className="group mb-10 flex gap-5">
      <ContentEditable
        html={workspaceName ?? 'default'} // innerHTML of the editable div
        onChange={(e) => handleChange(e)} // handle innerHTML change
        tagName="h1"
        className="inline-block cursor-text border-b-2 border-transparent bg-transparent text-3xl font-medium focus:border-b-2 focus:border-white focus:outline-none" // Use a custom HTML tag (uses a div by default)
      />

      {workspaceName != defaultWorkspace?.title && (
        <Button
          size={'sm'}
          disabled={workspaceUpdate.isLoading}
          variant={'secondary'}
          onClick={() => updateWorkspaceData()}
        >
          Save
          {workspaceUpdate.isLoading && (
            <Spinner className="ml-2 text-white"></Spinner>
          )}
        </Button>
      )}

      <ModalDelete
        title="Are you sure want to delete this workspace"
        description="Please make sure, this action cannot be undone!"
        onOk={() => deleteWorkspaceData()}
      >
        <Button
          variant={'destructive'}
          size={'sm'}
          className="hidden !bg-red-700 text-white group-hover:block"
          disabled={workspaceDelete.isLoading}
        >
          {!workspaceDelete.isLoading && <TrashIcon></TrashIcon>}
        </Button>
      </ModalDelete>

      {workspaceDelete.isLoading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.8)]">
          <Spinner className=" text-white"></Spinner>
        </div>
      )}
    </div>
  );
}
