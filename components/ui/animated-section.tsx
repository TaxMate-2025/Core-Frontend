'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeIn, scaleIn, slideIn, staggerContainer } from '@/lib/animations';

type AnimationType = 'fade' | 'scale' | 'slide' | 'stagger';
type Direction = 'up' | 'down' | 'left' | 'right';

interface AnimatedSectionProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  type?: AnimationType;
  direction?: Direction;
  delay?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string };
}

export function AnimatedSection({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  className = '',
  viewport = { once: true, margin: '-100px' },
  ...props
}: AnimatedSectionProps) {
  const getAnimation = () => {
    switch (type) {
      case 'fade':
        return fadeIn(direction, delay);
      case 'scale':
        return scaleIn(0.9, delay);
      case 'slide':
        return slideIn(direction);
      case 'stagger':
        return staggerContainer(0.1, delay * 0.1);
      default:
        return fadeIn(direction, delay);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={getAnimation()}
      className={className}
      {...props}
    >
      {type === 'stagger' ? (
        <motion.div variants={staggerContainer(0.1, delay * 0.1)}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
