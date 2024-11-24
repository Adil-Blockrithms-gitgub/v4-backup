import { Clear } from '@mui/icons-material';
import { Box, Modal, Typography, Button } from '@mui/material';
import React, { FC } from 'react';
import './wallet.css';
import Image from 'next/image';
import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { useAppSelector } from '@/redux/hooks';

interface WalletProps {
  handleClose: () => void;
  open: boolean;
}
const modalStyle = {
  position: 'absolute',
  bottom: '24%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '506px', xs: '100%' },
  bgcolor: '#1A1A1A',
  p: 3,
  borderRadius: 3,
};

const WalletModal: FC<WalletProps> = ({ handleClose, open }) => {
  const { connect, connectors } = useConnect();
  const { connector } = useAccount();
  const isConnected = useAppSelector((state) => state.userData.isConnected);

  const { disconnect } = useDisconnect();

  const connectMetamask = () => {
    connect({ connector: connectors[0] });
    handleClose();
  };

  const connectWalletConnect = () => {
    connect({ connector: connectors[1] });
    handleClose();
  };
  const disconnectWallet = () => {
    disconnect();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Box className="modle-header">
          <Typography className="modal-title">
            {isConnected ? 'Disconnect wallet' : 'Connect wallet'}
          </Typography>
          <Clear
            onClick={handleClose}
            sx={{
              color: '#808080',
              width: 20,
              height: 20,
            }}
            className="crusor"
            fontSize="small"
          />
        </Box>
        {isConnected ? (
          <>
            {connector?.name === 'MetaMask' ? (
              <Box className="wallet-1-box space-between">
                <Box className="connected-wallet-box">
                  <Image
                    width={40}
                    height={42}
                    src="/images/Default/metamask.svg"
                    alt="Wallet image"
                  />
                  <Typography className="text-wallet-2">Metamask</Typography>
                </Box>
                <Box className="Greendot-image-box">
                  <Image
                    width={23}
                    height={23}
                    src="/images/Default/greenlayer-dot.svg"
                    alt="image green dot"
                  />
                </Box>
              </Box>
            ) : (
              <Box className="wallet-1-box space-between">
                <Box className="connected-wallet-box">
                  <Image
                    width={40}
                    height={42}
                    src="/images/Default/connectWallet.svg"
                    alt="Wallet image"
                  />
                  <Typography className="text-wallet-2">
                    Wallet Connect
                  </Typography>
                </Box>
                <Box className="Greendot-image-box">
                  <Image
                    width={23}
                    height={23}
                    src="/images/Default/greenlayer-dot.svg"
                    alt="image green dot"
                  />
                </Box>
              </Box>
            )}

            <Box className="button-container" onClick={disconnectWallet}>
              <Button fullWidth variant={'contained'}>
                Disconnect wallet
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box className="wallet-1-box" onClick={connectMetamask}>
              <Image
                width={40}
                height={42}
                src="/images/Default/metamask.svg"
                alt="Wallet image"
              />
              <Typography className="text-wallet">Metamask</Typography>
            </Box>
            <Box className="wallet-2-box" onClick={connectWalletConnect}>
              <Image
                width={40}
                height={42}
                src="/images/Default/connectWallet.svg"
                alt="Wallet image"
              />
              <Typography className="text-wallet">Wallet Connect</Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default WalletModal;
