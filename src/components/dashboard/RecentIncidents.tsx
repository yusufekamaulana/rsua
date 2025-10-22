import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// === Interface untuk data insiden ===
interface Incident {
  id: number;
  date: string;
  jenis_insiden: string;
  grading_risiko: "merah" | "kuning" | "hijau" | "biru";
}

// === Data contoh ===
const rawData: Incident[] = [
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
];

// === Utility: mapping warna Badge ===
const getBadgeColor = (grading: string): "success" | "error" | "warning" | "info" | undefined => {
  switch (grading.toLowerCase()) {
    case "merah":
      return "error";
    case "kuning":
      return "warning";
    case "hijau":
      return "success";
    case "biru":
      return "info";
    default:
      return undefined;
  }
};

export default function RecentIncidents() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {/* === Header Section === */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Kejadian Insiden Terbaru
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Daftar 10 insiden terakhir yang tercatat
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Lihat Semua
          </button>
        </div>
      </div>

      {/* === Table Section === */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tanggal Kejadian
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Jenis Insiden
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Grading Risiko
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rawData.slice(-10).reverse().map((insiden) => (
              <TableRow key={insiden.id}>
                <TableCell className="py-3 text-gray-800 text-theme-sm dark:text-white/90">
                  {new Date(insiden.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="py-3 text-gray-600 text-theme-sm dark:text-gray-300">
                  {insiden.jenis_insiden}
                </TableCell>
                <TableCell className="py-3 text-theme-sm">
                  <Badge size="sm" color={getBadgeColor(insiden.grading_risiko)}>
                    {insiden.grading_risiko.charAt(0).toUpperCase() +
                      insiden.grading_risiko.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
