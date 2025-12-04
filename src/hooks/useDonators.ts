import { useReadContract, useReadContracts, useChainId } from "wagmi";
import { FUNDME_ABI, getFundMeAddress } from "@/contracts/FundMe";
import { formatEther } from "viem";

export interface Donator {
  address: string;
  amount: string;
  amountBigInt: bigint;
}

export function useDonators() {
  const chainId = useChainId();
  const contractAddress = getFundMeAddress(chainId);

  // 1. Fetch ALL funders in one go!
  const { data: allFunders } = useReadContract({
    address: contractAddress,
    abi: FUNDME_ABI,
    functionName: "getAllFunders",
  });

  // Get unique addresses to avoid duplicate calls if someone funded multiple times
  // (Assuming the contract adds duplicates, if not, Set is still safe)
  const uniqueFunders = Array.from(new Set(allFunders || []));

  // 2. Fetch amounts for these funders
  const { data: amountsData } = useReadContracts({
    contracts: uniqueFunders.map((address) => ({
      address: contractAddress,
      abi: FUNDME_ABI,
      functionName: "addressToAmountFunded",
      args: [address],
    })),
  });

  // 3. Combine and sort
  const donators: Donator[] = uniqueFunders
    .map((address, index) => {
      const amount = (amountsData?.[index]?.result as bigint) || BigInt(0);
      return {
        address,
        amount: formatEther(amount),
        amountBigInt: amount,
      };
    })
    .sort((a, b) => (b.amountBigInt > a.amountBigInt ? 1 : -1)); // Sort by amount descending

  return { donators };
}
