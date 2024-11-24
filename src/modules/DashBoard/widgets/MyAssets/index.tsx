import React, { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { palette } from "@/theme/Palette";
import { useGetUserEclipseNFTs } from "@/hooks/useEclipseNFT";
import { eNFTsOfUserProps } from "@/utils/types";
import { useAddress } from "@thirdweb-dev/react";

//!Warning: Replaced is connected with userAddress

const MyAssets: FC = () => {
  const router = useRouter();
  const { data: eclipseNFTs, isFetched, isError } = useGetUserEclipseNFTs();
  const userAddress = useAddress();
  const [globalLoading, setGlobalLoading] = useState(true);
  // const totalMultipliers = useMemo(() => {
  //   let rewards = 0;
  //   if (eclipseNFTs && (eclipseNFTs as any)?.length) {
  //     rewards += (eclipseNFTs as any)?.map((item: any) =>
  //       Number(item.initialMulCount.toString())
  //     );
  //   }
  //   return Number(rewards);
  // }, [eclipseNFTs]);
  const multpliers = useMemo(() => {
    let count = 0;
    if ((eclipseNFTs as eNFTsOfUserProps)?.length) {
      count = Number((eclipseNFTs as eNFTsOfUserProps)?.[1] || 0);
    }
    return count;
  }, [eclipseNFTs]);
  console.log(eclipseNFTs, "nfts", multpliers);
  useEffect(() => {
    if (isFetched) {
      setGlobalLoading(false);
    }
    setTimeout(() => {
      setGlobalLoading(false);
    }, 3000);
  }, [isFetched, isError, multpliers]);
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
        <Typography
          variant="p-xlg-bold"
          sx={{ color: palette.textColors.widgetHeadingcolor }}
        >
          My Assets
        </Typography>
        {userAddress && (
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
            {" "}
            View Assets{" "}
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "85%",
          alignItems: "flex-end",
          mx: "auto",
          height: { sm: "80%" },
          mt: { sm: 0, miniMobile: 3 },
          gap: 4,
        }}
      >
        <Box
          sx={{
            border: "1px solid white",
            pt: 3,
            px: 3,
            width: "fit-content",
          }}
        >
          <Box
            sx={{ width: "80px", height: "80px", textAlign: "center", pl: 0.8 }}
          >
            <Image
              width={68}
              height={64}
              src={"/images/nft.png"}
              alt="chest image"
            />
          </Box>
          {globalLoading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {((eclipseNFTs as eNFTsOfUserProps[])?.length &&
                (eclipseNFTs as eNFTsOfUserProps[])[0].length) ??
                0}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            border: "1px solid white",
            pt: 3,
            px: 3,
            width: "fit-content",
          }}
        >
          <Box sx={{ width: "80px", height: "80px", textAlign: "center" }}>
            <Image
              width={100}
              height={100}
              src={"/images/multipliers.png"}
              alt="chest image"
            />
          </Box>
          {globalLoading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {multpliers ?? 0}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyAssets;
