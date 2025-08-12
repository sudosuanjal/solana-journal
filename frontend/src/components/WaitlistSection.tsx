import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("waitlist");

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-900 rounded-md p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Ready for Mainnet?
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Be the first to know when Journl launches on Solana mainnet. Join our
        waitlist for exclusive updates.
      </p>

      <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for mainnet updates"
              className="w-full px-4 py-3 border-2 border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-900 text-white px-6 py-3 border-2 border-gray-900 rounded-md font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Mail className="w-4 h-4" />
            )}
            Join Waitlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaitlistSection;
