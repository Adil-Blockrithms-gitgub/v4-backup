import { FC } from "react";
import { Address } from "viem";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

// import { useBuyTokens } from '@/hooks/lootbox';
import LootboxToken from "./LootboxToken";

interface Props {
  value?: Address | "";
  onChange?: (value: Address | "") => void;
}

const TokenSelect: FC<Props> = ({ value, onChange }) => {
  //TODO: Commented hook usage
  // const { data: tokens } = useBuyTokens();
  const tokens = [{ tokenAddress: undefined }];

  const handleChange = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value as Address | "");
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={"token-select"}>Buying Token</InputLabel>
      <Select id={"token-select"} label={"Buying Token"} value={value} onChange={handleChange}>
        {tokens?.map((token) => (
          <MenuItem key={token} value={token}>
            <LootboxToken tokenAddress={token} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TokenSelect;
