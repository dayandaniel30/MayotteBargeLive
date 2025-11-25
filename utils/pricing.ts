export interface PricingInfo {
  pedestrian: {
    dzaoudziToMamoudzou: string;
    mamoudzouToDzaoudzi: string;
    note: string;
  };
  vehicle: {
    price: string;
    bidirectional: boolean;
  };
  motorcycle: {
    price: string;
    bidirectional: boolean;
  };
  duration: {
    min: number;
    max: number;
    unit: string;
  };
}

export const PRICING_INFO: PricingInfo = {
  pedestrian: {
    dzaoudziToMamoudzou: "Gratuit",
    mamoudzouToDzaoudzi: "0,75€",
    note: "Gratuit dans le sens Petite-Terre → Grande-Terre",
  },
  vehicle: {
    price: "15€",
    bidirectional: true,
  },
  motorcycle: {
    price: "5€",
    bidirectional: true,
  },
  duration: {
    min: 15,
    max: 20,
    unit: "minutes",
  },
};

export function getPedestrianPrice(from: "dzaoudzi" | "mamoudzou"): string {
  if (from === "dzaoudzi") {
    return PRICING_INFO.pedestrian.dzaoudziToMamoudzou;
  }
  return PRICING_INFO.pedestrian.mamoudzouToDzaoudzi;
}

export function getVehiclePrice(): string {
  return PRICING_INFO.vehicle.price;
}

export function getMotorcyclePrice(): string {
  return PRICING_INFO.motorcycle.price;
}

export function getDurationText(): string {
  return `${PRICING_INFO.duration.min}-${PRICING_INFO.duration.max} ${PRICING_INFO.duration.unit}`;
}
