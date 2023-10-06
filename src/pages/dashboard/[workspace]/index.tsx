import { useRouter } from 'next/router';
import AuthenticatedLayout from '~/components/layouts/authenticated';
import CardNote from '~/components/modules/notes/card-note';
import CardNoteCreate from '~/components/modules/notes/card-note-create';
import WorkspaceTitle from '~/components/modules/workspace/workspace-title';

export default function Workspace() {
  const router = useRouter();

  return (
    <>
      <AuthenticatedLayout>
        <div className="my-10">
          <div className="container mx-auto">
            <WorkspaceTitle></WorkspaceTitle>
            <div className="grid grid-cols-12 gap-[15px] lg:gap-[30px]">
              <div className="col-span-12 md:col-span-4 lg:col-span-4">
                <CardNoteCreate></CardNoteCreate>
              </div>

              {[1, 2, 3, 4].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-12 md:col-span-4 lg:col-span-4"
                  >
                    <CardNote></CardNote>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
