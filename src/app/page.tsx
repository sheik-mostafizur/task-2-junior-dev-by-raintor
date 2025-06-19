"use client";

import { LocationReceiveArea, LocationSendArea } from "@/components";

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
