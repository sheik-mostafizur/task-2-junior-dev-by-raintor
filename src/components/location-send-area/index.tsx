import React, { useState } from "react";

import { useSignalR } from "@/hooks";
import { InputField, Button } from "@/components";
import { LocationShareDetails } from "@/types";

export const LocationSendArea = () => {
  const { sendLatLon } = useSignalR(() => {});

  const [formData, setFormData] = useState<LocationShareDetails>({
    lat: 23.765862819734288,
    lon: 88.94994130277657,
    userName: "sheikmostafizur2001@gmail.com",
  });

  const handleSubmit = () => {
    // we handle handle using react-form-hooks
    const isEmpty = Object.values(formData).some((v) => !v);

    if (isEmpty) {
      return alert("Please provide all values!");
    }

    sendLatLon(formData.lat, formData.lon, formData.userName);
  };

  return (
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
              id="userName"
              label="Username"
              placeholder="Enter username"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>
          <div>
            <Button onClick={handleSubmit}>Send Location</Button>
          </div>
        </div>

        <div className="mt-4">
          <p>📡 Send Location</p>
        </div>
      </div>
    </div>
  );
};
