import PageMeta from "../../components/common/PageMeta";
import IncidentTypePieChart from "../../components/dashboard/IncidentTypePieChart";
import SKPDistributionPieChart from "../../components/dashboard/SKPDistributionPieChart";
import MDPBarChart from "../../components/dashboard/MDPBarChart";
import IncidentTrendChart from "../../components/dashboard/IncidentLineChart";
import KPI from "../../components/dashboard/KPI";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Rumah Sakit Universitas Airlangga"
        description="Rumah Sakit Universitas Airlangga"
      />
      <h1 className="text-lg text-center font-bold mb-4 text-gray-800 dark:text-gray-100">
        Unit ICU
      </h1>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* KPI Section */}
        <div className="col-span-12 xl:col-span-12">
          <KPI />
        </div>

        {/* === Gabungan Pie Chart Responsif === */}
        <div className="col-span-12 xl:col-span-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-300">
            <h2 className="text-center text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Distribusi Insiden
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart 1 */}
              <div>
                <IncidentTypePieChart />
              </div>

              {/* Pie Chart 2 */}
              <div>
                <SKPDistributionPieChart />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Pie Chart 1 */}
              <div>
                <MDPBarChart />
              </div>
            </div>
          </div>
        </div>

        {/* === Line Chart === */}
        <div className="col-span-12 xl:col-span-12">
          <IncidentTrendChart />
        </div>
      </div>
    </>
  );
}
