import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { palette } from "@/theme/Palette";

const NFTCard = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        // backgroundImage: 'url(/images/placeholder-image.png)',
        height: 240,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        border: `1px solid ${palette.textColors.widgetHeadingcolor}`,
        borderRadius: "8px",
        overflow: "hidden",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="p-lg-bold" sx={{ color: palette.textColors.widgetHeadingcolor }}>
          NFT Card
        </Typography>
        <IconButton onClick={handleMenuOpen} sx={{ borderRadius: "100%" }}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              router.push("/eclipsenft/12");
            }}
          >
            Other Detail
          </MenuItem>
        </Menu>
      </Box>
      <Typography variant="h1" textAlign={"center"} mt={6}>
        300
      </Typography>
    </Box>
  );
};

export default NFTCard;
