import AppLayout from "../components/layout/AppLayout";
import StatsGrid from "../components/dashboard/StatsGrid";
import FiltersBar from "../components/dashboard/FiltersBar";
import RecentItems from "../components/items/RecentItems";
import ItemCardsGrid from "../components/items/ItemCardsGrid";

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      {/* Top Stats */}
      <section>
        <StatsGrid />
      </section>

      {/* Filters / Actions */}
      <section className="mt-8">
        <FiltersBar />
      </section>

      {/* Recent Items */}
      <section className="mt-10">
        <h3 className="text-sm text-zinc-400 font-semibold mb-4 uppercase tracking-wide">
          Recent Items
        </h3>
        <RecentItems limit={4} />
      </section>

      {/* All Items */}
      <section className="mt-10">
        <h3 className="text-sm text-zinc-400 font-semibold mb-4 uppercase tracking-wide">
          All Items
        </h3>
        <ItemCardsGrid />
      </section>
    </AppLayout>
  );
};

export default Dashboard;
