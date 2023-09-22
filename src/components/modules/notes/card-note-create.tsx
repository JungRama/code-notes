import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export default function CardNoteCreate() {
  return (
    <Link href={"/"} className="h-full">
      <Card className="h-full overflow-hidden border-dashed transition hover:border-gray-500">
        <CardContent className="flex h-full w-full items-center justify-center p-5">
          <CardTitle className="flex gap-2 font-medium">
            <PlusCircle></PlusCircle>
            Create New Note
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
