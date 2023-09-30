import NavBar from "../layout/Navbar";
import { Tab } from "../forms/Tabs";
import SideBar from "../layout/Sidebar";
import InfoDisplay from "../cards/InfoDisplay";
import { useState, useEffect } from "react";
import ConfirmDelete from "../modals/ConfirmDelete";
import PatientForm from "../forms/PatientForm";
import {
  infoDisplayTypes,
  formTypes,
  // tabDonor,
  // tabPair,
  // tabRecipient,
  // infoDataDonor,
  // infoDataRecipient,
  recipientItemsData,
  pairItemsData,
  formFunctionalityTypes,
} from "../../helpers/constants";
import { getRecipients, getDonors, getPairs } from "../../services/api";
import { Response } from "../../services/api";
import { ResultItem, PatientData } from "../../services/api";

function PatientsPage() {
  const VIEWS = {
    NONE: "NONE",
    CONFIRM_DELETE: "CONFIRM_DELETE",
    EDIT_PAIR: "EDIT",
    EDIT_DONOR: "EDIT_DONOR",
    EDIT_RECIPIENT: "EDIT_RECIPIENT",
    CREATE_DONOR: "CREATE_DONOR",
    CREATE_RECIPIENT: "CREATE_RECIPIENT",
  };

  const [activeTab, setActiveTab] = useState(0);
  const [currentView, setCurrentView] = useState(VIEWS.NONE);
  const [fadeOut, setFadeOut] = useState(false);
  const [recipientData, setRecipientData] = useState<ResultItem[]>();
  const [donorData, setDonorData] = useState<ResultItem[]>();
  const [pairData, setPairData] = useState<ResultItem[]>();
  const [selectedPair, setSelectedPair] = useState<number | null>(0);
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(0);
  const [selectedDonor, setSelectedDonor] = useState<number | null>(0);

  const handleClose = () => {
    setCurrentView(VIEWS.NONE);
  };
  const handleOpenConfirmDelete = () => {
    setCurrentView(VIEWS.CONFIRM_DELETE);
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

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const recipients = await getRecipients();
        setRecipientData(recipients);

        const donors = await getDonors();
        setDonorData(donors);

        const pairs = await getPairs();
        setPairData(pairs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllData();
  }, []);

  const recipients = recipientData
    ?.map((recipient) => {
      return recipient.recipient_data;
    })
    .filter(Boolean) as PatientData[];

  const infoDataRecipient = {
    header: "Recipient info",
    fields: recipients?.[1],
  };

  const donors = donorData
    ?.map((donor) => donor.donor_data)
    .filter(Boolean) as PatientData[];

  const infoDataDonor = {
    header: "Donor info",
    fields: selectedDonor !== null ? donors?.[selectedDonor] : undefined, // just place here active donor index
  };

  const tabs: Tab[] = [
    {
      title: "Pairs",
      content: pairItemsData,
    },
    {
      title: "Recipients",
      content: recipients,
    },
    {
      title: "Donors",
      content: donors,
    },
  ];

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main flex pr-5 w-screen">
        <div className="sidebar ml-3">
          <SideBar
            tabs={tabs}
            setActiveTab={setActiveTab}
            onOpenCreateDonor={handleOpenCreateDonor}
            onOpenCreateRecipient={handleOpenCreateRecipient}
            onOpenCreatePair={handleOpenEditPair}
            donorData={donors}
            setActiveDonor={setSelectedDonor}
          />
        </div>
        <div className="w-full flex">
          {activeTab === 0 && (
            <div className="flex w-full justify-between">
              <InfoDisplay
                onEdit={handleOpenEditRecipient}
                onDelete={handleOpenConfirmDelete}
                data={infoDataRecipient}
                styles="p-5 mr-5 grow"
                type={infoDisplayTypes.RECIPIENT}
              />
              <InfoDisplay
                onEdit={handleOpenEditDonor}
                onDelete={handleOpenConfirmDelete}
                data={infoDataDonor}
                styles="p-5 grow"
                type={infoDisplayTypes.DONOR}
              />
            </div>
          )}
          {activeTab === 1 && (
            <div className="flex w-1/2">
              <InfoDisplay
                onEdit={handleOpenEditRecipient}
                onDelete={handleOpenConfirmDelete}
                data={infoDataRecipient}
                styles="p-5 grow"
                type={infoDisplayTypes.RECIPIENT}
              />
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex w-1/2">
              <InfoDisplay
                onEdit={handleOpenEditDonor}
                onDelete={handleOpenConfirmDelete}
                data={infoDataDonor}
                styles="p-5 grow"
                type={infoDisplayTypes.DONOR}
              />
            </div>
          )}
        </div>
      </div>
      {currentView === VIEWS.CONFIRM_DELETE && (
        <ConfirmDelete onClose={handleClose} />
      )}
      {currentView === VIEWS.EDIT_PAIR && (
        <PatientForm
          displayType={formTypes.PAIR}
          functionalityType={formFunctionalityTypes.EDIT}
          onClose={handleClose}
        />
      )}
      {currentView === VIEWS.EDIT_DONOR && (
        <PatientForm
          displayType={formTypes.DONOR}
          functionalityType={formFunctionalityTypes.EDIT}
          onClose={handleClose}
        />
      )}
      {currentView === VIEWS.EDIT_RECIPIENT && (
        <PatientForm
          displayType={formTypes.RECIPIENT}
          functionalityType={formFunctionalityTypes.EDIT}
          onClose={handleClose}
        />
      )}
      {currentView === VIEWS.CREATE_DONOR && (
        <PatientForm
          displayType={formTypes.DONOR}
          functionalityType={formFunctionalityTypes.CREATE}
          onClose={handleClose}
        />
      )}
      {currentView === VIEWS.CREATE_RECIPIENT && (
        <PatientForm
          displayType={formTypes.RECIPIENT}
          functionalityType={formFunctionalityTypes.CREATE}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default PatientsPage;
