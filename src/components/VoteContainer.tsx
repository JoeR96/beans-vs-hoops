"use client";

import React, { useState, useEffect } from "react";
import VoteOption from "./VoteOption";
import { voteBakedBeans, voteSpaghettiHoops, updateVoteCount } from "@/redux/votesSlice";
import { useDispatch } from "react-redux";

const VoteContainer: React.FC = () => {
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("voted")) setHasVoted(true);
  }, []);

  const handleVote = async (option: string) => {
    try {
      console.log(`Submitting vote for: ${option}`);

      const response = await fetch("/api/votes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voteOption: option }),
      });

      if (!response.ok) throw new Error("Vote submission failed");

      const updatedVotes = await response.json();

      if (option === "hoops") dispatch(voteSpaghettiHoops());
      if (option === "beans") dispatch(voteBakedBeans());

      dispatch(updateVoteCount(updatedVotes));

      setHasVoted(true);
      localStorage.setItem("voted", "true");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {!hasVoted ? (
        <>
          <VoteOption imageUrl="/hoops.png" altText="Spaghetti Hoops" onVote={() => handleVote("hoops")} />
          <VoteOption imageUrl="/beans.png" altText="Baked Beans" onVote={() => handleVote("beans")} />
        </>
      ) : (
        <p style={{ color: "white" }}>Thank you for voting!</p>
      )}
    </div>
  );
};

export default VoteContainer;
