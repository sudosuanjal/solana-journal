import Link from "next/link";
import { Star, Github, ExternalLink, ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center text-center px-6">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Journl
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Your Moods, Secured on <span className="font-semibold">Solana</span>
        </p>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          From awesome to terrible, your moods now have a ledger. Revolutionary
          web3 journaling with immutable memories.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <a
            href="https://www.producthunt.com/products/chaindiary"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            <div className="w-6 h-6 bg-[#FF6154] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PH</span>
            </div>
            <span className="font-medium text-gray-900">
              Featured on Product Hunt
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/sudosuanjal/solana-journal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <Github className="w-4 h-4" />
            <span className="font-medium text-gray-900">Star on GitHub</span>
          </a>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-md text-lg border-2 border-gray-900 transition-all duration-200 hover:scale-105"
        >
          Start Journaling on Web3
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-700">
          <div>🧠 100+ Web3 Journalers</div>
          <div>📄 1000+ Entries Secured</div>
          <div>⚡ Built on Solana</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
