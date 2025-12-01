import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";

interface Incident {
  id: number;
  tanggal: string;
  nama: string;
  jenis_kelamin: "L" | "P";
  usia: number;
  jenis_insiden: "KTD" | "KTC" | "KNC" | "KPCS" | "Sentinel";
  grading_risiko: "merah" | "kuning" | "hijau" | "biru";
  keterangan: "Klasifikasi AI" | "Revisi Unit" | "Revisi Mutu";
  kronologi?: string;
}

const initialIncidents: Incident[] = [
  {
    id: 1,
    tanggal: "2025-10-10",
    nama: "Ny. Maria",
    jenis_kelamin: "P",
    usia: 54,
    jenis_insiden: "KTD",
    grading_risiko: "kuning",
    keterangan: "Klasifikasi AI",
  },
  {
    id: 2,
    tanggal: "2025-09-26",
    nama: "Tn. Budi",
    jenis_kelamin: "L",
    usia: 62,
    jenis_insiden: "KTC",
    grading_risiko: "merah",
    keterangan: "Revisi Unit",
  },
  {
    id: 3,
    tanggal: "2025-09-12",
    nama: "Ny. Sinta",
    jenis_kelamin: "P",
    usia: 41,
    jenis_insiden: "KNC",
    grading_risiko: "hijau",
    keterangan: "Revisi Mutu",
  },
  {
    id: 4,
    tanggal: "2025-08-30",
    nama: "Tn. Andi",
    jenis_kelamin: "L",
    usia: 36,
    jenis_insiden: "KPCS",
    grading_risiko: "biru",
    keterangan: "Revisi Unit",
  },
  {
    id: 5,
    tanggal: "2025-08-14",
    nama: "Ny. Rika",
    jenis_kelamin: "P",
    usia: 59,
    jenis_insiden: "Sentinel",
    grading_risiko: "merah",
    keterangan: "Klasifikasi AI",
  },
];

// Badge color helper
const getBadgeColor = (grading: string) => {
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
      return "info";  // fallback aman
  }
};


// Note color helper
const getNoteColor = (ket: string) => {
  if (ket === "Klasifikasi AI") return "info";
  if (ket === "Revisi Unit") return "warning";
  if (ket === "Revisi Mutu") return "error";
  return "info";  // fallback aman
};


