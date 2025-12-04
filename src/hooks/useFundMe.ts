"use client";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useBalance,
} from "wagmi";
import { FUNDME_ABI, getFundMeAddress } from "@/contracts/FundMe";
import { parseEther } from "viem";

export function useFundMe() {
  const { address } = useAccount();
  const chainId = useChainId();
  const contractAddress = getFundMeAddress(chainId);

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Read contract balance using useBalance hook
  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: contractAddress,
  });

  // Read user's contribution
  const { data: userContribution, refetch: refetchUserContribution } =
    useReadContract({
      address: contractAddress,
      abi: FUNDME_ABI,
      functionName: "addressToAmountFunded",
      args: address ? [address] : undefined,
    });

  // Read contract owner
  const { data: owner } = useReadContract({
    address: contractAddress,
    abi: FUNDME_ABI,
    functionName: "i_owner",
  });

  // Read minimum USD
  const { data: minimumUsd } = useReadContract({
    address: contractAddress,
    abi: FUNDME_ABI,
    functionName: "MINIMUM_USD",
  });

  // Read total funded (persists after withdrawal)
  const { data: totalFunded } = useReadContract({
    address: contractAddress,
    abi: FUNDME_ABI,
    functionName: "totalFunded",
  });

  const fund = async (amount: string) => {
    console.log("Funding to address:", contractAddress, "Chain ID:", chainId);
    if (!contractAddress) {
      console.error("Contract address is missing! Check your .env file.");
      return;
    }
    try {
      writeContract({
        address: contractAddress,
        abi: FUNDME_ABI,
        functionName: "fund",
        value: parseEther(amount),
      });
    } catch (error) {
      console.error("Error funding:", error);
      throw error;
    }
  };

  const withdraw = async () => {
    try {
      writeContract({
        address: contractAddress,
        abi: FUNDME_ABI,
        functionName: "withdraw",
      });
    } catch (error) {
      console.error("Error withdrawing:", error);
      throw error;
    }
  };

  return {
    fund,
    withdraw,
    contractBalance: totalFunded, // Use totalFunded instead of current balance
    userContribution,
    owner,
    minimumUsd,
    contractAddress,
    chainId,
    isOwner:
      address && owner
        ? address.toLowerCase() === (owner as string).toLowerCase()
        : false,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    refetchBalance,
    refetchUserContribution,
  };
}
