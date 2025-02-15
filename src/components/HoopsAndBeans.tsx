import React, { useEffect, useState } from 'react';
import hoopsAndBeans from '../assets/beansAndHoops.png';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const HoopsAndBeans: React.FC = () => {
    const [votesData, setVotesData] = useState<any>(null);
    const lastVote = useSelector((state: RootState) => state.votes.lastVote);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://fqzmxzutu1.execute-api.eu-west-2.amazonaws.com/heinz/beansorhoops');
        const data = await response.json();
        setVotesData(data);
    };

    fetchData();
  }, [lastVote]);

  if (!votesData) {
    return null; // Add a loading indicator or placeholder if desired
  }

  const spaghettiHoops = votesData.spaghettiHoops.votes.N;
  const bakedBeans = votesData.bakedBeans.votes.N;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color:'white' }}>Spaghetti Hoops V Baked Beans</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2em' }}>
        <Typography variant="h6" sx={{ fontWeight: 900, color:'white' }}>Spaghetti Hoops: {spaghettiHoops}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 900,color:'white' }}>Baked Beans: {bakedBeans}</Typography>
      </Box>
      <img src={hoopsAndBeans} alt="Hoops and Beans" />

    </Box>
  );
};

export default HoopsAndBeans;
