"use client";

import dynamic from "next/dynamic";

const LocationReceiveArea = dynamic(
  () =>
    import("@/components/location-receive-area").then(
      (mod) => mod.LocationReceiveArea
    ),
  { ssr: false }
);

const LocationSendArea = dynamic(
  () =>
    import("@/components/location-send-area").then(
      (mod) => mod.LocationSendArea
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <section>
        <header>
          <h1 className="text-3xl font-bold text-center mb-4">
            🌍 Real-Time Location Sharing
          </h1>
        </header>
        <LocationSendArea />
      </section>
      <LocationReceiveArea />
    </main>
  );
}
