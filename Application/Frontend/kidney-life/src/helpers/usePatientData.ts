import { useState } from "react";
import {
  gender,
  bloodTypes,
  race,
  useOfDyalisis,
  donorType,
} from "./constants";

export type SetterMap = {
  [key: string]: React.Dispatch<React.SetStateAction<string>>;
};

type PatientDataDefaults = {
  defaultRecipientFirstName?: string;
  defaultRecipientLastName?: string;
  defaultRecipientGender?: string;
  defaultRecipientBloodType?: string;
  defaultRecipientRace?: string;
  defaultRecipientUseOfDyalisis?: string;
  defaultDonorFirstName?: string;
  defaultDonorLastName?: string;
  defaultDonorGender?: string;
  defaultDonorBloodType?: string;
  defaultDonorRace?: string;
  defaultDonorType?: string;
};

export const usePatientData = ({
  defaultRecipientFirstName = "",
  defaultRecipientLastName = "",
  defaultRecipientGender = gender[0],
  defaultRecipientBloodType = bloodTypes[0],
  defaultRecipientRace = race[0],
  defaultRecipientUseOfDyalisis = useOfDyalisis[0],
  defaultDonorFirstName = "",
  defaultDonorLastName = "",
  defaultDonorGender = gender[0],
  defaultDonorBloodType = bloodTypes[0],
  defaultDonorRace = race[0],
  defaultDonorType = donorType[0],
}: PatientDataDefaults = {}) => {
  const [recipientFirstName, setRecipientFirstName] = useState<string>(
    defaultRecipientFirstName
  );
  const [recipientLastName, setRecipientLastName] = useState<string>(
    defaultRecipientLastName
  );
  const [recipientGender, setRecipientGender] = useState<string>(
    defaultRecipientGender
  );
  const [recipientBloodType, setRecipientBloodType] = useState<string>(
    defaultRecipientBloodType
  );
  const [recipientRace, setRecipientRace] =
    useState<string>(defaultRecipientRace);
  const [recipientUseOfDyalisis, setRecipientUseOfDyalisis] = useState<string>(
    defaultRecipientUseOfDyalisis
  );

  const [donorFirstName, setDonorFirstName] = useState<string>(
    defaultDonorFirstName
  );
  const [donorLastName, setDonorLastName] =
    useState<string>(defaultDonorLastName);
  const [donorGender, setDonorGender] = useState<string>(defaultDonorGender);
  const [donorBloodType, setDonorBloodType] = useState<string>(
    defaultDonorBloodType
  );
  const [donorRace, setDonorRace] = useState<string>(defaultDonorRace);
  const [donorDonorType, setDonorDonorType] =
    useState<string>(defaultDonorType);

  const setters: SetterMap = {
    recipientFirstName: setRecipientFirstName,
    recipientLastName: setRecipientLastName,
    recipientGender: setRecipientGender,
    recipientBloodType: setRecipientBloodType,
    recipientRace: setRecipientRace,
    recipientUseOfDyalisis: setRecipientUseOfDyalisis,
    donorFirstName: setDonorFirstName,
    donorLastName: setDonorLastName,
    donorGender: setDonorGender,
    donorBloodType: setDonorBloodType,
    donorRace: setDonorRace,
    donorDonorType: setDonorDonorType,
  };

  const setByKey = (key: string, value: string) => {
    const setter = setters[key];
    if (setter) {
      setter(value);
    }
  };

  return {
    recipientFirstName,
    setRecipientFirstName,
    recipientLastName,
    setRecipientLastName,
    recipientGender,
    setRecipientGender,
    recipientBloodType,
    setRecipientBloodType,
    recipientRace,
    setRecipientRace,
    recipientUseOfDyalisis,
    setRecipientUseOfDyalisis,
    donorFirstName,
    setDonorFirstName,
    donorLastName,
    setDonorLastName,
    donorGender,
    setDonorGender,
    donorBloodType,
    setDonorBloodType,
    donorRace,
    setDonorRace,
    donorDonorType,
    setDonorDonorType,
    setByKey,
  };
};
