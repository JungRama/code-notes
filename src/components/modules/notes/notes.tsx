import { Editor } from 'novel';

export default function Notes({
  id,
  workspaceId,
}: {
  id?: string;
  workspaceId?: string;
}) {
  return (
    <div className="dark-theme">
      <Editor
        defaultValue={''}
        disableLocalStorage={true}
        className="relative min-h-[500px] w-full border-stone-200  bg-black sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
      />
    </div>
  );
}
