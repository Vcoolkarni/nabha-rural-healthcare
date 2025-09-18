"use client";
import React from "react";
import { LanguageProvider, useLang } from "@/components/LanguageProvider";
import SymptomChecker from "@/components/SymptomChecker";
import MedicineAvailability from "@/components/MedicineAvailability";
import VideoBookingCard from "@/components/VideoBookingCard";

function LangSelector() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t("language")}:</span>
      <select
        aria-label="language-selector"
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
        className="rounded-md border bg-background px-2 py-1 text-sm"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
      </select>
    </div>
  );
}

function HomeInner() {
  const { t } = useLang();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1584036561584-b03c19da874c?q=80&w=240&auto=format&fit=crop"
              alt="logo"
              className="h-8 w-8 rounded"
            />
            <div>
              <div className="font-semibold leading-none">SehatConnect</div>
              <div className="text-xs text-muted-foreground">{t("tagline")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LangSelector />
            <a
              href="/dashboard"
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-transform transition-shadow duration-200 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("view_dashboard")}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-4 pb-16 sm:gap-8 sm:p-6">
        <section className="grid gap-4 md:grid-cols-2">
          <VideoBookingCard />

          <div className="rounded-lg border p-4 sm:p-6">
            <div className="mb-2 text-sm text-muted-foreground">Nabha • Punjab</div>
            <h2 className="text-base font-semibold">{t("symptom_checker")}</h2>
            <div className="mt-3">
              <SymptomChecker />
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold">{t("medicine_availability")}</h2>
          <MedicineAvailability />
        </section>

        {/* Illustrations section */}
        <section className="rounded-lg border p-4 sm:p-6">
          <h3 className="text-base font-semibold">Healthcare around you</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Nearby hospitals, pharmacies, and maps to help you navigate care.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="group overflow-hidden rounded-lg border bg-card p-3">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/07bc09ee-0be9-4175-a935-a40eb51406d7/generated_images/clean-flat-2d-vector-illustration-of-a-s-d516fef3-20250918095153.jpg?"
                alt="Medical store illustration"
                className="h-40 w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="mt-2 text-sm font-medium">Medical Store</div>
            </div>
            <div className="group overflow-hidden rounded-lg border bg-card p-3">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/07bc09ee-0be9-4175-a935-a40eb51406d7/generated_images/clean-flat-2d-vector-illustration-of-a-h-28cc40ee-20250918095159.jpg?"
                alt="Hospital illustration"
                className="h-40 w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="mt-2 text-sm font-medium">Hospital</div>
            </div>
            <div className="group overflow-hidden rounded-lg border bg-card p-3">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/07bc09ee-0be9-4175-a935-a40eb51406d7/generated_images/clean-flat-2d-vector-illustration-of-a-s-0d7e4df7-20250918095206.jpg?"
                alt="Map/location illustration"
                className="h-40 w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="mt-2 text-sm font-medium">Maps & Directions</div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border p-4 sm:p-6">
          <h3 className="font-medium">{t("dashboard")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Access your records offline, view prescriptions, and appointment history.
          </p>
          <div className="mt-3">
            <a
              href="/dashboard"
              className="inline-flex items-center rounded-md border border-primary px-3 py-1.5 text-sm text-primary transition-transform transition-shadow duration-200 hover:bg-primary/10 hover:shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("view_dashboard")}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SehatConnect • Built for rural telemedicine.
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomeInner />
    </LanguageProvider>
  );
}