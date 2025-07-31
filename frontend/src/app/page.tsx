import JournalDashboard from "@/components/JournalDashboard";
import JournalEntryForm from "@/components/JournalEntryForm";
import NavBar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Demo layout - you can switch between these views */}
      <div className="flex flex-col lg:flex-row gap-8 p-4">
        <div className="flex-1">
          <JournalDashboard />
        </div>
        <div className="flex-1">
          <JournalEntryForm />
        </div>
      </div>
    </div>
  );
}
