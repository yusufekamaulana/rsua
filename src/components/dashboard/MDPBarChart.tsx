import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function MDPBarChart() {
  const dropdown = useModal();
  const descModal = useModal();
  const downloadModal = useModal();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const data = [
    { code: "MDP 1", label: "Melakukan praktik keprofesian tidak kompeten", value: 12, date: "2025-01-12" },
    { code: "MDP 2", label: "Tidak merujuk pasien kepada tenaga medis kompeten", value: 7, date: "2025-01-18" },
    { code: "MDP 3", label: "Merujuk ke tenaga kesehatan tidak kompeten", value: 5, date: "2025-01-21" },
    { code: "MDP 4", label: "Mengabaikan tanggung jawab profesi", value: 8, date: "2025-02-02" },
    { code: "MDP 5", label: "Menghentikan kehamilan tanpa dasar hukum", value: 3, date: "2025-02-10" },
    { code: "MDP 6", label: "Penyalahgunaan kewenangan profesi", value: 9, date: "2025-02-20" },
    { code: "MDP 7", label: "Penyalahgunaan alkohol/obat terlarang", value: 4, date: "2025-02-28" },
    { code: "MDP 8", label: "Penipuan atau tidak memberi penjelasan memadai", value: 11, date: "2025-03-01" },
    { code: "MDP 9", label: "Membuka rahasia pasien tanpa pembenaran", value: 6, date: "2025-03-09" },
    { code: "MDP 10", label: "Perbuatan tidak patut/unsur seksual", value: 2, date: "2025-03-12" },
    { code: "MDP 11", label: "Menolak/menghentikan tindakan tanpa alasan", value: 4, date: "2025-03-18" },
    { code: "MDP 12", label: "Pemeriksaan atau pengobatan berlebihan", value: 10, date: "2025-03-25" },
    { code: "MDP 13", label: "Meresepkan obat yang tidak sesuai kebutuhan", value: 7, date: "2025-04-01" },
    { code: "MDP 14", label: "Tidak membuat atau menyimpan rekam medis", value: 9, date: "2025-04-09" },
    { code: "MDP 15", label: "Keterangan medis tanpa pemeriksaan", value: 5, date: "2025-04-15" },
    { code: "MDP 16", label: "Turut serta melakukan penyiksaan/kejam", value: 1, date: "2025-04-22" },
    { code: "MDP 17", label: "Mengiklankan diri/perang tarif", value: 3, date: "2025-04-30" },
  ];

  const filteredData = data.filter((item) => {
    if (startDate && item.date < startDate) return false;
    if (endDate && item.date > endDate) return false;
    return true;
  });

  const downloadCSV = () => {
    const rows = [["Kode", "Deskripsi", "Jumlah", "Tanggal"]];
    filteredData.forEach((d) => rows.push([d.code, d.label, d.value, d.date]));

    const csv = "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = encodeURI(csv);
    a.download = "mdp_data.csv";
    a.click();
  };

  const downloadExcel = async () => {
    const XLSX = await import("xlsx");

    const rows = [["Kode", "Deskripsi", "Jumlah", "Tanggal"]];
    filteredData.forEach((d) => rows.push([d.code, d.label, d.value, d.date]));

    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MDP Data");
    XLSX.writeFile(wb, "mdp_data.xlsx");
  };

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: { type: "bar", height: 260, toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { horizontal: false, columnWidth: "45%", borderRadius: 6, borderRadiusApplication: "end" } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories: data.map((d) => d.code),
      labels: { rotate: -45, style: { fontSize: "11px" } },
    },
    tooltip: {
      y: { formatter: (val) => `${val} kasus` },
      x: { formatter: (_, opts) => data[opts.dataPointIndex].label },
    },
    grid: { yaxis: { lines: { show: true } } },
  };

  const series = [{ name: "Jumlah", data: data.map((d) => d.value) }];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Distribusi MDP</h3>

        <button onClick={dropdown.openModal}>
          <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
        </button>

        <Dropdown isOpen={dropdown.isOpen} onClose={dropdown.closeModal} className="w-44 p-2">
          <DropdownItem
            onItemClick={() => {
              dropdown.closeModal();
              descModal.openModal();
            }}
            className="flex w-full text-left text-gray-500 dark:text-gray-400 dark:hover:bg-white/5"
          >
            Deskripsi
          </DropdownItem>

          <DropdownItem
            onItemClick={() => {
              dropdown.closeModal();
              downloadModal.openModal();
            }}
            className="flex w-full text-left text-gray-500 dark:text-gray-400 dark:hover:bg-white/5"
          >
            Download Data
          </DropdownItem>
        </Dropdown>
      </div>

      {/* CHART */}
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[800px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={260} />
        </div>
      </div>

      {/* ====================== */}
      {/* MODAL DESKRIPSI        */}
      {/* ====================== */}
      <Modal isOpen={descModal.isOpen} onClose={descModal.closeModal} className="max-w-[600px] m-4">
        <div className="rounded-3xl bg-white p-6 dark:bg-gray-900">
          <h4 className="text-xl font-semibold dark:text-white/90 mb-3">Deskripsi MDP</h4>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum sapien non nibh
            feugiat, sed malesuada turpis aliquet. Praesent euismod lorem sit amet sem suscipit auctor.
          </p>

          <div className="flex justify-end mt-6">
            <Button size="sm" variant="outline" onClick={descModal.closeModal}>
              Tutup
            </Button>
          </div>
        </div>
      </Modal>

      {/* ====================== */}
      {/* MODAL DOWNLOAD         */}
      {/* ====================== */}
      <Modal isOpen={downloadModal.isOpen} onClose={downloadModal.closeModal} className="max-w-[600px] m-4">
        <div className="rounded-3xl bg-white p-6 dark:bg-gray-900">
          <h4 className="text-xl font-semibold dark:text-white/90 mb-4">Download Data MDP</h4>

          {/* Filter tanggal */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Tanggal Awal</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div>
              <Label>Tanggal Akhir</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          {/* PREVIEW */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mt-4 text-sm">
            {filteredData.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">Tidak ada data dalam rentang tanggal.</p>
            )}

            {filteredData.map((d) => (
              <div key={d.code + d.date} className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>{d.code}</span>
                <span>{d.value}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={downloadModal.closeModal}>
              Batal
            </Button>

            <Button size="sm" onClick={downloadCSV}>
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
