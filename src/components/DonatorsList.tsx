"use client";

import { useDonators } from "@/hooks/useDonators";
import { useAccount } from "wagmi";

export function DonatorsList() {
  const { donators } = useDonators();
  const { address } = useAccount();

  if (donators.length === 0) {
    return null;
  }

  const PLACEHOLDER_DONATORS = [
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.0",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.0",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.0",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.0",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.0",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.0",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.0",
    },
  ];

  const donatorsWithRank = PLACEHOLDER_DONATORS.map((d, i) => ({
    ...d,
    rank: i + 1,
  }));

  let displayList = donatorsWithRank;

  if (address) {
    const userIndex = donatorsWithRank.findIndex(
      (d) => d.address.toLowerCase() === address.toLowerCase()
    );
    if (userIndex !== -1) {
      const userEntry = donatorsWithRank[userIndex];
      const others = donatorsWithRank.filter((_, i) => i !== userIndex);
      displayList = [userEntry, ...others];
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col max-h-none md:max-h-[400px]">
        <div className="overflow-y-auto overflow-x-hidden custom-scrollbar">
          <table className="w-full text-left relative">
            <thead className="sticky top-0 z-10 bg-black/60 backdrop-blur-md">
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 sm:py-4 sm:px-6 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="py-3 px-4 sm:py-4 sm:px-6 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Address
                </th>
                <th className="py-3 px-4 sm:py-4 sm:px-6 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayList.map((donator) => {
                const isMe =
                  address &&
                  donator.address.toLowerCase() === address.toLowerCase();
                return (
                  <tr
                    key={donator.address}
                    className={`transition-colors hover:bg-white/5 ${
                      isMe
                        ? "bg-purple-500/20 border-l-2 border-purple-500"
                        : ""
                    }`}
                  >
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-xs sm:text-sm text-gray-500 font-mono">
                      #{donator.rank}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs sm:text-sm ${
                            isMe ? "text-purple-400 font-bold" : "text-gray-300"
                          }`}
                        >
                          {donator.address.slice(0, 6)}...
                          {donator.address.slice(-4)}
                        </span>
                        {isMe && (
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide hidden sm:inline-block">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-right">
                      <span className="font-bold text-white text-xs sm:text-base">
                        {parseFloat(donator.amount).toFixed(4)}
                      </span>
                      <span className="text-gray-500 text-[10px] sm:text-xs ml-1">
                        ETH
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
