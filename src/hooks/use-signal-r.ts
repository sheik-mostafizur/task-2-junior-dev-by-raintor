"use client";

import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

import { socketEventNames } from "@/constant";
import { LocationShareDetails } from "@/types";
import { defaultValues } from "@/configs";

export const useSignalR = (
  onReceiveLatLon: (data: LocationShareDetails) => void
) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const handlerRef = useRef(onReceiveLatLon);

  useEffect(() => {
    handlerRef.current = onReceiveLatLon;
  }, [onReceiveLatLon]);

  useEffect(() => {
    const connect = async () => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(defaultValues.backendUrl, {
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connection.on(
        socketEventNames.receiveLatLon,
        (data: LocationShareDetails) => {
          handlerRef.current(data);
        }
      );

      try {
        await connection.start();
      } catch (err) {
        console.error("Connection failed:", err);
      }

      connectionRef.current = connection;
    };

    connect();

    return () => {
      connectionRef.current?.stop();
    };
  }, []);

  const sendLatLon = (
    lat: LocationShareDetails["lat"],
    lon: LocationShareDetails["lon"],
    userName: LocationShareDetails["userName"]
  ) => {
    connectionRef.current?.invoke(
      socketEventNames.sendLatLon,
      lat,
      lon,
      userName
    );
  };

  return { sendLatLon };
};
