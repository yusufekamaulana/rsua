import { useState, useMemo, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ChevronDownIcon } from "../../icons";
import MultiSelect from "../form/MultiSelect";

function aggregateIncidents(
  data: any[],
  mode: "monthly" | "quarterly" | "yearly",
  categoryKey?: string,
  selectedFilter?: string[]
) {
  const grouped: Record<string, Record<string, number>> = {};
  data.forEach((d) => {
    const date = new Date(d.date);
    let periodKey = "";
    if (mode === "monthly") {
      periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    } else if (mode === "quarterly") {
      const q = Math.floor(date.getMonth() / 3) + 1;
      periodKey = `${date.getFullYear()}-Q${q}`;
    } else {
      periodKey = `${date.getFullYear()}`;
    }
    const cat = categoryKey ? d[categoryKey] : "Total";
    if (!grouped[cat]) grouped[cat] = {};
    grouped[cat][periodKey] = (grouped[cat][periodKey] || 0) + 1;
  });

  const allPeriods = Array.from(
    new Set(
      data.map((d) => {
        const date = new Date(d.date);
        if (mode === "monthly") return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        if (mode === "quarterly") return `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`;
        return `${date.getFullYear()}`;
      })
    )
  ).sort();

  const filteredKeys = selectedFilter?.length ? selectedFilter : Object.keys(grouped);
  const series = filteredKeys.map((cat) => ({
    name: cat,
    data: allPeriods.map((p) => grouped[cat]?.[p] || 0),
  }));
  return { categories: allPeriods, series };
}

