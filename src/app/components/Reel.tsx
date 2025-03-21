'use client';

import React from 'react';

export default function Reel({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-[320px] h-[570px] relative overflow-hidden rounded-2xl shadow-lg border border-gray-800">
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}