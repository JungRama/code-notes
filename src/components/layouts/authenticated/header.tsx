import Link from 'next/link';
import NotificationDropdown from '~/components/modules/notifications/notification-dropdown';
import UserDropdown from '~/components/modules/users/user-dropdown';
import WorkspaceSelector from '~/components/modules/workspace/workspace-selector';

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <WorkspaceSelector></WorkspaceSelector>
        <nav className={'mx-6 flex items-center space-x-4 lg:space-x-6'}>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
