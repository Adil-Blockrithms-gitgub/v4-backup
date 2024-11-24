"use client";

import React from "react";
import { Grid2 as Grid } from "@mui/material";
import DiscoverGames from "./widgets/DiscoverGames";
import MyAssets from "./widgets/MyAssets";
import Lootboxes from "./widgets/Lootboxes";
import RewardsRate from "@/modules/DashBoard/widgets/RewardsRate";

const DashBoard = () => {
  return (
    <Grid container spacing={2} pt={{ miniMobile: 2, md: 5 }}>
      <Grid size={{ miniMobile: 12, md: 8 }}>
        <DiscoverGames />
      </Grid>
      <Grid size={{ miniMobile: 12, md: 4 }}>
        <MyAssets />
      </Grid>
      <Grid size={{ miniMobile: 12, md: 8 }}>
        <Lootboxes />
      </Grid>
      <Grid size={{ miniMobile: 12, md: 4 }}>
        <RewardsRate />
      </Grid>
    </Grid>
  );
};

export default DashBoard;
