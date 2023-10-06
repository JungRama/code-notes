import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import { Button } from '~/components/ui/button';

import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  createWorkspaceSchema,
  type CreateWorkspaceSchema,
} from '~/server/api/schema/workspace.schema';
import { api } from '~/utils/api';
import { useToast } from '~/components/ui/use-toast';
import Spinner from '~/components/ui/spinner';

interface propsInterface {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

/**
 * Renders a new workspace dialog component.
 *
 * @param {propsInterface} props - The props for the component.
 * @return {JSX.Element} The rendered dialog component.
 */
export default function DialogNewWorkspace(props: propsInterface) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const utils = api.useContext();
  const router = useRouter();
  const { toast } = useToast();

  const workspaceCreate = api.workspace.create.useMutation({
    onSuccess: (data) => {
      props.onOpenChange(false);
      reset();
      utils.workspace.getAll.invalidate();
      router.push(`/dashboard/${data?.data.slug}`);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${error.data?.code} - ${error.message}`,
      });
    },
  });

  const submitWorkspace: SubmitHandler<CreateWorkspaceSchema> = (data) => {
    workspaceCreate.mutate(data);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace and start manage your notes
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitWorkspace)}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input
                id="name"
                type="text"
                {...register('title')}
                placeholder="example. Frontend React Journal"
              />
              {errors.title && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.title?.message}
                </p>
              )}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => props.onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="!bg-white"
            type="submit"
            onClick={handleSubmit(submitWorkspace)}
          >
            Create
            {workspaceCreate.isLoading && <Spinner className="ml-2"></Spinner>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
