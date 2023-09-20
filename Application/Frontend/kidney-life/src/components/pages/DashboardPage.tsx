import React, { useState } from "react";
import SideBar from "../layout/Sidebar";
import NavBar from "../layout/Navbar";
import AddNewPairNew from "../modals/AddNewPairNew";
import AddNewPairExisting from "../modals/AddNewPairExisting";
import AddNewPair from "../modals/AddNewPair";
import InfoDisplay from "../cards/InfoDisplay";
import ParamDisplay from "../cards/ParamDisplay";
import { Tab } from "../forms/Tabs";
import { infoDataDonor, infoDataRecipient } from "../../helpers/constants";

function DashboardPage() {
  const infoPrediction = {
    header: "Prediction",
    fields: {
      Probability: "0.8",
      Confidence: "0.9",
      Years: "5.3",
      "Risk Score": "0.7",
    },
  };

  const VIEWS = {
    NONE: "NONE",
    ADD_NEW_PAIR: "ADD_NEW_PAIR",
    ADD_NEW_PAIR_NEW: "ADD_NEW_PAIR_NEW",
    ADD_NEW_PAIR_EXISTING: "ADD_NEW_PAIR_EXISTING",
  };

  const [currentView, setCurrentView] = useState(VIEWS.NONE);

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

  const sidebarItemsData = [
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

  const tab: Tab[] = [
    {
      title: "Pairs",
      content: sidebarItemsData,
    },
  ];

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
      </div>
      <div className="main flex pr-5 w-screen">
        <div className="sidebar inline-block">
          <SideBar tabs={tab} onButtonClick={handleOpenAddNewPair} />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <InfoDisplay data={infoPrediction} styles="m-3 mb-0 p-12 pb-28" />
            <ParamDisplay />
          </div>
          <div className="flex justify-between">
            <InfoDisplay
              data={infoDataRecipient}
              styles="m-3 mb-0 p-12 pb-28"
            />
            <InfoDisplay data={infoDataDonor} styles="m-3 mb-0 p-12 pb-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
