import React, { useState } from 'react';
import { Button } from '@mui/material';

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
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={imageUrl} alt={altText} style={{ width: '50%', height: 'auto' }} />
      {!isVoting && <Button variant="contained" onClick={handleVote}>Vote</Button>}
    </div>
  );
};

export default VoteOption;
