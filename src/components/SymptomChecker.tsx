"use client";
import React, { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";

// Minimal, embedded knowledge base optimized for offline/low-bandwidth
const CONDITIONS = [
  { id: "fever", name: { en: "Fever", hi: "बुखार", pa: "ਬੁਖਾਰ" }, symptoms: ["fever", "chills", "body ache"], advice: { en: "Rest, fluids, paracetamol. Seek care if >3 days or very high.", hi: "आराम, तरल, पैरासिटामोल। 3 दिनों से अधिक या बहुत अधिक होने पर डॉक्टर से मिलें।", pa: "ਆਰਾਮ, ਤਰਲ, ਪੈਰਾਸੀਟਾਮੋਲ। 3 ਦਿਨ ਤੋਂ ਵੱਧ ਜਾਂ ਜ਼ਿਆਦਾ ਹੋਣ 'ਤੇ ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ।" } },
  { id: "diarrhea", name: { en: "Diarrhea", hi: "दस्त", pa: "ਦਸਤ" }, symptoms: ["loose stool", "stomach pain", "dehydration"], advice: { en: "ORS, clean water, avoid street food. Blood in stool -> clinic.", hi: "ओआरएस, साफ पानी, सड़क का खाना न खाएं। मल में खून हो तो क्लिनिक जाएँ।", pa: "ORS, ਸਾਫ਼ ਪਾਣੀ, ਬਾਹਰ ਦਾ ਖਾਣਾ ਤਿਆਗੋ। ਮਲ ਵਿਚ ਖੂਨ ਹੋਵੇ ਤਾਂ ਕਲੀਨਿਕ ਜਾਓ।" } },
  { id: "cough_cold", name: { en: "Cough/Cold", hi: "खांसी/जुकाम", pa: "ਖੰਘ/ਜ਼ੁਕਾਮ" }, symptoms: ["cough", "cold", "sore throat"], advice: { en: "Steam inhalation, warm fluids, honey. Breathing trouble -> urgent care.", hi: "भाप, गुनगुने तरल, शहद। सांस में तकलीफ हो तो तुरंत दिखाएँ।", pa: "ਭਾਫ਼, ਗੁੰਮ-ਗਰਮ ਤਰਲ, ਸ਼ਹਿਦ। ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਲ ਹੋਵੇ ਤਾਂ ਤੁਰੰਤ ਦਿਖਾਓ।" } },
  { id: "skin_infection", name: { en: "Skin Infection", hi: "त्वचा संक्रमण", pa: "ਚਮੜੀ ਦਾ ਇੰਫੈਕਸ਼ਨ" }, symptoms: ["itching", "rash", "pus"], advice: { en: "Keep area clean/dry. Topical antibiotic. Spreading/fever -> clinic.", hi: "क्षेत्र को साफ/सूखा रखें। एंटीबायोटिक क्रीम। फैलने/बुखार पर क्लिनिक जाएँ।", pa: "ਇਲਾਕਾ ਸਾਫ਼/ਸੁੱਕਾ ਰੱਖੋ। ਐਂਟੀਬਾਇਓਟਿਕ ਕ੍ਰੀਮ। ਫੈਲਣ/ਬੁਖਾਰ ਤੇ ਕਲੀਨਿਕ ਜਾਓ।" } },
];

export default function SymptomChecker() {
  const { lang } = useLang();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [] as typeof CONDITIONS;
    return CONDITIONS.filter((c) =>
      c.symptoms.some((sym) => sym.includes(s)) || c.name.en.toLowerCase().includes(s)
    ).slice(0, 5);
  }, [q]);

  return (
    <div className="w-full rounded-lg border p-4 sm:p-6">
      <div className="mb-3 text-sm text-muted-foreground">AI-lite • offline capable</div>
      <input
        aria-label="symptom-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={lang === "en" ? "Type a symptom (e.g., fever)" : lang === "hi" ? "लक्षण लिखें (जैसे, बुखार)" : "ਲੱਛਣ ਲਿਖੋ (ਜਿਵੇਂ, ਬੁਖਾਰ)"}
        className="w-full rounded-md border px-3 py-2 text-sm bg-background"
      />
      <ul className="mt-4 space-y-3">
        {results.map((c) => (
          <li key={c.id} className="rounded-md border p-3">
            <div className="font-medium">
              {lang === "en" ? c.name.en : lang === "hi" ? c.name.hi : c.name.pa}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {lang === "en" ? c.advice.en : lang === "hi" ? c.advice.hi : c.advice.pa}
            </div>
          </li>
        ))}
        {!results.length && q && (
          <li className="text-sm text-muted-foreground">{lang === "en" ? "No matches. Try simpler words." : lang === "hi" ? "कोई मेल नहीं। सरल शब्द आज़माएँ।" : "ਕੋਈ ਮੇਲ ਨਹੀਂ। ਸਧਾਰਨ ਸ਼ਬਦ ਵਰਤੋ।"}</li>
        )}
      </ul>
    </div>
  );
}