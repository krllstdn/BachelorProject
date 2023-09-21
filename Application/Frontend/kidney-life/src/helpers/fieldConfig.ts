import { type } from "os";
import {
  gender,
  bloodTypes,
  race,
  donorType,
  useOfDyalisis,
} from "./constants";

type DonorFieldsConfig = {
  donorGender: string;
  donorBloodType: string;
  donorRace: string;
  donorDonorType: string;
};

export const generateSelectDonorFieldsConfig = ({
  donorGender,
  donorBloodType,
  donorRace,
  donorDonorType,
}: DonorFieldsConfig) => [
  {
    name: "donorGender",
    text: "Gender:",
    options: gender,
    value: donorGender,
  },
  {
    name: "donorBloodType",
    text: "Blood type:",
    options: bloodTypes,
    value: donorBloodType,
  },
  { name: "donorRace", text: "Race:", options: race, value: donorRace },
  {
    name: "donorDonorType",
    text: "Donor type:",
    options: donorType,
    value: donorDonorType,
  },
];

type RecipientFieldsConfig = {
  recipientGender: string;
  recipientBloodType: string;
  recipientRace: string;
  recipientUseOfDyalisis: string;
};
export const generateSelectRecipientFieldsConfig = ({
  recipientGender,
  recipientBloodType,
  recipientRace,
  recipientUseOfDyalisis,
}: RecipientFieldsConfig) => [
  {
    name: "recipientGender",
    text: "Gender:",
    options: gender,
    value: recipientGender,
  },
  {
    name: "recipientBloodType",
    text: "Blood type:",
    options: bloodTypes,
    value: recipientBloodType,
  },
  {
    name: "recipientRace",
    text: "Race:",
    options: race,
    value: recipientRace,
  },
  {
    name: "recipientUseOfDyalisis",
    text: "Use of dialysis:",
    options: useOfDyalisis,
    value: recipientUseOfDyalisis,
  },
];

type DonorInputFieldsConfig = {
  donorFirstName: string;
  donorLastName: string;
};
export const generateInputDonorFieldsConfig = ({
  donorFirstName,
  donorLastName,
}: DonorInputFieldsConfig) => [
  { name: "donorFirstName", text: "First name:", value: donorFirstName },
  { name: "donorLastName", text: "Last name:", value: donorLastName },
];

type RecipientInputFieldsConfig = {
  recipientFirstName: string;
  recipientLastName: string;
};

export const generateInputRecipientFieldsConfig = ({
  recipientFirstName,
  recipientLastName,
}: RecipientInputFieldsConfig) => [
  {
    name: "recipientFirstName",
    text: "First name:",
    value: recipientFirstName,
  },
  { name: "recipientLastName", text: "Last name:", value: recipientLastName },
];
