import { FC } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import './NavigationDrawer.css';
import { palette } from '@/theme/Palette';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface NavigationDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 210,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: [theme.palette.background.default],
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: [theme.palette.background.default],
  overflowX: 'hidden',
  borderRight: 'none',
  width: '0px',
  [theme.breakpoints.up('md')]: {
    width: `calc(95px + 1px)`,
  },
  transitionDuration: 'width  2s',
  [theme.breakpoints.up('sm')]: {
    width: '0px',
    [theme.breakpoints.up('md')]: {
      width: `calc(95px + 1px)`,
    },
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 360,
  },
  backgroundColor: [theme.palette.background.default],
  borderRight: 'none',
  flexShrink: 0,
  zIndex: 99,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const NavigationDrawer: FC<NavigationDrawerProps> = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}) => {
  const router = useRouter();
  const currentUrl = usePathname();
  const handleRedirection = (url: string) => {
    router.push(url);
    handleDrawerClose();
  };
  return (
    <>
      <Drawer
        variant="permanent"
        PaperProps={{ square: true }}
        open={open}
        onMouseLeave={handleDrawerClose}
      >
        {/* {open ? ( */}
        <Box className="main-container-opened" onMouseEnter={handleDrawerOpen}>
          <Box className="open-sidebar-container">
            <Box onClick={handleDrawerClose} className="navbar-logo">
              <Image
                onClick={handleDrawerClose}
                width={32}
                height={32}
                src="/images/PoolImages/Token$eCLIPSE.svg"
                alt="logo "
              />
            </Box>

            <Button
              onClick={() => handleRedirection('/eclipsenft')}
              sx={{
                '&:hover': { backgroundColor: palette.storm[80] },
              }}
              onMouseEnter={handleDrawerOpen}
              className="open-iconbutton"
            >
              {currentUrl === '/eclipsenft' ? (
                <Image
                  width={48}
                  height={48}
                  src="/images/NavigationDrawerImages/Infinity.svg"
                  alt="icon navbar"
                />
              ) : (
                <Image
                  width={48}
                  height={48}
                  src="/images/NavigationDrawerImages/Infinity.svg"
                  alt="icon navbar"
                />
              )}
              {open ? (
                <Typography
                  className={
                    currentUrl === '/eclipsenft'
                      ? 'open-sidebar-selected-text'
                      : 'open-sidebar-text'
                  }
                >
                  Eclipse NFT
                </Typography>
              ) : (
                ''
              )}
            </Button>
          </Box>
          {open ? (
            <Box className="bottom-sidebar" sx={{ gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Link href="/faqs" style={{ paddingTop: 5 }}>
                  <Image
                    className="cursor"
                    width={38}
                    height={38}
                    src="/images/NavigationDrawerImages/help_outline-yellow.svg"
                    alt="icon navbar"
                  />
                </Link>
                <a
                  href={'https://docs.capsule.gg/resources/terms-of-service'}
                  target="_blank"
                  className="link"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="cursor"
                    width={20}
                    height={20}
                    src="/images/NavigationDrawerImages/text_snippet.svg"
                    alt="icon navbar"
                  />
                </a>
              </Box>
              <Box className="bottom-div-1">
                <a
                  href={'https://discord.com/invite/ThorFi'}
                  target="_blank"
                  className="link"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="cursor"
                    width={24}
                    height={24}
                    src="/images/FooterImages/Discordyellow.svg"
                    alt="icon navbar"
                  />
                </a>
                <a
                  href={'https://twitter.com/CapsulePresents'}
                  target="_blank"
                  className="link"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="cursor"
                    src="/images/FooterImages/twitteryellow.svg"
                    width={24}
                    height={24}
                    alt="icon navbar"
                  />
                </a>
                <a
                  href={'https://medium.thorfi.io/'}
                  target="_blank"
                  className="link"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="cursor"
                    width={24}
                    height={24}
                    src="/images/FooterImages/DotesImage.svg"
                    alt="icon navbar"
                  />
                </a>
              </Box>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
