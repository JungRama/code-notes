import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '~/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

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

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { api } from '~/utils/api';

export const getServerSideProps = () => {
  const workspaces = api.workspace.getAll.useSuspenseQuery;

  return {
    props: {
      workspaces,
    },
  };
};

export default function WorkspaceSelector() {
  const router = useRouter();

  const workspaces = api.workspace.getAll.useQuery();

  const groups = [
    {
      label: 'My Workspaces',
      workspaces: workspaces.data?.data ?? [],
    },
  ];

  type Workspace = (typeof groups)[number]['workspaces'][number];

  const [open, setOpen] = useState(false);
  const [openDialogNew, setOpenDialogNew] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );

  useEffect(() => {
    if (router.query.workspace) {
      const selected = workspaces.data?.data.find(
        (item) => item.slug === router.query.workspace,
      );

      if (!selected) router.push('/404');

      setSelectedWorkspace(selected ?? null);
    } else {
      setSelectedWorkspace(workspaces.data?.data[0] ?? null);
    }
  }, [workspaces.isLoading]);

  useEffect(() => {
    if (selectedWorkspace?.slug) {
      router.push(`/dashboard/${selectedWorkspace?.slug}`);
    }
  }, [selectedWorkspace]);

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
              className={cn('w-[200px] justify-between')}
            >
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${selectedWorkspace?.slug}.png`}
                  alt={selectedWorkspace?.title}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              {selectedWorkspace?.title}
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
                        key={`workspace-${item.slug}`}
                        onSelect={() => {
                          setSelectedWorkspace(item);
                          setOpen(false);
                        }}
                        className="text-sm"
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${item.slug}.png`}
                            alt={item.title}
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {item.title}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            selectedWorkspace?.slug === item.slug
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
