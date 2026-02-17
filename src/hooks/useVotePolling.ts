"use client";
import { useEffect, useRef } from "react";
import { useBoundedHeinzStore } from "@/state/HeinzBoundedStore";

const POLL_INTERVAL_MS = 5000;

export interface VoteChangeEvent {
    side: "hoops" | "beans";
    delta: number;
}

export function useVotePolling(
    onVoteDetected: (event: VoteChangeEvent) => void
) {
    const { setHoopsAndBeans } = useBoundedHeinzStore();
    const initialLoadDone = useRef(false);

    useEffect(() => {
        const poll = async () => {
            try {
                const response = await fetch("/api/votes");
                if (!response.ok) return;
                const data: VoteResponse = await response.json();

                if (initialLoadDone.current) {
                    const currentHoops = useBoundedHeinzStore.getState().hoops;
                    const currentBeans = useBoundedHeinzStore.getState().beans;

                    if (!document.hidden) {
                        if (data.hoops > currentHoops) {
                            onVoteDetected({ side: "hoops", delta: data.hoops - currentHoops });
                        }
                        if (data.beans > currentBeans) {
                            onVoteDetected({ side: "beans", delta: data.beans - currentBeans });
                        }
                    }
                } else {
                    initialLoadDone.current = true;
                }

                setHoopsAndBeans(data);
            } catch (error) {
                console.error("Polling error:", error);
            }
        };

        const intervalId = setInterval(poll, POLL_INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [onVoteDetected, setHoopsAndBeans]);
}
