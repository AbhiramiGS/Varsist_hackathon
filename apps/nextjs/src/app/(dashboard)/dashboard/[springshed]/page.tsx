import MapDisplay from "~/components/MapDisplay";
import SpringDetails from "~/components/SpringDetails";
import { api } from "~/trpc/server";
import React from "react";
import slugify from "slugify";

interface Props {
  params: {
    springshed: string;
  };
}

const DashboardPage = async (props: Props) => {
  const springs = await api.spring.findAllSprings();

  let available = false;
  springs.map((spring) => {
    if (slugify(spring.name, { lower: true }) === props.params.springshed) {
      available = true;
      // springNow = spring;
    }
  });

  if (!available) {
    return (
      <div className="h-full w-full items-center justify-center">
        <div>
          <p className="text-4xl font-bold text-primary">
            This spring has not been mapped yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-8">
        <div className="mb-4">
          <p className="text-4xl font-bold text-primary">
            Azhagar Hill Springshed
          </p>
        </div>
        <div className="p-8">{/* <WeatherStation /> */}</div>
        <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <MapDisplay />
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <SpringDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
