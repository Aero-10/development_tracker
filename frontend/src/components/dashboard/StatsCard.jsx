// components/dashboard/StatsCard.jsx
export default function StatsCard({ title, count, icon }) {
  return (
    <div className="flex items-center p-6 bg-[#0F172A] rounded-2xl border border-white/10 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="text-2xl mr-4">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{count}</h3>
      </div>
    </div>
  );
}
