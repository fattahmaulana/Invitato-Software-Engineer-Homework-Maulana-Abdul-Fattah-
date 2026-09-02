import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  bg?: 'default' | 'light' | 'warm' | 'primary' | 'white';
}

const bgClasses: Record<string, string> = {
  default: 'bg-background',
  light: 'bg-background-light',
  warm: 'bg-cream',
  primary: 'bg-primary text-ivory',
  white: 'bg-white',
};

export default function SectionWrapper({
  children,
  className = '',
  id,
  delay = 0,
  bg = 'default',
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom ease-out curve
      }}
      className={`section-container ${bgClasses[bg]} ${className}`}
    >
      {children}
    </motion.section>
  );
}
