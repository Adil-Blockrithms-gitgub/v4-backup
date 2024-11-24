'use client';
import { ThemeProvider } from '@mui/material/styles';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import CssBaseline from '@mui/material/CssBaseline';
import { customTheme } from './CustomTheme';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
