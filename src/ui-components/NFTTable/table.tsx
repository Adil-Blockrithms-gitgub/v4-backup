"use client";
import React, { useEffect, useMemo } from "react";
import {
  Box,
  CircularProgress,
  Skeleton,
  // Button,
  // Menu,
  // MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import { MoreVert } from '@mui/icons-material';
// import Image from 'next/image';
import { NFTProps, NFTTokenURI } from "@/utils/types";
import { useGetTokenURI } from "@/hooks/useEclipseNFT";
import { parseTokenURI } from "@/utils/common";

interface RowProps {
  nft: NFTProps;
  onClick: () => void;
}

interface TableProps {
  nfts: NFTProps[];
  loading?: boolean;
  setProtocol: (nft: NFTProps) => void;
}

const Row: React.FC<RowProps> = ({ nft, onClick }) => {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //TODO: Commented hook usage
  const {
    data: tokenURI,
    refetch: refetchTokenURI,
    isLoading,
  } = useGetTokenURI(nft.tokenId);
  console.log("🚀 ~ tokenURI:", tokenURI);

  const parsedTokenURI = useMemo(() => {
    let result: NFTTokenURI = {
      name: "",
      image: "",
      description: "",
      attributes: [],
    };
    if (tokenURI) {
      // Check if the tokenURI contains the base64 prefix and remove it if necessary
      const base64String = (tokenURI as string).includes("base64,")
        ? (tokenURI as string).split("base64,")[1]
        : tokenURI;
      // Decode the Base64 string
      const jsonString = atob(base64String as string);
      // Parse the JSON string into an object
      result = JSON.parse(jsonString);
    }
    return result;
  }, [tokenURI]);

  const tokenParsedData = useMemo(() => {
    const data = parseTokenURI(parsedTokenURI);

    return data;
  }, [parsedTokenURI]);

  console.log(parsedTokenURI, "parsedTokenURI");
  // const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };
  useEffect(() => {
    refetchTokenURI();
  }, [refetchTokenURI]);
  return (
    <TableRow
      onClick={onClick}
      sx={{
        cursor: "pointer",
        // 'borderBottom': '1px solid rgba(81, 81, 81, 1)', // Add a border
        "&:last-child td, &:last-child th": { border: 0 },
        py: 1,
        ":hover": {
          backgroundColor: "#1a1a1a",
        },
      }}
    >
      {/* <TableCell>
        <Image
          src={
            parsedTokenURI.image && parsedTokenURI.image !== ''
              ? parsedTokenURI.image
              : '/images/placeholder-image.png'
          }
          width={40}
          height={40}
          alt={'/images/placeholder-image.png'}
        />
      </TableCell> */}
      <TableCell sx={{ fontSize: "16px", fontWeight: 500 }}>
        {isLoading ? <Skeleton /> : parsedTokenURI.name}
      </TableCell>
      <TableCell sx={{ fontSize: "16px", fontWeight: 500 }}>
        {isLoading ? <Skeleton /> : tokenParsedData.activeMultiplier}
      </TableCell>
      <TableCell sx={{ fontSize: "16px", fontWeight: 500 }}>
        {isLoading ? <Skeleton /> : tokenParsedData.inActiveMultiplier}
      </TableCell>
      <TableCell sx={{ fontSize: "16px", fontWeight: 500 }}>
        {isLoading ? <Skeleton /> : tokenParsedData.decayedMultiplier}
      </TableCell>
      <TableCell sx={{ fontSize: "16px", fontWeight: 300 }}>
        {isLoading ? <Skeleton /> : tokenParsedData.rewards}
      </TableCell>
      {/* <TableCell>
        <Button onClick={handleMenuOpen}>
          <MoreVert />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onClick}>Other Detail</MenuItem>
        </Menu>
      </TableCell> */}
    </TableRow>
  );
};

const NFTsTable: React.FC<TableProps> = ({ nfts, setProtocol, loading }) => {
  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
      }}
    >
      <CircularProgress />
    </Box>
  ) : !loading && nfts?.length > 0 ? (
    <Box sx={{ pb: 2, backgroundColor: "black" }}>
      <TableContainer
        style={{
          borderRadius: "0px",
          overflowX: "auto",
          borderBottom: "1px solid rgba(81, 81, 81, 1)",
          backgroundColor: "black",
        }}
      >
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "14px", fontWeight: 500 }}>
                NAME
              </TableCell>
              <TableCell sx={{ fontSize: "14px", fontWeight: 500 }}>
                ACTIVE MULTIPLIERS
              </TableCell>
              <TableCell sx={{ fontSize: "14px", fontWeight: 500 }}>
                INACTIVE MUITIPLIERS
              </TableCell>
              <TableCell sx={{ fontSize: "14px", fontWeight: 500 }}>
                DECAYED MUITIPLIERS
              </TableCell>
              <TableCell sx={{ fontSize: "14px", fontWeight: 500 }}>
                TOTAL REWARDS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ borderBottom: "1px solid rgba(81, 81, 81, 1)" }}>
            {nfts.map((nft) => (
              <Row key={nft.name} nft={nft} onClick={() => setProtocol(nft)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <Typography
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        color: "#9e9e9e",
      }}
    >
      No nfts found
    </Typography>
  );
};

export default NFTsTable;
