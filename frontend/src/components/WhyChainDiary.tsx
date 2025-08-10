import { Shield, Lock, Zap } from "lucide-react";

const WhyChainDiary: React.FC = () => {
  return (
    <div className="bg-white border-2 border-gray-900 rounded-md p-8 mb-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Why Journl Matters in Web3
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 rounded-md flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
          <p className="text-sm text-gray-600">
            Your journal entries are cryptographically protected and securely
            stored
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 rounded-md flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            You Own Your Data
          </h3>
          <p className="text-sm text-gray-600">
            No centralized servers. Your wallet, your data, your control
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 rounded-md flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Solana Speed</h3>
          <p className="text-sm text-gray-600">
            Fast, low-cost transactions make journaling seamless and affordable
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border-2 border-gray-900 rounded-md p-6">
        <p className="text-gray-900 leading-relaxed font-[kalam]">
          Journl pioneers personal journaling in the decentralized era by
          leveraging Solana's high-performance blockchain. Unlike traditional
          journal apps that store your intimate thoughts on centralized servers,
          Journl ensures your entries are securely recorded, providing a
          verifiable history of your thoughts that only you control through your
          Solana wallet. With Solana's scalability and eco-friendly consensus,
          you can journal daily without worrying about high fees or slow
          transactions. This creates a lifelong record of your thoughts and
          emotions, where every change is transparently logged, perfect for web3
          enthusiasts and privacy-conscious users who value true data ownership.
        </p>
      </div>
    </div>
  );
};

export default WhyChainDiary;
