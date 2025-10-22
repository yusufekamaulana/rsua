import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function RiskGradingPieChart() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // === Data kategori grading risiko ===
  const data = [
    { label: "Merah", value: 25, color: "#EF4444" }, // High risk
    { label: "Kuning", value: 35, color: "#FACC15" }, // Moderate
    { label: "Hijau", value: 30, color: "#22C55E" }, // Low
    { label: "Biru", value: 10, color: "#3B82F6" }, // Minimal
  ];
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* === Header === */}
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Distribusi Grading Risiko
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Proporsi tingkat risiko insiden keselamatan pasien
            </p>
          </div>

          {/* Dropdown opsional */}
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Lihat Detail
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Export Data
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* === Chart === */}
        <div className="relative flex justify-center items-center mt-2">
          <PieChart
            width={230}
            height={230}
            series={[
              {
                data: data.map((d) => ({
                  label: d.label,
                  value: d.value,
                  color: d.color,
                })),
                innerRadius: 70,
                outerRadius: 110,
                paddingAngle: 4,
                cornerRadius: 3,
              },
            ]}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            slotProps={{
              legend: { sx: { display: 'none'} },
            }}
            sx={{
              "& .MuiChartsArcLabel-root": {
                fill: "#fff",
                fontSize: 11,
                fontWeight: 600,
              },
            }}
          />
        </div>
      </div>

      {/* === Legend bawah === */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0 px-6 py-2 sm:gap-8 sm:py-5">
        {data.map((item) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="inline-block w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  ({percentage}%)
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
