"use client";

import { Box, Divider } from "@mui/material";
import Image from "next/image";
import "./navBar.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import { FC, useEffect, useState } from "react";
import { useBalance } from "@thirdweb-dev/react";
import { formatDecimals } from "@/utils/common";

interface NavBarProps {
  handleopenSideBar?: () => void;
}

const NavBar: FC<NavBarProps> = ({ handleopenSideBar }) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);

  const { data: balanceData, isLoading, isError } = useBalance();

  // <------------------------ NEW CODE REALM ------------------------------>

  // const address = useAddress();
  // const isConnected = !!address;

  useEffect(() => {
    if (!isLoading && !isError && balanceData) {
      try {
        // Convert `displayValue` to an integer representation for `formatDecimals`
        const decimals = 18; // Assuming 18 decimals
        const valueAsBigInt = BigInt(
          (parseFloat(balanceData.displayValue) * 10 ** decimals).toFixed(0)
        );
        setBalance(formatDecimals(valueAsBigInt));
        setSymbol(balanceData.symbol);
      } catch (error) {
        console.error("Error converting displayValue to bigint:", error);
      }
    }
  }, [isLoading, isError, balanceData]);

  return (
    <>
      <Box className="NavBar-main-container">
        <Box className="NavBar-container">
          <Box className="side-1-navbar" onClick={handleopenSideBar}>
            <Box className="Logo-navbar">
              <Image
                width={30}
                height={30}
                src="/images/NavigationbarImages/LogoWhite.svg"
                alt="Image Logo"
              />
            </Box>
            <Box className="Title-navbar">
              <Image
                width={90}
                height={30}
                src="/images/NavigationbarImages/TitleNavBar.svg"
                alt="Title image"
              />
            </Box>
          </Box>
          {/* {There will be the connection button} */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box>{balance ? `${balance} ${symbol}` : ""} </Box>

            <ConnectWallet btnTitle="CONNECT" />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default NavBar;
