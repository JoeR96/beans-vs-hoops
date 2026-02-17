"use client";
import { useCallback } from "react";
import confetti from "canvas-confetti";

const HOOPS_COLORS = ["#0095A3", "#00C4D4", "#007A87"];
const BEANS_COLORS = ["#F9A812", "#FFD166", "#E6950B"];

export function useFireworks() {
    const fireAt = useCallback(
        (element: HTMLElement | null, side: "hoops" | "beans") => {
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = rect.top / window.innerHeight;

            const colors = side === "hoops" ? HOOPS_COLORS : BEANS_COLORS;

            const defaults = {
                origin: { x, y },
                colors,
                disableForReducedMotion: true,
            };

            confetti({
                ...defaults,
                particleCount: 40,
                spread: 70,
                startVelocity: 30,
                gravity: 0.8,
                scalar: 1.2,
                ticks: 60,
            });

            setTimeout(() => {
                confetti({
                    ...defaults,
                    particleCount: 20,
                    spread: 100,
                    startVelocity: 20,
                    gravity: 1,
                    scalar: 0.8,
                    ticks: 50,
                });
            }, 150);
        },
        []
    );

    return { fireAt };
}
