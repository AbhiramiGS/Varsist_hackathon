import {
    createTRPCRouter,
    publicProcedure,
  } from "../trpc";
  import { get, ref } from "firebase/database";
  import database from "../firebaseConfig";
  import type { ReceivingWaterData } from "../types";
  
  export const wqRouter = createTRPCRouter({
    lastWaterQualityRow: publicProcedure.query(({ ctx }) => {
      return ctx.db.waterQuality.findFirst({
        orderBy: { createdAt: "desc" },
        where: {
          location: {
            latitude: 12.971033,
            longitude: 80.04125,
          },
        },
      });
    }),
  
    getTemperature: publicProcedure.query(async () => {
      const aqRef = ref(database, "/MQ135&Temp");
      const snapshot = await get(aqRef);
      const allData: 
        [
          string,
          {
            TEMPERATURE: number;
          },
        ][]
       = Object.entries(snapshot.val() as ReceivingWaterData).map(
        ([key, value]) => {
          return [key, value];
        },
      );
      
      
      
  
      const temperature: { date: string; temperature: number }[] = [];
  
      allData.map((data) => {
        temperature.push({
          date: data[0],
          temperature: data[1].TEMPERATURE < 0 ? 21.4 : data[1].TEMPERATURE,
        });
      });
  
      return temperature;
    }),
  
    getPH: publicProcedure.query(async () => {
      const wqRef = ref(database, "/WaterQualityResearch1");
      const snapshot = await get(wqRef);
      const allData: 
        [
          string,
          {
            PH: number;
          },
        ][]
       = Object.entries(snapshot.val() as ReceivingWaterData).map(
        ([key, value]) => {
          return [key, value];
        },
      );
      
      
      
  
      const ph: { date: string; ph: number }[] = [];
  
      allData.map((data) => {
        ph.push({
          date: data[0],
          ph: data[1].PH,
        });
      });
  
      return ph;
    }),
  
    getTurbidity: publicProcedure.query(async () => {
      const wqRef = ref(database, "/WaterQualityResearch1");
      const snapshot = await get(wqRef);
      const allData: 
        [
          string,
          {
            TURBIDITY: number;
          },
        ][]
       = Object.entries(snapshot.val() as ReceivingWaterData).map(
        ([key, value]) => {
          return [key, value];
        },
      );
      
      
      
  
      const turbidity: { date: string; turbidity: number }[] = [];
  
      allData.map((data) => {
        turbidity.push({
          date: data[0],
          turbidity: data[1].TURBIDITY,
        });
      });
  
      return turbidity;
    }),
  
    getTDS: publicProcedure.query(async () => {
      const wqRef = ref(database, "/WaterQualityResearch1");
      const snapshot = await get(wqRef);
      const allData: 
        [
          string,
          {
            TDS: number;
          },
        ][]
       = Object.entries(snapshot.val() as ReceivingWaterData).map(
        ([key, value]) => {
          return [key, value];
        },
      );
      
      
      
  
      const tds: { date: string; tds: number }[] = [];
  
      allData.map((data) => {
        tds.push({
          date: data[0],
          tds: data[1].TDS,
        });
      });
  
      return tds;
    }),
  
    getDO: publicProcedure.query(async () => {
      const wqRef = ref(database, "/WaterQualityResearch1");
      const snapshot = await get(wqRef);
      const allData: 
        [
          string,
          {
            DO: number;
          },
        ][]
       = Object.entries(snapshot.val() as ReceivingWaterData).map(
        ([key, value]) => {
          return [key, value];
        },
      );
      
      
      
  
      const doValue: { date: string; do: number }[] = [];
  
      allData.map((data) => {
        doValue.push({
          date: data[0],
          do: data[1].DO < 0 ? 7.14 : data[1].DO,
        });
      });
  
      return doValue;
    }),
  
    getCurrentWaterQuality: publicProcedure.query(async () => {
      const wqRef = ref(database, "/WaterQualityResearch1");
      const snapshot = await get(wqRef);
      const allData: 
        [
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
        ][]
       = Object.entries(snapshot.val() as ReceivingWaterData).map(
        ([key, value]) => {
          return [key, value];
        },
      );
  
      const waterQualityValue = allData[allData.length - 1]?.[1];
  
      return {
        TEMPERATURE:
          Number(waterQualityValue?.TEMPERATURE) < 0
            ? 21.4
            : waterQualityValue?.TEMPERATURE ?? 0,
        TURBIDITY: waterQualityValue?.TURBIDITY ?? 0,
        PH: waterQualityValue?.PH ?? 0,
        DO: Number(waterQualityValue?.DO) < 0 ? 7.14 : waterQualityValue?.DO ?? 0,
        TDS: waterQualityValue?.TDS ?? 0,
        LATTITUDE: waterQualityValue?.LATTITUDE ?? 0,
        LONGITUDE: waterQualityValue?.LONGITUDE ?? 0,
      };
    }),
  });