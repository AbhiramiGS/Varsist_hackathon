"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import slugify from "slugify";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const MainMapCover = dynamic(() => import("~/components/MainMapCover"), {
  ssr: false,
});

const DashboardPage = () => {
  const springs = api.spring.findAllSprings.useQuery();
  const activeSensors = api.spring.noOfActiveSensors.useQuery();

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="w-full lg:w-1/2">
        {/* <Skeleton className="h-screen" /> */}
        <MainMapCover />
      </div>
      <div className="w-full p-4 lg:w-1/2">
        <div className="rounded border p-4 lg:w-full">
          <p>
            <span className="font-bold text-primary lg:text-4xl">
              All Springs
            </span>
          </p>
          <motion.div
              // initial={{ opacity: 0, scale: 0.5 }}
              // animate={{ opacity: 1, scale: 1 }}
              // transition={{
              //   duration: 0.8,
              //   delay: 0.5,
              //   ease: [0, 0.71, 0.2, 1.01],
              // }}
          >
            <div className="mt-6 lg:mt-8">
              {springs.data?.map((spring) => (
                <div
                  className="mb-2 items-center justify-between rounded border p-2 lg:flex"
                  key={spring.id}
                >
                  <p>{spring.name}</p>
                  <div>
                    <p>Total Number of Sensors: 9</p>
                    <p>
                      Active Sensors:{" "}
                      {activeSensors.data?.activeSensorCount
                        ? activeSensors.data.activeSensorCount
                        : "  0"}
                    </p>
                  </div>
                  <Link
                    href={`/spring/${slugify(spring.name, { lower: true })}`}
                  >
                    <div className="mt-5 flex items-center justify-center">
                      <Button>View</Button>
                    </div>
                  </Link>
                </div>
              ))}
              {/* <div className="items-center justify-between rounded border p-2 lg:flex">
                <p>Azhagar Hill SpringShed</p>
                <Link href={"/spring/azhagar-hill-springshed"}>
                  <div className="mt-5 flex items-center justify-center">
                    <Button>View</Button>
                  </div>
                </Link>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
