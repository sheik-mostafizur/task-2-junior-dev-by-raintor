"use client";
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

type LatLonData = {
  userName: string;
  lat: number;
  lon: number;
};

export const useSignalR = (onReceiveLatLon: (data: LatLonData) => void) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const handlerRef = useRef(onReceiveLatLon);

  useEffect(() => {
    handlerRef.current = onReceiveLatLon;
  }, [onReceiveLatLon]);

  useEffect(() => {
    const connect = async () => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://tech-test.raintor.com/Hub", {
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connection.on("ReceiveLatLon", (data: LatLonData) => {
        handlerRef.current(data);
      });

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

  const sendLatLon = (lat: number, lon: number, userName: string) => {
    connectionRef.current?.invoke("SendLatLon", lat, lon, userName);
  };

  return { sendLatLon };
};
