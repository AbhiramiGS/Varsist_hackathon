"use client";

import useMapType from "~/hooks/use-map-type";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const SelectMapType = () => {
  const mapType = useMapType();

  return (
    <div className="flex items-center justify-between rounded border p-2">
      <div>
        <p className="text-sm font-medium">Map Type</p>
        <p className="text-xs text-gray-500">
          Select a map from the select option
        </p>
      </div>
      <Select
        value={mapType.mapType}
        onValueChange={(value) => {
          console.log(value);
          mapType.setMapType(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="Select a map"
            // defaultValue={"boundaryOfHill"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Maps</SelectLabel>
            <SelectItem value="boundaryOfHill">Boundary of Hill</SelectItem>
            <SelectItem value="contourMap2D">Contour Map 2D</SelectItem>
            <SelectItem value="contourMap2DImage">
              Contour Map 2D (Image)
            </SelectItem>
            <SelectItem value="rechargeArea">Recharge Area</SelectItem>
            <SelectItem value="waterShedMap">Water Shed Map</SelectItem>
            <SelectItem value="waterShedMapImage">
              Water Shed Map (Image)
            </SelectItem>
            <SelectItem value="topographyMapImage">
              Topography Map (Image)
            </SelectItem>
            <SelectItem value="hydrogeologicalMapImage">
              Hydro Geological Map (Image)
            </SelectItem>
            <SelectItem value="contourMap3D">Contour Map (3D)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMapType;
