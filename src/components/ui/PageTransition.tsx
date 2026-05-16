import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const PageTransition: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.98 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1] // Easing más natural (Standard Easing)
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
