"use client";

import React from "react";
import MapComponent from "./MapComponent";

const MapDisplay = () => {

  return (
    <div>
        <MapComponent
          kmlFile={
            "https://uploadthing.com/f/d1cddf44-880c-4b25-8bbc-89f1281b8457-17th2.kml"
          }
          zoom={13}
        />

    </div>
  );
};

export default MapDisplay;
