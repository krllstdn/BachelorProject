import React, { useState, useEffect } from "react";
import SideBar from "../layout/Sidebar";
import NavBar from "../layout/Navbar";
import AddNewPairNew from "../modals/AddNewPairNew";
import AddNewPairExisting from "../modals/AddNewPairExisting";
import AddNewPair from "../modals/AddNewPair";
import InfoDisplay from "../cards/InfoDisplay";
import ParamDisplay from "../cards/ParamDisplay";
import { infoPrediction } from "../../helpers/constants";
import { formTypes } from "../../helpers/constants";
import { infoDisplayTypes } from "../../helpers/constants";
import ConfirmDelete from "../modals/ConfirmDelete";
import PatientForm from "../forms/PatientForm";
import ImageComponent from "../cards/ImageComponent";
import { PairDetailed, getDetailedPairs } from "../../services/api";
import { Tab } from "../forms/Tabs";

function DashboardPage() {
  enum VIEWS {
    NONE = "NONE",
    ADD_NEW_PAIR = "ADD_NEW_PAIR",
    ADD_NEW_PAIR_NEW = "ADD_NEW_PAIR_NEW",
    ADD_NEW_PAIR_EXISTING = "ADD_NEW_PAIR_EXISTING",
    CONFIRM_DELETE = "CONFIRM_DELETE",
    EDIT_DONOR = "EDIT_DONOR",
    EDIT_RECIPIENT = "EDIT_RECIPIENT",
  }

  const [currentView, setCurrentView] = useState(VIEWS.NONE);
  const [pairData, setPairData] = useState<PairDetailed[]>();
  const [selectedPair, setSelectedPair] = useState<number | null>(0);

  useEffect(() => {
    const fetchPairData = async () => {
      try {
        const pairs = await getDetailedPairs();
        setPairData(pairs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPairData();
  }, []);

  const tabPair: Tab[] = [
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
  ];

  const infoDataDonor = {
    header: "Donor info",
    fields:
      selectedPair !== null
        ? pairData?.[selectedPair]?.donor?.donor_data
        : undefined,
  };

  const infoDataRecipient = {
    header: "Recipient info",
    fields:
      selectedPair !== null
        ? pairData?.[selectedPair]?.recipient?.recipient_data
        : undefined,
  };

  const handleOpenAddNewPair = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR);
  };

  const handleClose = () => {
    setCurrentView(VIEWS.NONE);
  };

  const handleOpenAddNewPairNew = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR_NEW);
  };

  const handleOpenAddNewPairExisting = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR_EXISTING);
  };

  const handleOpenConfirmDelete = () => {
    setCurrentView(VIEWS.CONFIRM_DELETE);
  };

  const handleOpenEditDonor = () => {
    setCurrentView(VIEWS.EDIT_DONOR);
  };

  const handleOpenEditRecipient = () => {
    setCurrentView(VIEWS.EDIT_RECIPIENT);
  };

  const renderPatientForm = (view: VIEWS) => {
    if (view === VIEWS.EDIT_DONOR) {
      return (
        <PatientForm
          onClose={handleClose}
          displayType={formTypes.DONOR}
          donor={
            selectedPair !== null ? pairData?.[selectedPair]?.donor : undefined
          }
        />
      );
    }

    if (view === VIEWS.EDIT_RECIPIENT) {
      return (
        <PatientForm
          onClose={handleClose}
          displayType={formTypes.RECIPIENT}
          recipient={
            selectedPair !== null
              ? pairData?.[selectedPair]?.recipient
              : undefined
          }
        />
      );
    }

    return null;
  };

  return (
    <div className="App-body">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="add-new-pair">
        {currentView === VIEWS.ADD_NEW_PAIR && (
          <AddNewPair
            onClickNew={handleOpenAddNewPairNew}
            onClickExisting={handleOpenAddNewPairExisting}
            onClose={handleClose}
          />
        )}
        {currentView === VIEWS.ADD_NEW_PAIR_NEW && (
          <AddNewPairNew onClose={handleClose} onBack={handleOpenAddNewPair} />
        )}

        {currentView === VIEWS.ADD_NEW_PAIR_EXISTING && (
          <AddNewPairExisting
            onClose={handleClose}
            onBack={handleOpenAddNewPair}
          />
        )}

        {currentView === VIEWS.CONFIRM_DELETE && (
          <ConfirmDelete onClose={handleClose} />
        )}

        {currentView === VIEWS.EDIT_DONOR &&
          renderPatientForm(VIEWS.EDIT_DONOR)}

        {currentView === VIEWS.EDIT_RECIPIENT &&
          renderPatientForm(VIEWS.EDIT_RECIPIENT)}
      </div>
      <div className="main flex pr-5 w-screen">
        <div className="sidebar inline-block ml-5">
          <SideBar
            tabs={tabPair}
            onButtonClick={handleOpenAddNewPair}
            setActivePair={setSelectedPair}
          />
        </div>
        <div className="w-full">
          <div className="flex justify-center mb-4">
            <ImageComponent />
          </div>
          <div className="flex justify-between">
            <InfoDisplay data={infoPrediction} styles="m-3 mb-0 p-12 pb-28" />
            <ParamDisplay />
          </div>
          <div className="flex justify-between">
            <InfoDisplay
              data={infoDataRecipient}
              styles="m-3 mb-0 p-12 pb-28"
              type={infoDisplayTypes.RECIPIENT}
              onEdit={handleOpenEditRecipient}
              onDelete={handleOpenConfirmDelete}
            />
            <InfoDisplay
              data={infoDataDonor}
              styles="m-3 mb-0 p-12 pb-28"
              type={infoDisplayTypes.DONOR}
              onEdit={handleOpenEditDonor}
              onDelete={handleOpenConfirmDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
