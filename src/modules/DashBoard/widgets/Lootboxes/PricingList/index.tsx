import { FC } from "react";
import { Stack, Box, CircularProgress } from "@mui/material";

// import { useTiersCount } from '@/hooks/lootbox';

import TierPricingCard from "./TierPricingCard";

const PricingList: FC = () => {
  //TODO: Commented hook usage
  // const { data: tiersCount, isLoading } = useTiersCount();

  const tiersCount = 5; //! Warning mapping over data
  const isLoading = false;

  return (
    <Stack width={"100%"} height={"100%"} pt={4} pb={2} justifyContent={"center"} alignItems={"center"}>
      {isLoading ? (
        <CircularProgress />
      ) : Number(tiersCount) > 0 ? (
        <Stack direction={{ miniMobile: "column", sm: "row" }} gap={2}>
          {Array.from({ length: Number(tiersCount) }).map((_, tierIndex) => (
            <Box key={tierIndex} minWidth={"120px"} maxWidth={"160px"}>
              <TierPricingCard tierIndex={tierIndex} />
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack>No tiers found.</Stack>
      )}
    </Stack>
  );
};

export default PricingList;
