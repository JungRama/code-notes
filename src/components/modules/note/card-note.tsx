import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '~/components/ui/card';

export default function CardNote({
  id,
  title,
  updatedAt,
  description,
  url,
}: {
  id: string;
  title: string;
  updatedAt: Date;
  description?: string;
  url: string;
}) {
  const generateRandomGradient = () => {
    const uuidParts = id.split('-');
    const color1 = `#${uuidParts[0]?.substring(0, 6) ?? '#3B4F75'}`;
    const color2 = `#${uuidParts[1]?.substring(0, 6) ?? '#1B253E'}`;
    const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
    return gradient;
  };

  return (
    <Link href={url} className="h-full">
      <Card className="flex h-full flex-col justify-between overflow-hidden transition hover:border-gray-500">
        <CardContent className="px-0">
          {/* <Image
            src={
              'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80'
            }
            alt="default-cover"
            width={500}
            height={200}
            className="h-[100px] w-full"
          ></Image> */}

          <div
            className="h-[100px] w-full "
            style={{
              background: generateRandomGradient(),
            }}
          ></div>

          <div className="p-5">
            <CardTitle className="font-medium">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-2">{description}</CardDescription>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs">
            Last updated:{' '}
            {Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(updatedAt)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
