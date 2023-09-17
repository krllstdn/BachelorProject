import React, { useState } from "react";
import Button from "./button";
import InputField from "./inputField";
import SelectField from "./selectField";
import { type } from "os";

type SetterMap = {
  [key: string]: React.Dispatch<React.SetStateAction<string>>;
};

type AddNewPairNewProps = {
  onClose: () => void;
};

function AddNewPairNew(props: AddNewPairNewProps) {
  // array of options for select fields
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const useOfDyalisis = ["Yes", "No"];
  const race = ["White", "Black", "Asian", "Other"];
  const gender = ["Male", "Female"];
  const donorType = ["Living", "Deceased"];

  const [recipientFirstName, setRecipientFirstName] = useState<string>("");
  const [recipientLastName, setRecipientLastName] = useState<string>("");
  const [recipientGender, setRecipientGender] = useState<string>("");
  const [recipientBloodType, setRecipientBloodType] = useState<string>("");
  const [recipientRace, setRecipientRace] = useState<string>("");
  const [recipientUseOfDyalisis, setRecipientUseOfDyalisis] =
    useState<string>("");

  const [donorFirstName, setDonorFirstName] = useState<string>("");
  const [donorLastName, setDonorLastName] = useState<string>("");
  const [donorGender, setDonorGender] = useState<string>("");
  const [donorBloodType, setDonorBloodType] = useState<string>("");
  const [donorRace, setDonorRace] = useState<string>("");
  const [donorDonorType, setDonorDonorType] = useState<string>("");

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

  const selectDonorFieldsConfig = [
    {
      name: "donorGender",
      text: "Gender:",
      options: gender,
      value: donorGender,
    },
    {
      name: "donorBloodType",
      text: "Blood type:",
      options: bloodTypes,
      value: donorBloodType,
    },
    { name: "donorRace", text: "Race:", options: race, value: donorRace },
    {
      name: "donorDonorType",
      text: "Donor type:",
      options: donorType,
      value: donorDonorType,
    },
  ];

  const selectRecipientFieldsConfig = [
    {
      name: "recipientGender",
      text: "Gender:",
      options: gender,
      value: recipientGender,
    },
    {
      name: "recipientBloodType",
      text: "Blood type:",
      options: bloodTypes,
      value: recipientBloodType,
    },
    {
      name: "recipientRace",
      text: "Race:",
      options: race,
      value: recipientRace,
    },
    {
      name: "recipientUseOfDyalisis",
      text: "Use of dialysis:",
      options: useOfDyalisis,
      value: recipientUseOfDyalisis,
    },
  ];

  const inputDonorFieldsConfig = [
    { name: "donorFirstName", text: "First name:", value: donorFirstName },
    { name: "donorLastName", text: "Last name:", value: donorLastName },
  ];

  const inputRecipientFieldsConfig = [
    {
      name: "recipientFirstName",
      text: "First name:",
      value: recipientFirstName,
    },
    { name: "recipientLastName", text: "Last name:", value: recipientLastName },
  ];

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
            {/* <AddNewPairButton /> */}
            <Button name="Add pair +" onClick={buttonOnClick}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewPairNew;
