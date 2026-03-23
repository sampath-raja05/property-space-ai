export interface PropertySearchRequest {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bhk?: number;
  propertyType?: string;
  limit?: number;
  offset?: number;
}

export interface AnalyticsResponse {
  predicted_price_inr: number;
  investment_score: number;
  location_score: number;
}
