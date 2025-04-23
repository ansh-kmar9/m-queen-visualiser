import React from 'react';
import Cell from './Cell';
import { motion } from 'framer-motion';

const Board = ({ board, conflicts, toggleCell }) => {
  // Check if a cell has a conflict
  const hasConflict = (row, col) => {
    return conflicts.some(([r, c]) => r === row && c === col);
  };

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto border-2 border-gray-800 dark:border-gray-300 rounded-md overflow-hidden shadow-lg"
      layout
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${board.length}, 1fr)` }}>
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              hasQueen={cell === 1}
              isConflict={hasConflict(rowIndex, colIndex)}
              onClick={toggleCell}
            />
          ))
        ))}
      </div>
    </motion.div>
  );
};

export default Board;