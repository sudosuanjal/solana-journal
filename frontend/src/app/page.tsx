import JournalDashboard from "@/components/JournalDashboard";
import JournalEntry from "@/components/JournalEntry";
import NavBar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <JournalDashboard />
    </div>
  );
}
