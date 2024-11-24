import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: 'Nexa',
  h1: {
    // fontFamily: "Nexa",
    fontSize: '56px',
    // fontKerning: "0%",
    fontWeight: 700,
  },
  h2: {
    // fontFamily: "Nexa",
    fontSize: '48px',
    // fontKerning: "0%",
    fontWeight: 700,
  },
  h3: {
    fontFamily: 'Nexa',
    fontSize: '40px',
    // fontKerning: "0%",
    fontWeight: 700,
  },
  h4: {
    fontFamily: 'Nexa',
    fontSize: '32px',
    // fontKerning: "0%",
    fontWeight: 700,
  },
  h5: {
    fontFamily: 'Nexa',
    fontSize: '24px',
    // fontKerning: "0%",
    fontWeight: 700,
  },
  h6: {
    fontFamily: 'Nexa',
    fontSize: '16px',
    // fontKerning: "0%",
    fontWeight: 700,
  },
  subtitle1: {
    fontWeight: 400,
    fontStyle: 'normal',
  },
  subtitle2: {
    fontSize: '15px',
  },
  body1: {
    fontSize: '14px',
    fontWeight: 400,
  },
  body2: {
    fontSize: '12px',
  },
  caption: {
    fontWeight: 400,
    fontSize: '12px',
  },
  overline: {
    fontSize: '11px',
    fontWeight: 400,
  },
  button: {
    fontSize: '14px !important',
    fontWeight: 700,
  },
};

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'h1': true;
    'h2': true;
    'h3': true;
    'h4': true;
    'h5': true;
    'h6': true;
    'subHeader-regular': true;
    'subHeader-bold': true;
    'p-lg-regular': true;
    'p-lg-bold': true;
    'p-md-regular': true;
    'p-md-bold': true;
    'p-sm-regular': true;
    'label-lg-bold': true;
    'label-md-bold': true;
    'label-sm-regular': true;
    'label-sm-bold': true;
    'p-xs-regular': true;
    'label-md-regular': true;
    'p-xlg-bold': true;
    'p-xs-bold': true;
    'p-md-300': true;
  }
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    miniMobile: true;
  }
}
