import React from "react";
import Button from "./button";
import InputField from "./inputField";
import SelectField from "./selectField";
import { usePatientData } from "./usePatientData";
import {
  generateSelectDonorFieldsConfig,
  generateSelectRecipientFieldsConfig,
  generateInputDonorFieldsConfig,
  generateInputRecipientFieldsConfig,
} from "./fieldConfig";

type EditPatientProps = {
  onClose: () => void;
};

function EditPatient(props: EditPatientProps) {
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
    <div
      className="absolute top-0 left-0 z-10 flex justify-center 
                          items-center bg-opacity-10 bg-black backdrop-blur-sm 
                          h-screen w-screen"
    >
      <div
        className="relative w-1/2 md:w-2/3 bg-secondary pr-5 pl-5 
                              pt-5 pb-8 rounded-md border-2 border-primary"
      >
        <h1 className="text-center text-3xl font-semibold mb-2">Edit</h1>
        <form>
          <div className="flex justify-evenly">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Edit Recipient</h2>
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
              <h2 className="text-2xl font-semibold mb-2">Edit Donor</h2>
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
        <button
          className="absolute top-0 right-0 text-primary pr-5 pt-2
                                      text-3xl"
          type="button"
          onClick={props.onClose}
        >
          &times;
        </button>
        <div className="w-full flex justify-center items-center">
          <div className="w-40">
            <Button name="Add pair +" onClick={buttonOnClick}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPatient;
