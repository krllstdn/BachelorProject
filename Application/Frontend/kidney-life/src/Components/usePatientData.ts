import { useState } from "react";

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
  defaultRecipientGender = "",
  defaultRecipientBloodType = "",
  defaultRecipientRace = "",
  defaultRecipientUseOfDyalisis = "",
  defaultDonorFirstName = "",
  defaultDonorLastName = "",
  defaultDonorGender = "",
  defaultDonorBloodType = "",
  defaultDonorRace = "",
  defaultDonorType = "",
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
  };
};
