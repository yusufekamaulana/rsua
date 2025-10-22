const totalIncidents = 120;

// === Jenis Kejadian ===
const KTD = 28;
const KTC = 34;
const KNC = 39;
const KPCS = 15;
const SENTINEL = 4;

// === Grading Risiko ===
const MERAH = 12;
const KUNING = 26;
const HIJAU = 63;
const BIRU = 19;

export default function KPI() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_5fr_4fr] md:gap-6">
      {/* === Kiri (3) === */}
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

      {/* === Tengah (5) — Jenis Kejadian === */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        {/* === Statistik Tengah === */}
        <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white/90">
            Jenis Kejadian
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
          {/* KTD */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KTD
            </p>
            <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90 sm:text-xl">
              {KTD}
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          {/* KTC */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KTC
            </p>
            <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90 sm:text-xl">
              {KTC}
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          {/* KNC */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KNC
            </p>
            <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90 sm:text-xl">
              {KNC}
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          {/* KPCS */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              KPCS
            </p>
            <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90 sm:text-xl">
              {KPCS}
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          {/* Sentinel */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Sentinel
            </p>
            <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90 sm:text-xl">
              {SENTINEL}
            </p>
          </div>
        </div>
      </div>

      {/* === Kanan (4) — Grading Risiko === */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white/90">
            Grading Risiko
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
          {/* Merah */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Merah
            </p>
            <p className="text-lg font-semibold text-center text-error-600 dark:text-error-500 sm:text-xl">
              {MERAH}
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          {/* Kuning */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Kuning
            </p>
            <p className="text-lg font-semibold text-center text-amber-600 dark:text-amber-500 sm:text-xl">
              {KUNING}
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          {/* Hijau */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Hijau
            </p>
            <p className="text-lg font-semibold text-center text-success-600 dark:text-success-500 sm:text-xl">
              {HIJAU}
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          {/* Biru */}
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Biru
            </p>
            <p className="text-lg font-semibold text-center text-sky-600 dark:text-sky-500 sm:text-xl">
              {BIRU}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
