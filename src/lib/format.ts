export const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export const discountOf = (price: number, originalPrice: number) =>
  Math.round((1 - price / originalPrice) * 100);

const conditionLabels: Record<string, string> = {
  New: "Baru",
  "Like New": "Seperti Baru",
  Good: "Baik",
  Fair: "Cukup",
  Minus: "Minus",
  Kanibalan: "Kanibalan",
};

export const formatCondition = (condition: string) =>
  conditionLabels[condition] ?? condition;
