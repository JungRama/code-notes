import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div className={cn('animate-spin', className)}>
      <Loader2></Loader2>
    </div>
  );
};

export default Spinner;
