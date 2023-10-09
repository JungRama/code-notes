import { Editor } from 'novel';
import { useToast } from '~/components/ui/use-toast';
import { api } from '~/utils/api';
import type { Editor as Editor$1 } from '@tiptap/core';
import Spinner from '~/components/ui/spinner';

export default function NotePlayground({
  id,
  defaultValue,
}: {
  id?: string;
  defaultValue: string;
}) {
  const { toast } = useToast();
  const utils = api.useContext();

  const noteUpdate = api.note.update.useMutation({
    onSuccess(data) {
      if (!id) return;
      console.log(data);

      utils.note.getById.setData(
        { id },
        {
          data: {
            ...data.data,
            contentJson: data.data.contentJson,
            contentHTML: data.data.contentHTML,
          },
        },
      );
      // utils.note.getById.
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: `${error.data?.code} - ${error.message}`,
      });
    },
  });

  const updateNoteData = (editor: Editor$1 | undefined) => {
    if (!id || !editor) return;

    noteUpdate.mutate({
      params: {
        id: id,
      },
      body: {
        contentJson: JSON.stringify(editor.getJSON()),
        contentHTML: editor.getHTML(),
      },
    });
  };
  return (
    <div className="dark-theme relative">
      {noteUpdate.isLoading && (
        <div className="absolute right-2 top-2 z-10 rounded-sm bg-white px-3 py-1 text-xs text-black">
          Saving ...
        </div>
      )}
      <Editor
        defaultValue={defaultValue ? JSON.parse(defaultValue) : ''}
        onDebouncedUpdate={(editor) => updateNoteData(editor)}
        disableLocalStorage={true}
        className="relative min-h-[500px] w-full border-stone-200  bg-black sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
      />
    </div>
  );
}
