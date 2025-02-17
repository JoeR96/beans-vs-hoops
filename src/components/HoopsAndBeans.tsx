"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateVoteCount } from "@/redux/votesSlice";

const HoopsAndBeans: React.FC = () => {
  const dispatch = useDispatch();
  const votes = useSelector((state: RootState) => state.votes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching latest vote counts...");

        const response = await fetch("/api/votes");
        const data = await response.json();

        dispatch(updateVoteCount(data));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vote data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [votes.lastVote]);

  if (isLoading) return <p>Loading votes...</p>;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "white" }}>
        Spaghetti Hoops V Baked Beans
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "2em" }}>
        <Typography variant="h6" sx={{ fontWeight: 900, color: "white" }}>
          Spaghetti Hoops: {votes.spaghettiHoops}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 900, color: "white" }}>
          Baked Beans: {votes.bakedBeans}
        </Typography>
      </Box>
      <Image src="/beansAndHoops.png" alt="Hoops and Beans" width={500} height={300} />
    </Box>
  );
};

export default HoopsAndBeans;
