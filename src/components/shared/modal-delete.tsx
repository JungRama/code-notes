import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';

export default function ModalDelete({
  children,
  title,
  description,
  actionOk = 'Delete',
  actionCancel = 'Cancel',
  onOk,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  actionOk?: string;
  actionCancel?: string;
  onOk?: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{actionCancel}</AlertDialogCancel>
          <AlertDialogAction className="!bg-white" onClick={onOk}>
            {actionOk}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
