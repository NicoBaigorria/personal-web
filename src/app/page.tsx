"use client";

import React from 'react';
import ThreeScene from "@/components/scene3D/scene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="App">
        <ThreeScene />
      </div>
    </main>
  );
}
