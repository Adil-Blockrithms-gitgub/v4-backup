"use client";

import { useGetUserEclipseNFTs } from "@/hooks/useEclipseNFT";
import { NFTsTable } from "@/ui-components/NFTTable";
import { eNFTsOfUserProps, NFTProps } from "@/utils/types";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const EclipseNFT = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 700px)");

  //TODO: Commented hook usage
  const { data: eclipseNFTs, isFetched } = useGetUserEclipseNFTs();
  console.log("🚀 ~ EclipseNFT ~ eclipseNFTs:", eclipseNFTs);

  const [globalLoading, setGlobalLoading] = useState(true);

  const nfts: NFTProps[] = useMemo(() => {
    let result: NFTProps[] = [];
    if ((eclipseNFTs as eNFTsOfUserProps)?.length) {
      result = (eclipseNFTs as eNFTsOfUserProps)?.[0];
    }
    return result;
    // return eclipseNFTs ? (eclipseNFTs as eNFTsOfUserProps) : [];
  }, [eclipseNFTs]);
  useEffect(() => {
    if (isFetched) {
      setGlobalLoading(false);
    }
    setTimeout(() => {
      setGlobalLoading(false);
    }, 3000);
  }, [isFetched]);

  return (
    <>
      <Box>
        <Typography variant={isMobile ? "h5" : "h3"} sx={{ mb: 4, mt: 2 }}>
          Eclipse NFTs{" "}
        </Typography>

        {/* <Grid container gap={2}>
          <Grid item xs={3.8}>
            <NFTCard />
          </Grid>
          <Grid item xs={3.8}>
            <NFTCard />
          </Grid>
          <Grid item xs={3.8}>
            <NFTCard />
          </Grid>
        </Grid> */}
        <NFTsTable
          nfts={nfts}
          loading={globalLoading}
          setProtocol={(nft) =>
            router.push(`/eclipsenft/${nft.tokenId.toString()}`)
          }
        />
      </Box>
    </>
  );
};

export default EclipseNFT;
