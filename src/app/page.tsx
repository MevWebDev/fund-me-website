import { ConnectButton } from "@/components/ConnectButton";
import { Fluid } from "@/components/Fluid";
import { FundMeCard } from "@/components/FundMeCard";
import { DonatorsList } from "@/components/DonatorsList";

export default function Home() {
  return (
    <div className="min-h-full w-full md:h-full md:overflow-hidden flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            target="_blank"
            href="https://www.grysiewicz.com/"
            className="text-white text-lg sm:text-2xl font-bold hover:text-purple-400 transition-colors"
          >
            My portfolio
          </a>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:overflow-y-auto overflow-x-hidden py-2 sm:py-4">
        {/* Hero Text */}
        <div className="text-center pb-2 mb-4 sm:mb-6 flex-shrink-0">
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-1 sm:mb-4">
            <span className="text-gradient-primary">Fuel Shai's</span>
            <br />
            <span className="text-gradient-accent">Web3 Journey.</span>
          </h2>
          <p className="text-[10px] sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Hey, I'm <strong>Shai</strong>! Support my journey to become a Web3
            developer.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row justify-center gap-4 sm:gap-8 w-full max-w-4xl">
          <FundMeCard />
          <DonatorsList />
        </div>
      </main>

      <Fluid />
    </div>
  );
}
