"use client";
import { EclipseNFTDetail } from "@/modules/EclipseNFTDetail";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

const NFTDetail = () => {
  const { id } = useParams();
  return (
    <Box>
      <EclipseNFTDetail id={id.toString()} />{" "}
    </Box>
  );
};

export default NFTDetail;
