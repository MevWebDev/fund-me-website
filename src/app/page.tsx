import { ConnectButton } from "@/components/ConnectButton";
import { Fluid } from "@/components/Fluid";
import { FundMeCard } from "@/components/FundMeCard";
import { DonatorsList } from "@/components/DonatorsList";

export default function Home() {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col">
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
      <main className="flex-1 flex flex-col items-center justify-center px-4  overflow-hidden">
        {/* Hero Text */}
        <div className="text-center pb-4 mb-8 sm:mb-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-2 sm:mb-4">
            <span className="text-gradient-primary">Fuel Shai's</span>
            <br />
            <span className="text-gradient-accent">Web3 Journey.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Hey, I'm <strong>Shai</strong>! Support my journey to become a Web3
            developer.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row justify-center gap-8  ">
          <FundMeCard />
          <DonatorsList />
        </div>
      </main>

      <Fluid />
    </div>
  );
}
