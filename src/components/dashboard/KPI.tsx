import Alert from "../ui/alert/Alert";

export default function KPI() {
  const totalIncidents = 120;

  const KTD = 28;
  const KTC = 34;
  const KNC = 39;
  const KPCS = 15;
  const SENTINEL = 4;

  const currentRiskLevel: "rendah" | "moderat" | "tinggi" | "ekstrem" = "ekstrem";

  let variant: "success" | "warning" | "error" | "info" = "info";
  let title = "";
  let message = "";

  switch (currentRiskLevel) {
    case "rendah":
      variant = "info";
      title = "Risiko Rendah";
      message = "Kondisi saat ini berada pada tingkat risiko rendah.";
      break;
    case "moderat":
      variant = "success";
      title = "Risiko Moderat";
      message = "Kondisi saat ini berada pada tingkat risiko moderat.";
      break;
    case "tinggi":
      variant = "warning";
      title = "Risiko Tinggi";
      message = "Kondisi saat ini berada pada tingkat risiko tinggi.";
      break;
    case "ekstrem":
      variant = "error";
      title = "Risiko Ekstrem";
      message = "Kondisi saat ini berada pada tingkat risiko ekstrem.";
      break;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_5fr_5fr] md:gap-6">

      {/* === TOTAL INSIDEN === */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <div className="mt-4 space-y-2">
          <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white/90">
              Total Insiden
          </h3>
          <h4 className="text-3xl font-bold text-center text-gray-800 dark:text-white/90">
            {totalIncidents}
          </h4>
        </div>
      </div>

      {/* === JENIS KEJADIAN === */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white/90">
            Jenis Kejadian
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
          {/* KTD */}
          <div className="text-center">
            <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KTD
            </p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {KTD}
            </p>
          </div>

          <div className="hidden sm:block w-px h-7 bg-gray-200 dark:bg-gray-800"></div>

          {/* KTC */}
          <div className="text-center">
            <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KTC
            </p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {KTC}
            </p>
          </div>

          <div className="hidden sm:block w-px h-7 bg-gray-200 dark:bg-gray-800"></div>

          {/* KNC */}
          <div className="text-center">
            <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KNC
            </p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {KNC}
            </p>
          </div>

          <div className="hidden sm:block w-px h-7 bg-gray-200 dark:bg-gray-800"></div>

          {/* KPCS */}
          <div className="text-center">
            <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KPCS
            </p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {KPCS}
            </p>
          </div>

          <div className="hidden sm:block w-px h-7 bg-gray-200 dark:bg-gray-800"></div>

          {/* SENTINEL */}
          <div className="text-center">
            <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Sentinel
            </p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {SENTINEL}
            </p>
          </div>
        </div>
      </div>

      {/* === ALERT FULL SIZE TANPA CARD PUTIH === */}
      <Alert
        variant={variant}
        title={
          <span className="text-xl font-semibold block text-center">
            {title}
          </span>
        }
        message={
          <span className="text-base block text-center leading-relaxed">
            {message}
          </span>
        }
      />
    </div>
  );
}
