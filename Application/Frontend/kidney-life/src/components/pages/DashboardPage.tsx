import React, { useState } from "react";
import SideBar from "../layout/Sidebar";
import NavBar from "../layout/Navbar";
import AddNewPairNew from "../modals/AddNewPairNew";
import AddNewPairExisting from "../modals/AddNewPairExisting";
import AddNewPair from "../modals/AddNewPair";
import InfoDisplay from "../cards/InfoDisplay";
import ParamDisplay from "../cards/ParamDisplay";
import { tabPair, infoPrediction } from "../../helpers/constants";
import {
  formTypes,
  infoDataDonor,
  infoDataRecipient,
} from "../../helpers/constants";
import { infoDisplayTypes } from "../../helpers/constants";
import ConfirmDelete from "../modals/ConfirmDelete";
import EditPatient from "../forms/EditPatient";
import ImageComponent from "../cards/ImageComponent";

function DashboardPage() {
  const VIEWS = {
    NONE: "NONE",
    ADD_NEW_PAIR: "ADD_NEW_PAIR",
    ADD_NEW_PAIR_NEW: "ADD_NEW_PAIR_NEW",
    ADD_NEW_PAIR_EXISTING: "ADD_NEW_PAIR_EXISTING",
    CONFIRM_DELETE: "CONFIRM_DELETE",
    EDIT_DONOR: "EDIT_DONOR",
    EDIT_RECIPIENT: "EDIT_RECIPIENT",
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

  const handleOpenConfirmDelete = () => {
    setCurrentView(VIEWS.CONFIRM_DELETE);
  };

  const handleOpenEditDonor = () => {
    setCurrentView(VIEWS.EDIT_DONOR);
  };

  const handleOpenEditRecipient = () => {
    setCurrentView(VIEWS.EDIT_RECIPIENT);
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

        {currentView === VIEWS.EDIT_DONOR && (
          <EditPatient onClose={handleClose} displayType={formTypes.DONOR} />
        )}

        {currentView === VIEWS.EDIT_RECIPIENT && (
          <EditPatient
            onClose={handleClose}
            displayType={formTypes.RECIPIENT}
          />
        )}
      </div>
      <div className="main flex pr-5 w-screen">
        <div className="sidebar inline-block">
          <SideBar tabs={tabPair} onButtonClick={handleOpenAddNewPair} />
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
