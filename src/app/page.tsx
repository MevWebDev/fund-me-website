import { ConnectButton } from "@/components/ConnectButton";
import { Fluid } from "@/components/Fluid";
import { FundMeCard } from "@/components/FundMeCard";
import { DonatorsList } from "@/components/DonatorsList";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a target="_blank" href="https://www.grysiewicz.com/">
              <p className="text-white text-2xl font-bold">My portfolio</p>
            </a>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-4xl w-full text-center mb-8 sm:mb-12 flex flex-col items-center gap-4 sm:gap-6">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight sm:leading-[1.1]">
            <span className="text-gradient-primary">Fuel Shai's</span>
            <br />
            <span className="text-gradient-accent">Web3 Journey.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2">
            Hey, I'm <strong>Shai</strong>! I'm on a mission to become a
            world-class Web3 developer. Your support helps me learn, build, and
            create the decentralized future.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-6 w-full max-w-6xl items-center lg:items-start">
          <FundMeCard />

          <DonatorsList />
        </div>

        {/* Features Section */}
      </main>

      <Fluid />
    </div>
  );
}
