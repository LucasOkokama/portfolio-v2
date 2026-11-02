import { SkeletonGeneric } from '@/components/layouts/SkeletonGeneric/SkeletonGeneric';
import { EMPTY_VALUE } from '@/constants/api';
import type { ReactNode } from 'react';

interface Props {
  loading: boolean;
  error: unknown;
  prefix?: ReactNode;
  value?: ReactNode;
  suffix?: ReactNode;
  fallback?: ReactNode;
  skeleton?: ReactNode;
}

export function renderAsyncLabel({
  loading,
  error,
  prefix,
  value,
  suffix,
  fallback = EMPTY_VALUE,
  skeleton = <SkeletonGeneric className="h-3 w-8" />,
}: Props): ReactNode {
  const content = loading ? skeleton : error ? fallback : (value ?? fallback);

  return (
    <>
      {prefix}
      {prefix && ' '}
      {content}
      {suffix && ` ${suffix}`}
    </>
  );
}
