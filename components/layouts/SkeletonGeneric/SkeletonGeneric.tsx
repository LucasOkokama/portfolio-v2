import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

type SkeletonProps = {
  className?: string;
};

export function SkeletonGeneric({ className }: SkeletonProps) {
  return (
    <motion.span
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.15,
        ease: 'easeOut',
      }}
      className={cn(
        'inline-block',
        'h-4',
        'w-12',
        'bg-content-text-primary/30',
        'animate-pulse',
        'rounded-sm',
        className,
      )}
    />
  );
}
