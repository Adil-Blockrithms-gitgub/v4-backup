"use client";
import {
  useCalculateFeeForInActiveMultiplier,
  useClaimReward,
  useGetFirstDueDate,
  useGetSimulatedValues,
  useGetTokenURI,
  useGetUserEclipseNFTs,
  usePayFee,
} from "@/hooks/useEclipseNFT";
import {
  getNFTDetailRefetch,
  setNFTDetailRefetch,
} from "@/redux/features/refetchSlice";
import { showToast, ToastSeverity } from "@/redux/features/toastSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CounterCard } from "@/ui-components/CounterCard";
import BuyMultiplier from "@/ui-components/Modals/BuyMultipliers";
import DecayedModal from "@/ui-components/Modals/DecayedModal";
import EditNFT from "@/ui-components/Modals/EditNFT/editNFT";
import { generateDateIfLessThan12Months, parseTokenURI } from "@/utils/common";
import {
  eNFTsOfUserProps,
  NFTAttrbiute,
  NFTTokenURI,
  simulatedVals,
} from "@/utils/types";
import { Box, Grid2, useMediaQuery } from "@mui/material";
// import { Encoding } from 'crypto';
import React, { FC, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

interface props {
  id: string;
}
const EclipseNFTDetail: FC<props> = ({ id }) => {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const [globalLoading, setGlobalLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [viewBuyModal, setViewBuyModal] = useState(false);

  //TODO: Commented hook usage
  const { data: firstdueDateBignumber, refetch: refetchFirstDueDate } =
    useGetFirstDueDate();
  const { data: eclipseNFTs, isLoading: eNFTsOfUserLoading } =
    useGetUserEclipseNFTs();
  const { data: simulatedValues, refetch: refetchSimulatedValues } =
    useGetSimulatedValues();
  const [activeMultiplierExpiryDate, setActieMultiplierExpiryDate] =
    useState<Date | null>(null);
  const [inActiveMultiplierDecayDate, setInActiveMultiplierDecayDate] =
    useState<Date | null>(null);
  const [burnedMultiplierDate, setBurnedMultiplierDate] = useState<
    string | null
  >(null);
  const [Value, setValue] = useState<number>(0);
  const [isDecayedModal, setIsDecayedModal] = useState(false);
  const {
    data: tokenURI,
    refetch: refetchTokenURI,
    isLoading,
    isFetched,
  } = useGetTokenURI(id);
  const { data: reactiveFee, refetch: RefetchReActiveCalculetedFee } =
    useCalculateFeeForInActiveMultiplier(Number(id));

  const reActiveCalculatedFee = useMemo(
    () => BigInt(reactiveFee?.toString() || "0"),
    [reactiveFee]
  );
  console.log(
    "🚀 ~ reActiveCalculatedFee:",
    reActiveCalculatedFee,
    reactiveFee
  );
  const { mutationAsyncFun: payFeeForInactiveMultiplier } = usePayFee();
  const { mutationAsyncFun: mutationAsync } = useClaimReward();
  const nftDetailRefetch = useSelector(getNFTDetailRefetch);
  console.log(nftDetailRefetch, "----");
  const dispatch = useAppDispatch();
  const parsedTokenURI = useMemo(() => {
    let result: NFTTokenURI = {
      name: "",
      image: "",
      description: "",
      attributes: [],
    };
    if (tokenURI) {
      // Check if the tokenURI contains the base64 prefix and remove it if necessary
      const base64String = (tokenURI as string).includes("base64,")
        ? (tokenURI as string).split("base64,")[1]
        : tokenURI;
      // Decode the Base64 string
      const jsonString = atob(base64String as string);
      // Parse the JSON string into an object
      result = JSON.parse(jsonString);
    }
    return result;
  }, [tokenURI]);
  console.log(nftDetailRefetch, "sss", isLoading);
  const unixDueDate = useMemo(() => {
    let unixTimeStamp = Date.now();
    if (parsedTokenURI) {
      const dueDate = parsedTokenURI?.attributes.find(
        (item: NFTAttrbiute) => item.trait_type === "Due date"
      );
      unixTimeStamp = Number(dueDate?.value) * 1000;
    }
    return unixTimeStamp;
  }, [parsedTokenURI]);

  const subExpiryDateTime = useMemo(() => {
    if (activeMultiplierExpiryDate) {
      return (
        activeMultiplierExpiryDate.toLocaleDateString() +
        " " +
        activeMultiplierExpiryDate.toLocaleTimeString()
      );
    }
    return "--/--/----";
  }, [activeMultiplierExpiryDate]);

  const forcastedDecay = useMemo(() => {
    let count = 0;
    if (
      (eclipseNFTs as eNFTsOfUserProps)?.length &&
      (eclipseNFTs as eNFTsOfUserProps)?.[0]?.length &&
      id
    ) {
      const nft = (eclipseNFTs as eNFTsOfUserProps)?.[0]?.find(
        (nft) => nft.tokenId === Number(id)
      );
      if (nft) {
        const percent = 10 / 100;
        count = Math.floor((nft.initialMulCount || 0) * percent);
      }
    }
    return count;
  }, [id, eclipseNFTs]);

  const simulatedValuesParsed = useMemo(() => {
    let oneMonth = 1200;
    if (simulatedValues) {
      oneMonth = Number((simulatedValues as simulatedVals)?.[0] || 0);
    }
    return oneMonth;
  }, [simulatedValues]);
  console.log(simulatedValuesParsed, "parsed");
  const firstDueDate = useMemo(() => {
    let date = Date.now();
    if (firstdueDateBignumber) {
      date = Number(firstdueDateBignumber) * 1000;
    }
    return date;
  }, [firstdueDateBignumber]);

  useEffect(() => {
    refetchFirstDueDate();
    refetchSimulatedValues();
  }, [refetchSimulatedValues, refetchFirstDueDate]);

  useEffect(() => {
    if (isFetched) {
      setGlobalLoading(false);
    }
  }, [isFetched]);

  useEffect(() => {
    if (id) {
      refetchTokenURI();
      RefetchReActiveCalculetedFee();
    }
    if (nftDetailRefetch > 0) {
      setTimeout(() => {
        refetchTokenURI();
        RefetchReActiveCalculetedFee();
      }, 5000);
    }
  }, [id, refetchTokenURI, RefetchReActiveCalculetedFee, nftDetailRefetch]);
  const tokenParsedData = useMemo(() => {
    // let monthval = 1200;
    const data = parseTokenURI(parsedTokenURI);
    // let timeElapsed = currentTime - Number(dueDate?.value) * 1000;
    // let remainingTime = 1 - (timeElapsed % 1);
    // const newDate = new Date(remainingTime);
    setActieMultiplierExpiryDate(data.dueDate);
    const currentTime = Math.ceil(Date.now() / 1000);
    const dueDate = parsedTokenURI?.attributes.find(
      (item: NFTAttrbiute) => item.trait_type === "Due date"
    );

    // const testValue = 1729081377;

    const remainingTime =
      (currentTime - Number(dueDate?.value)) % simulatedValuesParsed;
    const remainingTime2 = simulatedValuesParsed - remainingTime;
    let decayTime = currentTime + remainingTime2;
    if (Number(dueDate?.value) <= firstDueDate + simulatedValuesParsed) {
      // if it is the first dueDate we consider decay from next month because first 2 months is the grace period
      decayTime = decayTime + simulatedValuesParsed;
    }
    console.log(decayTime, "sss", new Date(decayTime * 1000));
    setInActiveMultiplierDecayDate(new Date(decayTime * 1000));
    // // const burnedTime = oneYearSec - differnec;
    const burnedTime = generateDateIfLessThan12Months(Number(dueDate?.value));
    console.log(burnedTime, "differnec", Number(dueDate?.value));
    setBurnedMultiplierDate(burnedTime);
    return data;
  }, [parsedTokenURI, firstDueDate, simulatedValuesParsed]);

  console.log("🚀 ~ tokenParsedData ~ tokenParsedData:", tokenParsedData);
  const handleClaimReward = async () => {
    if (tokenParsedData?.rewards > 0) {
      try {
        await mutationAsync([Number(id)]);
        dispatch(setNFTDetailRefetch());
        dispatch(
          showToast({
            message: "Transaction performed successfully",
            severity: ToastSeverity.SUCCESS,
          })
        );
      } catch (err) {
        dispatch(
          showToast({
            message: "An error occurred",
            severity: ToastSeverity.ERROR,
          })
        );
      }
    }
  };
  const handleBuyMultipliers = () => {
    setViewBuyModal(true);
  };
  const handlePayFeeForActiveMultiplier = () => {
    setOpen(true);
  };
  const handlePayFeeForInActiveMultiplier = async () => {
    if (tokenParsedData?.inActiveMultiplier > 0 && reActiveCalculatedFee) {
      const fee = BigInt(reActiveCalculatedFee?.toString() || "0");
      console.log("handlePayFeeForInActiveMultiplier ~ fee:", fee);
      const tenPercent = ((fee as bigint) * BigInt(10)) / BigInt(100);
      const total = (fee as bigint) + tenPercent;
      try {
        await payFeeForInactiveMultiplier([Number(id), 1, 0], total);
        dispatch(setNFTDetailRefetch());
        dispatch(
          showToast({
            message: "Transaction performed successfully",
            severity: ToastSeverity.SUCCESS,
          })
        );
      } catch (err) {
        dispatch(
          showToast({
            message: "An error occurred",
            severity: ToastSeverity.ERROR,
          })
        );
      }
    }
  };
  console.log(firstDueDate, "first due date");
  return (
    <Box pt={5} zIndex={3}>
      <Grid2 container gap={2.5}>
        {/* <DiscoverGames /> */}
        <CounterCard
          width={isMobile ? "100%" : "350px"}
          count={tokenParsedData?.activeMultiplier}
          detail={
            tokenParsedData?.activeMultiplier > 0
              ? `Your subscription will expire at ${subExpiryDateTime}`
              : `Your subscription expired at ${subExpiryDateTime}`
          }
          title="Active Multipliers"
          handleButtonClick={
            tokenParsedData?.activeMultiplier > 0
              ? handlePayFeeForActiveMultiplier
              : undefined
          }
          buttonText={"Subscribe"}
          isLoading={isLoading || globalLoading}
        />
        <CounterCard
          width={isMobile ? "100%" : "350px"}
          count={
            tokenParsedData?.activeMultiplier == 0
              ? tokenParsedData?.inActiveMultiplier
              : 0
          }
          detail={`${tokenParsedData?.inActiveMultiplier ?? 0} Multipliers will be decayed at ${tokenParsedData?.inActiveMultiplier > 0 ? `${inActiveMultiplierDecayDate?.toLocaleDateString()} ${inActiveMultiplierDecayDate?.toLocaleTimeString()}` : "--/--/----"}`}
          title="Inactive Multipliers"
          handleButtonClick={
            tokenParsedData?.inActiveMultiplier > 0
              ? handlePayFeeForInActiveMultiplier
              : undefined
          }
          buttonText="Reactive"
          isLoading={isLoading || globalLoading || eNFTsOfUserLoading}
        />
        <CounterCard
          width={isMobile ? "100%" : "350px"}
          count={forcastedDecay}
          detail={`${tokenParsedData?.decayedMultiplier ?? 0} Multipliers will be burned at ${tokenParsedData?.decayedMultiplier > 0 ? burnedMultiplierDate : "--/--/----"}`}
          title="Decayed Multipliers"
          handleButtonClick={
            tokenParsedData?.availableMultiplier === 0 &&
            tokenParsedData?.decayedMultiplier > 0
              ? handleBuyMultipliers
              : () => setIsDecayedModal(true)
          }
          buttonText={
            tokenParsedData?.availableMultiplier === 0 &&
            tokenParsedData?.decayedMultiplier > 0
              ? "Buy"
              : tokenParsedData?.decayedMultiplier > 0
                ? "Restore"
                : ""
          }
          isLoading={isLoading || globalLoading}
        />

        {/* <LootBoxes /> */}
        <CounterCard
          width={isMobile ? "100%" : "350px"}
          count={tokenParsedData?.rewards}
          title="Rewards"
          handleButtonClick={
            tokenParsedData?.rewards > 0 ? handleClaimReward : undefined
          }
          buttonText="Claim"
          isLoading={isLoading || globalLoading}
        />
      </Grid2>
      <DecayedModal
        tokenId={id}
        decayedMultiplierCount={tokenParsedData?.decayedMultiplier}
        handleClose={() => setIsDecayedModal(false)}
        open={isDecayedModal}
      />
      <BuyMultiplier
        open={viewBuyModal}
        tokenId={id}
        handleClose={() => setViewBuyModal(false)}
      />
      <EditNFT
        open={open}
        tokenId={id}
        handleClose={() => setOpen(false)}
        currentNumber={Value}
        currentDate={activeMultiplierExpiryDate}
        setUpdatedDate={(value) => setActieMultiplierExpiryDate(value as Date)}
        setCurrentMonth={(value) => setValue(value)}
        unixDueDate={unixDueDate}
      />
    </Box>
  );
};

export default EclipseNFTDetail;
