import { get, ref } from "firebase/database";
import { z } from "zod";

import type {
  ReceivingAirData,
  ReceivingFlowData,
  ReceivingWaterData,
} from "../types";
import database from "../firebaseConfig";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { convertDateStringToDateObject } from "../utils";

export const springRouter = createTRPCRouter({
  findAllAdminPanel: publicProcedure.query(async () => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: [
      string,
      {
        TEMPERATURE: number;
        TURBIDITY: number;
        PH: number;
        DO: number;
        TDS: number;
        LATTITUDE: number;
        LONGITUDE: number;
      },
    ][] = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );

    const values: {
      temperature: number;
      turbidity: number;
      ph: number;
      dissolved_oxygen: number;
      water_flow: number;
    }[] = [];

    allData.map((data) => {
      values.push({
        temperature: data[1].TEMPERATURE < 0 ? 21.4 : data[1].TEMPERATURE,
        turbidity: data[1].TURBIDITY,
        ph: data[1].PH,
        dissolved_oxygen: data[1].DO < 0 ? 7.14 : data[1].DO,
        water_flow: data[1].TDS,
      });
    });

    return values;
  }),
  findAllPh: publicProcedure.query(() => {
    return [
      {
        date: "2023-01-01",
        pH: 6.2,
      },

      {
        date: "2023-01-01",
        pH: 5.7,
      },

      {
        date: "2023-01-01",
        pH: 7.1,
      },

      { date: "2023-01-01", pH: 6.8 },

      { date: "2023-01-01", pH: 5.5 },

      { date: "2023-01-01", pH: 7.5 },

      { date: "2023-01-02", pH: 6.3 },

      { date: "2023-01-02", pH: 5.9 },

      { date: "2023-01-02", pH: 7.8 },

      { date: "2023-01-02", pH: 6.6 },
    ];
  }),
  findAllTurbidity: publicProcedure.query(() => {
    return [
      {
        date: "2023-01-01",
        turbidity: 250,
      },

      {
        date: "2023-01-01",
        turbidity: 320,
      },

      {
        date: "2023-01-01",
        turbidity: 275,
      },

      { date: "2023-01-01", turbidity: 333 },

      { date: "2023-01-01", turbidity: 350 },

      { date: "2023-01-01", turbidity: 268 },

      { date: "2023-01-02", turbidity: 291 },

      { date: "2023-01-02", turbidity: 321 },

      { date: "2023-01-02", turbidity: 299 },

      { date: "2023-01-02", turbidity: 346 },
    ];
  }),
  findAllTemperature: publicProcedure.query(() => {
    return [
      {
        date: "2023-01-01",
        temperature: 18,
      },

      {
        date: "2023-01-01",
        temperature: 18,
      },

      {
        date: "2023-01-01",
        temperature: 19,
      },

      { date: "2023-01-01", temperature: 23 },

      { date: "2023-01-01", temperature: 33 },

      { date: "2023-01-01", temperature: 28 },

      { date: "2023-01-02", temperature: 30 },

      { date: "2023-01-02", temperature: 25 },

      { date: "2023-01-02", temperature: 24 },

      { date: "2023-01-02", temperature: 34 },
    ];
  }),
  findAllDO: publicProcedure.query(() => {
    return [
      {
        date: "2023-01-01",
        dissolved_oxygen: 6,
      },

      {
        date: "2023-01-01",
        dissolved_oxygen: 9.1,
      },

      {
        date: "2023-01-01",
        dissolved_oxygen: 7.8,
      },

      { date: "2023-01-01", dissolved_oxygen: 5.6 },

      { date: "2023-01-01", dissolved_oxygen: 8.8 },

      { date: "2023-01-01", dissolved_oxygen: 6.0 },

      { date: "2023-01-02", dissolved_oxygen: 5.2 },

      { date: "2023-01-02", dissolved_oxygen: 7.7 },

      { date: "2023-01-02", dissolved_oxygen: 8.3 },

      { date: "2023-01-02", dissolved_oxygen: 6.6 },
    ];
  }),
  findAllWaterFlow: publicProcedure.query(() => {
    return [
      {
        date: "2023-01-01",
        water_flow: 250,
      },

      {
        date: "2023-01-01",
        water_flow: 320,
      },

      {
        date: "2023-01-01",
        water_flow: 275,
      },

      { date: "2023-01-01", water_flow: 333 },

      { date: "2023-01-01", water_flow: 350 },

      { date: "2023-01-01", water_flow: 268 },

      { date: "2023-01-02", water_flow: 291 },

      { date: "2023-01-02", water_flow: 321 },

      { date: "2023-01-02", water_flow: 299 },

      { date: "2023-01-02", water_flow: 346 },
    ];
  }),

  findAllSprings: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.springShed.findMany();
  }),

  findSpringByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.springShed.findFirst({
        where: {
          name: input.name,
        },
      });
    }),

  noOfActiveSensors: publicProcedure.query(async () => {
    const aqRef = ref(database, "/MQ135&Temp");
    const snapshot = await get(aqRef);
    const allData: [
      string,
      {
        Acetone: number;
        AirQuality: string;
        CO: number;
        CO2: number;
        Ethanol: number;
        HeatIndex: number;
        Humidity: number;
        NH4: number;
        Temperature: number;
        Toluene: number;
      },
    ][] = Object.entries(snapshot.val() as ReceivingAirData).map(
      ([key, value]) => {
        return [key, value];
      },
    );

    const latestTimestamp = allData[allData.length - 1]?.[0];

    const latestDateObj = convertDateStringToDateObject(latestTimestamp ?? "");

    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot2 = await get(wqRef);
    const allData2: [
      string,
      {
        TEMPERATURE: number;
        TURBIDITY: number;
        PH: number;
        DO: number;
        TDS: number;
        LATTITUDE: number;
        LONGITUDE: number;
      },
    ][] = Object.entries(snapshot2.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );

    const latestTimestamp2 = allData2[allData2.length - 1]?.[0];

    const latestDateObj2 = convertDateStringToDateObject(
      latestTimestamp2 ?? "",
    );

    //  if the latest timestamp of the air quality is at max 5 minutes old
    //  and the latest timestamp of the water quality is at max 5 minutes old
    //  then the sensor is active

    const isAirQualityActive =
      new Date().getTime() - latestDateObj.getTime() <= 5 * 60 * 1000;

    const isWaterQualityActive =
      new Date().getTime() - latestDateObj2.getTime() <= 5 * 60 * 1000;

    const flowRef = ref(database, "/FlowRateMachine");
    const snapshot3 = await get(flowRef);
    const allData3: [
      string,
      {
        FlowRate: number;
        TotalMillilitres: number;
      },
    ][] = Object.entries(snapshot3.val() as ReceivingFlowData).map(
      ([key, value]) => {
        return [key, value];
      },
    );

    const latestTimestamp3 = allData3[allData3.length - 1]?.[0];

    const latestDateObj3 = convertDateStringToDateObject(
      latestTimestamp3 ?? "",
    );

    const isFlowRateActive =
      new Date().getTime() - latestDateObj3.getTime() <= 5 * 60 * 1000;

    let countOfSensors = 0;
    if (isAirQualityActive) {
      countOfSensors += 2;
    }
    if (isWaterQualityActive) {
      countOfSensors += 6;
    }
    if (isFlowRateActive) {
      countOfSensors += 1;
    }

    return {
      activeSensorCount: countOfSensors,
    };
  }),
});