export default function BasicTableOne() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);

  // Detail (READ-ONLY)
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Incident | null>(null);

  // Edit (layout sama dengan detail; hanya 2 field yang editable)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Incident | null>(null);
  const [editForm, setEditForm] = useState<
    Pick<Incident, "id" | "jenis_insiden" | "grading_risiko">
  >({ id: 0, jenis_insiden: "KTD", grading_risiko: "kuning" });

  // open/close
  const openDetail = (row: Incident) => {
    setSelected(row);
    setIsDetailOpen(true);
  };
  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelected(null);
  };

  const openEdit = (row: Incident) => {
    setEditTarget(row); // untuk render field lain (read-only)
    setEditForm({
      id: row.id,
      jenis_insiden: row.jenis_insiden,
      grading_risiko: row.grading_risiko,
    });
    setIsEditOpen(true);
  };
  const closeEdit = () => {
    setIsEditOpen(false);
    setEditTarget(null);
  };

  // lock scroll + esc
  useEffect(() => {
    const anyOpen = isDetailOpen || isEditOpen;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isEditOpen) closeEdit();
        else if (isDetailOpen) closeDetail();
      }
    };
    document.addEventListener("keydown", onKey);
    if (anyOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isDetailOpen, isEditOpen]);

  // edit handlers (2 field saja)
  const onChangeEdit = (
    field: "jenis_insiden" | "grading_risiko",
    value: Incident["jenis_insiden"] | Incident["grading_risiko"]
  ) => setEditForm((p) => ({ ...p, [field]: value as any }));

  const onSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setIncidents((prev) =>
      prev.map((it) =>
        it.id === editForm.id
          ? {
            ...it,
            jenis_insiden: editForm.jenis_insiden,
            grading_risiko: editForm.grading_risiko,
          }
          : it
      )
    );
    // sinkron dengan detail & editTarget bila sedang menampilkan item yang sama
    setSelected((s) =>
      s && s.id === editForm.id
        ? { ...s, jenis_insiden: editForm.jenis_insiden, grading_risiko: editForm.grading_risiko }
        : s
    );
    setEditTarget((t) =>
      t && t.id === editForm.id
        ? { ...t, jenis_insiden: editForm.jenis_insiden, grading_risiko: editForm.grading_risiko }
        : t
    );
    closeEdit();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* === Header === */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {[
                "Tanggal",
                "Nama",
                "Jenis Kelamin",
                "Usia",
                "Jenis Kejadian",
                "Grading Risiko",
                "Keterangan",
                "Aksi",
              ].map((head) => (
                <TableCell
                  key={head}
                  isHeader
                  className={`px-5 py-3 font-medium text-gray-500 ${head === "Aksi" ? "text-center" : "text-start"
                    } text-theme-xs dark:text-gray-400`}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* === Body === */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {incidents.map((row) => (
              <TableRow key={row.id}>
                {/* Tanggal */}
                <TableCell className="px-5 py-3 text-gray-700 dark:text-gray-200">
                  {new Date(row.tanggal).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                {/* Nama */}
                <TableCell className="text-gray-700 dark:text-gray-200">
                  {row.nama}
                </TableCell>

                {/* Jenis Kelamin */}
                <TableCell className="text-gray-700 dark:text-gray-200">
                  {row.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                </TableCell>

                {/* Usia */}
                <TableCell className="text-gray-700 dark:text-gray-200">
                  {row.usia} th
                </TableCell>

                {/* Jenis Kejadian */}
                <TableCell className="text-gray-700 dark:text-gray-200">
                  {row.jenis_insiden}
                </TableCell>

                {/* Grading Risiko */}
                <TableCell>
                  <Badge size="sm" color={getBadgeColor(row.grading_risiko)}>
                    {row.grading_risiko}
                  </Badge>
                </TableCell>

                {/* Keterangan */}
                <TableCell>
                  <Badge size="sm" color={getNoteColor(row.keterangan)}>
                    {row.keterangan}
                  </Badge>
                </TableCell>

                {/* Aksi */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => openDetail(row)}
                      className="inline-flex items-center rounded-md bg-brand-500 px-3 py-1 text-xs font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => openEdit(row)}
                      className="inline-flex items-center rounded-md border border-brand-500 px-3 py-1 text-xs font-medium text-brand-500 hover:bg-brand-50 dark:border-brand-400 dark:text-brand-300 dark:hover:bg-white/10"
                    >
                      Edit
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* ===== MODAL DETAIL (READ-ONLY, versi sebelumnya) ===== */}
      {isDetailOpen && selected && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeDetail} />
          <div className="relative mt-20 w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-white/10">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Detail Insiden #{selected.id}</h3>
              <button onClick={closeDetail} className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10">✕</button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <Label>Nama</Label>
                <Input type="text" value={selected.nama} disabled />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Jenis Kelamin</Label>
                  <Input type="text" value={selected.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"} disabled />
                </div>
                <div>
                  <Label>Usia</Label>
                  <Input type="text" value={`${selected.usia} tahun`} disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tanggal Kejadian</Label>
                  <Input
                    type="text"
                    value={new Date(selected.tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                    disabled
                  />
                </div>
                <div>
                  <Label>Jenis Kejadian</Label>
                  <Input type="text" value={selected.jenis_insiden} disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Grading Risiko</Label>
                  <Input type="text" value={selected.grading_risiko.toUpperCase()} disabled />
                </div>
                <div>
                  <Label>Keterangan</Label>
                  <Input type="text" value={selected.keterangan} disabled />
                </div>
              </div>

              <div>
                <Label>Kronologi</Label>
                <TextArea value={selected.kronologi ?? "Belum ada kronologi untuk insiden ini."} onChange={() => { }} disabled rows={4} />
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-100 px-6 py-4 dark:border-white/10">
              <button onClick={closeDetail} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-white/15 dark:bg-slate-900 dark:text-gray-200">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL EDIT (layout & isi mirip DETAIL, tapi: tanpa Keterangan; hanya 2 field editable) ===== */}
      {isEditOpen && editTarget && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeEdit} />
          <div className="relative mt-20 w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-white/10">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Edit Insiden #{editTarget.id}</h3>
              <button onClick={closeEdit} className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10">✕</button>
            </div>

            {/* Sama layout seperti detail: semua read-only kecuali 2 field di bawah */}
            <form onSubmit={onSubmitEdit} className="px-6 py-5 space-y-4">
              <div>
                <Label>Nama</Label>
                <Input type="text" value={editTarget.nama} disabled />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Jenis Kelamin</Label>
                  <Input type="text" value={editTarget.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"} disabled />
                </div>
                <div>
                  <Label>Usia</Label>
                  <Input type="text" value={`${editTarget.usia} tahun`} disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tanggal Kejadian</Label>
                  <Input
                    type="text"
                    value={new Date(editTarget.tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                    disabled
                  />
                </div>

                {/* EDITABLE #1 */}
                <div>
                  <Label>Jenis Kejadian</Label>
                  <select
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-white/15 dark:bg-slate-900"
                    value={editForm.jenis_insiden}
                    onChange={(e) => onChangeEdit("jenis_insiden", e.target.value as Incident["jenis_insiden"])}
                  >
                    <option value="KTD">KTD</option>
                    <option value="KTC">KTC</option>
                    <option value="KNC">KNC</option>
                    <option value="KPCS">KPCS</option>
                    <option value="Sentinel">Sentinel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* EDITABLE #2 */}
                <div>
                  <Label>Grading Risiko</Label>
                  <select
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-white/15 dark:bg-slate-900"
                    value={editForm.grading_risiko}
                    onChange={(e) => onChangeEdit("grading_risiko", e.target.value as Incident["grading_risiko"])}
                  >
                    <option value="merah">Merah</option>
                    <option value="kuning">Kuning</option>
                    <option value="hijau">Hijau</option>
                    <option value="biru">Biru</option>
                  </select>
                </div>

                {/* DIHILANGKAN: Keterangan (tidak ditampilkan di modal edit) */}
              </div>

              <div>
                <Label>Kronologi</Label>
                <TextArea value={editTarget.kronologi ?? "Belum ada kronologi untuk insiden ini."} onChange={() => { }} disabled rows={4} />
              </div>

              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 dark:border-white/10">
                <button type="button" onClick={closeEdit} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-white/15 dark:bg-slate-900 dark:text-gray-200">
                  Batal
                </button>
                <button type="submit" className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
