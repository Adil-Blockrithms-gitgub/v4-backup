import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { FC } from 'react';
import { Clear, Search } from '@mui/icons-material';

type SearchTextFieldProps = TextFieldProps & {
  InputWidth?: string;
  value?: string;
  handleClear?: () => void;
};

const SearchTextField: FC<SearchTextFieldProps> = ({
  InputWidth,
  value,
  handleClear,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      variant="outlined"
      // onChange={onChange}
      InputProps={{
        style: {
          width: InputWidth,
        },
        endAdornment: (
          <InputAdornment position="end">
            {value ? (
              <IconButton color={'primary'} onClick={handleClear}>
                <Clear />
              </IconButton>
            ) : (
              <IconButton color={'primary'}>
                <Search />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      value={value}
    />
  );
};

export default SearchTextField;
