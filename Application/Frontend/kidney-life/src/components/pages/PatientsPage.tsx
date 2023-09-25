import NavBar from "../layout/Navbar";
import { Tab } from "../forms/Tabs";
import SideBar from "../layout/Sidebar";
import InfoDisplay from "../cards/InfoDisplay";
import { useState } from "react";
import ConfirmDelete from "../modals/ConfirmDelete";
import PatientForm from "../forms/PatientForm";
import {
  infoDisplayTypes,
  formTypes,
  tabDonor,
  tabPair,
  tabRecipient,
  infoDataDonor,
  infoDataRecipient,
  formFunctionalityTypes,
} from "../../helpers/constants";

function PatientsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: Tab[] = [tabPair[0], tabRecipient[0], tabDonor[0]];

  const VIEWS = {
    NONE: "NONE",
    CONFIRM_DELETE: "CONFIRM_DELETE",
    EDIT_PAIR: "EDIT",
    EDIT_DONOR: "EDIT_DONOR",
    EDIT_RECIPIENT: "EDIT_RECIPIENT",
    CREATE_DONOR: "CREATE_DONOR",
    CREATE_RECIPIENT: "CREATE_RECIPIENT",
  };

  const [currentView, setCurrentView] = useState(VIEWS.NONE);

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
