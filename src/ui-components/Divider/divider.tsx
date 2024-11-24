import { Divider as MuiDivider } from '@mui/material';
import './divider.css';
import { FC } from 'react';
interface Props {
  variant?: 'fullWidth' | 'inset' | 'middle';
}
const Divider: FC<Props> = ({ variant, ...rest }) => {
  return <MuiDivider {...rest} className="divider" variant={variant} />;
};

export default Divider;
