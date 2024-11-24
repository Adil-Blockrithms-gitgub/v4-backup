import { FC, useEffect, useMemo, useState } from "react";
import { Address, formatUnits } from "viem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid2 as Grid,
  Stack,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { emptyCart, selectItems, selectTotalItems, selectCartTotal } from "@/redux/features/lootboxCartSlice";
// import {
//   useTokenAllowance,
//   useTokenApprove,
//   useBuyMultiple,
// } from '@/hooks/lootbox';
// import { useToken } from '@/hooks/useToken';
// import { useBalance } from '@/hooks/useBalance';
import { numberExponentToLarge } from "@/utils/common";

import TokenSelect from "./TokenSelect";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LootboxBuyModal: FC<Props> = ({ open, onClose }) => {
  const [token, setToken] = useState<Address | "">("");
  const [step, setStep] = useState<"approve" | "buy">("approve");

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectItems);
  const cartTotalItems = useAppSelector(selectTotalItems);
  const cartTotal = useAppSelector(selectCartTotal);
  // const { address } = useAccount();

  //TODO: Commented hook usage
  // const { data: tokenInfo, isLoading: isTokenInfoLoading } = useToken(token);
  // const { data: tokenBalance, isLoading: isTokenBalanceLoading } = useBalance({
  //   address,
  //   token: token ? token : undefined,
  // });
  // const {
  //   data: tokenAllowance,
  //   isLoading: isTokenAllowanceLoading,
  //   refetch: refetchTokenAllowance,
  // } = useTokenAllowance(token, address);

  // const { approve, isPending: isApprovePending } = useTokenApprove(
  //   token,
  //   () => {
  //     refetchTokenAllowance();
  //   }
  // );
  // const { buyMultiple, isPending: isBuyPending } = useBuyMultiple(
  //   () => {
  //     refetchTokenAllowance();
  //     onClose();
  //     dispatch(emptyCart());
  //   },
  //   undefined,
  //   address,
  //   (logs) => {
  //     console.log(logs, 'logs');
  //   }
  // );

  //* -----> Dummy vars
  const tokenBalance = 0;
  const tokenInfo = {
    decimals: 0,
    symbol: "",
  };
  const tokenAllowance = undefined;

  const tokenAmount = useMemo(() => {
    if (!cartTotal) {
      return 0n;
    }

    return BigInt(cartTotal);
  }, [cartTotal]);

  const isInsufficientBalance = useMemo(
    () => !!tokenBalance && !!tokenAmount && tokenBalance < tokenAmount,
    [tokenBalance, tokenAmount]
  );

  const tokenAmountParsed = useMemo(
    () =>
      token === "" || tokenAmount === 0n
        ? ""
        : numberExponentToLarge(formatUnits(tokenAmount ?? 0n, tokenInfo?.decimals ?? 18)),
    [token, tokenAmount, tokenInfo]
  );

  const cartTotalParsed = useMemo(() => numberExponentToLarge(formatUnits(BigInt(cartTotal), 6)), [cartTotal]);

  const isLoading = false;

  // const isLoading = useMemo(
  //   () =>
  //     isTokenBalanceLoading ||
  //     isTokenInfoLoading ||
  //     isTokenAllowanceLoading ||
  //     isApprovePending ||
  //     isBuyPending,
  //   [
  //     isTokenBalanceLoading,
  //     isTokenInfoLoading,
  //     isTokenAllowanceLoading,
  //     isApprovePending,
  //     isBuyPending,
  //   ]
  // );

  // const onQuantityChange =
  //   (itemId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     dispatch(
  //       updateItemQuantity({
  //         itemId,
  //         quantity: Number(event.currentTarget.value),
  //       })
  //     );
  //   };

  const onTokenChange = (token: Address | "") => {
    setToken(token);
  };

  const handleBuy = () => {
    //   if (step === 'approve') {
    //     approve(tokenAmount);
    //   } else {
    //     if (!token) {
    //       return;
    //     }
    //     const tiers: bigint[] = [];
    //     const qtys: bigint[] = [];
    //     cartItems.forEach((item) => {
    //       tiers.push(BigInt(item.id));
    //       qtys.push(BigInt(item.quantity));
    //     });
    //     if (token == '0x00') {
    //     } else {
    //       buyMultiple(tiers, qtys, token);
    //     }
    //   }
  };

  // useEffect(() => {
  //   if (token == '0x00') {
  //     setStep('buy');
  //   } else {
  //     setStep(
  //       tokenAllowance !== undefined && tokenAllowance < tokenAmount
  //         ? 'approve'
  //         : 'buy'
  //     );
  //   }
  // }, [token, tokenAllowance, tokenAmount]);

  // useEffect(() => {
  //   if (open) {
  //     setToken('');
  //   }
  // }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitle>Buy Lootbox</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 16,
          top: 10,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Accordion
              elevation={0}
              disableGutters
              defaultExpanded
              sx={{
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { borderColor: "secondary.main" },
                "&.Mui-expanded": { borderColor: "primary.main" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ flexGrow: 1 }}>{cartTotalItems} Items</Typography>
                <Typography sx={{ color: "text.secondary", pr: 1 }}>{`${cartTotalParsed} USD`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {cartItems.map((item) => (
                    <Grid size={12} key={item.id}>
                      <Stack direction={"row"} justifyContent={"space-between"} pr={1}>
                        <Typography>{`${numberExponentToLarge(formatUnits(BigInt(item.price), 6))} USD`}</Typography>
                        <Typography>{item.quantity}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid size={12}>
            <TokenSelect value={token} onChange={onTokenChange} />
          </Grid>
          {token !== "" && (
            <Grid size={12}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                color={isInsufficientBalance ? "error.main" : undefined}
              >
                <Typography>You will pay</Typography>
                <Typography>
                  {tokenAmountParsed} {tokenInfo?.symbol}
                </Typography>
              </Stack>
              {isInsufficientBalance && (
                <Stack direction={"row"} alignItems={"center"} gap={1} color={"error.main"}>
                  <WarningAmberOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography>Insufficient funds in your wallet</Typography>
                </Stack>
              )}
            </Grid>
          )}
          <Grid size={12}>
            <Stack alignItems={"center"} gap={1}>
              <LoadingButton
                variant={"outlined"}
                size={"large"}
                fullWidth
                loading={isLoading}
                disabled={!token || isInsufficientBalance}
                onClick={handleBuy}
              >
                {step === "approve" ? "Approve" : "Buy Lootbox"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LootboxBuyModal;
