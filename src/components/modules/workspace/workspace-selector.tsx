import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '~/lib/utils';

import { Button } from '~/components/ui/button';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command';

import { Dialog, DialogTrigger } from '~/components/ui/dialog';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

import DialogNewWorkspace from './dialog-new-workspace';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { type Workspace } from '@prisma/client';
import { api } from '~/utils/api';
import { Skeleton } from '~/components/ui/skeleton';
import useStoreWorkspaces from '~/store/workspaces';

export default function WorkspaceSelector() {
  const router = useRouter();
  const { defaultWorkspace, setDefaultWorkspace } = useStoreWorkspaces();

  const workspaces = api.workspace.getAll.useQuery();

  const [open, setOpen] = useState(false);
  const [openDialogNew, setOpenDialogNew] = useState(false);

  const [groups, setGroups] = useState<
    {
      label: string;
      workspaces: Workspace[];
    }[]
  >([
    {
      label: 'My Workspaces',
      workspaces: [],
    },
  ]);
  // This useEffect hook is responsible for setting up the initial state of the groups and selected workspace in the component.
  useEffect(() => {
    // Set the groups state by creating an array with a single object.
    setGroups([
      {
        label: groups[0]?.label ?? 'My Workspaces',
        workspaces: workspaces.data?.data ?? [],
      },
    ]);

    // Check if the 'workspace' query parameter exists in the router.
    if (router.query.workspace) {
      // If a match is found, set the selected workspace to the matching object
      const selected = workspaces.data?.data.find(
        (item) => item.slug === router.query.workspace,
      );
      setDefaultWorkspace(selected ?? null);
    } else {
      // set the selected workspace to the first object in the workspaces array, or if it is null or undefined, set it to null.
      setDefaultWorkspace(workspaces.data?.data[0] ?? null);
    }
  }, [workspaces.data]);

  // User select workspace
  const onSelectWorkspace = (item: Workspace) => {
    setDefaultWorkspace(item);
    setOpen(false);
    router.push(`/dashboard/${item?.slug}`);
  };

  if (workspaces.isLoading) {
    return <Skeleton className="h-[30px] w-[200px] rounded-md" />;
  }

  return (
    <>
      {/* SELECT WORKSPACES */}
      <Dialog>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a Workspace"
              className={cn('w-[250px] justify-between')}
            >
              <div className="flex gap-1">
                <p>{defaultWorkspace?.emoticon}</p>
                <p>{defaultWorkspace?.title}</p>
              </div>
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search workspace..." />
                <CommandEmpty>No workspace found.</CommandEmpty>
                {groups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.workspaces.map((item) => (
                      <CommandItem
                        key={`workspace-${item.slug}-${item.id}`}
                        data-value={item.slug}
                        onSelect={() => {
                          onSelectWorkspace(item);
                        }}
                        className="text-s1 flex gap-1"
                      >
                        {item.emoticon}
                        <p className="hidden">{item.slug}</p>
                        <p>{item.title}</p>
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            defaultWorkspace?.slug === item.slug
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        setOpenDialogNew(true);
                      }}
                    >
                      <PlusCircledIcon className="mr-2 h-5 w-5" />
                      Create Workspace
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Dialog>

      {/* CREATE NEW WORKSPACE */}
      <DialogNewWorkspace
        open={openDialogNew}
        onOpenChange={setOpenDialogNew}
      ></DialogNewWorkspace>
    </>
  );
}
