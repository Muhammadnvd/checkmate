export type Color = 'w' | 'b';
export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface Piece {
  type: PieceType;
  color: Color;
}

export interface Square {
  rank: number;
  file: number;
}

export interface Move {
  from: string;
  to: string;
  promotion?: string;
}

export interface GameStatus {
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
  winner: Color | 'draw' | null;
  reason?: string;
}

export interface GameSettings {
  boardTheme: string;
  pieceStyle: string;
  animationSpeed: number;
  soundsEnabled: boolean;
  showCoordinates: boolean;
  autoFlip: boolean;
  highlightLegalMoves: boolean;
  highlightLastMove: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  averageMoves: number;
  longestGame: number;
  fastestWin: number;
  totalTimePlayed: number;
}
