import { get, ref } from "firebase/database";
import { z } from "zod";

import type { ReceivingAirData, ReceivingWaterData } from "../types";
import database from "../firebaseConfig";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { convertDateStringToDateObject } from "../utils";

export const aqRouter = createTRPCRouter({
  lastAirQualityRow: publicProcedure.query(({ ctx }) => {
    return ctx.db.airQuality.findFirst({
      orderBy: { createdAt: "desc" },
      where: {
        location: {
          latitude: 12.971033,
          longitude: 80.04125,
        },
      },
    });
  }),

  createAQReading: publicProcedure
    .input(
      z.object({
        acetone: z.number(),
        airQuality: z.string(),
        co: z.number(),
        co2: z.number(),
        ethanol: z.number(),
        nh4: z.number(),
        toluene: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.airQuality.create({
        data: {
          acetone: input.acetone,
          airQuality: input.airQuality,
          co: input.co,
          co2: input.co2,
          ethanol: input.ethanol,
          nh4: input.nh4,
          toluene: input.toluene,
          location: {
            connect: {
              id: 1,
            },
          },
        },
      });
    }),

  getTemperature: publicProcedure.query(async () => {
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
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const temperature: { date: string; temperature: number }[] = [];

    allData.map((data) => {
      temperature.push({
        date: data[0],
        temperature: data[1].Temperature,
      });
    });

    return temperature.slice(temperature.length - 10, temperature.length);
  }),

  getPH: publicProcedure.query(async () => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: [
      string,
      {
        PH: number;
      },
    ][] = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const ph: { date: string; ph: number }[] = [];

    allData.map((data) => {
      ph.push({
        date: data[0],
        ph: data[1].PH,
      });
    });

    return ph.slice(ph.length - 10, ph.length);
  }),

  getTurbidity: publicProcedure.query(async () => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: [
      string,
      {
        TURBIDITY: number;
      },
    ][] = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const turbidity: { date: string; turbidity: number }[] = [];

    allData.map((data) => {
      turbidity.push({
        date: data[0],
        turbidity: data[1].TURBIDITY,
      });
    });

    return turbidity.slice(turbidity.length - 10, turbidity.length);
  }),

  getTDS: publicProcedure.query(async () => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: [
      string,
      {
        TDS: number;
      },
    ][] = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const tds: { date: string; tds: number }[] = [];

    allData.map((data) => {
      tds.push({
        date: data[0],
        tds: data[1].TDS,
      });
    });

    return tds.slice(tds.length - 10, tds.length);
  }),

  getDO: publicProcedure.query(async () => {
    const wqRef = ref(database, "/WaterQualityResearch1");
    const snapshot = await get(wqRef);
    const allData: [
      string,
      {
        DO: number;
      },
    ][] = Object.entries(snapshot.val() as ReceivingWaterData).map(
      ([key, value]) => {
        return [key, value];
      },
    );
    console.log(" ==================== ");
    console.log("ALL DATA", allData);
    console.log(" ==================== ");

    const doValue: { date: string; do: number }[] = [];

    allData.map((data) => {
      doValue.push({
        date: data[0],
        do: data[1].DO,
      });
    });

    return doValue.slice(doValue.length - 10, doValue.length);
  }),

  getCurrentAcetone: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const acetoneValue: number = allData[allData.length - 1]?.[1]
      .Acetone as number;

    return acetoneValue;
  }),

  getCurrentCO: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const coValue: number = allData[allData.length - 1]?.[1].CO as number;

    return coValue;
  }),

  getCurrentCO2: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const co2Value: number = allData[allData.length - 1]?.[1].CO2 as number;

    return co2Value;
  }),

  getCurrentEthanol: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const ethanolValue: number = allData[allData.length - 1]?.[1]
      .Ethanol as number;

    return ethanolValue;
  }),

  getCurrentNH4: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const nh4Value: number = allData[allData.length - 1]?.[1].NH4 as number;

    return nh4Value;
  }),

  getCurrentToluene: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const tolueneValue: number = allData[allData.length - 1]?.[1]
      .Toluene as number;

    return tolueneValue;
  }),

  getCurrentTemperature: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const temperatureValue: number = allData[allData.length - 1]?.[1]
      .Temperature as number;

    return temperatureValue;
  }),

  getCurrentHumidity: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const humidityValue: number = allData[allData.length - 1]?.[1]
      .Humidity as number;

    return humidityValue;
  }),

  getCurrentHeatIndex: publicProcedure.query(async () => {
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

    // eslint-disable-next-line
    const heatIndexValue: number = allData[allData.length - 1]?.[1]
      .HeatIndex as number;

    return heatIndexValue;
  }),

  getCurrentAirQuality: publicProcedure.query(async () => {
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

    const airQualityValue = allData[allData.length - 1]?.[1];

    return {
      ...airQualityValue,
      date: convertDateStringToDateObject(
        allData[allData.length - 1]?.[0] ?? "",
      ),
    };
  }),
});
