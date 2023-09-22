import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";

// const Card = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "bg-card text-card-foreground rounded-lg border shadow-sm",
//       className,
//     )}
//     {...props}
//   />
// ));

export default function CardNote() {
  return (
    <Link href={"/"} className="h-full">
      <Card className="flex h-full flex-col justify-between overflow-hidden transition hover:border-gray-500">
        <CardContent className="px-0">
          <Image
            src={
              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
            }
            alt="default-cover"
            width={500}
            height={200}
            className="h-[100px] w-full"
          ></Image>

          <div className="p-5">
            <CardTitle className="font-medium">Javascript Snippets</CardTitle>
            <CardDescription className="mt-2">
              My javascript snippets
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs">Last updated: 2 minutes ago</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
