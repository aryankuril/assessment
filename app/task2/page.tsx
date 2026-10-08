'use client';

import dynamic from 'next/dynamic';

const Task2BottlePage = dynamic(
  () => import('../components/task2/Task2BottlePage'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mb-4" />
        <span className="font-extrabold tracking-widest text-lg uppercase">
          FLUX <span className="font-serif italic font-normal text-amber-400">THEORY</span>
        </span>
        <span className="text-xs font-mono text-zinc-500 mt-2">INITIALIZING 3D CANVAS...</span>
      </div>
    ),
  }
);

export default function Page() {
  return <Task2BottlePage />;
}