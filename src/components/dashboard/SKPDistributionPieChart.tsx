import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function SKPDistributionPieChart() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Modal Deskripsi
  const {
    isOpen: isDescOpen,
    openModal: openDescModal,
    closeModal: closeDescModal,
  } = useModal();

  // Modal Download Data
  const {
    isOpen: isDownloadOpen,
    openModal: openDownloadModal,
    closeModal: closeDownloadModal,
  } = useModal();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // =========================
  // DATA SKP DISTRIBUSI
  // =========================
  const data = [
    { label: "SKP 1", value: 30, color: "#3B82F6", date: "2025-01-10" },
    { label: "SKP 2", value: 25, color: "#F59E0B", date: "2025-01-11" },
    { label: "SKP 3", value: 20, color: "#EF4444", date: "2025-01-12" },
    { label: "SKP 4", value: 10, color: "#10B981", date: "2025-01-13" },
    { label: "SKP 5", value: 10, color: "#8B5CF6", date: "2025-01-14" },
    { label: "SKP 6", value: 5, color: "#EAB308", date: "2025-01-15" },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const filteredData = data.filter((item) => {
    if (startDate && item.date < startDate) return false;
    if (endDate && item.date > endDate) return false;
    return true;
  });

  // =========================
  // DOWNLOAD CSV
  // =========================
  const downloadCSV = () => {
    const rows = [["SKP", "Jumlah", "Tanggal"]];
    filteredData.forEach((d) => rows.push([d.label, d.value, d.date]));

    const csv =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "skp_distribution.csv";
    link.click();
  };

  // =========================
  // DOWNLOAD EXCEL
  // =========================
  const downloadExcel = async () => {
    const rows = [["SKP", "Jumlah", "Tanggal"]];
    filteredData.forEach((d) => rows.push([d.label, d.value, d.date]));

    const XLSX = await import("xlsx");

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Distribusi SKP");
    XLSX.writeFile(workbook, "skp_distribution.xlsx");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">

      {/* HEADER */}
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Distribusi Sasaran Keselamatan Pasien
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Proporsi kategori Sasaran Keselamatan Pasien (SKP)
            </p>
          </div>

          {/* DROPDOWN */}
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>

            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-44 p-2">
              <DropdownItem
                onItemClick={() => {
                  closeDropdown();
                  openDescModal();
                }}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 
                hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Deskripsi
              </DropdownItem>

              <DropdownItem
                onItemClick={() => {
                  closeDropdown();
                  openDownloadModal();
                }}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 
                hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Download Data
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* PIE CHART */}
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
            slotProps={{ legend: { sx: { display: "none" } } }}
          />
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0 px-6 py-2 sm:gap-8 sm:py-5">
        {data.map((item) => {
          const pct = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="inline-block w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  ({pct}%)
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {/* ====================== */}
      {/* MODAL — DESKRIPSI     */}
      {/* ====================== */}
      <Modal isOpen={isDescOpen} onClose={closeDescModal} className="max-w-[600px] m-4">
        <div className="rounded-3xl bg-white p-6 dark:bg-gray-900">
          <h4 className="text-xl font-semibold dark:text-white/90 mb-3">
            Deskripsi Sasaran Keselamatan Pasien
          </h4>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Sasaran Keselamatan Pasien (SKP) terdiri atas enam tujuan utama:
            identifikasi pasien, komunikasi efektif, keamanan obat,
            keselamatan prosedur operasi, pencegahan infeksi, dan pencegahan jatuh.
            Grafik ini menampilkan proporsi masing-masing SKP berdasarkan jumlah insiden.
          </p>

          <div className="flex justify-end mt-6">
            <Button size="sm" variant="outline" onClick={closeDescModal}>
              Tutup
            </Button>
          </div>
        </div>
      </Modal>

      {/* =========================== */}
      {/* MODAL — DOWNLOAD DATA       */}
      {/* =========================== */}
      <Modal isOpen={isDownloadOpen} onClose={closeDownloadModal} className="max-w-[600px] m-4">
        <div className="rounded-3xl bg-white p-6 dark:bg-gray-900">
          <h4 className="text-xl font-semibold dark:text-white/90 mb-4">
            Download Data SKP
          </h4>

          {/* Input tanggal */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Tanggal Awal</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <Label>Tanggal Akhir</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mt-4 text-sm">
            {filteredData.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">
                Tidak ada data dalam rentang tanggal.
              </p>
            )}

            {filteredData.map((d) => (
              <div
                key={d.label + d.date}
                className="flex justify-between text-gray-700 dark:text-gray-300"
              >
                <span>{d.label}</span>
                <span>{d.value}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={downloadCSV}>
              Download CSV
            </Button>

            <Button size="sm" onClick={downloadExcel}>
              Download Excel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
