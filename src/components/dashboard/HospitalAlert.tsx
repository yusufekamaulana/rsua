import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  InformationCircleIcon
} from "@heroicons/react/24/solid";

export default function HospitalAlert() {
  const hospitalRisk: "rendah" | "moderat" | "tinggi" | "ekstrem" = "ekstrem";

  const highRiskUnits: { name: string; level: "tinggi" | "ekstrem" }[] = [
    { name: "ICU", level: "tinggi" },
    { name: "IRNA 5 RSUA", level: "ekstrem" }
  ];

  const rekomendasiEkstrem =
    "Risiko ekstrem, dilakukan RCA paling lama 45 hari, membutuhkan tindakan segera, perhatian sampai ke Direktur.";

  // ====================================================================
  // === DEFINISI WARNA FLEKSIBEL UNTUK LIGHT & DARK MODE
  // ====================================================================
  const riskVisual = {
    rendah: {
      title: "Risiko Rendah",
      icon: <InformationCircleIcon className="w-12 h-12 text-blue-600 dark:text-blue-300" />,
      bg: "bg-blue-50 dark:bg-blue-900/30",
      text: "text-blue-800 dark:text-blue-200",
      border: "border-blue-300 dark:border-blue-700",
      showRekom: false
    },
    moderat: {
      title: "Risiko Moderat",
      icon: <ShieldCheckIcon className="w-12 h-12 text-green-600 dark:text-green-300" />,
      bg: "bg-green-50 dark:bg-green-900/30",
      text: "text-green-800 dark:text-green-200",
      border: "border-green-300 dark:border-green-700",
      showRekom: false
    },
    tinggi: {
      title: "Risiko Tinggi",
      icon: <ExclamationCircleIcon className="w-12 h-12 text-yellow-600 dark:text-yellow-300" />,
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
      text: "text-yellow-800 dark:text-yellow-200",
      border: "border-yellow-300 dark:border-yellow-700",
      showRekom: false
    },
    ekstrem: {
      title: "Risiko Ekstrem",
      icon: <ExclamationTriangleIcon className="w-12 h-12 text-red-600 dark:text-red-300" />,
      bg: "bg-red-50 dark:bg-red-900/30",
      text: "text-red-800 dark:text-red-200",
      border: "border-red-400 dark:border-red-700",
      showRekom: true
    }
  };

  const R = riskVisual[hospitalRisk];

  return (
    <div className="space-y-6">

      {/* ===================================================== */}
      {/* === ALERT UTAMA (RISK SPOTLIGHT)                    === */}
      {/* ===================================================== */}
      <div
        className={`
          rounded-2xl border p-6 shadow-md
          ${R.bg} ${R.text} ${R.border}
        `}
      >
        <div className="flex items-center gap-5">
          <div>{R.icon}</div>

          <div>
            <h2 className="text-2xl font-bold">{R.title}</h2>
            <p className="text-base mt-1 opacity-90">
              Kondisi keseluruhan rumah sakit saat ini berdasarkan insiden dan tren terbaru.
            </p>

            {R.showRekom && (
              <p className="mt-3 font-medium text-sm leading-relaxed opacity-90">
                {rekomendasiEkstrem}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* === DAFTAR UNIT RISIKO TINGGI / EKSTREM             === */}
      {/* ===================================================== */}

      {highRiskUnits.length > 0 && (
        <div className="rounded-xl border bg-white dark:bg-white/5 dark:border-gray-700 p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
            {highRiskUnits.length === 1
              ? "Unit dengan Risiko Serius"
              : "Unit-unit dengan Risiko Serius"}
          </h3>

          <div
            className={`
              grid gap-4
              ${
                highRiskUnits.length === 1
                  ? "grid-cols-1 place-items-center"
                  : highRiskUnits.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }
            `}
          >
            {highRiskUnits.map((unit) => {
              const isExtreme = unit.level === "ekstrem";

              return (
                <div
                  key={unit.name}
                  className={`
                    p-4 rounded-xl border shadow-sm text-center
                    ${
                      isExtreme
                        ? "bg-red-50 text-red-800 border-red-400 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700"
                        : "bg-yellow-50 text-yellow-800 border-yellow-400 dark:bg-yellow-900/40 dark:text-yellow-200 dark:border-yellow-700"
                    }
                  `}
                >
                  <p className="text-lg font-bold">{unit.name}</p>
                  <p className="text-sm opacity-80 capitalize">Risiko {unit.level}</p>

                  {isExtreme && (
                    <p className="text-xs mt-2 leading-relaxed opacity-90">
                      {rekomendasiEkstrem}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
