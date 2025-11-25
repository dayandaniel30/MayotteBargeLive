export type AlertType = "normal" | "delay" | "incident" | "strike" | "weather";

export interface AlertData {
  id: string;
  type: AlertType;
  message: string;
  severity: "info" | "warning" | "error";
  timestamp: Date;
  active: boolean;
}

const SAMPLE_ALERTS: AlertData[] = [
  {
    id: "1",
    type: "normal",
    message: "Service normal - Horaires respectés",
    severity: "info",
    timestamp: new Date(),
    active: true,
  },
  {
    id: "2",
    type: "delay",
    message: "Retards de 10-15 min - Forte affluence",
    severity: "warning",
    timestamp: new Date(),
    active: false,
  },
  {
    id: "3",
    type: "incident",
    message: "Service perturbé - Problème technique en cours de résolution",
    severity: "warning",
    timestamp: new Date(),
    active: false,
  },
  {
    id: "4",
    type: "strike",
    message: "Préavis de grève - Service minimum prévu demain",
    severity: "error",
    timestamp: new Date(),
    active: false,
  },
  {
    id: "5",
    type: "weather",
    message: "Vigilance météo - Mer agitée, possibles retards",
    severity: "warning",
    timestamp: new Date(),
    active: false,
  },
];

export function getCurrentAlert(): AlertData | null {
  const activeAlerts = SAMPLE_ALERTS.filter((alert) => alert.active);
  if (activeAlerts.length === 0) {
    return SAMPLE_ALERTS[0];
  }
  return activeAlerts[0];
}

export function getAlertSeverityType(
  severity: "info" | "warning" | "error"
): "info" | "warning" | "error" {
  return severity;
}

export function simulateRandomAlert(): AlertData {
  const randomIndex = Math.floor(Math.random() * SAMPLE_ALERTS.length);
  return SAMPLE_ALERTS[randomIndex];
}
