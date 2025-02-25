"use client"
import { useBoundedHeinzStore } from "@/state/HeinzBoundedStore";
import React, { useEffect } from "react";
import {Voted} from "@/components/Voted";
import { css } from '@emotion/react';
import Image from "next/image";
import '@fontsource/happy-monkey';
import {Button} from "@mui/material"; // Defaults to weight 400

export default function Home() {
    const { setHoopsAndBeans, hasVoted, setHasVoted, hoops, beans } = useBoundedHeinzStore();
    const [votedFor, setVotedFor] = React.useState<string | null>(null);

    useEffect(() => {
        const voted = localStorage.getItem("voted");
        if (voted) {
            setHasVoted(true);
            setVotedFor(voted);
        }
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching latest vote counts...");
                
                const response = await fetch("/api/votes");
                const voteResponse: VoteResponse = await response.json();
                setHoopsAndBeans(voteResponse);

            } catch (error) {
                console.error("Error fetching vote data:", error);
            }
        };

        fetchData();
    }, []);

    interface VotingProps {
        text: string;
        onVote: () => void;
        votes: number;
    }

    const handleVote = async (option: string) => {
        try {
            const response = await fetch("/api/votes", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voteOption: option })
            });

            if (!response.ok) throw new Error("Failed to submit vote");

            const updatedVotes = await response.json();
            setHoopsAndBeans(updatedVotes);
            setHasVoted(true);
            setVotedFor(option);
            localStorage.setItem("voted", option);
        } catch (error) {
            console.error("Error processing vote:", error);
        }
    };

    const voteOptions: VotingProps[] = [
        { text: 'Hoops', onVote: () => handleVote('hoops'), votes: hoops },
        { text: 'Beans', onVote: () => handleVote('beans'), votes: beans },
    ];

    const voteMessages = {
        hoops: "You're the Hoops Champion: may your days be saucy!",
        beans: "Bean there, done that: you're the Master of Beans!"
    };

    return (
        <div>
            <h1 style={{
                        textAlign: 'center',
                        fontSize: '7.5em',
                        fontWeight: 'bold',
                        fontFamily: 'happy monkey, Arial, sans-serif',
                        background: 'linear-gradient(to right, #0095A3 30%, #F9A812 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: 'black',
                        transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                        Hoops vs Beans
            </h1>
            <div style={{display: 'flex', justifyContent: 'center', gap: '5em'}}>
                {voteOptions.map((option, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: 'center',
                            fontSize: '5em',
                            fontWeight: 'bold',
                            fontFamily: 'happy monkey, Arial, sans-serif',
                            color: option.text === 'Hoops' ? '#0095A3' : '#F9A812',
                            WebkitBackgroundClip: 'text',
                            WebkitTextStrokeWidth: '1px',
                            WebkitTextStrokeColor: 'black',
                            transition: 'transform 0.3s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {option.votes} votes
                    </div>
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Image
                    src={'/beansAndHoops.png'}
                    alt={'Hoops and Beans'}
                    width={250}
                    height={250}
                    style={{
                        height: '50%',
                        width: '50%',
                        transition: 'transform 0.3s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            {!hasVoted ? (
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '5em'}}>
                        {voteOptions.map((option, index) => (
                        <Button
                            key={index}
                            style={{
                                textAlign: 'center',
                                fontSize: '1.5em',
                                fontWeight: 'bold',
                                fontFamily: 'happy monkey, Arial, sans-serif',
                                padding: '0.5em 1em',
                                border: '3.75px solid black',
                                borderRadius: '0.75em',
                                backgroundColor: option.text === 'Hoops' ? '#0095A3' : '#F9A812',
                                color: option.text === 'Beans' ? '#0095A3' : '#F9A812',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s, transform 0.3s',
                            }}
                            onClick={() => option.onVote()}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'lightgray';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = option.text === 'Hoops' ? '#0095A3' : '#F9A812';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}>
                            Vote for {option.text}
                        </Button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{
                    margin: '1em',
                    textAlign: 'center',
                    fontSize: '3.5em',
                    fontWeight: 'bold',
                    fontFamily: 'happy monkey, Arial, sans-serif',
                    background: 'linear-gradient(to right, #0095A3 30%, #F9A812 70%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStrokeWidth: '1.25px',
                    WebkitTextStrokeColor: 'black',
                    transition: 'transform 0.3s',
                }}>
                    {votedFor ? voteMessages[votedFor] : ""}
                </div>
            )}
        </div>
    );
}
