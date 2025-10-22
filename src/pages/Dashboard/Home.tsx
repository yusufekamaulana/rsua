import PageMeta from "../../components/common/PageMeta";
import IncidentTypePieChart from "../../components/dashboard/IncidentTypePieChart";
import RiskGradingPieChart from "../../components/dashboard/RiskPieChart";
import IncidentTrendChart from "../../components/dashboard/IncidentLineChart";
import KPI from "../../components/dashboard/KPI";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Rumah Sakit Universitas Airlanga"
        description="Rumah Sakit Universitas Airlanga"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
          <KPI />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <IncidentTypePieChart />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <RiskGradingPieChart />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <IncidentTrendChart />
        </div>
      </div>
    </>
  );
}
