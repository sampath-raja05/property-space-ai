"use client";

import { create } from "zustand";
import * as turf from "@turf/turf";
import { PropertyListing, PropertyType } from "@/lib/types";
import { sampleProperties } from "@/lib/mock-data";

type FilterState = {
  minPrice: number;
  maxPrice: number;
  bhk: number | null;
  city: string;
  propertyType: PropertyType | "";
  polygonMode: boolean;
  listings: PropertyListing[];
  setCity: (value: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setBhk: (value: number | null) => void;
  setPropertyType: (value: PropertyType | "") => void;
  togglePolygonMode: () => void;
};

const withinRange = (n: number, min: number, max: number) => n >= min && n <= max;

export const usePropertyStore = create<FilterState>((set, get) => ({
  minPrice: 0,
  maxPrice: 30000000,
  bhk: null,
  city: "",
  propertyType: "",
  polygonMode: false,
  listings: sampleProperties,
  setCity: (value) => {
    const nextCity = value.trim().toLowerCase();
    const { minPrice, maxPrice, bhk, propertyType, polygonMode } = get();
    const polygon = turf.polygon([[
      [73.65, 18.52],
      [73.87, 18.52],
      [73.87, 18.68],
      [73.65, 18.68],
      [73.65, 18.52],
    ]]);
    set({
      city: value,
      listings: sampleProperties.filter((item) => {
        const cityMatch = !nextCity || item.city.toLowerCase().includes(nextCity);
        const priceMatch = withinRange(item.priceInr, minPrice, maxPrice);
        const bhkMatch = bhk === null || item.bhk === bhk;
        const typeMatch = !propertyType || item.type === propertyType;
        const polygonMatch =
          !polygonMode || turf.booleanPointInPolygon(turf.point([item.lng, item.lat]), polygon);
        return cityMatch && priceMatch && bhkMatch && typeMatch && polygonMatch;
      }),
    });
  },
  setPriceRange: (min, max) => {
    const { city, bhk, propertyType, polygonMode } = get();
    const cityLower = city.trim().toLowerCase();
    const polygon = turf.polygon([[
      [73.65, 18.52],
      [73.87, 18.52],
      [73.87, 18.68],
      [73.65, 18.68],
      [73.65, 18.52],
    ]]);
    set({
      minPrice: min,
      maxPrice: max,
      listings: sampleProperties.filter((item) => {
        const cityMatch = !cityLower || item.city.toLowerCase().includes(cityLower);
        const priceMatch = withinRange(item.priceInr, min, max);
        const bhkMatch = bhk === null || item.bhk === bhk;
        const typeMatch = !propertyType || item.type === propertyType;
        const polygonMatch =
          !polygonMode || turf.booleanPointInPolygon(turf.point([item.lng, item.lat]), polygon);
        return cityMatch && priceMatch && bhkMatch && typeMatch && polygonMatch;
      }),
    });
  },
  setBhk: (value) => {
    const { city, minPrice, maxPrice, propertyType, polygonMode } = get();
    const cityLower = city.trim().toLowerCase();
    const polygon = turf.polygon([[
      [73.65, 18.52],
      [73.87, 18.52],
      [73.87, 18.68],
      [73.65, 18.68],
      [73.65, 18.52],
    ]]);
    set({
      bhk: value,
      listings: sampleProperties.filter((item) => {
        const cityMatch = !cityLower || item.city.toLowerCase().includes(cityLower);
        const priceMatch = withinRange(item.priceInr, minPrice, maxPrice);
        const bhkMatch = value === null || item.bhk === value;
        const typeMatch = !propertyType || item.type === propertyType;
        const polygonMatch =
          !polygonMode || turf.booleanPointInPolygon(turf.point([item.lng, item.lat]), polygon);
        return cityMatch && priceMatch && bhkMatch && typeMatch && polygonMatch;
      }),
    });
  },
  setPropertyType: (value) => {
    const { city, minPrice, maxPrice, bhk, polygonMode } = get();
    const cityLower = city.trim().toLowerCase();
    const polygon = turf.polygon([[
      [73.65, 18.52],
      [73.87, 18.52],
      [73.87, 18.68],
      [73.65, 18.68],
      [73.65, 18.52],
    ]]);
    set({
      propertyType: value,
      listings: sampleProperties.filter((item) => {
        const cityMatch = !cityLower || item.city.toLowerCase().includes(cityLower);
        const priceMatch = withinRange(item.priceInr, minPrice, maxPrice);
        const bhkMatch = bhk === null || item.bhk === bhk;
        const typeMatch = !value || item.type === value;
        const polygonMatch =
          !polygonMode || turf.booleanPointInPolygon(turf.point([item.lng, item.lat]), polygon);
        return cityMatch && priceMatch && bhkMatch && typeMatch && polygonMatch;
      }),
    });
  },
  togglePolygonMode: () => {
    const { city, minPrice, maxPrice, bhk, propertyType, polygonMode } = get();
    const cityLower = city.trim().toLowerCase();
    const nextPolygonMode = !polygonMode;
    const polygon = turf.polygon([[
      [73.65, 18.52],
      [73.87, 18.52],
      [73.87, 18.68],
      [73.65, 18.68],
      [73.65, 18.52],
    ]]);
    set({
      polygonMode: nextPolygonMode,
      listings: sampleProperties.filter((item) => {
        const cityMatch = !cityLower || item.city.toLowerCase().includes(cityLower);
        const priceMatch = withinRange(item.priceInr, minPrice, maxPrice);
        const bhkMatch = bhk === null || item.bhk === bhk;
        const typeMatch = !propertyType || item.type === propertyType;
        const polygonMatch =
          !nextPolygonMode || turf.booleanPointInPolygon(turf.point([item.lng, item.lat]), polygon);
        return cityMatch && priceMatch && bhkMatch && typeMatch && polygonMatch;
      }),
    });
  },
}));
