export const EXA_CATEGORIES = [
  "Laptop",
  "Smartphone",
  "Komponen PC",
  "Tablet",
  "Aksesoris",
  "Kamera",
  "Audio",
  "Monitor",
  "Gaming",
] as const;

export type ExaMode = "quick" | "deep";

export type ExaQuota = {
  quick: { used: number; limit: number; remaining: number };
  deep: { used: number; limit: number; remaining: number };
};

export type ExaAnalysis = {
  status: "success" | "rejected";
  message: string;
  product_name: string;
  category: string;
  condition_score: number;
  market_price: number;
  short_comment: string;
  saran_exa: string;
  deep_analysis: string;
  condition_details: Array<{
    label: string;
    status: "safe" | "warning" | "danger";
    note: string;
  }>;
  market_listings: Array<{
    source: string;
    seller: string;
    price: number;
    verified: boolean;
  }>;
  price_trend: Array<{
    month: string;
    price: number;
  }>;
};
