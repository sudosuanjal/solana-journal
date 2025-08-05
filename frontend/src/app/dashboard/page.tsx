import JournalDashboard from "@/components/JournalDashboard";
import JournalEntryForm from "@/components/JournalEntryForm";
import NavBar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <div className="h-screen bg-[#FFF9E5] flex flex-col">
      <NavBar />
      {/* Main content wrapper with dynamic top padding */}
      <main
        className="flex-grow p-4 pt-16 overflow-hidden"
        style={{ marginTop: "64px" }}
      >
        {/* Grid Container with adjusted height */}
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Journal Dashboard Column */}
          <div className="col-span-2 rounded-md border-2 border-gray-900 p-6 overflow-y-auto h-full bg-white">
            <JournalDashboard />
          </div>
          {/* Journal Entry Form Column */}
          <div className="col-span-1 rounded-md border-2 border-gray-900 p-6 overflow-y-auto h-full bg-white">
            <JournalEntryForm />
          </div>
        </div>
      </main>
    </div>
  );
}
