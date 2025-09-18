"use client";
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { isBrowser } from "@/lib/storage";

export type Lang = "en" | "hi" | "pa";

type Dict = Record<string, { en: string; hi: string; pa: string }>;

const dict: Dict = {
  app_name: { en: "SehatConnect", hi: "सेहतकनेक्ट", pa: "ਸਿਹਤਕਨੈਕਟ" },
  tagline: {
    en: "Telemedicine for rural India",
    hi: "ग्रामीण भारत के लिए टेलीमेडिसिन",
    pa: "ਪੇਂਡੂ ਭਾਰਤ ਲਈ ਟੈਲੀਮੇਡਿਸਿਨ",
  },
  book_consult: { en: "Book Consultation", hi: "परामर्श बुक करें", pa: "ਸਲਾਹ-ਮਸ਼ਵਰਾ ਬੁੱਕ ਕਰੋ" },
  symptom_checker: { en: "Symptom Checker", hi: "लक्षण जाँच", pa: "ਲੱਛਣ ਚੈੱਕਰ" },
  medicine_availability: { en: "Medicine Availability", hi: "दवा उपलब्धता", pa: "ਦਵਾਈ ਉਪਲਬਧਤਾ" },
  dashboard: { en: "Patient Dashboard", hi: "रोगी डैशबोर्ड", pa: "ਮਰੀਜ਼ ਡੈਸ਼ਬੋਰਡ" },
  language: { en: "Language", hi: "भाषा", pa: "ਭਾਸ਼ਾ" },
  search: { en: "Search", hi: "खोजें", pa: "ਖੋਜੋ" },
  view_dashboard: { en: "View Dashboard", hi: "डैशबोर्ड देखें", pa: "ਡੈਸ਼ਬੋਰਡ ਵੇਖੋ" },
  low_bandwidth_tip: { en: "Low-bandwidth mode enabled", hi: "कम-बैंडविड्थ मोड सक्षम", pa: "ਘੱਟ-ਬੈਂਡਵਿਡਥ ਮੋਡ ਸਹੀ" },
  choose_specialty: { en: "Choose specialty", hi: "विशेषज्ञता चुनें", pa: "ਵਿਸ਼ੇਸ਼ਤਾ ਚੁਣੋ" },
  choose_doctor: { en: "Choose doctor", hi: "डॉक्टर चुनें", pa: "ਡਾਕਟਰ ਚੁਣੋ" },
  schedule_appointment: { en: "Schedule Appointment", hi: "अपॉइंटमेंट शेड्यूल करें", pa: "ਮੁਲਾਕਾਤ ਸ਼ਡਿਊਲ ਕਰੋ" },
  date: { en: "Date", hi: "तारीख", pa: "ਤਾਰੀਖ" },
  time: { en: "Time", hi: "समय", pa: "ਸਮਾਂ" },
  save: { en: "Save", hi: "सेव करें", pa: "ਸੇਵ ਕਰੋ" },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict[k].en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (!isBrowser) return "en";
    return (localStorage.getItem("lang") as Lang) || "en";
  });

  useEffect(() => {
    if (isBrowser) localStorage.setItem("lang", lang);
  }, [lang]);

  const t = useMemo(() => (key: keyof typeof dict) => dict[key][lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}