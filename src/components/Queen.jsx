import React from 'react';
import { motion } from 'framer-motion';

const Queen = ({ isConflict }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`flex items-center justify-center w-full h-full ${isConflict ? 'text-red-500' : 'text-black dark:text-white'}`}
    >
      <span className="text-2xl md:text-3xl lg:text-4xl">♕</span>
    </motion.div>
  );
};

export default Queen;