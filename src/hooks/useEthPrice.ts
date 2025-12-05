"use client";

import { useReadContract } from "wagmi";

// Chainlink ETH/USD Price Feed on Base Mainnet
const CHAINLINK_ETH_USD_BASE = "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70";

// Chainlink Aggregator V3 ABI (only what we need)
const AGGREGATOR_ABI = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function useEthPrice() {
  const { data: priceData, isLoading } = useReadContract({
    address: CHAINLINK_ETH_USD_BASE,
    abi: AGGREGATOR_ABI,
    functionName: "latestRoundData",
  });

  const { data: decimals } = useReadContract({
    address: CHAINLINK_ETH_USD_BASE,
    abi: AGGREGATOR_ABI,
    functionName: "decimals",
  });

  // Price comes with 8 decimals from Chainlink
  const ethPrice = priceData
    ? Number(priceData[1]) / Math.pow(10, decimals || 8)
    : null;

  const convertEthToUsd = (ethAmount: string): string | null => {
    if (!ethPrice || !ethAmount || isNaN(parseFloat(ethAmount))) {
      return null;
    }
    const usdValue = parseFloat(ethAmount) * ethPrice;
    return usdValue.toFixed(2);
  };

  return {
    ethPrice,
    isLoading,
    convertEthToUsd,
  };
}
