'use client';

import React from 'react';
import Board from '@/components/Board';
import { useGameStore } from '@/store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsArrowLeft, 
  BsArrowRight, 
  BsArrowCounterclockwise,
  BsGear,
  BsTrophy,
  BsLightning,
  BsChevronLeft,
  BsChevronRight,
  BsArrowLeftRight
} from 'react-icons/bs';
import { FaChess } from 'react-icons/fa6';

export default function Home() {
  const { 
    status, 
    resetGame, 
    undo, 
    history, 
    isFlipped, 
    setFlipped,
    stats,
    turn
  } = useGameStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 lg:p-12 overflow-x-hidden">
      
      {/* Header / Logo */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-7xl flex justify-between items-center mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <FaChess className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
              CHECKMATE
            </h1>
            <p className="text-[10px] text-blue-500 font-bold tracking-[0.2em] uppercase">Premium Chess</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="glass-button p-3 rounded-xl text-zinc-400 hover:text-white">
            <BsGear className="text-xl" />
          </button>
        </div>
      </motion.div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-7xl">
        
        {/* Left Sidebar - Stats */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-6"
        >
          <div className="glass-panel p-6">
            <h2 className="text-sm font-bold text-zinc-500 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <BsTrophy className="text-yellow-500" /> Performance
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-white">{stats.gamesPlayed}</span>
                <span className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Games Played</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold text-green-500">{stats.wins}</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Wins</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold text-red-500">{stats.losses}</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Losses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-sm font-bold text-zinc-500 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <BsLightning className="text-blue-500" /> Commands
            </h2>
            <button 
              onClick={resetGame}
              className="w-full py-4 bg-white text-black hover:bg-zinc-200 rounded-2xl transition-all flex items-center justify-center gap-3 font-bold text-sm shadow-xl shadow-white/5 active:scale-95"
            >
              <BsArrowCounterclockwise className="text-lg" /> NEW GAME
            </button>
          </div>
        </motion.div>

        {/* Center - Chess Board */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 lg:col-span-6 flex flex-col items-center gap-8"
        >
          {/* Opponent Info */}
          <div className="w-full flex justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center font-black text-xl border border-white/10">B</div>
                {status.isGameOver && status.winner === 'b' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                    <BsTrophy className="text-[10px] text-black" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-black text-white">Grandmaster AI</p>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-zinc-400 font-bold uppercase tracking-wider">Bot</span>
                </div>
                <p className="text-xs text-zinc-500 font-medium">Elo 2850</p>
              </div>
            </div>
            {status.isCheck && (
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-red-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-black border border-red-500/50 shadow-lg shadow-red-500/20 uppercase tracking-widest"
              >
                CHECK
              </motion.div>
            )}
          </div>

          <div className="relative w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] rounded-2xl group">
             <Board />
             {/* Turn Indicator Overlay */}
             <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-32 rounded-full transition-all duration-500 ${turn === 'w' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-transparent'}`} />
             <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-32 rounded-full transition-all duration-500 ${turn === 'b' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-transparent'}`} />
          </div>

          {/* Player Info */}
          <div className="w-full flex justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl shadow-lg shadow-white/10">W</div>
                {status.isGameOver && status.winner === 'w' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                    <BsTrophy className="text-[10px] text-black" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-black text-white uppercase tracking-tight">Magnus Carlsen</p>
                <p className="text-xs text-zinc-500 font-medium tracking-wide">Elo 2853 • Guest</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setFlipped(!isFlipped)}
                className="glass-button p-4 rounded-2xl text-zinc-400 hover:text-blue-400 active:scale-90"
                title="Flip Board"
              >
                <BsArrowLeftRight className="text-lg" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar - Move History */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-3 h-full min-h-[600px]"
        >
          <div className="glass-panel h-full flex flex-col overflow-hidden bg-white/[0.02]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Live Analysis</h2>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-20" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="grid grid-cols-1 gap-2">
                {Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="w-8 text-[10px] font-black text-zinc-600 group-hover:text-zinc-400 transition-colors">{(i + 1).toString().padStart(2, '0')}</span>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div className="bg-white/5 px-3 py-2 rounded-xl text-xs font-bold text-white border border-white/5 text-center group-hover:border-white/10 transition-all cursor-pointer hover:bg-white/10">
                        {history[i * 2]}
                      </div>
                      {history[i * 2 + 1] && (
                        <div className="bg-white/5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-400 border border-white/5 text-center group-hover:border-white/10 transition-all cursor-pointer hover:bg-white/10 hover:text-white">
                          {history[i * 2 + 1]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {history.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                    <FaChess className="text-6xl mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">No moves yet</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-3 border-t border-white/5 bg-black/20">
              <button 
                onClick={undo}
                disabled={history.length === 0}
                className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 disabled:opacity-20 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
              >
                <BsChevronLeft className="text-xs" /> PREV
              </button>
              <button 
                className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 disabled:opacity-20 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
                disabled={true}
              >
                NEXT <BsChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {status.isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="glass-panel p-10 max-w-sm w-full text-center border-white/20 bg-gradient-to-b from-zinc-900 to-black"
            >
              <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                <BsTrophy className="text-4xl text-yellow-500" />
              </div>
              <h2 className="text-3xl font-black mb-2 tracking-tighter">GAME OVER</h2>
              <p className="text-zinc-500 text-sm font-bold mb-8 uppercase tracking-[0.2em]">{status.reason}</p>
              
              <div className="mb-10">
                <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Winner</div>
                <div className="text-2xl font-black text-white">
                  {status.winner === 'draw' ? "IT'S A DRAW" : `${status.winner === 'w' ? 'WHITE' : 'BLACK'} VICTORIOUS`}
                </div>
              </div>

              <button 
                onClick={resetGame}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-2xl shadow-blue-600/30 active:scale-95"
              >
                PLAY AGAIN
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
