import React, { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { palette } from "@/theme/Palette";
// import { useGetCurrentVRR } from '@/hooks/useEclipseNFT';
import { formatUnits } from "viem";
// import { useBalance } from '@/hooks/useBalance';
import { RewardsPool } from "@/utils/constants";
// import { useGetTotalActiveInEcosystem } from '@/hooks/api';

const RewardsRate: FC = () => {
  //TODO: Commented hooks usage
  // const { data, refetch, isFetched: isFetchedVRR } = useGetCurrentVRR();
  // const { data: balance, isFetched: isFetchedBalance } = useBalance({
  //   address: RewardsPool,
  // });

  //* ------> Dummy vars
  const refetch = () => {};
  const isFetchedVRR = true;
  const isFetchedBalance = true;
  const balance = BigInt(0);
  const data = undefined;
  const totalActive = 0;

  const [isLoadingVRR, setIsLoadingVRR] = useState(true);

  // const { data: totalActive } = useGetTotalActiveInEcosystem();

  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const router = useRouter();
  useEffect(() => {
    refetch();
  }, [refetch]);
  const currentVRR = useMemo(() => {
    let result = 0;
    if (data) {
      result = Number(Number(formatUnits(data as bigint, 18)).toPrecision(5));
    }
    return result;
  }, [data]);
  const rewardsPool = useMemo(() => {
    let result = 0;
    if (balance) {
      result = Number(Number(formatUnits(balance as bigint, 18)).toPrecision(5));
    }
    return result;
  }, [balance]);
  useEffect(() => {
    if (isFetchedBalance) {
      setIsLoadingBalance(false);
    }
    if (isFetchedVRR) {
      setIsLoadingVRR(false);
    }
  }, [isFetchedBalance, isFetchedVRR]);
  return (
    <Box
      sx={{
        p: "10px",
        height: "100%",
        backgroundColor: palette.storm[90],
        borderRadius: "3px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography variant="p-xlg-bold" sx={{ color: palette.textColors.widgetHeadingcolor }}>
          Affiliate Rewards Rate
        </Typography>
        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            ":hover": {
              color: "white",
            },
          }}
          onClick={() => router.push("/eclipsenft")}
        >
          Rate Updated Hourly
        </Button>
      </Box>

      <Box sx={{ width: "95%", mx: "auto", mt: { sm: 1, miniMobile: 2 } }}>
        {isLoadingVRR ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="p-xs-bold">$ECLPS {currentVRR}</Typography>
        )}

        <Box my={1}>
          <Typography variant="p-md-bold" color={palette.textColors.widgetHeadingcolor} pb={1}>
            Affilate Reward Pool
          </Typography>
          {/* <Box sx={{ width: '80px', height: '80px', textAlign: 'center' }}> */}
          <Image width={40} height={40} src={"/images/multipliers.png"} alt="chest image" />
          {/* </Box> */}
        </Box>
        {isLoadingBalance ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="p-xs-bold">$ECLPS {rewardsPool}</Typography>
        )}
        <Box mt={1.8} mb={1}>
          <Typography variant="p-md-bold" color={palette.textColors.widgetHeadingcolor} pb={1}>
            Active Multiplers in Ecosystem
          </Typography>
          <Image width={40} height={40} src={"/images/multipliers.png"} alt="chest image" />
        </Box>
        {isLoadingBalance ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="p-xs-bold">{totalActive?.toString() || "0"}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default RewardsRate;
