import AuthenticatedLayout from "~/components/layouts/authenticated";
import CardNote from "~/components/modules/notes/card-note";
import CardNoteCreate from "~/components/modules/notes/card-note-create";

export default function Dashboard() {
  return (
    <>
      <AuthenticatedLayout>
        <div className="my-10">
          <div className="container mx-auto">
            <div className="mb-10 flex justify-between">
              <h1
                className="border-b-2 border-transparent text-3xl font-medium focus:border-b-2 focus:border-white focus:outline-none"
                contentEditable="true"
              >
                Default Workspace
              </h1>
            </div>

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