export default function IncidentTrendChart() {
  const rawData = [
    { id: 1, date: "2023-01-14", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 2, date: "2023-02-28", jenis_insiden: "KTC", grading_risiko: "biru" },
    { id: 3, date: "2023-03-12", jenis_insiden: "KNC", grading_risiko: "hijau" },
    { id: 4, date: "2023-03-25", jenis_insiden: "KPCS", grading_risiko: "kuning" },
    { id: 5, date: "2023-04-10", jenis_insiden: "Sentinel", grading_risiko: "merah" },
    { id: 6, date: "2023-05-02", jenis_insiden: "KTD", grading_risiko: "hijau" },
    { id: 7, date: "2023-06-17", jenis_insiden: "KTC", grading_risiko: "kuning" },
    { id: 8, date: "2023-07-08", jenis_insiden: "KNC", grading_risiko: "biru" },
    { id: 9, date: "2023-07-26", jenis_insiden: "KPCS", grading_risiko: "merah" },
    { id: 10, date: "2023-08-14", jenis_insiden: "Sentinel", grading_risiko: "hijau" },
    { id: 11, date: "2023-09-09", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 12, date: "2023-10-20", jenis_insiden: "KTC", grading_risiko: "biru" },
    { id: 13, date: "2023-11-04", jenis_insiden: "KNC", grading_risiko: "merah" },
    { id: 14, date: "2023-11-25", jenis_insiden: "KPCS", grading_risiko: "kuning" },
    { id: 15, date: "2023-12-10", jenis_insiden: "Sentinel", grading_risiko: "hijau" },
    { id: 16, date: "2024-01-09", jenis_insiden: "KTD", grading_risiko: "merah" },
    { id: 17, date: "2024-02-05", jenis_insiden: "KTC", grading_risiko: "kuning" },
    { id: 18, date: "2024-02-28", jenis_insiden: "KNC", grading_risiko: "biru" },
    { id: 19, date: "2024-03-17", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 20, date: "2024-04-21", jenis_insiden: "Sentinel", grading_risiko: "merah" },
    { id: 21, date: "2024-05-03", jenis_insiden: "KTD", grading_risiko: "biru" },
    { id: 22, date: "2024-06-19", jenis_insiden: "KTC", grading_risiko: "kuning" },
    { id: 23, date: "2024-07-11", jenis_insiden: "KNC", grading_risiko: "hijau" },
    { id: 24, date: "2024-07-28", jenis_insiden: "KPCS", grading_risiko: "merah" },
    { id: 25, date: "2024-08-22", jenis_insiden: "Sentinel", grading_risiko: "kuning" },
    { id: 26, date: "2024-09-06", jenis_insiden: "KTD", grading_risiko: "hijau" },
    { id: 27, date: "2024-09-27", jenis_insiden: "KTC", grading_risiko: "biru" },
    { id: 28, date: "2024-10-10", jenis_insiden: "KNC", grading_risiko: "kuning" },
    { id: 29, date: "2024-10-29", jenis_insiden: "KPCS", grading_risiko: "merah" },
    { id: 30, date: "2024-11-15", jenis_insiden: "Sentinel", grading_risiko: "hijau" },
    { id: 31, date: "2024-12-01", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 32, date: "2024-12-21", jenis_insiden: "KTC", grading_risiko: "biru" },
    { id: 33, date: "2025-01-12", jenis_insiden: "KNC", grading_risiko: "merah" },
    { id: 34, date: "2025-01-30", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 35, date: "2025-02-14", jenis_insiden: "Sentinel", grading_risiko: "kuning" },
    { id: 36, date: "2025-03-07", jenis_insiden: "KTD", grading_risiko: "biru" },
    { id: 37, date: "2025-03-26", jenis_insiden: "KTC", grading_risiko: "merah" },
    { id: 38, date: "2025-04-08", jenis_insiden: "KNC", grading_risiko: "kuning" },
    { id: 39, date: "2025-04-30", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 40, date: "2025-05-13", jenis_insiden: "Sentinel", grading_risiko: "biru" },
    { id: 41, date: "2025-05-29", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 42, date: "2025-06-18", jenis_insiden: "KTC", grading_risiko: "merah" },
    { id: 43, date: "2025-07-03", jenis_insiden: "KNC", grading_risiko: "hijau" },
    { id: 44, date: "2025-07-19", jenis_insiden: "KPCS", grading_risiko: "kuning" },
    { id: 45, date: "2025-08-05", jenis_insiden: "Sentinel", grading_risiko: "biru" },
    { id: 46, date: "2025-08-28", jenis_insiden: "KTD", grading_risiko: "merah" },
    { id: 47, date: "2025-09-09", jenis_insiden: "KTC", grading_risiko: "kuning" },
    { id: 48, date: "2025-09-26", jenis_insiden: "KNC", grading_risiko: "biru" },
    { id: 49, date: "2025-10-10", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 50, date: "2025-10-29", jenis_insiden: "Sentinel", grading_risiko: "merah" },
    { id: 51, date: "2023-01-22", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 52, date: "2023-02-18", jenis_insiden: "KTC", grading_risiko: "hijau" },
    { id: 53, date: "2023-03-08", jenis_insiden: "KNC", grading_risiko: "biru" },
    { id: 54, date: "2023-03-30", jenis_insiden: "KPCS", grading_risiko: "merah" },
    { id: 55, date: "2023-04-18", jenis_insiden: "Sentinel", grading_risiko: "kuning" },
    { id: 56, date: "2023-05-06", jenis_insiden: "KTD", grading_risiko: "biru" },
    { id: 57, date: "2023-05-25", jenis_insiden: "KTC", grading_risiko: "kuning" },
    { id: 58, date: "2023-06-11", jenis_insiden: "KNC", grading_risiko: "merah" },
    { id: 59, date: "2023-07-05", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 60, date: "2023-07-29", jenis_insiden: "Sentinel", grading_risiko: "biru" },
    { id: 61, date: "2023-08-17", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 62, date: "2023-09-02", jenis_insiden: "KTC", grading_risiko: "merah" },
    { id: 63, date: "2023-09-26", jenis_insiden: "KNC", grading_risiko: "biru" },
    { id: 64, date: "2023-10-10", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 65, date: "2023-10-30", jenis_insiden: "Sentinel", grading_risiko: "kuning" },
    { id: 66, date: "2023-11-12", jenis_insiden: "KTD", grading_risiko: "merah" },
    { id: 67, date: "2023-11-27", jenis_insiden: "KTC", grading_risiko: "hijau" },
    { id: 68, date: "2023-12-15", jenis_insiden: "KNC", grading_risiko: "kuning" },
    { id: 69, date: "2023-12-29", jenis_insiden: "KPCS", grading_risiko: "biru" },
    { id: 70, date: "2024-01-20", jenis_insiden: "Sentinel", grading_risiko: "merah" },
    { id: 71, date: "2024-02-10", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 72, date: "2024-03-03", jenis_insiden: "KTC", grading_risiko: "biru" },
    { id: 73, date: "2024-03-21", jenis_insiden: "KNC", grading_risiko: "merah" },
    { id: 74, date: "2024-04-09", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 75, date: "2024-05-02", jenis_insiden: "Sentinel", grading_risiko: "kuning" },
    { id: 76, date: "2024-05-20", jenis_insiden: "KTD", grading_risiko: "biru" },
    { id: 77, date: "2024-06-08", jenis_insiden: "KTC", grading_risiko: "kuning" },
    { id: 78, date: "2024-06-26", jenis_insiden: "KNC", grading_risiko: "merah" },
    { id: 79, date: "2024-07-10", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 80, date: "2024-07-29", jenis_insiden: "Sentinel", grading_risiko: "biru" },
    { id: 81, date: "2024-08-18", jenis_insiden: "KTD", grading_risiko: "kuning" },
    { id: 82, date: "2024-09-02", jenis_insiden: "KTC", grading_risiko: "merah" },
    { id: 83, date: "2024-09-20", jenis_insiden: "KNC", grading_risiko: "kuning" },
    { id: 84, date: "2024-10-06", jenis_insiden: "KPCS", grading_risiko: "biru" },
    { id: 85, date: "2024-10-27", jenis_insiden: "Sentinel", grading_risiko: "hijau" },
    { id: 86, date: "2024-11-12", jenis_insiden: "KTD", grading_risiko: "merah" },
    { id: 87, date: "2024-11-30", jenis_insiden: "KTC", grading_risiko: "biru" },
    { id: 88, date: "2024-12-14", jenis_insiden: "KNC", grading_risiko: "kuning" },
    { id: 89, date: "2024-12-30", jenis_insiden: "KPCS", grading_risiko: "hijau" },
    { id: 90, date: "2025-01-15", jenis_insiden: "Sentinel", grading_risiko: "kuning" },
    { id: 91, date: "2025-02-03", jenis_insiden: "KTD", grading_risiko: "biru" },
    { id: 92, date: "2025-02-26", jenis_insiden: "KTC", grading_risiko: "merah" },
    { id: 93, date: "2025-03-12", jenis_insiden: "KNC", grading_risiko: "hijau" },
    { id: 94, date: "2025-03-28", jenis_insiden: "KPCS", grading_risiko: "kuning" },
    { id: 95, date: "2025-04-11", jenis_insiden: "Sentinel", grading_risiko: "biru" },
    { id: 96, date: "2025-04-27", jenis_insiden: "KTD", grading_risiko: "merah" },
    { id: 97, date: "2025-05-09", jenis_insiden: "KTC", grading_risiko: "hijau" },
    { id: 98, date: "2025-05-26", jenis_insiden: "KNC", grading_risiko: "kuning" },
    { id: 99, date: "2025-06-12", jenis_insiden: "KPCS", grading_risiko: "biru" },
    { id: 100, date: "2025-06-30", jenis_insiden: "Sentinel", grading_risiko: "merah" },
  ];


  const [viewMode, setViewMode] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [plotMode, setPlotMode] = useState<"umum" | "jenis" | "grading">("umum");
  const [filter, setFilter] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<{ plot: boolean; view: boolean }>({
    plot: false,
    view: false,
  });

  const jenisOptions = [
    { value: "KTD", text: "KTD" },
    { value: "KTC", text: "KTC" },
    { value: "KNC", text: "KNC" },
    { value: "KPCS", text: "KPCS" },
    { value: "Sentinel", text: "Sentinel" },
  ];
  const gradingOptions = [
    { value: "merah", text: "Merah" },
    { value: "kuning", text: "Kuning" },
    { value: "hijau", text: "Hijau" },
    { value: "biru", text: "Biru" },
  ];

  // 🧠 Default: semua aktif
  useEffect(() => {
    if (plotMode === "jenis") {
      setFilter(jenisOptions.map((o) => o.value));
    } else if (plotMode === "grading") {
      setFilter(gradingOptions.map((o) => o.value));
    } else {
      setFilter([]);
    }
  }, [plotMode]);

  const defaultOptions = plotMode === "jenis" ? jenisOptions : gradingOptions;

  const { categories, series } = useMemo(() => {
    if (plotMode === "jenis")
      return aggregateIncidents(rawData, viewMode, "jenis_insiden", filter);
    if (plotMode === "grading")
      return aggregateIncidents(rawData, viewMode, "grading_risiko", filter);
    return aggregateIncidents(rawData, viewMode);
  }, [plotMode, viewMode, filter]);

  const colors =
    plotMode === "grading"
      ? ["#EF4444", "#FACC15", "#10B981", "#3B82F6"]
      : plotMode === "jenis"
        ? ["#EF4444", "#F59E0B", "#3B82F6", "#10B981", "#8B5CF6"]
        : ["#465FFF", "#9CB9FF"];

  const options: ApexOptions = {
    legend: {
      show: plotMode !== "umum",
      position: "top",
      horizontalAlign: "left",
      labels: { colors: "#6B7280" },
    },
    colors,
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line", // ✅ ubah dari "area" ke "line"
      height: 310,
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2] },
    fill: { opacity: 1 },
    markers: { size: 4, strokeColors: "#fff", hover: { size: 6 } },
    grid: { xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val) => `${val} kejadian` } },
    xaxis: { categories, labels: { style: { fontSize: "12px", colors: "#6B7280" } } },
    yaxis: { labels: { style: { fontSize: "12px", colors: ["#6B7280"] } } },
  };

  const plotLabel =
    plotMode === "umum" ? "Total Insiden" : plotMode === "jenis" ? "Jenis Insiden" : "Grading Risiko";
  const viewLabel =
    viewMode === "monthly" ? "Bulanan" : viewMode === "quarterly" ? "Triwulan" : "Tahunan";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tren Jumlah Kejadian
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          {/* === Dropdown Plot Mode === */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((p) => ({ ...p, plot: !p.plot, view: false }))}
              className="flex items-center justify-between w-44 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              {plotLabel}
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </button>

            {dropdownOpen.plot && (
              <div className="absolute right-0 z-50 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700">
                {[
                  { key: "umum", label: "Total Insiden" },
                  { key: "jenis", label: "Jenis Insiden" },
                  { key: "grading", label: "Grading Risiko" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setPlotMode(item.key as any);
                      setDropdownOpen({ plot: false, view: false });
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm rounded-lg ${plotMode === item.key
                        ? "bg-brand-500 text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* === MultiSelect Filter === */}
          {(plotMode === "jenis" || plotMode === "grading") && (
            <div className="flex flex-wrap items-center gap-2 border border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <MultiSelect
                label=""
                options={defaultOptions}
                value={filter}
                onChange={(selected) =>
                  setFilter(
                    selected.length ? selected : defaultOptions.map((o) => o.value)
                  )
                }
                placeholder={`Semua ${plotMode === "jenis" ? "Jenis" : "Grading"}`}
                style={{
                  minWidth: "16rem",
                  width: "fit-content",
                }}
              />
            </div>
          )}
          {/* === Dropdown Periode === */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((p) => ({ ...p, view: !p.view, plot: false }))}
              className="flex items-center justify-between w-36 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              {viewLabel}
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </button>

            {dropdownOpen.view && (
              <div className="absolute right-0 z-50 mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700">
                {[
                  { key: "monthly", label: "Bulanan" },
                  { key: "quarterly", label: "Triwulan" },
                  { key: "yearly", label: "Tahunan" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setViewMode(item.key as any);
                      setDropdownOpen({ plot: false, view: false });
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm rounded-lg ${viewMode === item.key
                        ? "bg-brand-500 text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === Chart === */}
      <Chart options={options} series={series} type="line" height={310} />
    </div>
  );
}
