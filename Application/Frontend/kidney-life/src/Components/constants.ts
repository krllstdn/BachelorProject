// these are used in addNewPairNew.tsx and editPatient.tsx
export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const useOfDyalisis = ["Yes", "No"];
export const race = ["White", "Black", "Asian", "Other"];
export const gender = ["Male", "Female"];
export const donorType = ["Living", "Deceased"];

export enum formTypes {
  DONOR = "Donor",
  RECIPIENT = "Recipient",
  PAIR = "Pair",
}

export enum infoDisplayTypes {
  DONOR = "Donor",
  RECIPIENT = "Recipient",
  OTHER = "Other",
}
