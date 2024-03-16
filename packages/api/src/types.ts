export interface Feature {
  type: string;
  properties: {
    name: string;
    styleHash: string;
    styleMapHash: {
      highlight: string;
      normal: string;
      fill?: string;
      "fill-opacity"?: string;
      stroke?: string;
      "stroke-opacity"?: string;
      "stroke-width"?: string;
    };
    styleUrl: string;
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
}

export interface KmlJSON {
  type: string;
  features: Feature[];
}

export type ReceivingAirData = Record<
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
  }
>;

export type ReceivingWaterData = Record<
  string,
  {
    DO: number;
    LATTITUDE: number;
    LONGITUDE: number;
    PH: number;
    TDS: number;
    TEMPERATURE: number;
    TURBIDITY: number;
  }
>;

export type ReceivingFlowData = Record<
  string,
  {
    FlowRate: number;
    TotalMillilitres: number;
  }
>;

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}
