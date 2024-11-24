import { FC } from "react";
import { Address } from "viem";
import { Box } from "@mui/material";

// import { useToken } from '@/hooks/useToken';

interface Props {
  tokenAddress: Address;
}

const LootboxToken: FC<Props> = ({ tokenAddress }) => {
  //TODO: Commented hok usage
  // const { data } = useToken(tokenAddress);
  const data = {
    symbol: undefined,
  };

  return <Box>{data?.symbol}</Box>;
};

export default LootboxToken;
