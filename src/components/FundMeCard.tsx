"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useFundMe } from "@/hooks/useFundMe";
import { formatEther } from "viem";
import { toast } from "sonner";

export function FundMeCard() {
  const { isConnected } = useAccount();
  const {
    fund,
    withdraw,
    contractBalance,
    userContribution,
    isOwner,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    refetchBalance,
    refetchUserContribution,
    contractAddress,
    chainId,
    minimumUsd,
  } = useFundMe();

  const [amount, setAmount] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hash) {
      toast.info("Transaction Sent", {
        description: "Your transaction has been submitted to the network.",
        action: {
          label: "View on Etherscan",
          onClick: () =>
            window.open(`${networkInfo.explorer}/tx/${hash}`, "_blank"),
        },
      });
    }
  }, [hash]);

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
      refetchUserContribution();
      setAmount("");
      toast.success("Transaction Confirmed", {
        description: "Your donation has been successfully processed!",
        action: {
          label: "View on Etherscan",
          onClick: () =>
            window.open(`${networkInfo.explorer}/tx/${hash}`, "_blank"),
        },
      });
    }
  }, [isConfirmed, refetchBalance, refetchUserContribution, hash]);

  if (!mounted) {
    return (
      <div className="w-full max-w-md bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading Web3...</div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="w-full h-full max-w-md bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-2">
          👛
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
          <p className="text-gray-400 max-w-xs mx-auto">
            Connect your wallet to support me.
          </p>
        </div>
      </div>
    );
  }

  const handleFund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    try {
      await fund(amount);
    } catch (error) {
      toast.error("Transaction Failed", {
        description: "Please check your balance and try again.",
      });
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw();
      toast.info("Withdrawal Initiated", {
        description: "Confirm the transaction in your wallet.",
      });
    } catch (error) {
      toast.error("Withdrawal Failed");
    }
  };

  // Get network name and explorer URL
  const getNetworkInfo = () => {
    if (chainId === 11155111) {
      return { name: "Sepolia", explorer: "https://sepolia.etherscan.io" };
    }
    return { name: "Unknown Network", explorer: "https://etherscan.io" };
  };

  const networkInfo = getNetworkInfo();

  return (
    <div className="w-full max-w-md bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-y-auto max-h-none sm:max-h-[70vh] lg:max-h-none flex-shrink-0">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Support Shai
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Help me become a Web3 Dev
          </p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
          {networkInfo.name}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-4 hover:border-white/20 transition-colors">
          <div className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
            Total Raised
          </div>
          <div className="text-lg sm:text-2xl font-bold text-white truncate">
            {contractBalance ? formatEther(contractBalance) : "0"}{" "}
            <span className="text-sm text-gray-500">ETH</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-4 hover:border-white/20 transition-colors">
          <div className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
            Min. Donation
          </div>
          <div className="text-lg sm:text-2xl font-bold text-white truncate">
            {minimumUsd ? Number(formatEther(minimumUsd)).toFixed(2) : "5.00"}{" "}
            <span className="text-sm text-gray-500">USD</span>
          </div>
        </div>
      </div>

      {/* Donation Form */}
      <form
        onSubmit={handleFund}
        className="space-y-3 sm:space-y-4 mb-4 sm:mb-8"
      >
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            step="0.001"
            min="0"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 pl-4 pr-16 text-base sm:text-lg font-bold text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            disabled={isPending || isConfirming}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
            ETH
          </span>
        </div>

        <button
          type="submit"
          disabled={!amount || isPending || isConfirming}
          className="w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
        >
          {isPending
            ? "Confirming..."
            : isConfirming
            ? "Processing..."
            : "Donate Now"}
        </button>
      </form>

      {/* Owner Controls */}
      {isOwner && (
        <div className="border-t border-white/10 pt-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-400">
              Owner Controls
            </span>
          </div>
          <button
            onClick={handleWithdraw}
            disabled={isPending || isConfirming}
            className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-semibold text-sm"
          >
            Withdraw All Funds
          </button>
        </div>
      )}
    </div>
  );
}
