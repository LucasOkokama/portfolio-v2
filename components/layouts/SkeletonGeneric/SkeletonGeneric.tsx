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
        'bg-content-text-secondary/30',
        'animate-pulse',
        'rounded-sm',
        className,
      )}
    />
  );
}
