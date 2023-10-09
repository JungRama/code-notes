import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NotificationDropdown from '~/components/modules/notifications/notification-dropdown';
import UserDropdown from '~/components/modules/users/user-dropdown';
import WorkspaceSelector from '~/components/modules/workspace/workspace-selector';
import useStoreWorkspaces from '~/store/workspaces';

export default function Header() {
  const router = useRouter();

  const { defaultWorkspace } = useStoreWorkspaces();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <Link href={'/'}>
            <Image
              src={'/favicon.png'}
              alt="logo"
              className="mb-0 mt-1"
              width={42}
              height={42}
            ></Image>
          </Link>
          <WorkspaceSelector></WorkspaceSelector>
          <nav className={'flex items-center space-x-4 lg:space-x-6'}>
            <Link
              href={`/dashboard/${defaultWorkspace?.slug}`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}
