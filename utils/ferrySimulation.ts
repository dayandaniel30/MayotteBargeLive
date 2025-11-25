import { TERMINALS } from "./schedules";

export interface FerryPosition {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  direction: "dzaoudzi-mamoudzou" | "mamoudzou-dzaoudzi";
  progress: number;
  departureTime: string;
  arrivalTime: string;
}

export function calculateFerryPosition(
  progress: number,
  direction: "dzaoudzi-mamoudzou" | "mamoudzou-dzaoudzi"
): { latitude: number; longitude: number } {
  const start =
    direction === "dzaoudzi-mamoudzou"
      ? TERMINALS.DZAOUDZI.coordinates
      : TERMINALS.MAMOUDZOU.coordinates;

  const end =
    direction === "dzaoudzi-mamoudzou"
      ? TERMINALS.MAMOUDZOU.coordinates
      : TERMINALS.DZAOUDZI.coordinates;

  const latitude = start.latitude + (end.latitude - start.latitude) * progress;
  const longitude = start.longitude + (end.longitude - start.longitude) * progress;

  return { latitude, longitude };
}

export function getSimulatedFerries(): FerryPosition[] {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const firstDepartureMinutes = 5 * 60 + 30;
  const lastDepartureMinutes = 0 * 60 + 30;

  if (
    currentMinutes < firstDepartureMinutes ||
    currentMinutes > lastDepartureMinutes + 24 * 60
  ) {
    return [];
  }

  const ferries: FerryPosition[] = [];
  const transitDuration = 18;

  const minutesSinceFirst = currentMinutes - firstDepartureMinutes;
  const departureNumber = Math.floor(minutesSinceFirst / 30);
  const minutesSinceLastDeparture = minutesSinceFirst % 30;

  if (minutesSinceLastDeparture < transitDuration) {
    const progress = minutesSinceLastDeparture / transitDuration;
    const direction =
      departureNumber % 2 === 0 ? "dzaoudzi-mamoudzou" : "mamoudzou-dzaoudzi";

    const departureHour = Math.floor((firstDepartureMinutes + departureNumber * 30) / 60);
    const departureMinute = (firstDepartureMinutes + departureNumber * 30) % 60;
    const arrivalMinutes = firstDepartureMinutes + departureNumber * 30 + transitDuration;
    const arrivalHour = Math.floor(arrivalMinutes / 60);
    const arrivalMinute = arrivalMinutes % 60;

    ferries.push({
      id: "ferry-1",
      name: "Barge 1",
      coordinates: calculateFerryPosition(progress, direction),
      direction,
      progress,
      departureTime: `${departureHour.toString().padStart(2, "0")}:${departureMinute.toString().padStart(2, "0")}`,
      arrivalTime: `${arrivalHour.toString().padStart(2, "0")}:${arrivalMinute.toString().padStart(2, "0")}`,
    });
  }

  return ferries;
}
