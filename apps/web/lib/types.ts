export type PropertyType = "Apartment" | "Villa" | "Plot" | "Commercial";

export interface PropertyListing {
  id: string;
  title: string;
  city: string;
  locality: string;
  priceInr: number;
  bhk: number;
  type: PropertyType;
  areaSqft: number;
  lat: number;
  lng: number;
  investmentScore: number;
}
