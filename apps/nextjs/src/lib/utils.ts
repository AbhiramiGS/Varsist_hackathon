import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeAllCaseWords(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function convertDateStringToDateObject(dateString: string) {
  // Split the date and time parts
  // Split the date and time parts
  const [datePart, timePart] = dateString.split(" ");

  // Split the date into year, month, and day
  const [year, month, day] = datePart!.split("-").map(Number);

  // Split the time into hours, minutes, and seconds
  const [hours, minutes, seconds] = timePart!.split(":").map(Number);

  // Create a new Date object in GMT
  const dateObjectGMT = new Date(
    Date.UTC(year!, month! - 1, day, hours, minutes, seconds),
  );

  // Convert to IST using toLocaleString with options
  const options = { timeZone: "Asia/Kolkata" };
  const dateObjectIST = new Date(
    dateObjectGMT.toLocaleString("en-US", options),
  );

  return dateObjectIST;
}
