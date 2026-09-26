'use client';

import { icons } from '@/icon';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import type { IIconName } from '@/types/icons.type';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  href: string;
  website: string;
  icon: IIconName;
  username?: string;
  active?: boolean;
  dimmed?: boolean;
  onHover?: () => void;
}

export function ExternalLink({
  href,
  website,
  icon: iconName,
  username,
  active,
  dimmed,
  onHover,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const Icon = icons[iconName];

  const isExternallyControlled = active !== undefined || dimmed !== undefined;
  const isActive = isExternallyControlled ? active === true : isHovered;
  const isDimmed = isExternallyControlled ? dimmed === true : false;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => {
        setIsHovered(true);
        onHover?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      animate={{
        flex: isActive ? '1.7 1 0%' : '1 1 0%',
        opacity: isDimmed ? 0.35 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className={cn(
        'min-w-0',
        'flex flex-col gap-2.5',
        'bg-externallink-background',
        'border-externallink-border rounded-md border',
        'px-4 py-3',
        'overflow-hidden',
      )}
    >
      <div className="flex items-center gap-3">
        <Icon width={20} height={20} className="shrink-0" />

        <span className="text-sm">{website}</span>
      </div>

      {username && (
        <motion.div
          initial={false}
          animate={{
            y: isActive ? 0 : 8,
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          <span
            className={cn(
              'flex items-center',
              'gap-1',
              'text-externallink-text-secondary',
              'text-xs font-medium',
              'whitespace-nowrap',
            )}
          >
            {username}
            <uiIcons.arrowUpRight width={10} height={8} />
          </span>
        </motion.div>
      )}
    </motion.a>
  );
}
