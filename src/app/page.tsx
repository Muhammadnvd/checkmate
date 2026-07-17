'use client';

import React from 'react';
import Board from '@/components/Board';
import { useGameStore } from '@/store/useGameStore';
import { motion } from 'framer-motion';
import { 
  BsArrowLeft, 
  BsArrowRight, 
  BsArrowCounterclockwise,
  BsGear,
  BsTrophy,
  BsLightning
} from 'react-icons/bs';

export default function Home() {
  const { 
    status, 
    resetGame, 
    undo, 
    history, 
    isFlipped, 
    setFlipped 
  } = useGameStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12 bg-[#161512] text-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl">
        
        {/* Left Sidebar - Stats & Info */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
          <div className="bg-[#262421] p-6 rounded-xl shadow-xl border border-white/5 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BsTrophy className="text-yellow-500" /> Statistics
            </h2>
            <div className="space-y-4 text-zinc-400">
              <div className="flex justify-between">
                <span>Games Played</span>
                <span className="text-white font-mono">0</span>
              </div>
              <div className="flex justify-between">
                <span>Wins</span>
                <span className="text-green-500 font-mono">0</span>
              </div>
              <div className="flex justify-between">
                <span>Losses</span>
                <span className="text-red-500 font-mono">0</span>
              </div>
            </div>
          </div>

          <div className="bg-[#262421] p-6 rounded-xl shadow-xl border border-white/5 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BsLightning className="text-blue-500" /> Quick Actions
            </h2>
            <button 
              onClick={resetGame}
              className="w-full py-3 px-4 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <BsArrowCounterclockwise /> New Game
            </button>
          </div>
        </div>

        {/* Center - Chess Board */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center gap-6">
          <div className="w-full flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center font-bold">B</div>
              <div>
                <p className="font-bold">Opponent</p>
                <p className="text-xs text-zinc-500">1600</p>
              </div>
            </div>
            {status.isCheck && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-red-500/20 text-red-500 px-4 py-1 rounded-full text-sm font-bold border border-red-500/50"
              >
                CHECK
              </motion.div>
            )}
          </div>

          <Board />

          <div className="w-full flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold">W</div>
              <div>
                <p className="font-bold">You</p>
                <p className="text-xs text-zinc-500">1600</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setFlipped(!isFlipped)}
                className="p-3 bg-[#262421] hover:bg-[#302e2a] rounded-lg transition-colors"
                title="Flip Board"
              >
                <BsArrowCounterclockwise />
              </button>
              <button 
                className="p-3 bg-[#262421] hover:bg-[#302e2a] rounded-lg transition-colors"
                title="Settings"
              >
                <BsGear />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Move History */}
        <div className="col-span-1 lg:col-span-3 h-full min-h-[500px]">
          <div className="bg-[#262421] h-full rounded-xl shadow-xl border border-white/5 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#21201d]">
              <h2 className="font-bold flex items-center gap-2">Move History</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 font-mono text-sm">
              <div className="grid grid-cols-6 gap-y-1">
                {Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="col-span-1 text-zinc-500 py-1 text-center">{i + 1}.</div>
                    <div className="col-span-2 hover:bg-white/5 px-2 py-1 rounded cursor-pointer">
                      {history[i * 2]}
                    </div>
                    <div className="col-span-2 hover:bg-white/5 px-2 py-1 rounded cursor-pointer">
                      {history[i * 2 + 1] || ''}
                    </div>
                    <div className="col-span-1"></div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-2 border-t border-white/5 bg-[#21201d]">
              <button 
                onClick={undo}
                className="flex items-center justify-center gap-2 py-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors text-sm font-medium"
              >
                <BsArrowLeft /> Undo
              </button>
              <button className="flex items-center justify-center gap-2 py-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors text-sm font-medium">
                Next <BsArrowRight />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Game Over Modal Placeholder */}
      {status.isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#262421] p-8 rounded-2xl shadow-2xl border border-white/10 max-w-sm w-full text-center"
          >
            <h2 className="text-3xl font-bold mb-2">Game Over</h2>
            <p className="text-zinc-400 mb-6">{status.reason}</p>
            <div className="text-xl font-bold mb-8">
              {status.winner === 'draw' ? "It's a Draw!" : `${status.winner === 'w' ? 'White' : 'Black'} Wins!`}
            </div>
            <button 
              onClick={resetGame}
              className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition-colors shadow-lg shadow-green-900/20"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
