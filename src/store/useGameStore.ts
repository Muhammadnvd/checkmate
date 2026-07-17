import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChessEngine } from '../engine/ChessEngine';
import { GameStatus, GameSettings, GameStats, Color } from '../types/chess';

interface GameState {
  fen: string;
  history: string[];
  status: GameStatus;
  settings: GameSettings;
  stats: GameStats;
  capturedPieces: { w: string[]; b: string[] };
  isFlipped: boolean;
  selectedSquare: string | null;
  lastMove: { from: string; to: string } | null;
  moveHistoryIndex: number;
  turn: Color;
  
  // Actions
  makeMove: (move: string | { from: string; to: string; promotion?: string }) => void;
  undo: () => void;
  redo: () => void;
  resetGame: () => void;
  setFlipped: (flipped: boolean) => void;
  setSelectedSquare: (square: string | null) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  importFen: (fen: string) => boolean;
  jumpToMove: (index: number) => void;
}

const initialSettings: GameSettings = {
  boardTheme: 'classic',
  pieceStyle: 'classic',
  animationSpeed: 300,
  soundsEnabled: true,
  showCoordinates: true,
  autoFlip: false,
  highlightLegalMoves: true,
  highlightLastMove: true,
};

const initialStats: GameStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  averageMoves: 0,
  longestGame: 0,
  fastestWin: 0,
  totalTimePlayed: 0,
};

const engine = new ChessEngine();

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      fen: engine.fen,
      history: [],
      status: engine.getStatus(),
      settings: initialSettings,
      stats: initialStats,
      capturedPieces: { w: [], b: [] },
      isFlipped: false,
      selectedSquare: null,
      lastMove: null,
      moveHistoryIndex: -1,
      turn: engine.turn,

      makeMove: (move) => {
        const result = engine.move(move);
        if (result) {
          const status = engine.getStatus();
          set((state) => {
            const newHistory = engine.history;
            return {
              fen: engine.fen,
              history: newHistory,
              status,
              lastMove: { from: result.from, to: result.to },
              selectedSquare: null,
              moveHistoryIndex: newHistory.length - 1,
              turn: engine.turn,
            };
          });

          if (status.isGameOver) {
            set((state) => {
              const stats = { ...state.stats };
              stats.gamesPlayed += 1;
              if (status.winner === 'w') stats.wins += 1;
              else if (status.winner === 'b') stats.losses += 1;
              else if (status.winner === 'draw') stats.draws += 1;
              return { stats };
            });
          }
        }
      },

      undo: () => {
        engine.undo();
        set({
          fen: engine.fen,
          history: engine.history,
          status: engine.getStatus(),
          moveHistoryIndex: engine.history.length - 1,
          turn: engine.turn,
        });
      },

      redo: () => {
        // Redo is tricky with chess.js without custom stack, 
        // for now let's focus on basic functionality
      },

      resetGame: () => {
        engine.reset();
        set({
          fen: engine.fen,
          history: [],
          status: engine.getStatus(),
          lastMove: null,
          selectedSquare: null,
          moveHistoryIndex: -1,
          turn: engine.turn,
        });
      },

      setFlipped: (isFlipped) => set({ isFlipped }),
      setSelectedSquare: (selectedSquare) => set({ selectedSquare }),
      updateSettings: (newSettings) => 
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      
      importFen: (fen) => {
        if (engine.loadFen(fen)) {
          set({
            fen: engine.fen,
            history: [],
            status: engine.getStatus(),
            lastMove: null,
            selectedSquare: null,
            moveHistoryIndex: -1,
            turn: engine.turn,
          });
          return true;
        }
        return false;
      },

      jumpToMove: (index) => {
        // Implementation for jumping to a move in history
      }
    }),
    {
      name: 'checkmate-game-storage',
      partialize: (state) => ({
        settings: state.settings,
        stats: state.stats,
      }),
    }
  )
);
