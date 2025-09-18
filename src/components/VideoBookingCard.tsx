"use client";
import React, { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { safeLocalStorage } from "@/lib/storage";

const DOCTORS = [
  { id: "int-kumar", name: "Dr. R. Kumar", specialty: "Internal Medicine", lang: ["en", "hi"], photo: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=600&auto=format&fit=crop" },
  { id: "ped-kaur", name: "Dr. S. Kaur", specialty: "Pediatrics", lang: ["en", "pa"], photo: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=600&auto=format&fit=crop" },
  { id: "gyn-sharma", name: "Dr. P. Sharma", specialty: "Gynecology", lang: ["en", "hi"], photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop" },
];

export default function VideoBookingCard() {
  const { t } = useLang();
  const [specialty, setSpecialty] = useState("Internal Medicine");
  const [doctorId, setDoctorId] = useState(DOCTORS[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const doctorsBySpec = useMemo(() => DOCTORS.filter((d) => d.specialty === specialty), [specialty]);

  const saveAppt = () => {
    const { get, set } = safeLocalStorage<any[]>("appointments", []);
    const list = get();
    const doc = DOCTORS.find((d) => d.id === doctorId)!;
    list.push({ id: `${Date.now()}`, doctor: doc.name, specialty, date, time, status: "scheduled" });
    set(list);
    alert("Appointment saved");
  };

  return (
    <div className="w-full rounded-lg border p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <img src="https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=1200&auto=format&fit=crop" alt="telemedicine" className="h-16 w-24 rounded object-cover" />
        <div>
          <div className="font-semibold">{t("book_consult")}</div>
          <div className="text-xs text-muted-foreground">Video • WebRTC</div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs mb-1">{t("choose_specialty")}</label>
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-background">
            {[...new Set(DOCTORS.map((d) => d.specialty))].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">{t("choose_doctor")}</label>
          <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-background">
            {doctorsBySpec.map((d) => (
              <option key={d.id} value={d.id}>{d.name} • {d.specialty}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">{t("date")}</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-background" />
        </div>
        <div>
          <label className="block text-xs mb-1">{t("time")}</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-background" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <a href="/consult" className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm">Start Call</a>
        <button onClick={saveAppt} className="rounded-md border px-4 py-2 text-sm">{t("schedule_appointment")}</button>
      </div>
    </div>
  );
}