"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import * as L from "leaflet"; // eslint-disable-line
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // GeoJSON,
  // CircleMarker,
} from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet-defaulticon-compatibility";
import useSpring from "~/hooks/use-spring";
import type { KmlJSON } from "~/types";
import { capitalizeAllCaseWords } from "~/lib/utils";

const MapComponent = ({ kmlFile, zoom }: { kmlFile: string, zoom: number }) => {
  const springStore = useSpring();
  const [kml, setKml] = React.useState<Document>();
  const [kmlJSON, setKmlJSON] = React.useState<KmlJSON>();

  useEffect(() => {
    async function fetchKml() {
      const parser = new DOMParser();
      const kmlFetch = await fetch(kmlFile);
      const kmlText = await kmlFetch.text();
      const kmlStuff = parser.parseFromString(kmlText, "text/xml");
      console.log("KML STUFF" , kmlStuff);
      setKml(kmlStuff);
      const resJS = await fetch("/api/kml", {
        method: "POST",
        body: JSON.stringify({
          kmlFile: kmlFile,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = (await resJS.json()) as KmlJSON;
      console.log("KML JSON", resJSON);
      setKmlJSON(resJSON);
    }
    fetchKml(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, []);

  return (
    <div className="rounded-md border">
      <MapContainer
        center={[10.11217445031641, 78.23546193193022]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-[400px] w-full rounded-md md:h-[700px]"
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          className="rounded-md"
        />
        {kml && <ReactLeafletKml kml={kml} />}
        {kmlJSON
          ? kmlJSON.features.map((feature, index) => {
              if (feature.geometry.type === "Polygon" || feature.geometry.type === "LineString") return;
              return (
                <Marker
                  position={[
                    feature.geometry.coordinates[1] as number,
                    feature.geometry.coordinates[0] as number,
                  ]}
                  key={index}
                >
                  <Popup>
                    <span className="text-lg font-bold">
                      {capitalizeAllCaseWords(feature.properties.name)}
                    </span>
                    <p>
                      ({feature.geometry.coordinates[1]},{" "}
                      {feature.geometry.coordinates[0]})
                    </p>
                    <Button
                      onClick={() => {
                        console.log("clicked");
                        springStore.addSpring(
                          feature.properties.name,
                          feature.geometry.coordinates[1] as number,
                          feature.geometry.coordinates[0] as number,
                        );
                      }}
                      className="mt-2 w-full"
                    >
                      See More
                    </Button>
                  </Popup>
                </Marker>
              );
            })
          : null}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
