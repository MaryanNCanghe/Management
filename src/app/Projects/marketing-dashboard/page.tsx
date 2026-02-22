import MarketingKPIs from "./components/MarketingKPIs";
import CampaignTable from "./components/CampaignTable";
import MarketingFunnel from "./components/MarketingFunnel";
import TrafficSourcePie from "./components/TrafficSourcePie";
import ChannelPerformance from "./components/ChannelPerfomance";
import SummaryCards from "./components/SummaryCards.tsx";

export default function MarketingDashboard() {
  return (
    <main className="p-8">
<h1 className="text-3xl font-bold mb-6" style={{ color: "#fff" }}>
  Marketing Dashboard
</h1>

      <SummaryCards />

      <div className="mt-8">
        <MarketingKPIs />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ChannelPerformance />
        <TrafficSourcePie />
      </div>

      <div className="mt-8">
        <MarketingFunnel />
      </div>

      <div className="mt-8">
        <CampaignTable />
      </div>
    </main>
  );
}