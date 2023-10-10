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
  formFunctionalityTypes,
} from "../../helpers/constants";
import { getRecipients, getDonors, getDetailedPairs } from "../../services/api";
import { PatientData } from "../../services/api";
import { usePatients } from "../../context/patientsPageContext";

function PatientsPage() {
  enum VIEWS {
    NONE = "NONE",
    CONFIRM_DELETE_DONOR = "CONFIRM_DELETE_DONOR",
    CONFIRM_DELETE_RECIPIENT = "CONFIRM_DELETE_RECIPIENT",
    EDIT_PAIR = "EDIT",
    EDIT_DONOR = "EDIT_DONOR",
    EDIT_RECIPIENT = "EDIT_RECIPIENT",
    CREATE_DONOR = "CREATE_DONOR",
    CREATE_RECIPIENT = "CREATE_RECIPIENT",
  }

  const {
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
    selectedPair,
    setSelectedPair,
    selectedRecipient,
    setSelectedRecipient,
    selectedDonor,
    setSelectedDonor,
    handleClose,
    handleOpenConfirmDeleteDonor,
    handleOpenConfirmDeleteRecipient,
    handleOpenEditPair,
    handleOpenEditDonor,
    handleOpenEditRecipient,
    handleOpenCreateDonor,
    handleOpenCreateRecipient,
  } = usePatients();

  const fetchAllData = async () => {
    try {
      const recipients = await getRecipients();
      setRecipientData(recipients);

      const donors = await getDonors();
      setDonorData(donors);

      const pairs = await getDetailedPairs();
      setPairData(pairs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = "Patients | KidneyLife";
    fetchAllData();
  }, []);

  const handleRefreshClick = () => {
    // TODO: be more specific about what data to refresh
    fetchAllData();
    console.log("refreshed");
  };

  const recipients = recipientData
    ?.map((recipient) => {
      return recipient.recipient_data;
    })
    .filter(Boolean) as PatientData[];

  const infoDataRecipient = {
    header: "Recipient info",
    fields:
      activeTab === 0 && selectedPair !== null
        ? pairData?.[selectedPair]?.recipient?.recipient_data
        : activeTab === 1 && selectedRecipient !== null
        ? recipients?.[selectedRecipient]
        : undefined,
  };

  const donors = donorData
    ?.map((donor) => donor.donor_data)
    .filter(Boolean) as PatientData[];

  const infoDataDonor = {
    header: "Donor info",
    fields:
      activeTab === 0 && selectedPair !== null
        ? pairData?.[selectedPair]?.donor?.donor_data
        : activeTab === 2 && selectedDonor !== null
        ? donors?.[selectedDonor]
        : undefined,
  };

  const tabs: Tab[] = [
    {
      title: "Pairs",
      content: pairData?.map((pair) => {
        return {
          "Pair id": pair.pair_id,
          // what "blood type", for the love of god? TODO: Change this to blood group
          "Recipient Blood Group": pair.recipient?.recipient_data["Blood Type"],
          "Donor Blood Group": pair.donor?.donor_data["Blood Type"],
          Type: pair.donor?.donor_data["Donor Type"],
        };
      }),
    },
    {
      title: "Recipients",
      content: recipientData?.map((recipient) => {
        return {
          "Recipient id": recipient?.recipient_id,
          "Blood group": recipient.recipient_data?.["Blood Type"],
          "Use of dialysis": recipient.recipient_data?.["Use of dialysis"],
        };
      }),
    },
    {
      title: "Donors",
      content: donorData?.map((donor) => {
        return {
          "Donor id": donor?.donor_id,
          "Blood group": donor.donor_data?.["Blood Type"],
          "Donor type": donor.donor_data?.["Donor Type"],
        };
      }),
    },
  ];

  function renderInfoDisplay(type: infoDisplayTypes) {
    const commonProps = {
      styles: "p-5 grow mr-5",
    };
    console.log(selectedDonor);

    if (type === infoDisplayTypes.RECIPIENT) {
      return (
        <InfoDisplay
          {...commonProps}
          onDelete={handleOpenConfirmDeleteRecipient}
          onEdit={handleOpenEditRecipient}
          data={infoDataRecipient}
          type={infoDisplayTypes.RECIPIENT}
        />
      );
    } else if (type === infoDisplayTypes.DONOR) {
      return (
        <InfoDisplay
          {...commonProps}
          onDelete={handleOpenConfirmDeleteDonor}
          onEdit={handleOpenEditDonor}
          data={infoDataDonor}
          type={infoDisplayTypes.DONOR}
        />
      );
    }
  }

  function renderPatientForm(view: VIEWS) {
    const commonProps = {
      onClose: handleClose,
      onRefreshClick: handleRefreshClick,
    };
    if (view === VIEWS.EDIT_PAIR) {
      return <PatientForm displayType={formTypes.PAIR} {...commonProps} />;
    }

    if (view === VIEWS.EDIT_DONOR) {
      return (
        <PatientForm
          {...commonProps}
          functionalityType={formFunctionalityTypes.EDIT}
          displayType={formTypes.DONOR}
          donor={
            activeTab === 0 && selectedPair !== null
              ? pairData?.[selectedPair]?.donor
              : activeTab === 2 && selectedDonor !== null
              ? donorData?.[selectedDonor]
              : undefined
          }
        />
      );
    }
    if (view === VIEWS.EDIT_RECIPIENT) {
      return (
        <PatientForm
          {...commonProps}
          functionalityType={formFunctionalityTypes.EDIT}
          displayType={formTypes.RECIPIENT}
          recipient={
            activeTab === 0 && selectedPair !== null
              ? pairData?.[selectedPair]?.recipient
              : activeTab === 1 && selectedRecipient !== null
              ? recipientData?.[selectedRecipient]
              : undefined
          }
        />
      );
    }
    if (view === VIEWS.CREATE_DONOR) {
      return (
        <PatientForm
          {...commonProps}
          functionalityType={formFunctionalityTypes.CREATE}
          displayType={formTypes.DONOR}
        />
      );
    }
    if (view === VIEWS.CREATE_RECIPIENT) {
      return (
        <PatientForm
          {...commonProps}
          functionalityType={formFunctionalityTypes.CREATE}
          displayType={formTypes.RECIPIENT}
        />
      );
    }

    return null;
  }

  const recipientIds = recipientData?.map((recipient) => {
    return recipient.recipient_id;
  });

  const donorIds = donorData?.map((donor) => {
    return donor.donor_id;
  });

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main flex pr-5 w-screen">
        <div className="sidebar ml-3">
          <SideBar tabs={tabs} />
        </div>
        <div className="w-full flex">
          {activeTab === 0 && (
            <div className="flex w-full justify-between">
              {renderInfoDisplay(infoDisplayTypes.RECIPIENT)}
              {renderInfoDisplay(infoDisplayTypes.DONOR)}
            </div>
          )}
          {activeTab === 1 && (
            <div className="flex w-1/2">
              {renderInfoDisplay(infoDisplayTypes.RECIPIENT)}
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex w-1/2">
              {renderInfoDisplay(infoDisplayTypes.DONOR)}
            </div>
          )}
        </div>
      </div>
      {currentView === VIEWS.CONFIRM_DELETE_DONOR && (
        <ConfirmDelete
          refresh={handleRefreshClick}
          onClose={handleClose}
          isRecipient={false}
          patientId={
            // how to determine is it pair or patients
            selectedDonor !== null && activeTab === 2
              ? donorIds?.[selectedDonor]
              : selectedPair !== null && activeTab === 0
              ? pairData?.[selectedPair].donor.donor_id
              : undefined
          }
        />
      )}
      {currentView === VIEWS.CONFIRM_DELETE_RECIPIENT && (
        <ConfirmDelete
          refresh={handleRefreshClick}
          onClose={handleClose}
          isRecipient={true}
          patientId={
            selectedDonor !== null && activeTab === 2
              ? donorIds?.[selectedDonor]
              : selectedPair !== null && activeTab === 0
              ? pairData?.[selectedPair].recipient.recipient_id
              : undefined
          }
        />
      )}
      {currentView === VIEWS.EDIT_PAIR && renderPatientForm(VIEWS.EDIT_PAIR)}
      {currentView === VIEWS.EDIT_DONOR && renderPatientForm(VIEWS.EDIT_DONOR)}
      {currentView === VIEWS.EDIT_RECIPIENT &&
        renderPatientForm(VIEWS.EDIT_RECIPIENT)}
      {currentView === VIEWS.CREATE_DONOR &&
        renderPatientForm(VIEWS.CREATE_DONOR)}
      {currentView === VIEWS.CREATE_RECIPIENT &&
        renderPatientForm(VIEWS.CREATE_RECIPIENT)}
    </div>
  );
}

export default PatientsPage;
