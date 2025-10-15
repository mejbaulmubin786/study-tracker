import DataBackup from "../components/DataBackup";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">📚 My Dashboard</h1>
      {/* অন্যান্য কন্টেন্ট */}
      <DataBackup />
    </div>
  );
}
