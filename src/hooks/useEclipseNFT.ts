import { EclipseNFTTestnet } from "@/utils/constants";
import {
  AddressString,
  BuyMultiplierMutationArgs,
  ClaimRewardMutationArgs,
  PayFeeMutationArgs,
  RestoreMultiplierMutationArgs,
} from "@/utils/types";

// TODO <----------------------- THIRD-WEB PART START FORM HERE --------------------------->
import EclipseNFTAbi from "@/abi/EclipseNFT.json";
import {
  useContractRead,
  useContract,
  useChain,
  useAddress,
  useContractWrite,
} from "@thirdweb-dev/react";

//** */ <---------------------------- HOOK PROVIDING THE CONTRACT ADDRESS ----------------------------->

export const useGetEclipseNFTAddress = () => {
  const chain = useChain();

  switch (chain?.chainId) {
    case 555666: // Eclp - Testnet
      return EclipseNFTTestnet as AddressString;
    case 17173: // Eclp - Mainnet
      return undefined;
    case 43114: // Avax Mainnet
      return undefined;
    default:
      return EclipseNFTTestnet as AddressString;
  }
};

//** */ <---------------------------- HOOK GETTING NFT OF USER ----------------------------->  DONE

export const useGetUserEclipseNFTs = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const address = useAddress();

  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  return useContractRead(contract, "eNFTsOfUser", [address]);
};

//** */ <---------------------------- HOOK GETTING TOKEN DETAILS OF USER -----------------------------> DONE

export const useGetTokenURI = (tokenId: number | string) => {
  const contractAddress = useGetEclipseNFTAddress();

  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  return useContractRead(contract, "tokenURI", [tokenId]);
};

//** */ <---------------------------- HOOK CALCULATING FEE FOR (ACTIVE) MULIPLIER -----------------------------> DONE

export const useCalculateFeeForActiveMultiplier = (
  tokenId: number,
  noOfMonths: number
) => {
  const contractAddress = useGetEclipseNFTAddress();

  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  return useContractRead(contract, "calculateFee", [tokenId, noOfMonths]);
};

//** */ <---------------------------- HOOK CALCULATING FEE FOR (INACTIVE) MULIPLIER -----------------------------> DONE

export const useCalculateFeeForInActiveMultiplier = (tokenId: number) => {
  const contractAddress = useGetEclipseNFTAddress();

  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  return useContractRead(contract, "calculateReactiveFee", [tokenId]);
};

//** */ <---------------------------- HOOK USE TO PAY SUBSCRIPTION AND REACTIVE FEE -----------------------------> DONE

export const usePayFee = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  // Use contract write hook
  const { mutateAsync, ...params } = useContractWrite(
    contract,
    "payFee" // Replace with your actual function name
  );

  const mutationAsyncFun = async (args: PayFeeMutationArgs, value: bigint) => {
    try {
      const result = await mutateAsync({ args, overrides: { value } });
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { mutationAsyncFun, ...params, isPending: params.isLoading };
};

//** */ <---------------------------- HOOK USE TO CLAIM REWARDS -----------------------------> DONE

export const useClaimReward = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  const { mutateAsync, ...params } = useContractWrite(contract, "claimRewards");

  const mutationAsyncFun = async (args: ClaimRewardMutationArgs) => {
    try {
      const result = await mutateAsync({ args });
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Return the async function, data, and statuses
  return { mutationAsyncFun, ...params, isPending: params.isLoading };
};

//** */ <---------------------------- HOOK USE TO RESTORE MULTIPLIERS -----------------------------> DONE

export const useRestoreMultipliers = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  const { mutateAsync, ...params } = useContractWrite(
    contract,
    "restoreMultipliers"
  );

  const mutationAsyncFun = async (
    args: RestoreMultiplierMutationArgs,
    value: bigint
  ) => {
    try {
      const result = await mutateAsync({ args, overrides: { value } });
      return result; // Return the result from the contract write
    } catch (error) {
      throw error; // Throw the error for the caller to handle
    }
  };

  // Return the async function, data, and statuses
  return { mutationAsyncFun, ...params, isPending: params.isLoading };
};

//** */ <---------------------------- HOOK USE TO BUY MULTIPLIERS ----------------------------->

export const useBuyMultipliers = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  const { mutateAsync, ...params } = useContractWrite(
    contract,
    "buyMultipliers"
  );

  const mutationAsyncFun = async (
    args: BuyMultiplierMutationArgs,
    value: bigint
  ) => {
    try {
      // Use overrides if value is provided
      const result = await mutateAsync({
        args,
        ...(value ? { overrides: { value } } : {}),
      });
      return result; // Return the result from the contract write
    } catch (error) {
      throw error; // Throw the error for the caller to handle
    }
  };

  // Return the async function, data, and statuses
  return { mutationAsyncFun, ...params, isPending: params.isLoading };
};

//** */ <---------------------------- HOOK USE TO GET CURRENT VRR ----------------------------->

export const useGetCurrentVRR = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  const { data, isFetched, isError } = useContractRead(
    contract,
    "getCurrentVRR"
  );

  // Return data and statuses for external use
  return { data, isFetched, isError };
};

//** */ <---------------------------- HOOK USE TO GET FIRST DUE DATE ----------------------------->

export const useGetFirstDueDate = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  return useContractRead(contract, "firstDueDate");
};

//** */ <---------------------------- HOOK USE TO GET SIMULATED VALUES ----------------------------->

export const useGetSimulatedValues = () => {
  const contractAddress = useGetEclipseNFTAddress();
  const { contract } = useContract(contractAddress, EclipseNFTAbi);

  return useContractRead(contract, "getSimulatedValues");
};
