import React, { FC, ReactNode } from 'react';
import './Button.css';
import { Box, Button as MuiButton } from '@mui/material';

interface ButtonProps {
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button text
   */
  label: string;
  /**
   *Optional Button icon
   */
  icon?: ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Variant of button
   */
  variant: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  fullWidth?: boolean;
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'inherit';
  isloading?: boolean;
}

/**
 * Primary UI component for user interaction
 */
const Button: FC<ButtonProps> = ({
  size = 'medium',
  label,
  icon,
  variant,
  disabled,
  fullWidth,
  onClick,
  ...rest
}) => {
  return (
    <Box width="100%">
      <MuiButton
        className="cursor zindex"
        {...rest}
        size={size}
        type="button"
        onClick={onClick}
        startIcon={icon}
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {label}
      </MuiButton>
    </Box>
  );
};

export default Button;
