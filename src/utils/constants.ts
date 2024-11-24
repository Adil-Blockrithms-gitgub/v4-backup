import { Address, Chain } from "viem";
import { avalancheFuji, hardhat } from "viem/chains";

export const eclpTestnet = {
  id: 555666,
  name: "EclipseChain Testnet",
  // network: 'eclpTestnet',
  nativeCurrency: {
    decimals: 18,
    name: "Eclipse",
    symbol: "ECLPS",
  },
  rpcUrls: {
    public: { http: ["https://subnets.avax.network/eclipsecha/testnet/rpc"] },
    default: { http: ["https://subnets.avax.network/eclipsecha/testnet/rpc"] },
  },
  blockExplorers: {
    // etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    default: {
      name: "Explorer-Testnet",
      url: "https://subnets-test.avax.network/eclipsecha",
    },
  },
} as const satisfies Chain;

export const subgraphUrl =
  "https://app-backend-testnet.eclipsechain.org/subgraphs/name/LP-Subgraph";

export const LOOTBOX_CONTRACT_ADDRESS: { [key in number]: Address } = {
  [avalancheFuji.id]: "0x278eAA3F291284D676f5e663153EDE8b9900ccF9",
  [hardhat.id]: "0xE9A2F11cD0E15aE2FAd452f9132Ae1466D9289f3",
  [eclpTestnet.id]: "0x83d39A76df23a214cD8482F223551894929f141d",
};

export const ORACLE_CONTRACT_ADDRESS: { [key in number]: Address } = {
  [avalancheFuji.id]: "0x62F59F713b6ccA90D64FCc5e79713F0F30338694",
  [hardhat.id]: "0x7488c8B6aC74DC8e12278Dc008bf4655732443CC",
  [eclpTestnet.id]: "0x1FfaccFA97ec27c94aFBb699E63B8604A7Ba10EE",
};

// export const EclipseNFTTestnet = "0xfC88Ea17b525B0B57578592b59974e1151d168fC";
export const EclipseNFTTestnet = "0xd06aC015773FD00B0AB9754952A4590De989F3C3";

export const WECLP = "0xA859D441e35AecFb05Ff7aad07845becA3f15b14";
export const USDC = "0x599e20b7A0FEd1182B508745c918c5dA7cb787cD";
export const RewardsPool = "0xC74c0A4b7E3d2E85eE5fBa07Df36ef69612e9262"; // multisig
export const FeeCollector = "0xC74c0A4b7E3d2E85eE5fBa07Df36ef69612e9262"; // multisig
