"use client"
import { useBoundedHeinzStore } from "@/state/HeinzBoundedStore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import '@fontsource/happy-monkey';
import {Button} from "@mui/material";

export default function Home() {
    const { setHoopsAndBeans, hasVoted, setHasVoted, hoops, beans } = useBoundedHeinzStore();
    const [votedFor, setVotedFor] = React.useState<string | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

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
                const response = await fetch("/api/votes");
                const voteResponse: VoteResponse = await response.json();
                setHoopsAndBeans(voteResponse);
                setDataLoaded(true);
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
        hoops: "Hoop there it is!",
        beans: "Bean there, done that!"
    };

    // @ts-ignore
    return (
        <div style={{ overflow: 'hidden' }}>
            <h1 style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '8vh',
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
            {dataLoaded && (
                <div style={{display: 'flex', justifyContent: 'center', gap: '5em'}}>
                    {voteOptions.map((option, index) => (
                        <div key={index} style={{textAlign: 'center'}}>
                            <div
                                style={{
                                    fontSize: '4vh',
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
                                {option.text}
                            </div>
                            <div
                                style={{
                                    fontSize: '5vh',
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
                                {option.votes}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Image
                    src={'/beansAndHoops.png'}
                    alt={'Hoops and Beans'}
                    width={500}
                    height={500}
                    style={{
                        overflow: 'hidden',
                        height: '40vh',
                        width: '100vh',
                        maxHeight: '40vh',
                        maxWidth: '100vh',
                        transition: 'transform 0.3s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            {dataLoaded && (
                !hasVoted ? (
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '5em'}}>
                            {voteOptions.map((option, index) => (
                            <Button
                                key={index}
                                style={{
                                    textAlign: 'center',
                                    fontSize: '1.5vh',
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
                        textAlign: 'center',
                        fontSize: '2em',
                        marginBottom: '1em',
                        fontWeight: 'bold',
                        fontFamily: 'happy monkey, Arial, sans-serif',
                        background: 'linear-gradient(to right, #0095A3 30%, #F9A812 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStrokeWidth: '0.5px',
                        WebkitTextStrokeColor: 'black',
                        transition: 'transform 0.3s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {votedFor && voteMessages.hasOwnProperty(votedFor) ? voteMessages[votedFor as keyof typeof voteMessages] : ""}
                    </div>
                )
            )}
        </div>
    );
}
