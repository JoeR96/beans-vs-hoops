"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import Image from "next/image";

interface VoteOptionProps {
  imageUrl: string;
  altText: string;
  onVote: () => void;
}

const VoteOption: React.FC<VoteOptionProps> = ({ imageUrl, altText, onVote }) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    setIsVoting(true);
    await onVote();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Image src={imageUrl} alt={altText} width={200} height={200} />
      {!isVoting && <Button variant="contained" onClick={handleVote}>Vote</Button>}
    </div>
  );
};

export default VoteOption;
