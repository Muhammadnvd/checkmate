import { Chess, Move as ChessJSMove } from 'chess.js';
import { GameStatus, Color } from '../types/chess';

export class ChessEngine {
  private game: Chess;

  constructor(fen?: string) {
    this.game = new Chess(fen);
  }

  get fen(): string {
    return this.game.fen();
  }

  get pgn(): string {
    return this.game.pgn();
  }

  get turn(): Color {
    return this.game.turn() as Color;
  }

  get history(): string[] {
    return this.game.history();
  }

  get isGameOver(): boolean {
    return this.game.isGameOver();
  }

  move(move: string | { from: string; to: string; promotion?: string }) {
    try {
      return this.game.move(move);
    } catch (e) {
      return null;
    }
  }

  undo() {
    return this.game.undo();
  }

  reset() {
    this.game.reset();
  }

  loadFen(fen: string): boolean {
    try {
      this.game.load(fen);
      return true;
    } catch (e) {
      return false;
    }
  }

  loadPgn(pgn: string): boolean {
    try {
      this.game.loadPgn(pgn);
      return true;
    } catch (e) {
      return false;
    }
  }

  getValidMoves(square?: string) {
    return this.game.moves({ square: square as any, verbose: true });
  }

  getStatus(): GameStatus {
    const isCheckmate = this.game.isCheckmate();
    const isStalemate = this.game.isStalemate();
    const isDraw = this.game.isDraw();
    const isCheck = this.game.isCheck();
    const isThreefoldRepetition = this.game.isThreefoldRepetition();
    const isInsufficientMaterial = this.game.isInsufficientMaterial();

    let winner: Color | 'draw' | null = null;
    let reason = '';

    if (isCheckmate) {
      winner = this.game.turn() === 'w' ? 'b' : 'w';
      reason = 'Checkmate';
    } else if (isStalemate) {
      winner = 'draw';
      reason = 'Stalemate';
    } else if (isThreefoldRepetition) {
      winner = 'draw';
      reason = 'Threefold Repetition';
    } else if (isInsufficientMaterial) {
      winner = 'draw';
      reason = 'Insufficient Material';
    } else if (isDraw) {
      winner = 'draw';
      reason = 'Draw';
    }

    return {
      isCheck,
      isCheckmate,
      isStalemate,
      isDraw,
      isGameOver: this.game.isGameOver(),
      winner,
      reason,
    };
  }

  getBoard() {
    return this.game.board();
  }
}
