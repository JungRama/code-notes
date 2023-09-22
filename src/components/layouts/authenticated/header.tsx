import Link from "next/link";
import WorkspaceSelector from "~/components/modules/workspace/workspace-selector";
import UserDropdown from "~/components/modules/users/user-dropdown";
import NotificationDropdown from "~/components/modules/notifications/notification-dropdown";

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <WorkspaceSelector></WorkspaceSelector>
        <nav className={"mx-6 flex items-center space-x-4 lg:space-x-6"}>
          <Link
            href="/examples/dashboard"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Member
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}
