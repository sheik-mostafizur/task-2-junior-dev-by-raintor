import React, { useState } from "react";
import InputField from "../input-field";
import { useSignalR } from "@/hooks/useSignalR";

export const LocationSendArea = () => {
  const { sendLatLon } = useSignalR(() => {});
  const [formData, setFormData] = useState({
    lat: 23.765862819734288,
    lon: 88.94994130277657,
    username: "sheikmostafizur2001@gmail.com",
  });

  const handleSubmit = () => {
    const isEmpty = Object.values(formData).some((v) => !v);

    if (isEmpty) {
      return alert("Please provide all values!");
    }

    sendLatLon(formData.lat, formData.lon, formData.username);
  };

  return (
    <>
      <div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="lat"
                type="number"
                label="Latitude"
                placeholder="Enter latitude"
                value={formData.lat}
                onChange={(e) =>
                  setFormData({ ...formData, lat: Number(e.target.value) })
                }
              />
              <InputField
                id="lon"
                type="number"
                label="Longitude"
                placeholder="Enter longitude"
                value={formData.lon}
                onChange={(e) =>
                  setFormData({ ...formData, lon: Number(e.target.value) })
                }
              />
            </div>
            <div className="lg:grow">
              <InputField
                id="username"
                label="Username"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Send Location
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p>📡 Send Location</p>
          </div>
        </div>
      </div>
    </>
  );
};
