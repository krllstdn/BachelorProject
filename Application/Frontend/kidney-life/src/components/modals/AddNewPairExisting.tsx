import SideBar from "../layout/Sidebar";
import { SideBarItem } from "../layout/Sidebar";
import Button from "../buttons/Button";
import InfoDisplay from "../cards/InfoDisplay";
import CloseIcon from "../buttons/CloseButton";
import BackIcon from "../buttons/BackButton";
import {
  tabRecipient,
  tabDonor,
  infoDataDonor,
  infoDataRecipient,
} from "../../helpers/constants";

type AddNewPairExistingProps = {
  onClose: () => void;
  onBack: () => void;
};

function AddNewPairExisting(props: AddNewPairExistingProps) {
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
        <CloseIcon onClick={props.onClose} />
        <BackIcon onClick={props.onBack} />
      </div>
    </div>
  );
}

export default AddNewPairExisting;
