"use client";
import React, { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";

// Mock inventory; in real app, fetch from API. Includes lat/lng for Nabha area.
const PHARMACIES = [
  { id: "sunrise", name: "Sunrise Pharmacy", area: "Nabha Main Bazar", meds: ["Paracetamol", "ORS", "Amoxicillin"], lat: 30.374, lng: 76.152 },
  { id: "carewell", name: "CareWell Medicos", area: "Bhadson Road", meds: ["Ibuprofen", "Cetirizine", "ORS"], lat: 30.373, lng: 76.155 },
  { id: "healthplus", name: "HealthPlus", area: "Sirhind Gate", meds: ["Metformin", "Amlodipine", "Paracetamol"], lat: 30.372, lng: 76.149 },
];

export default function MedicineAvailability() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Nabha");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PHARMACIES;
    return PHARMACIES.filter((p) => p.meds.some((m) => m.toLowerCase().includes(q)));
  }, [query]);

  return (
    <div className="w-full rounded-lg border p-4 sm:p-6">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === "en" ? "Search medicine (e.g., ORS)" : lang === "hi" ? "दवा खोजें (जैसे, ORS)" : "ਦਵਾਈ ਖੋਜੋ (ਜਿਵੇਂ, ORS)"}
          className="flex-1 rounded-md border px-3 py-2 text-sm bg-background"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={lang === "en" ? "Location" : lang === "hi" ? "स्थान" : "ਟਿਕਾਣਾ"}
          className="w-full sm:w-40 rounded-md border px-3 py-2 text-sm bg-background"
        />
      </div>
      <ul className="space-y-3">
        {results.map((p) => (
          <li key={p.id} className="rounded-md border p-3">
            <div className="font-medium">{p.name} • <span className="text-xs text-muted-foreground">{p.area}</span></div>
            <div className="mt-1 text-xs text-muted-foreground">{lang === "en" ? "Available:" : lang === "hi" ? "उपलब्ध:" : "ਉਪਲਬਧ:"} {p.meds.join(", ")}</div>
          </li>
        ))}
        {!results.length && (
          <li className="text-sm text-muted-foreground">{lang === "en" ? "No pharmacies found for this medicine." : lang === "hi" ? "इस दवा के लिए कोई फार्मेसी नहीं मिली।" : "ਇਸ ਦਵਾਈ ਲਈ ਕੋਈ ਫਾਰਮੇਸੀ ਨਹੀਂ ਮਿਲੀ।"}</li>
        )}
      </ul>
      <div className="mt-3 text-[11px] text-muted-foreground">{lang === "en" ? "Real-time inventory coming soon." : lang === "hi" ? "रियल-टाइम इन्वेंटरी जल्द ही।" : "ਰੀਅਲ-ਟਾਈਮ ਸਟਾਕ ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ।"}</div>
    </div>
  );
}