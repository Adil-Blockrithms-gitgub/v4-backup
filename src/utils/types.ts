// import { BigNumber } from 'ethers';

export type AddressString = `0x${string}`;

export interface NFTProps {
  creationTime: number;
  decayedMulCount: number;
  dueDate: number;
  initialMulCount: number;
  lastClaimTime: number;
  lastFeePaymentTime: number;
  name: string;
  tokenId: number;
  unclaimedRewards: number;
}

export type eNFTsOfUserProps = [NFTProps[], bigint];

export interface NFTAttrbiute {
  type: string;
  trait_type: string;
  value: string;
}

export interface NFTTokenURI {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttrbiute[];
}

export type PayFeeMutationArgs = [number, number, number];
export type ClaimRewardMutationArgs = [number];
export type RestoreMultiplierMutationArgs = [number, number];
export type BuyMultiplierMutationArgs = [number, number];

export interface ParseTokenURIType {
  activeMultiplier: number;
  inActiveMultiplier: number;
  decayedMultiplier: number;
  availableMultiplier: number;
  dueDate: null | Date;
  rewards: number;
}

export type simulatedVals = [bigint];
