import React, { useEffect, useRef } from "react";

import { useState } from "react";
import { useSignalR } from "@/hooks/useSignalR";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { MapUpdater } from "./map-updater";

export const LocationReceiveArea = () => {
  const [position, setPosition] = useState<[number, number]>([
    25.73736, 90.36447,
  ]);
  const [userName, setUserName] = useState("Default");

  const onReceive = (data: { lat: number; lon: number; userName: string }) => {
    setPosition([data.lat, data.lon]);
    setUserName(data.userName);
  };

  useSignalR(onReceive);

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position);
    }
  }, [position]);
  return (
    <>
      <div className="my-4 md:my-8">
        <h2 className="text-2xl font-bold mb-4">
          🛰️ User: {userName} - Receiving Location
        </h2>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <MapUpdater position={position} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={position}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              📍 {userName}
              <br />
              Lat: {position[0]} <br /> Lon: {position[1]}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};
