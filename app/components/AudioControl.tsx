'use client';

import { useAudioControl } from '@/app/hooks/useAudioControl';

export function AudioControl() {
  const { isPlaying, toggleAudio, isMounted, hasBeenPaused } = useAudioControl();

  if (!isMounted || hasBeenPaused) return null;

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      title={isPlaying ? 'Stop prayer sound' : 'Play prayer sound'}
      aria-label={isPlaying ? 'Stop prayer sound' : 'Play prayer sound'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
