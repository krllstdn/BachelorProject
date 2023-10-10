import SideBar from "../layout/Sidebar";
import Button from "../buttons/Button";
import InfoDisplay from "../cards/InfoDisplay";
import CloseButton from "../buttons/CloseButton";
import BackIcon from "../buttons/BackButton";
import { infoDisplayTypes } from "../../helpers/constants";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";
import ModalContainer from "../wrappers/ModalContainer";
import { useEffect } from "react";
import { getRecipients, getDonors, PatientData } from "../../services/api";
import { usePatients } from "../../context/patientsPageContext";
import { Tab } from "../forms/Tabs";

type AddNewPairExistingProps = {
  onClose: () => void;
  onBack: () => void;
  onRefresh?: () => void;
};

function AddNewPairExisting(props: AddNewPairExistingProps) {
  const {
    donorData,
    setDonorData,
    recipientData,
    setRecipientData,
    selectedDonor,
    selectedRecipient,
  } = usePatients();

  const fetchPatientsData = async () => {
    try {
      const recipients = await getRecipients();
      const donors = await getDonors();

      setRecipientData(recipients);
      setDonorData(donors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatientsData();
  }, []);

  const recipients = recipientData
    ?.map((recipient) => {
      return recipient.recipient_data;
    })
    .filter(Boolean) as PatientData[];

  const infoDataRecipient = {
    header: "Recipient info",
    fields:
      selectedRecipient !== null ? recipients?.[selectedRecipient] : undefined,
  };

  const donors = donorData
    ?.map((donor) => donor.donor_data)
    .filter(Boolean) as PatientData[];

  const infoDataDonor = {
    header: "Donor info",
    fields: selectedDonor !== null ? donors?.[selectedDonor] : undefined,
  };
  const tabs: Tab[] = [
    // TODO: move to patientsContext
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

  const sendAddPairRequest = async () => {
    const isCorrect = true;

    if (isCorrect) {
      const response = await fetch("http://localhost:8000/pair/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donor:
            selectedDonor !== null
              ? donorData?.[selectedDonor]?.donor_id
              : undefined,
          recipient:
            selectedRecipient !== null
              ? recipientData?.[selectedRecipient].recipient_id
              : undefined,
        }),
      });
      if (response.ok) {
        props.onClose();
        props.onRefresh!();
      } else {
        console.log("error");
      }
    }
  };

  return (
    <BlurredBackdrop>
      <ModalContainer className="w-1/2 md:w-5/6 lg:w-10/12 md:pl-2 md:pr-2 pr-5 pl-5 pt-5 pb-8">
        <h1 className="text-center text-3xl font-semibold mt-4">
          Add new pair: Existing patients
        </h1>
        <div className="flex justify-evenly mt-4 mb-4">
          <div className="flex">
            <SideBar tabs={[tabs[0]]} />
            <InfoDisplay
              data={infoDataRecipient}
              styles="mr-10 pt-2 pl-5 lg:pr-20 md:pl-1 md:pr-5 md:mr-0"
              textSize="text-2xl"
              type={infoDisplayTypes.RECIPIENT}
              isAddNewPairExisting={true}
            />
          </div>
          <div className="flex">
            <SideBar tabs={[tabs[1]]} />
            <InfoDisplay
              data={infoDataDonor}
              styles="mr-10 pt-2 pl-5 pr-5 lg:pr-20 md:pl-1 md:pr-5 md:mr-0"
              textSize="text-2xl"
              type={infoDisplayTypes.DONOR}
              isAddNewPairExisting={true}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-40">
            <Button
              name="Add Pair +"
              onClick={sendAddPairRequest}
              additionalStyles="text-xl pt-3 pb-3 md:text-lg md:pt-2 md:pb-2"
            />
          </div>
        </div>
        <CloseButton onClick={props.onClose} />
        <BackIcon onClick={props.onBack} />
      </ModalContainer>
    </BlurredBackdrop>
  );
}

export default AddNewPairExisting;
