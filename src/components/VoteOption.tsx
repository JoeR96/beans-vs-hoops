import React from 'react';
import { Button } from '@mui/material';

interface VoteOptionProps {
  imageUrl: string;
  altText: string;
  onVote: () => void;
}

const VoteOption: React.FC<VoteOptionProps> = ({ imageUrl, altText, onVote }) => {
  const handleVote = async () => {
    await onVote();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={imageUrl} alt={altText} style={{ width: '50%', height: 'auto' }} />
      <Button variant="contained" onClick={handleVote}> 
        Vote
      </Button>
    </div>
  );
};

export default VoteOption;
