import localFont from 'next/font/local';

const Nexa = localFont({
  src: [
    {
      path: './Nexa Light.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Nexa Regular.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Nexa Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-nexa',
});

export default Nexa;
