import React, { ReactNode, createContext, useContext, useState } from "react";
import { PatientData } from "../services/api";

type PatientContextType = {
  donors: PatientData[];
  recipients: PatientData[];
  pairs: PatientData[];
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

type PatientProviderProps = {
  children: ReactNode;
};

export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  const [donors, setDonors] = useState<PatientData[]>([]);
  const [recipients, setRecipients] = useState<PatientData[]>([]);
  const [pairs, setPairs] = useState<PatientData[]>([]);

  return (
    <PatientContext.Provider value={{ donors, recipients, pairs }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatients must be used within a PatientProvider");
  }
  return context;
};
