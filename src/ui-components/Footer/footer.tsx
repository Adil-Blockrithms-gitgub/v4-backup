import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import './footer.css';
import { Divider } from '../Divider';
import Link from 'next/link';

function Footer() {
  return (
    <>
      <Box className="footer-main-container">
        <Box className="footer-container">
          {/* uper part of footer */}
          <Grid container justifyContent={'space-between'}>
            <Box className="Box-1-footer">
              <Box className="logo-footer">
                <Image
                  width={32}
                  height={32}
                  src="/images/FooterImages/yellowLogo.svg"
                  alt="iamge logo"
                />
              </Box>
              <Typography className="footer-discription">
                Welcome to Eclipse, the laser-focused web3 gaming subnet that
                leverages distributed consensus to create an incredibly scalable
                and decentralized gaming ecosystem, shaping the future of gaming
                experiences.
              </Typography>
            </Box>
            <Box className="Box-2-footer">
              <Typography className="box-2-title">Resources</Typography>{' '}
              <Typography className="box2-text1">
                <Link href="/">FAQs</Link>
              </Typography>
              <Typography className="box2-text2">
                <Link href="/"> Contact us</Link>
              </Typography>
              <Typography className="box2-text2">
                {' '}
                <Link href="/pool">Eclipse APP</Link>
              </Typography>
            </Box>
            <Box className="Box-3-footer">
              <Typography className="box-3-title">Join the comunity</Typography>
              <Box className="logo-container">
                <Link target="_blank" href="https://discord.com/invite/ThorFi">
                  <Image
                    className="pointer"
                    width={24}
                    height={24}
                    src="/images/FooterImages/Discordyellow.svg"
                    alt="image of discord"
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://twitter.com/CapsulePresents"
                >
                  <Image
                    className="pointer"
                    width={24}
                    height={24}
                    src="/images/FooterImages/twitteryellow.svg"
                    alt="image of twiter"
                  />
                </Link>
                <Link target="_blank" href="https://medium.thorfi.io/">
                  <Image
                    className="pointer"
                    width={24}
                    height={24}
                    src="/images/FooterImages/DotesImage.svg"
                    alt="image of dotes"
                  />
                </Link>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box width={'90%'} margin={'auto'}>
          <Divider variant="fullWidth" />
        </Box>
        {/* lower part of footer */}
        <Box className="lower-part-container">
          <Typography className="Copy-text">Copyright 2023 Eclipse</Typography>
          <Box className="Container-Team-About">
            <Typography className="text-about-team">
              Terms & Conditions
            </Typography>
            <Typography className="text-about-team">About</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Footer;
