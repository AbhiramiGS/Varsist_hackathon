"use client";

import React from "react";
import MainMap from "./MainMap";

const MainMapCover = () => {
  return (
    <div>
      {/* {typeof window === "undefined" && ( */}
        <MainMap
          kmlFile="https://uploadthing.com/f/d3234524-4d5f-4576-96f5-8393ea6ce799-e8z5ql.kml"
          zoom={4}
        />
      {/* )} */}
    </div>
  );
};

export default MainMapCover;
