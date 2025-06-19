import { LocationShareDetails } from "@/types";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapUpdater = ({
  position,
}: {
  position: [LocationShareDetails["lat"], LocationShareDetails["lon"]];
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return null;
};
