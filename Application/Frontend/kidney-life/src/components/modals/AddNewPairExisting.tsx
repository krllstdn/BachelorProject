import SideBar from "../layout/Sidebar";
import { SideBarItem } from "../layout/Sidebar";
import Button from "../buttons/Button";
import InfoDisplay from "../cards/InfoDisplay";
import CloseButton from "../buttons/CloseButton";
import BackIcon from "../buttons/BackButton";
import {
  tabRecipient,
  tabDonor,
  infoDataDonor,
  infoDataRecipient,
} from "../../helpers/constants";
import { infoDisplayTypes } from "../../helpers/constants";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";

type AddNewPairExistingProps = {
  onClose: () => void;
  onBack: () => void;
};

function AddNewPairExisting(props: AddNewPairExistingProps) {
  return (
    <BlurredBackdrop>
      <div
        className="relative w-1/2 bg-secondary pr-5 pl-5 pt-5 pb-8
                            rounded-md border-2 border-primary
                            md:w-5/6 md:pl-2 md:pr-2
                            lg:w-10/12"
      >
        <h1 className="text-center text-3xl font-semibold mt-4">
          Add new pair: Existing patients
        </h1>
        <div className="flex justify-evenly mt-4 mb-4">
          <div className="flex">
            <SideBar tabs={tabRecipient} />
            <InfoDisplay
              data={infoDataRecipient}
              styles="mr-10 pt-2 pl-5 lg:pr-20 md:pl-1 md:pr-5 md:mr-0"
              textSize="text-2xl"
              type={infoDisplayTypes.RECIPIENT}
              isAddNewPairExisting={true}
            />
          </div>
          <div className="flex">
            <SideBar tabs={tabDonor} />
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
              onClick={() => {}}
              additionalStyles="text-xl pt-3 pb-3 md:text-lg md:pt-2 md:pb-2"
            />
          </div>
        </div>
        <CloseButton onClick={props.onClose} />
        <BackIcon onClick={props.onBack} />
      </div>
    </BlurredBackdrop>
  );
}

export default AddNewPairExisting;
