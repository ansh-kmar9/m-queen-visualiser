import React from 'react';
import { motion } from 'framer-motion';

const Controls = ({
  size,
  setSize,
  solving,
  paused,
  solveNQueens,
  resetBoard,
  togglePause,
  speed,
  setSpeed,
  showAllSolutions,
  setShowAllSolutions,
  solutions,
  currentSolutionIndex,
  nextSolution,
  prevSolution,
  manualMode,
  setManualMode,
  randomizeColors
}) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="size" className="block text-gray-700 dark:text-gray-300 mb-2">
          Board Size (N): {size}
        </label>
        <input
          type="range"
          id="size"
          min="4"
          max="12"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          disabled={solving}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="speed" className="block text-gray-700 dark:text-gray-300 mb-2">
          Animation Speed: {speed === 600 ? 'Slow' : speed === 300 ? 'Medium' : 'Fast'}
        </label>
        <input
          type="range"
          id="speed"
          min="100"
          max="600"
          step="250"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          disabled={solving}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showAllSolutions}
            onChange={() => setShowAllSolutions(!showAllSolutions)}
            disabled={solving}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Show All Solutions
          </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={manualMode}
            onChange={() => setManualMode(!manualMode)}
            disabled={solving}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Manual Mode
          </span>
        </label>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {!manualMode && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={solving ? togglePause : solveNQueens}
              className={`px-4 py-2 rounded-md ${
                solving
                  ? paused
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {solving ? (paused ? 'Resume' : 'Pause') : 'Solve'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetBoard}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Reset
            </motion.button>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={randomizeColors}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md"
        >
          Randomize Colors
        </motion.button>

        {showAllSolutions && solutions.length > 0 && (
          <div className="flex gap-2 mt-2 w-full justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSolution}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
            >
              Previous
            </motion.button>
            <span className="flex items-center text-gray-700 dark:text-gray-300">
              {currentSolutionIndex + 1} / {solutions.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSolution}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;