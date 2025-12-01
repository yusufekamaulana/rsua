import { useState, useMemo, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ChevronDownIcon } from "../../icons";
import MultiSelect from "../form/MultiSelect";

function getISOWeekKey(date: Date) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const year = tmp.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const weekNum = Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${year}-W${String(weekNum).padStart(2, "0")}`;
}

function generateFullWeekRange(minDate: Date, maxDate: Date) {
  const weeks: string[] = [];
  const start = new Date(minDate);
  const d = start.getDay();
  const offset = d === 0 ? -6 : 1 - d;
  start.setDate(start.getDate() + offset);

  const end = new Date(maxDate);
  const d2 = end.getDay();
  const offset2 = d2 === 0 ? 0 : 7 - d2;
  end.setDate(end.getDate() + offset2);

  const cursor = new Date(start);
  while (cursor <= end) {
    weeks.push(getISOWeekKey(cursor));
    cursor.setDate(cursor.getDate() + 7);
  }
  return weeks;
}

function aggregateIncidents(
  data: any[],
  mode: "weekly" | "monthly" | "quarterly" | "yearly",
  categoryKey?: string,
  selectedFilter?: string[],
  fullWeeks?: string[]
) {
  const grouped: Record<string, Record<string, number>> = {};

  data.forEach((d) => {
    const date = new Date(d.date);
    const key =
      mode === "weekly"
        ? getISOWeekKey(date)
        : mode === "monthly"
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        : mode === "quarterly"
        ? `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`
        : `${date.getFullYear()}`;

    const cat = categoryKey ? d[categoryKey] : "Total";
    if (!grouped[cat]) grouped[cat] = {};
    grouped[cat][key] = (grouped[cat][key] || 0) + 1;
  });

  const categories =
    mode === "weekly" && fullWeeks
      ? fullWeeks
      : Array.from(new Set(Object.values(grouped).flatMap((x) => Object.keys(x)))).sort();

  const selected = selectedFilter?.length ? selectedFilter : Object.keys(grouped);

  const series = selected.map((cat) => ({
    name: cat,
    data: categories.map((c) => grouped[cat]?.[c] || 0),
  }));

  return { categories, series };
}

function niceScale(maxValue: number) {
  if (maxValue <= 5) return { max: maxValue, step: 1 };
  const rough = maxValue / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const niceStep = Math.ceil(rough / mag) * mag;
  const niceMax = Math.ceil(maxValue / niceStep) * niceStep;
  return { max: niceMax, step: niceStep };
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
  ];

  const [viewMode, setViewMode] = useState<"weekly" | "monthly" | "quarterly" | "yearly">("monthly");
  const [plotMode, setPlotMode] = useState<"umum" | "jenis" | "grading">("umum");
  const [filter, setFilter] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState({ plot: false, view: false });
  const [windowSize, setWindowSize] = useState(52);

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

  useEffect(() => {
    if (plotMode === "jenis") setFilter(jenisOptions.map((o) => o.value));
    else if (plotMode === "grading") setFilter(gradingOptions.map((o) => o.value));
    else setFilter([]);
  }, [plotMode]);

  const { minDate, maxDate } = useMemo(() => {
    const dates = rawData.map((d) => new Date(d.date).getTime());
    return {
      minDate: new Date(Math.min(...dates)),
      maxDate: new Date(Math.max(...dates)),
    };
  }, [rawData]);

  const fullWeeks = useMemo(() => generateFullWeekRange(minDate, maxDate), [minDate, maxDate]);

  const { categories, series } = useMemo(() => {
    if (plotMode === "jenis")
      return aggregateIncidents(rawData, viewMode, "jenis_insiden", filter, fullWeeks);
    if (plotMode === "grading")
      return aggregateIncidents(rawData, viewMode, "grading_risiko", filter, fullWeeks);
    return aggregateIncidents(rawData, viewMode, undefined, undefined, fullWeeks);
  }, [rawData, plotMode, viewMode, filter, fullWeeks]);

  const { displayCategories, displaySeries } = useMemo(() => {
    const total = categories.length;
    const w = Math.min(windowSize, total);
    const end = total - 1;
    const start = Math.max(0, end - w + 1);
    const cats = categories.slice(start, end + 1);
    const ser = series.map((s) => ({
      name: s.name,
      data: s.data.slice(start, end + 1),
    }));
    return { displayCategories: cats, displaySeries: ser };
  }, [categories, series, windowSize]);

  const { maxY, stepY } = useMemo(() => {
    let m = 0;
    displaySeries.forEach((s) => s.data.forEach((v) => (v > m ? (m = v) : null)));
    const r = niceScale(Math.max(1, m));
    return { maxY: r.max, stepY: r.step };
  }, [displaySeries]);

  const intervalLabel =
    viewMode === "weekly"
      ? "minggu"
      : viewMode === "monthly"
        ? "bulan"
        : viewMode === "quarterly"
          ? "kuartal"
          : "tahun";

  // -------------------------
  // DARK MODE SUPPORT ONLY THIS PART
  // -------------------------
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const options: ApexOptions = {
    legend: {
      show: plotMode !== "umum",
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: isDark ? "#e5e7eb" : "#374151",
      },
    },
    colors:
      plotMode === "grading"
        ? ["#EF4444", "#FACC15", "#10B981", "#3B82F6"]
        : plotMode === "jenis"
          ? ["#EF4444", "#F59E0B", "#3B82F6", "#10B981", "#8B5CF6"]
          : ["#465FFF", "#9CB9FF"],
    chart: {
      type: "line",
      height: 310,
      toolbar: { show: false },
      background: "transparent",
      foreColor: isDark ? "#d1d5db" : "#374151",
    },
    stroke: { curve: "straight", width: 2 },
    markers: { size: 3 },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: { formatter: (v) => `${v} kejadian` },
    },
    grid: {
      borderColor: isDark ? "#4b5563" : "#e5e7eb",
    },
    xaxis: {
      categories: displayCategories,
      labels: {
        style: {
          fontSize: "12px",
          colors: isDark ? "#d1d5db" : "#374151",
        },
      },
    },
    yaxis: {
      min: 0,
      max: maxY,
      tickAmount: Math.floor(maxY / stepY),
      labels: {
        formatter: (v) => Math.round(v).toString(),
        style: {
          fontSize: "12px",
          colors: isDark ? "#d1d5db" : "#374151",
        },
      },
    },
  };
  // -------------------------

  const plotLabel =
    plotMode === "umum"
      ? "Total Insiden"
      : plotMode === "jenis"
        ? "Jenis Insiden"
        : "Grading Risiko";

  const viewLabel =
    viewMode === "weekly"
      ? "Mingguan"
      : viewMode === "monthly"
        ? "Bulanan"
        : viewMode === "quarterly"
          ? "Triwulan"
          : "Tahunan";

  return (
    <div className="rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-700 px-5 pb-5 pt-5"> 
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between sm:items-start">
        <h3 className="text-lg font-semibold dark:text-gray-100">Tren Jumlah Kejadian</h3>

        <div className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <div className="flex flex-wrap items-center gap-3">

            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => ({ ...p, plot: !p.plot, view: false }))}
                className="flex items-center justify-between w-44 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm dark:text-gray-100"
              >
                {plotLabel}
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </button>

              {dropdownOpen.plot && (
                <div className="absolute right-0 z-50 mt-1 w-44 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-xl shadow-lg">
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
                      className="block w-full px-4 py-2 text-left text-sm dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {(plotMode === "jenis" || plotMode === "grading") && (
              <MultiSelect
                options={plotMode === "jenis" ? jenisOptions : gradingOptions}
                value={filter}
                onChange={(sel) =>
                  setFilter(
                    sel.length
                      ? sel
                      : (plotMode === "jenis" ? jenisOptions : gradingOptions).map((o) => o.value)
                  )
                }
              />
            )}

            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => ({ ...p, view: !p.view, plot: false }))}
                className="flex items-center justify-between w-36 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm dark:text-gray-100"
              >
                {viewLabel}
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </button>

              {dropdownOpen.view && (
                <div className="absolute right-0 z-50 mt-1 w-36 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-xl shadow-lg">
                  {[
                    { key: "weekly", label: "Mingguan" },
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
                      className="block w-full px-4 py-2 text-left text-sm dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full sm:w-64 mt-2 sm:mt-0">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {windowSize} {intervalLabel} terakhir
              </span>
            </div>

            <input
              type="range"
              min={3}
              max={categories.length}
              value={windowSize}
              onChange={(e) => setWindowSize(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>
        </div>
      </div>

      <Chart options={options} series={displaySeries} type="line" height={310} />
    </div>
  );
}
