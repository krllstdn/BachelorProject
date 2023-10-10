import React, { ReactNode, createContext, useContext, useState } from "react";
import { PairDetailed, PatientData, ResultItem } from "../services/api";

export enum VIEWS {
  NONE = "NONE",
  ADD_NEW_PAIR = "ADD_NEW_PAIR",
  ADD_NEW_PAIR_NEW = "ADD_NEW_PAIR_NEW",
  ADD_NEW_PAIR_EXISTING = "ADD_NEW_PAIR_EXISTING",
  CONFIRM_DELETE_DONOR = "CONFIRM_DELETE_DONOR",
  CONFIRM_DELETE_RECIPIENT = "CONFIRM_DELETE_RECIPIENT",
  EDIT_PAIR = "EDIT",
  EDIT_DONOR = "EDIT_DONOR",
  EDIT_RECIPIENT = "EDIT_RECIPIENT",
  CREATE_DONOR = "CREATE_DONOR",
  CREATE_RECIPIENT = "CREATE_RECIPIENT",
}

type PatientContextType = {
  currentView: VIEWS;
  activeTab: number;
  donorData: ResultItem[];
  recipientData: ResultItem[];
  pairData: PairDetailed[];
  selectedPair: number | null;
  selectedRecipient: number | null;
  selectedDonor: number | null;
  setCurrentView: React.Dispatch<React.SetStateAction<VIEWS>>;
  setDonorData: React.Dispatch<React.SetStateAction<ResultItem[]>>;
  setRecipientData: React.Dispatch<React.SetStateAction<ResultItem[]>>;
  setPairData: React.Dispatch<React.SetStateAction<PairDetailed[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPair: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedRecipient: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedDonor: React.Dispatch<React.SetStateAction<number | null>>;
  handleClose: () => void;
  handleOpenAddNewPair: () => void;
  handleOpenAddNewPairNew: () => void;
  handleOpenAddNewPairExisting: () => void;
  handleOpenConfirmDeleteDonor: () => void;
  handleOpenConfirmDeleteRecipient: () => void;
  handleOpenEditPair: () => void;
  handleOpenEditDonor: () => void;
  handleOpenEditRecipient: () => void;
  handleOpenCreateDonor: () => void;
  handleOpenCreateRecipient: () => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

type PatientProviderProps = {
  children: ReactNode;
};

export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  const [currentView, setCurrentView] = useState(VIEWS.NONE);
  const [activeTab, setActiveTab] = useState(0);
  const [donorData, setDonorData] = useState<ResultItem[]>([]);
  const [recipientData, setRecipientData] = useState<ResultItem[]>([]);
  const [pairData, setPairData] = useState<PairDetailed[]>([]);
  const [selectedPair, setSelectedPair] = useState<number | null>(0);
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(0);
  const [selectedDonor, setSelectedDonor] = useState<number | null>(0);

  const handleClose = () => {
    setCurrentView(VIEWS.NONE);
  };
  const handleOpenAddNewPair = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR);
  };

  const handleOpenAddNewPairNew = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR_NEW);
  };

  const handleOpenAddNewPairExisting = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR_EXISTING);
  };
  const handleOpenConfirmDeleteDonor = () => {
    setCurrentView(VIEWS.CONFIRM_DELETE_DONOR);
  };
  const handleOpenConfirmDeleteRecipient = () => {
    setCurrentView(VIEWS.CONFIRM_DELETE_RECIPIENT);
  };
  const handleOpenEditPair = () => {
    setCurrentView(VIEWS.EDIT_PAIR);
  };
  const handleOpenEditDonor = () => {
    setCurrentView(VIEWS.EDIT_DONOR);
  };
  const handleOpenEditRecipient = () => {
    setCurrentView(VIEWS.EDIT_RECIPIENT);
  };
  const handleOpenCreateDonor = () => {
    setCurrentView(VIEWS.CREATE_DONOR);
  };
  const handleOpenCreateRecipient = () => {
    setCurrentView(VIEWS.CREATE_RECIPIENT);
  };

  return (
    <PatientContext.Provider
      value={{
        currentView,
        setCurrentView,
        donorData,
        setDonorData,
        recipientData,
        setRecipientData,
        pairData,
        setPairData,
        activeTab,
        setActiveTab,
        selectedDonor,
        setSelectedDonor,
        selectedPair,
        setSelectedPair,
        selectedRecipient,
        setSelectedRecipient,
        handleClose,
        handleOpenAddNewPair,
        handleOpenAddNewPairNew,
        handleOpenAddNewPairExisting,
        handleOpenConfirmDeleteDonor,
        handleOpenConfirmDeleteRecipient,
        handleOpenEditPair,
        handleOpenEditDonor,
        handleOpenEditRecipient,
        handleOpenCreateDonor,
        handleOpenCreateRecipient,
      }}
    >
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
