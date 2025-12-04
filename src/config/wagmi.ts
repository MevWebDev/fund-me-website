import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "FundMe",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
