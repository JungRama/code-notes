import { Bell } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export default function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex h-8 items-center rounded-full px-2"
        >
          <Bell className="h-5"></Bell>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="p-0">
          <Link href={'/'} className="block p-2">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">
                  Welcome to code notes!
                </p>
              </div>
              <p className="font-regular text-muted-foreground">
                Write down your notes easily and access it freely. Thank! by{' '}
                <a href="https://jungrama.com/" target="_blank">
                  @JR
                </a>
              </p>
              <p className="font-regular text-xs leading-none text-muted-foreground">
                10/9/2023
              </p>
            </div>
          </Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
