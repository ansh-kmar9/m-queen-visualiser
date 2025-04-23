import { useState, useCallback, useRef } from 'react';

export default function useNQueens(initialSize = 8) {
  const [size, setSize] = useState(initialSize);
  const [board, setBoard] = useState(Array(initialSize).fill().map(() => Array(initialSize).fill(0)));
  const [solving, setSolving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(300); // ms between steps
  const [conflicts, setConflicts] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  
  // Refs for animation control
  const animationRef = useRef(null);
  const pausedRef = useRef(false);

  // Initialize or reset the board
  const resetBoard = useCallback(() => {
    setBoard(Array(size).fill().map(() => Array(size).fill(0)));
    setConflicts([]);
    setSolving(false);
    setPaused(false);
    pausedRef.current = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [size]);

  // Check if a queen can be placed at board[row][col]
  const isSafe = useCallback((tempBoard, row, col) => {
    // Check row
    for (let i = 0; i < col; i++) {
      if (tempBoard[row][i] === 1) return false;
    }

    // Check upper diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (tempBoard[i][j] === 1) return false;
    }

    // Check lower diagonal
    for (let i = row, j = col; i < size && j >= 0; i++, j--) {
      if (tempBoard[i][j] === 1) return false;
    }

    return true;
  }, [size]);

  // Find conflicts for visualization
  const findConflicts = useCallback((tempBoard, row, col) => {
    const conflicts = [];

    // Check row
    for (let i = 0; i < size; i++) {
      if (i !== col && tempBoard[row][i] === 1) {
        conflicts.push([row, i]);
      }
    }

    // Check column
    for (let i = 0; i < size; i++) {
      if (i !== row && tempBoard[i][col] === 1) {
        conflicts.push([i, col]);
      }
    }

    // Check diagonals
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (tempBoard[i][j] === 1 && (i + j === row + col || i - j === row - col) && !(i === row && j === col)) {
          conflicts.push([i, j]);
        }
      }
    }

    return conflicts;
  }, [size]);

  // Solve N-Queens with visualization
  const solveNQueens = useCallback(async () => {
    if (showAllSolutions && solutions.length > 0) {
      // If we already have solutions, just display them
      setBoard([...solutions[currentSolutionIndex]]);
      return;
    }

    resetBoard();
    setSolving(true);
    pausedRef.current = false;
    
    const allSolutions = [];
    const tempBoard = Array(size).fill().map(() => Array(size).fill(0));

    const solveHelper = async (col) => {
      if (pausedRef.current) {
        return new Promise(resolve => {
          animationRef.current = requestAnimationFrame(() => {
            if (!pausedRef.current) {
              resolve(solveHelper(col));
            } else {
              resolve(false);
            }
          });
        });
      }

      if (col >= size) {
        // Found a solution
        const solution = tempBoard.map(row => [...row]);
        allSolutions.push(solution);
        
        if (!showAllSolutions) {
          setBoard([...solution]);
          setSolutions([solution]);
          setSolving(false);
          return true;
        }
        return false; // Continue searching for more solutions
      }

      for (let row = 0; row < size; row++) {
        if (isSafe(tempBoard, row, col)) {
          // Place queen
          tempBoard[row][col] = 1;
          setBoard([...tempBoard.map(row => [...row])]);
          setConflicts([]);
          
          // Delay for visualization
          await new Promise(resolve => setTimeout(resolve, speed));
          
          // Recursively place queens in remaining columns
          if (await solveHelper(col + 1)) {
            return true;
          }
          
          // Backtrack
          tempBoard[row][col] = 0;
          setBoard([...tempBoard.map(row => [...row])]);
          
          // Show conflicts for visualization
          const currentConflicts = findConflicts(tempBoard, row, col);
          setConflicts(currentConflicts);
          
          // Delay for visualization
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
      
      return false;
    };

    if (showAllSolutions) {
      // Find all solutions without animation first
      const findAllSolutions = (col) => {
        if (col >= size) {
          allSolutions.push(tempBoard.map(row => [...row]));
          return;
        }

        for (let row = 0; row < size; row++) {
          if (isSafe(tempBoard, row, col)) {
            tempBoard[row][col] = 1;
            findAllSolutions(col + 1);
            tempBoard[row][col] = 0;
          }
        }
      };

      findAllSolutions(0);
      setSolutions(allSolutions);
      
      if (allSolutions.length > 0) {
        setCurrentSolutionIndex(0);
        setBoard([...allSolutions[0]]);
      }
    } else {
      await solveHelper(0);
    }
    
    setSolving(false);
  }, [size, speed, isSafe, findConflicts, resetBoard, showAllSolutions, solutions, currentSolutionIndex]);

  // Toggle pause/resume
  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  }, []);

  // Navigate through solutions
  const nextSolution = useCallback(() => {
    if (solutions.length > 0) {
      const nextIndex = (currentSolutionIndex + 1) % solutions.length;
      setCurrentSolutionIndex(nextIndex);
      setBoard([...solutions[nextIndex]]);
    }
  }, [solutions, currentSolutionIndex]);

  const prevSolution = useCallback(() => {
    if (solutions.length > 0) {
      const prevIndex = (currentSolutionIndex - 1 + solutions.length) % solutions.length;
      setCurrentSolutionIndex(prevIndex);
      setBoard([...solutions[prevIndex]]);
    }
  }, [solutions, currentSolutionIndex]);

  // Toggle a cell in manual mode
  const toggleCell = useCallback((row, col) => {
    if (!manualMode || solving) return;
    
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(r => [...r]);
      newBoard[row][col] = newBoard[row][col] === 1 ? 0 : 1;
      
      // Check for conflicts
      const newConflicts = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (newBoard[i][j] === 1) {
            const cellConflicts = findConflicts(newBoard, i, j);
            if (cellConflicts.length > 0) {
              newConflicts.push(...cellConflicts);
              newConflicts.push([i, j]); // Also highlight the queen causing conflicts
            }
          }
        }
      }
      
      setConflicts([...new Set(newConflicts.map(c => c.join(',')))].map(c => c.split(',').map(Number)));
      return newBoard;
    });
  }, [manualMode, solving, size, findConflicts]);

  // Randomize board colors
  const randomizeColors = useCallback(() => {
    const root = document.documentElement;
    const randomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    root.style.setProperty('--light-cell', randomColor());
    root.style.setProperty('--dark-cell', randomColor());
  }, []);

  return {
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
  };
}