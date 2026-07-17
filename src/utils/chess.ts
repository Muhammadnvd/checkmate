import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSquareColor(rank: number, file: number) {
  return (rank + file) % 2 === 0 ? 'light' : 'dark';
}

export function getSquareName(rank: number, file: number) {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return `${files[file]}${8 - rank}`;
}

export function getRankAndFile(square: string) {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const file = files.indexOf(square[0]);
  const rank = 8 - parseInt(square[1]);
  return { rank, file };
}
