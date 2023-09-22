import { Bell } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
          <Link href={"/"} className="block p-2">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <p className="text-sm font-medium leading-none">
                  Invited on &quot;Vercela Workspace&quot;
                </p>
              </div>
              <p className="text-muted-foreground text-xs leading-none">
                20 minutes ago
              </p>
            </div>
          </Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
