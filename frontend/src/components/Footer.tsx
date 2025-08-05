const Footer: React.FC = () => {
  return (
    <div className="text-center mt-12 pt-8 border-t-2 border-gray-900">
      <p className="text-gray-600 text-sm mb-4">
        Built with ❤️ on Solana • Open Source • Privacy First
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="https://github.com/sudosuanjal/solana-journal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Twitter
        </a>
        <a
          href="https://www.producthunt.com/products/chaindiary"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Product Hunt
        </a>
      </div>
    </div>
  );
};

export default Footer;
