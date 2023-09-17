import { SideBarItem } from "./sidebar";
import SideBar from "./sidebar";
import { Tab } from "./tabs";

function PatientsSidebar() {
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

  return (
    <div className="patients-sidebar">
      <SideBar onButtonClick={() => {}} tabs={tabs} />
    </div>
  );
}
