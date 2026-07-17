'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { PieceType, Color } from '@/types/chess';
import { 
  FaChessPawn, 
  FaChessKnight, 
  FaChessBishop, 
  FaChessRook, 
  FaChessQueen, 
  FaChessKing 
} from 'react-icons/fa6';

interface PieceProps {
  type: PieceType;
  color: Color;
  square: string;
}

const Piece: React.FC<PieceProps> = ({ type, color, square }) => {
  const { settings } = useGameStore();

  const getIcon = () => {
    const props = {
      className: `w-5/6 h-5/6 ${color === 'w' ? 'text-white drop-shadow-md' : 'text-zinc-900 drop-shadow-sm'}`,
    };

    switch (type) {
      case 'p': return <FaChessPawn {...props} />;
      case 'n': return <FaChessKnight {...props} />;
      case 'b': return <FaChessBishop {...props} />;
      case 'r': return <FaChessRook {...props} />;
      case 'q': return <FaChessQueen {...props} />;
      case 'k': return <FaChessKing {...props} />;
      default: return null;
    }
  };

  return (
    <motion.div
      layoutId={square}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        duration: settings.animationSpeed / 1000 
      }}
      className="z-10 flex h-full w-full items-center justify-center select-none"
    >
      {getIcon()}
    </motion.div>
  );
};

export default Piece;
