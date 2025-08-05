import { Globe } from "lucide-react";

const SocialProof: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-4 bg-white border-2 border-gray-900 rounded-md px-6 py-4">
        <Globe className="w-6 h-6 text-gray-900" />
        <span className="font-semibold text-gray-900">
          Join 100+ users journaling on Solana
        </span>
      </div>
    </div>
  );
};

export default SocialProof;
