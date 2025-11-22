"use client";

import React, { useState } from 'react';
import { AppState, StoryData } from '@/types';
import { InputView } from '@/components/InputView';
import { GenerativeLoader } from '@/components/GenerativeLoader';
import { StoryView } from '@/components/StoryView';

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGenerate = async (topic: string) => {
    try {
      setAppState(AppState.GENERATING);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStoryData(data);
      setAppState(AppState.VIEWING);
    } catch (error) {
      console.error("Generation error:", error);
      setErrorMsg("Something went wrong while consulting the AI. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setStoryData(null);
    setErrorMsg('');
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {appState === AppState.IDLE && (
        <InputView onSubmit={handleGenerate} />
      )}

      {appState === AppState.GENERATING && (
        <GenerativeLoader />
      )}

      {appState === AppState.VIEWING && storyData && (
        <StoryView data={storyData} onReset={handleReset} />
      )}

      {appState === AppState.ERROR && (
        <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
          <h2 className="text-3xl font-serif text-red-500 mb-4">Generation Failed</h2>
          <p className="text-gray-400 mb-8">{errorMsg}</p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-white text-black rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
