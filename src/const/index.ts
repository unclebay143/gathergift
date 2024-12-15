export const CATEGORY_TAG_LINES = {
  Christmas: "Help make this Christmas magical!",
  Wedding: "Celebrate love with your thoughtful contributions!",
  Convocation: "Honor this milestone with a heartfelt gift!",
  Birthday: "Make this birthday extra special with your wishes!",
  Vacation: "Help turn this dream getaway into reality!",
  BabyShower: "Welcome the little one with your warm blessings!",
  Housewarming: "Contribute to a cozy and happy new home!",
  Anniversary: "Celebrate cherished moments with your love and care!",
  Graduation: "Support the start of a bright future!",
  Generic: "Bring joy to this special occasion with your generosity!",
} as const;

export const WISH_CATEGORIES = [
  "Christmas",
  "Wedding",
  "Convocation",
  "Birthday",
  "Vacation",
  "BabyShower",
  "Housewarming",
  "Anniversary",
  "Graduation",
  "Generic",
] as const;

export const CURRENCIES = ["USD", "NGN"] as const;

export const WISH_STATUS = ["ONGOING", "FULFILLED", "INACTIVE"];
export const WISH_VISIBILITIES = ["PUBLIC", "PRIVATE"];
