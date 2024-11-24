import { FC } from 'react';
import Image from 'next/image';
import { Chip } from '@mui/material';

interface Props {
  selected: boolean;
  disabled?: boolean;
  setSelected: (val: boolean) => void;
  text: string;
  image: string | undefined;
}
const HoverExpandableChip: FC<Props> = ({
  text,
  disabled = false,
  selected,
  setSelected,
  image,
}) => {
  const handleSelect = () => {
    setSelected(!selected);
  };
  return (
    <Chip
      icon={
        <Image
          src={image ?? '/images/$eCLIPSE.svg'}
          alt="icon"
          width={24}
          height={24}
        />
      }
      label={text}
      color={selected ? 'primary' : 'secondary'}
      variant={selected ? 'filled' : 'outlined'}
      disabled={disabled}
      sx={{
        '.MuiChip-icon': {
          margin: selected ? '0 -6px 0 5px' : '4px',
        },
        '.MuiChip-label': {
          transition: 'all .7s',
          width: selected ? 'fit-content' : '0px',
          padding: selected ? '0 12px' : '0px',
        },
        '&:hover': {
          '.MuiChip-icon': {
            margin: '0 -6px 0 5px',
          },
          '.MuiChip-label': {
            width: 'fit-content',
            padding: '0 12px',
          },
        },
      }}
      onClick={handleSelect}
    />
  );
};

export default HoverExpandableChip;
