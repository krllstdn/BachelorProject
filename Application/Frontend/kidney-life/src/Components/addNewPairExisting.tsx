import SideBar from "./Sidebar";
import { SideBarItem } from "./Sidebar";
import Button from "./Button";
import InfoDisplay from "./InfoDisplay";

type AddNewPairExistingProps = {
  onClose: () => void;
};

function AddNewPairExisting(props: AddNewPairExistingProps) {
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

  const tabRecipient = [
    {
      title: "Recipients",
      content: recipientItemsData,
    },
  ];

  const tabDonor = [
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

  return (
    <div
      className="absolute top-0 left-0 z-10 flex justify-center 
                        items-center bg-opacity-10 bg-black backdrop-blur-sm 
                        h-screen w-screen"
    >
      <div
        className="relative w-1/2 bg-secondary pr-5 pl-5 pt-5 pb-8
                            rounded-md border-2 border-primary
                            md:w-5/6 md:pl-2 md:pr-2
                            lg:w-8/12"
      >
        <h1 className="text-center text-3xl font-semibold mt-4">
          Add new pair: Existing patients
        </h1>
        <div className="flex justify-evenly mt-4 mb-4">
          <div className="flex">
            <SideBar tabs={tabRecipient} />
            <InfoDisplay
              data={infoDataRecipient}
              styles="mr-10 pt-2 pl-3 pr-3 md:pl-1 md:pr-5 md:mr-0"
              textSize="text-2xl"
            />
          </div>
          <div className="flex">
            <SideBar tabs={tabDonor} />
            <InfoDisplay
              data={infoDataDonor}
              styles="mr-10 pt-2 pl-5 pr-5 md:pl-1 md:pr-5 md:mr-0"
              textSize="text-2xl"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-40">
            <Button
              name="Add Pair +"
              onClick={() => {}}
              additionalStyles="text-xl pt-3 pb-3 md:text-lg md:pt-2 md:pb-2"
            />
          </div>
        </div>
        <button
          className="absolute top-0 right-0 text-primary pr-5 pt-2
                                    text-3xl"
          type="button"
          onClick={props.onClose}
        >
          {" "}
          &times;
        </button>
      </div>
    </div>
  );
}

export default AddNewPairExisting;
