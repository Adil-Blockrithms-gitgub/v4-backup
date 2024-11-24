"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { EclipsechainTestnet } from "@thirdweb-dev/chains";

interface ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID} activeChain={EclipsechainTestnet}>
      {children}
    </ThirdwebProvider>
  );
};

export default Web3Provider;
