"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="m-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="m-6 flex w-full flex-col items-center justify-center"
      >
        <h1 className="inline-block bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-center text-5xl font-extrabold text-transparent ">
          Overview
        </h1>
        <p className="my-5 font-medium leading-7 mx-24 text-center text-lg">
          The human habitations in the mountainous regions of India are
          dominantly dependant on springs for drinking water, domestic usage and
          agricultural needs. Springs are the lifeline of water supplies for
          these regions. They have been called different names in different
          parts of India; “Zhara” in Maharashtra or “Jhora” in West Bengal,
          “Dhara” in Sikkim or “Naula” or “Baori” in Himachal Pradesh and
          Uttarakhand, “Kuiphir” in Mizoram or “Ephut” in Manipur, “Chhimik” in
          Leh-Ladakh and Jharna in Odisha. Springs also form important cultural
          and religious symbols for humans, with many spring sites being places
          of worship and prayer. Springs play a vital role in providing
          ecosystem services in the form of base flows, which feed many small
          and large rivers, sustain some of the important wetlands and help
          balance the dry season stocks in many lakes. Springs are points on the
          Earth’s surface through which groundwater emerges and flows. Most
          springs are discharged from aquifers, a system of rocks/rock material,
          which stores and transmits water to such springs and to wells.
        </p>
        <p className="my-5 font-medium leading-7 mx-24 text-center text-lg">
          Natural factors like climate and seismic activity affect spring
          discharge. Anthropogenic factors like increasing demand due to rise in
          resident population and surge in tourist inflow is putting huge
          pressures on mountain aquifer systems. Ecological degradation
          associated with land use – land cover change, especially for
          infrastructure development are shrinking the natural recharge areas of
          the springs and leading to deterioration in spring-water quality. It
          is reported that half of the perennial springs have already dried up
          or have become seasonal, resulting in acute water shortage for
          drinking and other domestic purposes, across hundreds of Himalayan
          villages. A continuing crisis of spring water depletion will
          consequently affect lives of millions of people in the mountains –
          both resident and visitors.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="m-6 flex w-full flex-col items-center justify-center"
      >
      <div className="flex items-center justify-center">
        <Image
          height="800"
          width="800"
          src="https://thespringsportal.org/wp-content/uploads/2020/01/20181009_040829914_iOS-1200x666.jpg"
          alt="spring"
        />
      </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="m-6 flex w-full flex-col items-center justify-center"
      >
        <h1 className="inline-block bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-center text-5xl font-extrabold text-transparent ">
          Springshed
        </h1>
        <p className="my-5 font-medium leading-7 mx-24 text-center text-lg">
          A majority of water conservation programs in the mountains have
          revolved around the concept of watersheds and watershed development,
          in the past. Watersheds are best described as the units of the land
          surface that drain water from the ridgeline to a common point into the
          valley through a system of interconnected stream channels. The
          watershed concept only accounts for surface water movement.
          Springsheds differ from watersheds because the source of spring water
          is determined by aquifer characteristics and not surface topography.
          Also, movement of spring water, which is groundwater, is determined by
          the underlying geology, that is, nature of rocks, their inclination
          and structure. The point where the spring emerges is based on the
          relationship of the aquifer to the watershed surface. A springshed is
          a set of watersheds and aquifers that integrate into a system that
          supplies water to a group of springs.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="m-6 flex w-full flex-col items-center justify-center"
      >
      <div className="flex items-center justify-center my-5">
        <Image
          height="1200"
          width="1200"
          src="https://thespringsportal.org/wp-content/uploads/2020/02/Screenshot-2020-02-22-at-7.57.22-AM-1200x440.png"
          alt="spring"
        />
      </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="m-6 flex w-full flex-col items-center justify-center"
      >
        <h1 className="inline-block bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-center text-5xl font-extrabold text-transparent ">Types of Springs</h1>
        <p className="my-5 font-medium leading-7 mx-24 text-center text-lg">
          Springs are fed by aquifers, a system of rocks/rock material, which
          stores and transmits water to such springs. Different rocks show
          different properties that are characteristic of the process of the
          formation of the rock. The extent of mountains aquifers, their
          geometry and hydrological parameters exhibit large variation
          influencing spring behavior. Recharge to the spring is governed by
          spring type, aquifer geometry and its properties. Geologically,
          springs are classified into five types.
        </p>
      </motion.div>
   </div>
  );
};

export default About;
