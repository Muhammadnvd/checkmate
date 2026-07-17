'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { ChessEngine } from '@/engine/ChessEngine';
import Piece from './Piece';

interface SquareProps {
  name: string;
  rank: number;
  file: number;
  color: string;
}

const Square: React.FC<SquareProps> = ({ name, rank, file, color }) => {
  const { 
    fen, 
    selectedSquare, 
    lastMove, 
    setSelectedSquare, 
    makeMove,
    settings 
  } = useGameStore();

  const engine = new ChessEngine(fen);
  const board = engine.getBoard();
  const piece = board[rank][file];

  const isSelected = selectedSquare === name;
  const isLastMove = lastMove && (lastMove.from === name || lastMove.to === name);
  
  const validMoves = selectedSquare ? engine.getValidMoves(selectedSquare) : [];
  const isPossibleMove = validMoves.some(m => m.to === name);
  const isCapture = isPossibleMove && piece !== null;

  const handleClick = () => {
    if (selectedSquare === name) {
      setSelectedSquare(null);
    } else if (isPossibleMove) {
      makeMove({ from: selectedSquare!, to: name, promotion: 'q' });
    } else if (piece && piece.color === engine.turn) {
      setSelectedSquare(name);
    } else {
      setSelectedSquare(null);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex h-full w-full items-center justify-center cursor-pointer transition-colors duration-200"
      style={{ backgroundColor: color }}
    >
      {/* Last Move Highlight */}
      {settings.highlightLastMove && isLastMove && (
        <div className="absolute inset-0 bg-yellow-400/40" />
      )}

      {/* Selected Highlight */}
      {isSelected && (
        <div className="absolute inset-0 bg-yellow-400/60" />
      )}

      {/* Piece */}
      {piece && (
        <Piece 
          type={piece.type} 
          color={piece.color} 
          square={name}
        />
      )}

      {/* Legal Move Indicators */}
      {settings.highlightLegalMoves && isPossibleMove && (
        <div className={isCapture 
          ? "absolute inset-0 border-[6px] border-black/10 rounded-full m-1" 
          : "h-4 w-4 rounded-full bg-black/10"
        } />
      )}

      {/* Coordinates */}
      {settings.showCoordinates && (
        <>
          {file === 0 && (
            <span className={`absolute top-0.5 left-0.5 text-[10px] font-bold ${rank % 2 === 0 ? 'text-[#779556]' : 'text-[#ebecd0]'}`}>
              {8 - rank}
            </span>
          )}
          {rank === 7 && (
            <span className={`absolute bottom-0.5 right-0.5 text-[10px] font-bold ${file % 2 !== 0 ? 'text-[#779556]' : 'text-[#ebecd0]'}`}>
              {String.fromCharCode(97 + file)}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Square;
