import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapUpdater = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
};
