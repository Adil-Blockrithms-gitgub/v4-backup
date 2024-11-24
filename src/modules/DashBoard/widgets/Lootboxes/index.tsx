import { FC, useState } from "react";
import { Paper, Stack, Box, Button, Typography } from "@mui/material";
import { palette } from "@/theme/Palette";
import { useAppSelector } from "@/redux/hooks";
import { selectIsEmpty } from "@/redux/features/lootboxCartSlice";
// import { useProjectOwners } from '@/hooks/lootbox';

import PricingList from "./PricingList";
import LootboxBuyModal from "@/ui-components/lootbox/LootboxBuyModal";

const LootBoxes: FC = () => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const cartIsEmpty = useAppSelector(selectIsEmpty);

  //TODO: Commented hook usage
  // const { data: projectOwners } = useProjectOwners();
  const projectOwners = [];

  const handleBuy = () => {
    setIsBuyModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    setIsBuyModalOpen(false);
  };

  return (
    <Paper square sx={{ height: "100%", p: 2, borderRadius: 1 }}>
      <Stack height={"100%"}>
        <Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="p-xlg-bold" color={"text.secondary"}>
              LootBoxes
            </Typography>
            <Button variant={"outlined"} color={"secondary"} disabled={cartIsEmpty} onClick={handleBuy}>
              Buy Lootboxes
            </Button>
          </Box>
        </Stack>

        <Stack sx={{ mt: { sm: 0, miniMobile: 2 } }}>
          <Typography component={"p"} variant="p-md-bold" sx={{ color: palette.textColors.widgetHeadingcolor }}>
            Win assets from <span style={{ color: "white" }}>{projectOwners?.length}</span> Projects
          </Typography>
          <Typography component={"p"} variant="p-md-bold" sx={{ color: palette.textColors.widgetHeadingcolor }}>
            Prize Pool Value <span style={{ color: "white" }}>$1,000,000,000</span>
          </Typography>
        </Stack>

        <Stack flex={1}>
          <PricingList />
        </Stack>
      </Stack>

      <LootboxBuyModal open={isBuyModalOpen} onClose={handleCloseBuyModal} />
    </Paper>
  );
};

export default LootBoxes;
