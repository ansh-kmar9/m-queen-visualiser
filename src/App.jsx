import React from 'react';
import { motion } from 'framer-motion';
import Board from './components/Board';
import Controls from './components/Controls';
import ThemeToggle from './components/ThemeToggle';
import useNQueens from './hooks/useNQueens';

function App() {
  const {
    size,
    setSize,
    board,
    solving,
    paused,
    speed,
    setSpeed,
    conflicts,
    solutions,
    currentSolutionIndex,
    showAllSolutions,
    setShowAllSolutions,
    manualMode,
    setManualMode,
    solveNQueens,
    resetBoard,
    togglePause,
    nextSolution,
    prevSolution,
    toggleCell,
    randomizeColors
  } = useNQueens(8);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-200">
      <ThemeToggle />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl"
      >
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            N-Queens Visualizer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Visualize the N-Queens problem and its solutions
          </p>
        </header>

        <div className="space-y-6">
          <Board 
            board={board} 
            conflicts={conflicts} 
            toggleCell={toggleCell} 
          />
          
          <Controls
            size={size}
            setSize={setSize}
            solving={solving}
            paused={paused}
            solveNQueens={solveNQueens}
            resetBoard={resetBoard}
            togglePause={togglePause}
            speed={speed}
            setSpeed={setSpeed}
            showAllSolutions={showAllSolutions}
            setShowAllSolutions={setShowAllSolutions}
            solutions={solutions}
            currentSolutionIndex={currentSolutionIndex}
            nextSolution={nextSolution}
            prevSolution={prevSolution}
            manualMode={manualMode}
            setManualMode={setManualMode}
            randomizeColors={randomizeColors}
          />
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              About N-Queens
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard 
              so that no two queens threaten each other. Thus, a solution requires that no two 
              queens share the same row, column, or diagonal.
            </p>
            {manualMode && (
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-md">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Manual Mode:</strong> Click on the board to place or remove queens. 
                  Conflicting positions will be highlighted in red.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">

  <div className="flex justify-center space-x-4 mt-2">
    <a 
      href="https://www.linkedin.com/in/anshkmr/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-1" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
      LinkedIn
    </a>
    <a 
      href="https://github.com/ansh-kmar9" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-1" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub
    </a>
  </div>
  <p className="mt-2">© {new Date().getFullYear()} Ansh Kumar</p>
</footer>
      </motion.div>
    </div>
  );
}

export default App;