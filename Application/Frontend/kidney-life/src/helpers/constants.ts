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

// addNewPairExisting.tsx
const donorItemsData = [
  {
    "Donor id": 123,
    "Blood Group": "A",
    Type: "Deceased",
  },
  {
    "Donor id": 124,
    "Blood Group": "A",
    Type: "Living",
  },
  {
    "Donor id": 125,
    "Blood Group": "A",
    Type: "Living",
  },
];

const recipientItemsData = [
  {
    "Recipient id": 123,
    "Blood Group": "A",
    "Use of Dyalisis": "No",
  },
  {
    "Recipient id": 124,
    "Blood Group": "A",
    "Use of Dyalisis": "No",
  },
  {
    "Recipient id": 125,
    "Blood Group": "A",
    "Use of Dyalisis": "No",
  },
];

const pairItemsData = [
  {
    "Pair id": 123,
    "Donor Blood Group": "A",
    "Recipient Blood Group": "B",
    Type: "Deceased",
  },
  {
    "Pair id": 124,
    "Donor Blood Group": "A",
    "Recipient Blood Group": "B",
    Type: "Living",
  },
  {
    "Pair id": 125,
    "Donor Blood Group": "A",
    "Recipient Blood Group": "B",
    Type: "Living",
  },
];

export const tabRecipient = [
  {
    title: "Recipients",
    content: recipientItemsData,
  },
];

export const tabDonor = [
  {
    title: "Donors",
    content: donorItemsData,
  },
];

export const tabPair = [
  {
    title: "Pairs",
    content: pairItemsData,
  },
];

export const infoDataRecipient = {
  header: "Recipient info",
  fields: {
    Name: "John Doe",
    Age: "25",
    "Blood Group": "A+",
    Gender: "Male",
    "Use of Dyalisis": "No",
    Race: "White",
  },
};

export const infoDataDonor = {
  header: "Donor info",
  fields: {
    Name: "Jane Doe",
    Age: "25",
    "Blood Group": "A+",
    Gender: "Female",
    "Donor Type": "Living",
    Race: "White",
  },
};
