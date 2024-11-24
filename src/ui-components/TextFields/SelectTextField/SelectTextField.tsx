import { palette } from '@/theme/Palette';
import { Token } from '@/ui-components/Tokens';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { FC, useState } from 'react';

interface SelectTextFieldProps {
  width?: string;
  options: Option[];
  handleChange: (val: string) => void;
  value: string;
}
interface Option {
  value?: string;
  label?: string;
}
const SelectTextField: FC<SelectTextFieldProps> = ({
  width = '86px',
  options,
  handleChange,
  value,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleIconClick = () => {
    setMenuOpen(!menuOpen);
  };
  const selectStyles = {
    height: '40px',
    width: width,
    display: 'flex',
    alignItems: 'center',
    paddingRight: '40px',
  };
  const iconStyles: React.CSSProperties = {
    color: palette.primary.main,
    transition: 'transform 0.2s',
    transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    paddingRight: '3px',
    width: 30,
  };
  const menuStyles = {
    backgroundColor: palette.storm[6],
  };
  const customIcon = (
    <KeyboardArrowDown
      onClick={handleIconClick}
      className="cursor"
      style={iconStyles}
    />
  );
  return (
    <FormControl fullWidth={false}>
      <Select
        value={value}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onClick={handleIconClick}
        onChange={(e) => handleChange(e.target.value)}
        IconComponent={() => customIcon}
        SelectDisplayProps={{ style: selectStyles }}
        MenuProps={{
          PaperProps: {
            style: menuStyles,
          },
          open: menuOpen,
          onClose: () => handleIconClick(),
        }}
      >
        {options?.map((option: Option, index: number) => (
          <MenuItem key={index} value={option.value} className="menu-item">
            <Box display="flex" alignItems="center" gap={1}>
              <Box mb={-0.6}>
                <Token variant="ECLIPSE" width={24} />
              </Box>
              <Typography
                sx={{
                  maxWidth: '90px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {option.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SelectTextField;
