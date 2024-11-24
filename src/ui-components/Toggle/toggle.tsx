import {
  ToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from '@mui/material';
import './toggle.css';

export interface ToggleOption<T> {
  label: string;
  value: T;
}
interface ToggleProps<T> {
  handleChange: (newVal: T) => void;
  value?: T;
  toggleValues: ToggleOption<T>[];
}

const ToggleButton = <T extends string | number | boolean>({
  value,
  handleChange,
  toggleValues,
}: ToggleProps<T>) => {
  return (
    <>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(event, newValue) => handleChange(newValue as T)}
        aria-label="text alignment"
        className="main-container-toggle-button"
      >
        {toggleValues?.map((option: ToggleOption<T>) => (
          <MuiToggleButton
            key={option.value.toString()}
            value={option.value}
            aria-label="center aligned"
            className={'toggle-inner-button'}
          >
            {option.label}
          </MuiToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};
export default ToggleButton;
