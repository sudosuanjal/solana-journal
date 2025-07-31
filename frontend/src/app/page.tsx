import NavBar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Demo content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center space-y-4">
          <h2
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Kalam, cursive" }}
          >
            Welcome to ChainDiary
          </h2>
          <p className="text-gray-600" style={{ fontFamily: "Kalam, cursive" }}>
            Your personal mood ledger awaits...
          </p>
        </div>
      </div>
    </div>
  );
}
