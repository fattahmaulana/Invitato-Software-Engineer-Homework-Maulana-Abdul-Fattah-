import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
}

export function useAudio(src: string): UseAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wasPlayingBeforeLeave = useRef(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Sync state with actual audio events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Stop / pause audio immediately when user leaves the page, switches tab, or blurs window
    const handleLeavePage = () => {
      if (!audioRef.current) return;
      if (!audioRef.current.paused) {
        wasPlayingBeforeLeave.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    // Resume playback smoothly when user returns to this page
    const handleReturnToPage = () => {
      if (!audioRef.current) return;
      if (wasPlayingBeforeLeave.current && document.visibilityState === 'visible') {
        wasPlayingBeforeLeave.current = false;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.log('Audio resume waiting for user gesture');
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        handleLeavePage();
      } else {
        handleReturnToPage();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleLeavePage);
    window.addEventListener('focus', handleReturnToPage);
    window.addEventListener('pagehide', handleLeavePage);
    window.addEventListener('beforeunload', handleLeavePage);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleLeavePage);
      window.removeEventListener('focus', handleReturnToPage);
      window.removeEventListener('pagehide', handleLeavePage);
      window.removeEventListener('beforeunload', handleLeavePage);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    if (audioRef.current) {
      wasPlayingBeforeLeave.current = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log('Audio autoplay prevented by browser policy');
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      wasPlayingBeforeLeave.current = false;
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, toggle, play, pause };
}
