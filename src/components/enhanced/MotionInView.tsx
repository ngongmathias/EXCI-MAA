import { FC, PropsWithChildren, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type MotionInViewProps = PropsWithChildren<{
  y?: number;
  duration?: number;
  delay?: number;
  className?: string;
}>;

const MotionInView: FC<MotionInViewProps> = ({
  children,
  y = 20,
  duration = 0.6,
  delay = 0,
  className
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionInView;


