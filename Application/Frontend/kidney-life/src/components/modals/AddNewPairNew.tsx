import React from "react";
import Button from "../buttons/Button";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { usePatientData } from "../../helpers/usePatientData";
import {
  generateSelectDonorFieldsConfig,
  generateSelectRecipientFieldsConfig,
  generateInputDonorFieldsConfig,
  generateInputRecipientFieldsConfig,
} from "../../helpers/fieldConfig";
import CloseIcon from "../buttons/CloseButton";
import BackIcon from "../buttons/BackButton";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";

export type SetterMap = {
  [key: string]: React.Dispatch<React.SetStateAction<string>>;
};

type AddNewPairNewProps = {
  onClose: () => void;
  onBack: () => void;
};

function AddNewPairNew(props: AddNewPairNewProps) {
  const {
    recipientFirstName,
    recipientLastName,
    recipientGender,
    recipientBloodType,
    recipientRace,
    recipientUseOfDyalisis,
    donorFirstName,
    donorLastName,
    donorGender,
    donorBloodType,
    donorRace,
    donorDonorType,
    setByKey,
  } = usePatientData();

  const selectDonorFieldsConfig = generateSelectDonorFieldsConfig({
    donorGender: donorGender,
    donorBloodType: donorBloodType,
    donorRace: donorRace,
    donorDonorType: donorDonorType,
  });

  const selectRecipientFieldsConfig = generateSelectRecipientFieldsConfig({
    recipientGender: recipientGender,
    recipientBloodType: recipientBloodType,
    recipientRace: recipientRace,
    recipientUseOfDyalisis: recipientUseOfDyalisis,
  });

  const inputDonorFieldsConfig = generateInputDonorFieldsConfig({
    donorFirstName: donorFirstName,
    donorLastName: donorLastName,
  });

  const inputRecipientFieldsConfig = generateInputRecipientFieldsConfig({
    recipientFirstName: recipientFirstName,
    recipientLastName: recipientLastName,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setByKey(name, value);
  };

  const buttonOnClick = () => {
    console.log(recipientFirstName);
    console.log(recipientLastName);
    console.log(donorFirstName);
    console.log(donorLastName);

    // todo: add validation logic
    const isCorrect = true;

    if (isCorrect) {
      props.onClose();
    }
  };

  return (
    <BlurredBackdrop>
      <div
        className="relative w-1/2 md:w-2/3 bg-secondary pr-5 pl-5 
                            pt-5 pb-8 rounded-md border-2 border-primary"
      >
        <h1 className="text-center text-3xl font-semibold mb-2">
          Add new pair: New
        </h1>
        <form>
          <div className="flex justify-evenly">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">New Recipient</h2>
              {inputRecipientFieldsConfig.map((config) => (
                <InputField
                  name={config.name}
                  key={config.name}
                  text={config.text}
                  value={config.value}
                  onChange={handleInputChange}
                />
              ))}
              {selectRecipientFieldsConfig.map((config) => (
                <SelectField
                  key={config.name}
                  name={config.name}
                  text={config.text}
                  options={config.options}
                  value={config.value}
                  onChange={handleInputChange}
                />
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">New Donor</h2>
              {/* add validation logic */}
              {inputDonorFieldsConfig.map((config) => (
                <InputField
                  name={config.name}
                  key={config.name}
                  text={config.text}
                  value={config.value}
                  onChange={handleInputChange}
                />
              ))}
              {selectDonorFieldsConfig.map((config) => (
                <SelectField
                  key={config.name}
                  name={config.name}
                  text={config.text}
                  options={config.options}
                  value={config.value}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </div>
        </form>
        <CloseIcon onClick={props.onClose} />
        <BackIcon onClick={props.onBack} />
        <div className="w-full flex justify-center items-center">
          <div className="w-40">
            {/* <AddNewPairButton /> */}
            <Button name="Add pair +" onClick={buttonOnClick}></Button>
          </div>
        </div>
      </div>
    </BlurredBackdrop>
  );
}

export default AddNewPairNew;
