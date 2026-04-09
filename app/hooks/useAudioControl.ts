// Sound system disabled
// import { useState, useEffect, useRef } from 'react';
//
// export function useAudioControl() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isMounted, setIsMounted] = useState(false);
//   const [hasBeenPaused, setHasBeenPaused] = useState(false);
//
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);
//
//   useEffect(() => {
//     if (!isMounted) return;
//
//     if (!audioRef.current) {
//       // Create audio element
//       const audio = new Audio();
//       // Beautiful soft Islamic Quranic recitation (Surah Al-Fatihah)
//       audio.src = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3';
//       audio.loop = true;
//       audio.volume = 0.3; // 30% volume - soft background sound
//       audioRef.current = audio;
//
//       // Attempt to auto-play with user interaction fallback
//       const playAudio = () => {
//         audio.play().catch((error) => {
//           console.log('Auto-play prevented by browser:', error.message);
//           setIsPlaying(false);
//         });
//       };
//
//       // Try immediate auto-play
//       playAudio();
//
//       // Also try on first user interaction for browsers with strict auto-play policies
//       const handleUserInteraction = () => {
//         if (audio.paused) {
//           playAudio();
//         }
//         window.removeEventListener('click', handleUserInteraction);
//         window.removeEventListener('touchstart', handleUserInteraction);
//       };
//
//       window.addEventListener('click', handleUserInteraction);
//       window.addEventListener('touchstart', handleUserInteraction);
//     }
//
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//       }
//     };
//   }, [isMounted]);
//
//   const toggleAudio = () => {
//     if (!audioRef.current) return;
//
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//       setHasBeenPaused(true);
//     } else {
//       audioRef.current.play().catch(() => {
//         console.log('Playback failed');
//       });
//       setIsPlaying(true);
//     }
//   };
//
//   return { isPlaying, toggleAudio, isMounted, hasBeenPaused };
// }

export function useAudioControl() {
  return { isPlaying: false, toggleAudio: () => {}, isMounted: false, hasBeenPaused: false };
}
