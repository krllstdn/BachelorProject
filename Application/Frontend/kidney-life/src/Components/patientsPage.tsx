import NavBar from "./navbar";
import { Tab } from "./tabs";
import SideBar from "./sidebar";
import InfoDisplay from "./infoDisplay";
import { useState } from "react";
import ConfirmDelete from "./confirmDelete";
import EditPatient from "./editPatient";
import { infoDisplayTypes, formTypes } from "./constants";

function PatientsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const donorItemsData = [
    {
      "Donor id": 123,
      "Blood Group": "A",
      Type: "Deceased",
    },
    {
      "Donor id": 124,
      "Blood Group": "A",
      Type: "Living",
    },
    {
      "Donor id": 125,
      "Blood Group": "A",
      Type: "Living",
    },
  ];

  const recipientItemsData = [
    {
      "Recipient id": 123,
      "Blood Group": "A",
      "Use of Dyalisis": "No",
    },
    {
      "Recipient id": 124,
      "Blood Group": "A",
      "Use of Dyalisis": "No",
    },
    {
      "Recipient id": 125,
      "Blood Group": "A",
      "Use of Dyalisis": "No",
    },
  ];

  const pairItemsData = [
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

  const tabs: Tab[] = [
    {
      title: "Pairs",
      content: pairItemsData,
    },
    {
      title: "Recipients",
      content: recipientItemsData,
    },
    {
      title: "Donors",
      content: donorItemsData,
    },
  ];

  const infoDataRecipient = {
    header: "Recipient info",
    fields: {
      Name: "John Doe",
      Age: "25",
      "Blood Group": "A+",
      Gender: "Male",
      "Use of Dyalisis": "No",
      Race: "White",
    },
  };

  const infoDataDonor = {
    header: "Donor info",
    fields: {
      Name: "Jane Doe",
      Age: "25",
      "Blood Group": "A+",
      Gender: "Female",
      "Donor Type": "Living",
      Race: "White",
    },
  };

  const VIEWS = {
    NONE: "NONE",
    CONFIRM_DELETE: "CONFIRM_DELETE",
    EDIT: "EDIT",
    EDIT_DONOR: "EDIT_DONOR",
    EDIT_RECIPIENT: "EDIT_RECIPIENT",
    // EDIT_PAIR: "EDIT_PAIR",
  };

  const [currentView, setCurrentView] = useState(VIEWS.NONE);

  const handleClose = () => {
    setCurrentView(VIEWS.NONE);
  };

  const handleOpenConfirmDelete = () => {
    setCurrentView(VIEWS.CONFIRM_DELETE);
  };

  const handleOpenEdit = () => {
    setCurrentView(VIEWS.EDIT);
  };

  const handleOpenEditDonor = () => {
    setCurrentView(VIEWS.EDIT_DONOR);
  };

  const handleOpenEditRecipient = () => {
    setCurrentView(VIEWS.EDIT_RECIPIENT);
  };

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main flex pr-5 w-screen">
        <div className="sidebar ml-3">
          <SideBar tabs={tabs} setActiveTab={setActiveTab} />
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
      {currentView === VIEWS.EDIT && <EditPatient onClose={handleClose} />}
      {currentView === VIEWS.EDIT_DONOR && (
        <EditPatient displayType={formTypes.DONOR} onClose={handleClose} />
      )}
      {currentView === VIEWS.EDIT_RECIPIENT && (
        <EditPatient displayType={formTypes.RECIPIENT} onClose={handleClose} />
      )}
    </div>
  );
}

export default PatientsPage;
