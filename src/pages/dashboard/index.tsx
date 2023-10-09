import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AuthenticatedLayout from '~/components/layouts/authenticated';
import Spinner from '~/components/ui/spinner';
import useStoreWorkspaces from '~/store/workspaces';

export default function Workspace() {
  const { defaultWorkspace } = useStoreWorkspaces();
  const router = useRouter();

  useEffect(() => {
    if (defaultWorkspace) {
      router.push(`/dashboard/${defaultWorkspace?.slug}`);
    }
  }, [defaultWorkspace]);

  return (
    <>
      <AuthenticatedLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Spinner></Spinner>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
