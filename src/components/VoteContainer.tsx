import React, { useState, useEffect } from 'react';
import VoteOption from './VoteOption';
import hoopsImage from '../assets/hoops.png';
import beansImage from '../assets/beans.png';
import { voteBakedBeans, voteSpaghettiHoops } from '../redux/votesSlice';
import { useDispatch } from 'react-redux';

interface VoteContainerProps {
}

const VoteContainer: React.FC<VoteContainerProps> = () => {
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    const voted = localStorage.getItem('voted');
    console.log(localStorage)
    if (voted) {
      setHasVoted(true);
    }
  }, []);
  const dispatch = useDispatch();

  const handleVote = async (option: string) => {
    const response = await fetch('https://fqzmxzutu1.execute-api.eu-west-2.amazonaws.com/heinz/beansorhoops', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voteOption: option })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('voted', 'true');
      setHasVoted(true);
    } else {
      console.log('Vote failed');
    }

    if (option === 'spaghettiHoops') {
      dispatch(voteSpaghettiHoops());
    } else if (option === 'bakedBeans') {
      dispatch(voteBakedBeans());
    }
    setHasVoted(true)
    localStorage.setItem('voted', 'true');
    console.log('hello')
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {!hasVoted ? (
        <>
          <VoteOption
            imageUrl={hoopsImage}
            altText="Spaghetti Hoops"
            onVote={() => handleVote('spaghettiHoops')}
          />
          <VoteOption
            imageUrl={beansImage}
            altText="Baked Beans"
            onVote={() => handleVote('bakedBeans')}
          />
        </>
      ) : (
        <p>Thank you for voting!</p>
      )}
    </div>
  );
};

export default VoteContainer;
