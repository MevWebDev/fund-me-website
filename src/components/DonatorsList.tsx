"use client";

import { useDonators } from "@/hooks/useDonators";
import { useAccount } from "wagmi";

export function DonatorsList() {
  const { donators } = useDonators();
  const { address } = useAccount();

  if (donators.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Top Donators
      </h3>
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Address
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {donators.map((donator, index) => {
                const isMe =
                  address &&
                  donator.address.toLowerCase() === address.toLowerCase();
                return (
                  <tr
                    key={donator.address}
                    className={`transition-colors hover:bg-white/5 ${
                      isMe ? "bg-purple-500/10" : ""
                    }`}
                  >
                    <td className="py-4 px-6 text-sm text-gray-500 font-mono">
                      #{index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-sm ${
                            isMe ? "text-purple-400 font-bold" : "text-gray-300"
                          }`}
                        >
                          {donator.address.slice(0, 6)}...
                          {donator.address.slice(-4)}
                        </span>
                        {isMe && (
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-white">
                        {parseFloat(donator.amount).toFixed(4)}
                      </span>
                      <span className="text-gray-500 text-xs ml-1">ETH</span>
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
