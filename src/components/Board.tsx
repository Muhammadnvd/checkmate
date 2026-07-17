'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { BOARD_THEMES } from '@/constants/themes';
import { getSquareColor, getSquareName } from '@/utils/chess';
import Square from './Square';

const Board: React.FC = () => {
  const { isFlipped, settings } = useGameStore();
  const theme = (BOARD_THEMES as any)[settings.boardTheme] || BOARD_THEMES.classic;

  const ranks = isFlipped ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
  const files = isFlipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="relative aspect-square w-full max-w-[600px] overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5">
      <div className="grid h-full w-full grid-cols-8 grid-rows-8">
        {ranks.map((rankIndex) => (
          files.map((fileIndex) => {
            const squareName = getSquareName(rankIndex, fileIndex);
            const color = getSquareColor(rankIndex, fileIndex);
            
            return (
              <Square
                key={squareName}
                name={squareName}
                rank={rankIndex}
                file={fileIndex}
                color={color === 'light' ? theme.light : theme.dark}
              />
            );
          })
        ))}
      </div>
    </div>
  );
};

export default Board;
