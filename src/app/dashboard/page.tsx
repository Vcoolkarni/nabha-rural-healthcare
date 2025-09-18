"use client";
import React, { useMemo, useState } from "react";
import { LanguageProvider, useLang } from "@/components/LanguageProvider";
import { safeLocalStorage } from "@/lib/storage";

function RecordsSection() {
  const { t } = useLang();
  const storage = safeLocalStorage<any[]>("records", []);
  const [records, setRecords] = useState(storage.get());
  const [note, setNote] = useState("");
  const [bp, setBp] = useState("");
  const [sugar, setSugar] = useState("");

  const add = () => {
    const item = { id: `${Date.now()}`, date: new Date().toISOString(), note, bp, sugar };
    const next = [...records, item];
    setRecords(next);
    storage.set(next);
    setNote("");
    setBp("");
    setSugar("");
  };

  return (
    <div className="rounded-lg border p-4 sm:p-6">
      <h2 className="text-base font-semibold">{t("dashboard")}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <input
          value={bp}
          onChange={(e) => setBp(e.target.value)}
          placeholder="BP (e.g., 120/80)"
          className="rounded-md border bg-background px-3 py-2 text-sm"
        />
        <input
          value={sugar}
          onChange={(e) => setSugar(e.target.value)}
          placeholder="Sugar (mg/dL)"
          className="rounded-md border bg-background px-3 py-2 text-sm"
        />
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Notes (symptoms, etc.)"
          className="rounded-md border bg-background px-3 py-2 text-sm"
        />
      </div>
      <button onClick={add} className="mt-3 rounded-md bg-foreground px-4 py-2 text-sm text-background">Save Record</button>

      <ul className="mt-4 space-y-3">
        {records.map((r) => (
          <li key={r.id} className="rounded-md border p-3 text-sm">
            <div className="font-medium">{new Date(r.date).toLocaleString()}</div>
            <div className="text-muted-foreground">BP: {r.bp || '-'} • Sugar: {r.sugar || '-'}</div>
            {r.note && <div className="mt-1">{r.note}</div>}
          </li>
        ))}
        {!records.length && <li className="text-sm text-muted-foreground">No records yet.</li>}
      </ul>
    </div>
  );
}

function PrescriptionsSection() {
  const storage = safeLocalStorage<any[]>("prescriptions", []);
  const [list, setList] = useState(storage.get());
  const [text, setText] = useState("");

  const add = () => {
    const item = { id: `${Date.now()}`, date: new Date().toISOString(), text };
    const next = [item, ...list];
    setList(next);
    storage.set(next);
    setText("");
  };

  return (
    <div className="rounded-lg border p-4 sm:p-6">
      <h3 className="font-medium">Prescriptions</h3>
      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Paracetamol 500mg, ORS"
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button onClick={add} className="rounded-md border px-3 py-2 text-sm">Add</button>
      </div>
      <ul className="mt-4 space-y-3">
        {list.map((p) => (
          <li key={p.id} className="rounded-md border p-3 text-sm">
            <div className="text-xs text-muted-foreground">{new Date(p.date).toLocaleString()}</div>
            <div>{p.text}</div>
          </li>
        ))}
        {!list.length && <li className="text-sm text-muted-foreground">No prescriptions yet.</li>}
      </ul>
    </div>
  );
}

function AppointmentsSection() {
  const storage = safeLocalStorage<any[]>("appointments", []);
  const [items, setItems] = useState(storage.get());

  const cancel = (id: string) => {
    const next = items.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a));
    setItems(next);
    storage.set(next);
  };

  return (
    <div className="rounded-lg border p-4 sm:p-6">
      <h3 className="font-medium">Appointments</h3>
      <ul className="mt-3 space-y-3">
        {items.map((a) => (
          <li key={a.id} className="rounded-md border p-3 text-sm">
            <div className="font-medium">{a.doctor} • {a.specialty}</div>
            <div className="text-xs text-muted-foreground">{a.date} {a.time} • {a.status}</div>
            <div className="mt-2 flex gap-2">
              <a href="/consult" className="rounded-md bg-foreground px-3 py-1.5 text-xs text-background">Join</a>
              {a.status !== "cancelled" && (
                <button onClick={() => cancel(a.id)} className="rounded-md border px-3 py-1.5 text-xs">Cancel</button>
              )}
            </div>
          </li>
        ))}
        {!items.length && <li className="text-sm text-muted-foreground">No appointments yet.</li>}
      </ul>
    </div>
  );
}

function DashboardInner() {
  const { t } = useLang();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="font-semibold">SehatConnect</a>
          <a href="/consult" className="rounded-md border px-3 py-1.5 text-sm">Start Consultation</a>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-4 pb-16 sm:grid-cols-2 sm:gap-8 sm:p-6">
        <RecordsSection />
        <AppointmentsSection />
        <div className="sm:col-span-2">
          <PrescriptionsSection />
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardInner />
    </LanguageProvider>
  );
}