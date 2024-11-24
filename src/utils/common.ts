import { formatUnits } from "viem";
import { NFTAttrbiute, NFTTokenURI, ParseTokenURIType } from "./types";

export const formatDecimals = (
  weiAmount: bigint | undefined,
  decis = 18,
  auto = false,
  prec = 4
) => {
  if (!weiAmount) {
    return Number(0.0).toString();
  }
  const result = Number(formatUnits(weiAmount, decis));
  if (auto) {
    return result.toString();
  }
  return result.toFixed(prec);
};

export const numberExponentToLarge = (numIn: string) => {
  return Number(numIn).toLocaleString("fullwide", {
    useGrouping: false,
    maximumFractionDigits: 18,
  });
};

export const parseTokenURI = (parsedTokenURI: NFTTokenURI) => {
  const data: ParseTokenURIType = {
    activeMultiplier: 0,
    inActiveMultiplier: 0,
    decayedMultiplier: 0,
    availableMultiplier: 0,
    dueDate: null,
    rewards: 0.0,
  };
  try {
    const dueDate = parsedTokenURI?.attributes.find(
      (item: NFTAttrbiute) => item.trait_type === "Due date"
    );
    if (dueDate) {
      data.dueDate = new Date(Number(dueDate.value) * 1000);
      // setActieMultiplierExpiryDate(date);
    }

    const activeMultiplier = parsedTokenURI?.attributes.find(
      (item: NFTAttrbiute) => item.trait_type === "Active Multipliers"
    );

    const availableMultiplier = parsedTokenURI?.attributes.find(
      (item: NFTAttrbiute) => item.trait_type === "Available Multipliers"
    );

    const decayedMultiplier = parsedTokenURI?.attributes.find(
      (item: NFTAttrbiute) => item.trait_type === "Decayed Multipliers"
    );

    const rewards = parsedTokenURI?.attributes.find(
      (item: NFTAttrbiute) => item.trait_type === "Rewards"
    );

    data.activeMultiplier = Number(activeMultiplier?.value || 0);
    data.inActiveMultiplier =
      Number(activeMultiplier?.value) === 0
        ? Number(availableMultiplier?.value || 0)
        : 0;
    data.decayedMultiplier = Number(decayedMultiplier?.value || 0);
    data.rewards = Number(
      Number(formatUnits(BigInt(rewards?.value || 0), 18)).toPrecision(5)
    );
    data.availableMultiplier = Number(availableMultiplier?.value || 0);
  } catch (error) {
    console.error("Error decoding tokenURI:", error);
  }
  return data;
};

export const generateDateIfLessThan12Months = (passedTimestamp: number) => {
  // Get the current time in seconds (Unix timestamp)
  const currentTime = Math.floor(Date.now() / 1000); // current timestamp in seconds

  // Convert the Unix timestamp to a JavaScript Date object
  const date = new Date(passedTimestamp * 1000); // Unix timestamp is in seconds, Date expects milliseconds

  // Add 12 months to the date
  const futureDate = new Date(date);
  futureDate.setMonth(futureDate.getMonth() + 12);

  // Check if 12 months have passed by comparing the current time
  if (currentTime > futureDate.getTime() / 1000) {
    // 12 months have passed, return empty string
    return "--/--/----";
  }

  // Format the new date as mm/dd/yyyy
  const month = futureDate.getMonth() + 1; // getMonth is 0-based
  const day = futureDate.getDate();
  const year = futureDate.getFullYear();

  const formattedDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;

  return formattedDate;
};
