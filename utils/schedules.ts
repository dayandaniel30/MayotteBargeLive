import { ScheduleData, ScheduleStatus } from "@/components/ScheduleCard";

export interface Terminal {
  id: string;
  name: string;
  shortName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const TERMINALS: Record<string, Terminal> = {
  DZAOUDZI: {
    id: "dzaoudzi",
    name: "Quai Issoufali",
    shortName: "Dzaoudzi",
    coordinates: {
      latitude: -12.7891,
      longitude: 45.2678,
    },
  },
  MAMOUDZOU: {
    id: "mamoudzou",
    name: "Quai Colas",
    shortName: "Mamoudzou",
    coordinates: {
      latitude: -12.7806,
      longitude: 45.2278,
    },
  },
};

export function generateSchedules(date: Date = new Date()): ScheduleData[] {
  const schedules: ScheduleData[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  let hour = 5;
  let minute = 30;
  let direction: "dzaoudzi-mamoudzou" | "mamoudzou-dzaoudzi" = "dzaoudzi-mamoudzou";

  const lastHour = isWeekend ? 3 : 0;
  const lastMinute = isWeekend ? 0 : 30;

  while (true) {
    if (hour === lastHour && minute === lastMinute) break;

    const departureTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    const scheduleHour = hour;
    const scheduleMinute = minute;

    const isPast =
      scheduleHour < currentHour ||
      (scheduleHour === currentHour && scheduleMinute <= currentMinute);

    if (!isPast) {
      const status: ScheduleStatus = Math.random() > 0.9 ? "delayed" : "on-time";
      const delayMinutes = status === "delayed" ? Math.floor(Math.random() * 20) + 5 : undefined;

      schedules.push({
        departureTime,
        from:
          direction === "dzaoudzi-mamoudzou"
            ? TERMINALS.DZAOUDZI.shortName
            : TERMINALS.MAMOUDZOU.shortName,
        to:
          direction === "dzaoudzi-mamoudzou"
            ? TERMINALS.MAMOUDZOU.shortName
            : TERMINALS.DZAOUDZI.shortName,
        duration: "15-20 min",
        status,
        delayMinutes,
      });
    }

    direction =
      direction === "dzaoudzi-mamoudzou" ? "mamoudzou-dzaoudzi" : "dzaoudzi-mamoudzou";

    const isEvening = hour >= 20;
    const interval = isEvening ? 60 : 30;

    minute += interval;
    if (minute >= 60) {
      hour += Math.floor(minute / 60);
      minute = minute % 60;
    }

    if (hour >= 24) {
      hour = hour - 24;
    }

    if (schedules.length >= 20) break;
  }

  return schedules;
}

export function getStandardScheduleInfo(isWeekend: boolean = false) {
  return {
    dayFrequency: "Toutes les 30 minutes",
    eveningFrequency: "Toutes les heures",
    firstDeparture: "5h30",
    lastDeparture: isWeekend ? "3h00" : "00h30",
    duration: "15-20 minutes",
  };
}
