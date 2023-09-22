import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { Button } from "~/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Input } from "~/components/ui/input";

import { Label } from "~/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { useState } from "react";

const groups = [
  {
    label: "Workspaces",
    workspaces: [
      {
        label: "Default",
        value: "personal",
      },
    ],
  },
];

type Workspace = (typeof groups)[number]["workspaces"][number];

export default function WorkspaceSelector() {
  const [open, setOpen] = useState(false);
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    groups[0]?.workspaces[0] ?? null,
  );

  return (
    <Dialog
      open={showNewWorkspaceDialog}
      onOpenChange={setShowNewWorkspaceDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a Workspace"
            className={cn("w-[200px] justify-between")}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedWorkspace?.value}.png`}
                alt={selectedWorkspace?.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedWorkspace?.label}
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
                  {group.workspaces.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedWorkspace(team);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedWorkspace?.value === team.value
                            ? "opacity-100"
                            : "opacity-0",
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
                      setShowNewWorkspaceDialog(true);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace and start manage your notes
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input id="name" placeholder="example. Frontend React Journal" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewWorkspaceDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
