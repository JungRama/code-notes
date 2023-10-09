import { User2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export default function UserDropdown() {
  const session = useSession();
  const truncateString = (str: string, maxLength: number) =>
    str.length <= maxLength ? str : str.slice(0, maxLength - 3) + '...';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex h-8 items-center gap-2 rounded-full px-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User2 className="h-4"></User2>
            </AvatarFallback>
          </Avatar>
          <p>{truncateString(session.data?.user.name ?? '', 15)}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {truncateString(session.data?.user.name ?? '', 28)}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.data?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: '/',
            })
          }
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
