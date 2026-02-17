"use client";
import { useRef, useCallback } from "react";

export function useGongSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioUnlocked = useRef(false);

    const getAudio = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/gong.mp3");
            audioRef.current.preload = "auto";
        }
        return audioRef.current;
    }, []);

    const unlockAudio = useCallback(() => {
        if (audioUnlocked.current) return;
        const audio = getAudio();
        audio.volume = 0;
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 1;
            audioUnlocked.current = true;
        }).catch(() => {});
    }, [getAudio]);

    const playGong = useCallback(() => {
        const audio = getAudio();
        audio.currentTime = 0;
        audio.volume = 1;
        audio.play().catch((err) => {
            console.warn("Gong playback blocked:", err);
        });
    }, [getAudio]);

    return { playGong, unlockAudio };
}
