import React, { useState } from "react";
import Button from "./button";
import InputField from "./inputField";
import SelectField from "./selectField";
import { SetterMap } from "./addNewPairNew";
import {
  bloodTypes,
  useOfDyalisis,
  race,
  gender,
  donorType,
} from "./constants";
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
  // array of options for select fields

  const {
    recipientFirstName,
    setRecipientFirstName,
    recipientLastName,
    setRecipientLastName,
    recipientGender,
    setRecipientGender,
    recipientBloodType,
    setRecipientBloodType,
    recipientRace,
    setRecipientRace,
    recipientUseOfDyalisis,
    setRecipientUseOfDyalisis,
    donorFirstName,
    setDonorFirstName,
    donorLastName,
    setDonorLastName,
    donorGender,
    setDonorGender,
    donorBloodType,
    setDonorBloodType,
    donorRace,
    setDonorRace,
    donorDonorType,
    setDonorDonorType,
  } = usePatientData();

  const setters: SetterMap = {
    recipientFirstName: setRecipientFirstName,
    recipientLastName: setRecipientLastName,
    recipientGender: setRecipientGender,
    recipientBloodType: setRecipientBloodType,
    recipientRace: setRecipientRace,
    recipientUseOfDyalisis: setRecipientUseOfDyalisis,
    donorFirstName: setDonorFirstName,
    donorLastName: setDonorLastName,
    donorGender: setDonorGender,
    donorBloodType: setDonorBloodType,
    donorRace: setDonorRace,
    donorDonorType: setDonorDonorType,
  };

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
    const setter = setters[name];
    if (setter) {
      setter(value);
    }
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
        <button
          className="absolute top-0 right-0 text-primary pr-5 pt-2
                                      text-3xl"
          type="button"
          onClick={props.onClose}
        >
          {" "}
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
