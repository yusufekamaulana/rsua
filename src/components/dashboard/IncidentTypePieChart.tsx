import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function IncidentTypePieChart() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // === Data kategori insiden ===
  const data = [
    { label: "KTD", value: 40, color: "#EF4444" },
    { label: "KTC", value: 30, color: "#F59E0B" },
    { label: "KNC", value: 20, color: "#3B82F6" },
    { label: "KPCS", value: 10, color: "#10B981" },
    { label: "Sentinel", value: 5, color: "#8B5CF6" },
  ];
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* === Header === */}
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Distribusi Jenis Insiden
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Proporsi kategori keselamatan pasien
            </p>
          </div>

          {/* Dropdown (opsional) */}
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

        <div className="relative flex justify-center max-h-[230px] mt-2">
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
            slotProps={{
              legend: {sx: { display: 'none'}},
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0 px-6 py-0 sm:gap-8 sm:py-5">
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
