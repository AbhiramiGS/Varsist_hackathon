"use client";
import React from "react";
import { Button } from "~/components/ui/button";
// import { Nav } from "@/components/header/Menu";
// import ParticleBackground from "@/components/ParticleBackground";
// import Globe from "../spline/Globe";
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardPage from "../home/Dashboard";

const HomePage = () => {
  return (
    <div >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="hidden md:flex main-area w-full flex-col items-center justify-center"
      >
        <div className="flex justify-center">
          <h1 className="inline-block bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-center text-xl md:text-6xl font-extrabold text-transparent">
            Spring Shed Management <br /> of the new age
          </h1>
        </div>
        <div className="hidden md:flex mx-72 mb-5 mt-6 justify-center text-lg ">
          <p className="hidden md:flex items-center text-center leading-8 subpixel-antialiased">
            Explore and monitor the health of springsheds with our comprehensive
            management dashboard. Gain insights into current water levels,
            weather conditions, and historical trends to make informed decisions
            for sustainable water spring resource management. Stay informed
            about alerts and utilize powerful analytics tools for effective
            springshed conservation.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="md:hidden p-5 w-full flex-col items-center justify-center"
      >
        <div className="flex justify-center">
          <h1 className="inline-block bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-center text-xl md:text-6xl font-extrabold text-transparent">
            Spring Shed Management <br /> of the new age
          </h1>
        </div>
        <div className="md:hidden m-5">
        <p className="md:hidden py-6 flex items-center text-center text-xs subpixel-antialiased">
            Explore and monitor the health of springsheds with our comprehensive
            management dashboard. Gain insights into current water levels,
            weather conditions, and historical trends to make informed decisions
            for sustainable water spring resource management. Stay informed
            about alerts and utilize powerful analytics tools for effective
            springshed conservation.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="w-full"
      >
        <p className="hidden md:flex items-center justify-center text-center lg:text-4xl font-bold leading-8 subpixel-antialiased">
          All the data at your fingertips
        </p>
        <DashboardPage />
      </motion.div>

      {/* <div className="ml-52 flex flex-row justify-between  text-lg">
        <div className="mr-32 flex items-center justify-center">
          <Globe />
        </div>

        <div className="mx-20 my-10 flex flex-col items-center justify-center">
          <p className="flex items-center text-center leading-8 subpixel-antialiased">
            "Discover the heart of our springshed management initiative by
            exploring the interactive map on the next page. Visualize the
            geographical distribution of springs, assess water quality, and
            access essential details for effective management. From flow rates
            to environmental impact, this map provides a comprehensive overview
            of our springshed ecosystem. Click the button below to navigate to
            the map and gain valuable insights that will empower your
            decision-making in sustainable water resource management."
          </p>
          <div className="m-3">
            <Link href={"/main"}>
              <Button variant="outline">View Map</Button>
            </Link>
          </div>
        </div>
      </div> */}

      <div className="hidden md:flex flex-col items-center justify-center py-12">
        <p className="flex items-center justify-center text-center lg:text-4xl font-bold leading-8 subpixel-antialiased">
          Go to dashboard
        </p>
        {/* <div className="flex items-center justify-center">
          <Globe />
        </div> */}
        <div className="m-3">
          <Link href={"/dashboard"}>
            <Button >
              <p>View All</p>
            </Button>
          </Link>
        </div>
      </div>
      <div className="md:hidden flex flex-col items-center justify-center ">
        <p className="flex items-center justify-center text-center lg:text-4xl font-bold  subpixel-antialiased">
          Go to dashboard
        </p>
        {/* <div className="flex items-center justify-center">
          <Globe />
        </div> */}
        <div className="m-3">
          <Link href={"/dashboard"}>
            <Button >
              <p>View All</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
