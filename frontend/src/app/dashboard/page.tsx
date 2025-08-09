import NavBar from "@/components/Navbar";

export default function DashboardPlaceholder() {
  return (
    <div className="h-screen bg-[#FFF9E5] flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-4xl font-bold mb-4">🚧 Under Maintenance</h1>
        <p className="text-lg text-gray-600 max-w-md">
          We’re working hard to bring you something awesome here. Check back
          soon!
        </p>
      </div>
    </div>
  );
}
