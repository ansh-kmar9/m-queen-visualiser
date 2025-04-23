import React from 'react';
import Queen from './Queen';
import { motion } from 'framer-motion';

const Cell = ({ row, col, hasQueen, isConflict, onClick }) => {
  const isDark = (row + col) % 2 === 1;
  
  return (
    <motion.div
      className={`aspect-square ${
        isDark ? 'bg-board-dark dark:bg-gray-700' : 'bg-board-light dark:bg-gray-600'
      } ${isConflict ? 'relative' : ''} cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(row, col)}
    >
      {isConflict && (
        <motion.div 
          className="absolute inset-0 bg-board-highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {hasQueen && <Queen isConflict={isConflict} />}
    </motion.div>
  );
};

export default Cell;