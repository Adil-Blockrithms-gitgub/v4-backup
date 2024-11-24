import { FC, useState, useMemo } from "react";
import Image from "next/image";
import { formatUnits } from "viem";
import { Stack, Typography, IconButton, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useTierPrice } from '@/hooks/lootbox';

import lootboxImg from "@/assets/img/lootbox.png";
import { addItem, updateItemQuantity, selectIsCart, selectItem } from "@/redux/features/lootboxCartSlice";

interface Props {
  tierIndex: number;
}

const TierPricingCard: FC<Props> = ({ tierIndex }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();
  const isCart = useAppSelector(selectIsCart(tierIndex));
  const cartItem = useAppSelector(selectItem(tierIndex));

  //TODO: Commented hook usage
  // const { data: price, isLoading } = useTierPrice(tierIndex);
  const price = undefined;
  const isLoading = false;

  const isActive = useMemo(() => isHovered || isCart, [isHovered, isCart]);

  const priceParsed = useMemo(() => formatUnits(price ?? BigInt(0), 6), [price]);

  const incrementQuantity = () => {
    if (isCart) {
      dispatch(
        updateItemQuantity({
          itemId: tierIndex,
          quantity: (cartItem?.quantity ?? 0) + 1,
        })
      );
    } else {
      dispatch(
        addItem({
          item: {
            id: tierIndex,
            name: String(price ?? 0n),
            price: String(price ?? 0n),
          },
        })
      );
    }
  };

  const decrementQuantity = () => {
    dispatch(
      updateItemQuantity({
        itemId: tierIndex,
        quantity: (cartItem?.quantity ?? 0) - 1,
      })
    );
  };

  return (
    <Stack
      justifyContent={"center"}
      position={"relative"}
      sx={{
        transition: "all 0.3s",
        border: "1px solid",
        borderColor: isActive ? "primary.main" : "divider",
        aspectRatio: 1,
        p: "24px 32px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack alignItems={"center"} mb={1}>
        <Image width={100} height={100} src={lootboxImg} alt="chest image" />
      </Stack>
      {isLoading ? (
        <Stack alignItems={"center"}>
          <CircularProgress />
        </Stack>
      ) : (
        <Typography variant={"h5"} sx={{ textAlign: "center" }}>
          ${priceParsed}
        </Typography>
      )}
      <Stack
        display={isActive ? "flex" : "none"}
        height={"24px"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"absolute"}
        bottom={0}
        left={0}
        right={0}
        bgcolor={"primary.main"}
        color={"primary.contrastText"}
      >
        <IconButton color={"inherit"} sx={{ width: "24px", height: "24px" }} onClick={incrementQuantity}>
          <AddIcon color={"inherit"} />
        </IconButton>
        <Typography sx={{ fontSize: "24px" }}>{cartItem?.quantity ?? 0}</Typography>
        <IconButton
          color={"inherit"}
          sx={{
            width: "24px",
            height: "24px",
            "&:disabled": { color: "inherit" },
          }}
          onClick={decrementQuantity}
          disabled={!isCart || cartItem?.quantity === 0}
        >
          <RemoveIcon color={"inherit"} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default TierPricingCard;
