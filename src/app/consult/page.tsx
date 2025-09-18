"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { LanguageProvider, useLang } from "@/components/LanguageProvider";

function useLocalMedia() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const start = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      setCameraOn(true);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play().catch(() => {});
      }
    } catch (e: any) {
      setError(e?.message || "Failed to access camera/mic");
    }
  };

  const stop = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraOn(false);
  };

  const toggleMute = () => {
    const tracks = stream?.getAudioTracks() || [];
    tracks.forEach((t) => (t.enabled = !t.enabled));
    setMuted((m) => !m);
  };

  const toggleCamera = () => {
    const tracks = stream?.getVideoTracks() || [];
    const next = !cameraOn;
    tracks.forEach((t) => (t.enabled = next));
    setCameraOn(next);
  };

  return { videoRef, start, stop, toggleMute, toggleCamera, error, muted, cameraOn } as const;
}

function ConsultInner() {
  const { t } = useLang();
  const { videoRef, start, stop, toggleMute, toggleCamera, error, muted, cameraOn } = useLocalMedia();

  // Get simple doctor info if navigated from an appointment (optional enhancement)
  const doctor = useMemo(() => {
    if (typeof window === "undefined") return null as null | { name: string; specialty: string };
    try {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("doctor");
      const specialty = params.get("specialty");
      if (name && specialty) return { name, specialty };
    } catch {}
    return null;
  }, []);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="font-semibold">SehatConnect</a>
          <a href="/dashboard" className="rounded-md border px-3 py-1.5 text-sm">{t("dashboard")}</a>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-4 pb-16 sm:grid-cols-[2fr_1fr] sm:gap-8 sm:p-6">
        <section className="rounded-lg border p-4 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">Video Consultation</div>
              <div className="text-xs text-muted-foreground">WebRTC preview • device stays local</div>
            </div>
            <div className="text-[11px] text-muted-foreground">{t("low_bandwidth_tip")}</div>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/80">
            <video ref={videoRef} playsInline muted className={`h-full w-full object-cover ${!cameraOn ? "opacity-60" : "opacity-100"}`} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button onClick={start} className="rounded-md bg-foreground px-4 py-2 text-sm text-background">Start</button>
            <button onClick={stop} className="rounded-md border px-4 py-2 text-sm">Stop</button>
            <button onClick={toggleMute} className="rounded-md border px-4 py-2 text-sm">{muted ? "Unmute" : "Mute"}</button>
            <button onClick={toggleCamera} className="rounded-md border px-4 py-2 text-sm">{cameraOn ? "Camera Off" : "Camera On"}</button>
          </div>

          {error && <div className="mt-3 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}
        </section>

        <aside className="rounded-lg border p-4 sm:p-6">
          <div className="mb-3 text-sm font-semibold">Doctor</div>
          {doctor ? (
            <div className="rounded-md border p-3">
              <div className="font-medium">{doctor.name}</div>
              <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Join your scheduled call from Dashboard or Booking card.</div>
          )}

          <div className="mt-6 text-sm font-semibold">Call Tips</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
            <li>Use headphones to reduce echo.</li>
            <li>Move to an area with stable network.</li>
            <li>Keep camera steady and well-lit.</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default function ConsultPage() {
  return (
    <LanguageProvider>
      <ConsultInner />
    </LanguageProvider>
  );
}