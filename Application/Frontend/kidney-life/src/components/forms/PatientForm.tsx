import React, { useEffect } from "react";
import Button from "../buttons/Button";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { usePatientData } from "../../helpers/usePatientData";
import {
  generateSelectDonorFieldsConfig,
  generateSelectRecipientFieldsConfig,
  generateInputDonorFieldsConfig,
  generateInputRecipientFieldsConfig,
} from "../../helpers/fieldConfig";
import { formTypes, formFunctionalityTypes } from "../../helpers/constants";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";
import ModalContainer from "../wrappers/ModalContainer";
import CloseButton from "../buttons/CloseButton";
import {
  gender,
  bloodTypes,
  race,
  useOfDyalisis,
  donorType,
} from "../../helpers/constants";

type PatientFormProps = {
  onClose: () => void;
  displayType: formTypes;
  functionalityType?: formFunctionalityTypes;
  donor?: any; // TODO: add proper type
  recipient?: any; // TODO: add proper type
  onRefreshClick?: () => void;
};

PatientForm.defaultProps = {
  displayType: formTypes.PAIR,
  functionalityType: formFunctionalityTypes.EDIT,
};

function PatientForm(props: PatientFormProps) {
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
    setRecipientFirstName,
    setRecipientLastName,
    setRecipientGender,
    setRecipientBloodType,
    setRecipientRace,
    setRecipientUseOfDyalisis,
    setDonorFirstName,
    setDonorLastName,
    setDonorGender,
    setDonorBloodType,
    setDonorRace,
    setDonorDonorType,

    setByKey,
  } = usePatientData();

  useEffect(() => {
    function setValuesForEditing() {
      if (
        props.displayType === formTypes.DONOR &&
        props.functionalityType === formFunctionalityTypes.EDIT
      ) {
        setDonorFirstName(props.donor?.donor_data?.["First Name"] || "");
        setDonorLastName(props.donor?.donor_data?.["Last Name"] || "");
        setDonorGender(props.donor?.donor_data?.["Gender"] || gender[0]);
        setDonorBloodType(
          props.donor?.donor_data?.["Blood Type"] || bloodTypes[0]
        );
        setDonorRace(props.donor?.donor_data?.["Race"] || race[0]);
        setDonorDonorType(
          props.donor?.donor_data?.["Donor Type"] || donorType[0]
        );
      }

      if (
        props.displayType === formTypes.RECIPIENT &&
        props.functionalityType === formFunctionalityTypes.EDIT
      ) {
        setRecipientFirstName(
          props.recipient?.recipient_data?.["First Name"] || ""
        );
        setRecipientLastName(
          props.recipient?.recipient_data?.["Last Name"] || ""
        );
        setRecipientGender(
          props.recipient?.recipient_data?.["Gender"] || gender[0]
        );
        setRecipientRace(props.recipient?.recipient_data?.["Race"] || race[0]);
        setRecipientBloodType(
          props.recipient?.recipient_data?.["Blood Type"] || bloodTypes[0]
        );
        setRecipientUseOfDyalisis(
          props.recipient?.recipient_data?.["Use of dialysis"] ||
            useOfDyalisis[0]
        );
      }
    }
    setValuesForEditing();
  }, [props.donor, props.recipient]);

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
    // todo: add validation logic
    const isCorrect = true;

    if (props.displayType === formTypes.DONOR) {
      sendUpdateDonorRequest(props.donor?.["donor_id"]);
    }
    if (props.displayType === formTypes.RECIPIENT) {
      sendUpdateRecipientRequest(props.recipient?.["recipient_id"]);
    }

    props.onRefreshClick?.();

    if (isCorrect) {
      props.onClose();
    }
  };

  const sendAddRecipientRequest = async () => {
    const isCorrect = true;

    if (isCorrect) {
      const response = await fetch("http://127.0.0.1:8000/recipient/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_data: {
            "First Name": recipientFirstName,
            "Last Name": recipientLastName,
            Gender: recipientGender,
            "Blood Type": recipientBloodType,
            Race: recipientRace,
            "Use of dialysis": recipientUseOfDyalisis,
          },
        }),
      });
      if (response.ok) {
        props.onClose();
      } else {
        console.log("error");
      }
    }
  };

  const sendAddDonorRequest = async () => {
    const isCorrect = true;

    if (isCorrect) {
      const response = await fetch("http://127.0.0.1:8000/donor/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donor_data: {
            "First Name": donorFirstName,
            "Last Name": donorLastName,
            Gender: donorGender,
            "Blood Type": donorBloodType,
            Race: donorRace,
            "Donor Type": donorDonorType,
          },
        }),
      });
      if (response.ok) {
        props.onClose();
      } else {
        console.log("error");
      }
    }
  };

  const sendUpdateRecipientRequest = async (id: number) => {
    const isCorrect = true; // You may want to replace this with actual validation

    if (isCorrect) {
      const response = await fetch(`http://127.0.0.1:8000/recipient/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_data: {
            "First Name": recipientFirstName,
            "Last Name": recipientLastName,
            Gender: recipientGender,
            "Blood Type": recipientBloodType,
            Race: recipientRace,
            "Use of dialysis": recipientUseOfDyalisis,
          },
        }),
      });
      if (response.ok) {
        props.onClose();
      } else {
        console.log("error");
      }
    }
  };

  const sendUpdateDonorRequest = async (id: number) => {
    const isCorrect = true; // You may want to replace this with actual validation

    if (isCorrect) {
      const response = await fetch(`http://127.0.0.1:8000/donor/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donor_data: {
            "First Name": donorFirstName,
            "Last Name": donorLastName,
            Gender: donorGender,
            "Blood Type": donorBloodType,
            Race: donorRace,
            "Donor Type": donorDonorType,
          },
        }),
      });
      if (response.ok) {
        props.onClose();
      } else {
        console.log("error");
      }
    }
  };

  const sendAddPairDetailedRequest = async () => {
    // THIS FUNCTION IS NOT CORRECT YET
    const isCorrect = true;

    if (isCorrect) {
      const response = await fetch("http://localhost:8080/pair", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donor_data: {
            donorFirstName,
            donorLastName,
            donorGender,
            donorBloodType,
            donorRace,
            donorDonorType,
          },
          recipient_data: {
            recipientFirstName,
            recipientLastName,
            recipientGender,
            recipientBloodType,
            recipientRace,
            recipientUseOfDyalisis,
          },
        }),
      });
      if (response.ok) {
        props.onClose();
      } else {
        console.log("error");
      }
    }
  };

  return (
    <BlurredBackdrop>
      <ModalContainer className="w-1/3 pr-5 pl-5 pt-5 pb-8">
        <form>
          <div className="flex justify-evenly">
            {props.displayType === formTypes.RECIPIENT && (
              <div className="text-center">
                <div>
                  {props.functionalityType === formFunctionalityTypes.EDIT && (
                    <h2 className="text-2xl font-semibold mb-2">
                      Edit Recipient
                    </h2>
                  )}
                  {props.functionalityType ===
                    formFunctionalityTypes.CREATE && (
                    <h2 className="text-2xl font-semibold mb-2">
                      Add Recipient
                    </h2>
                  )}
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
              </div>
            )}
            {props.displayType === formTypes.DONOR && (
              <div className="text-center">
                {props.functionalityType === formFunctionalityTypes.EDIT && (
                  <h2 className="text-2xl font-semibold mb-2">Edit Donor</h2>
                )}
                {props.functionalityType === formFunctionalityTypes.CREATE && (
                  <h2 className="text-2xl font-semibold mb-2">Add Donor</h2>
                )}

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
                    value={config.value || config.options[0]}
                    onChange={handleInputChange}
                  />
                ))}
              </div>
            )}
            {props.displayType === formTypes.PAIR && (
              <div className="justify-evenly">
                <div className="text-center">
                  <div>
                    {props.functionalityType ===
                      formFunctionalityTypes.EDIT && (
                      <h2 className="text-2xl font-semibold mb-2">
                        Edit Recipient
                      </h2>
                    )}
                    {props.functionalityType ===
                      formFunctionalityTypes.CREATE && (
                      <h2 className="text-2xl font-semibold mb-2">
                        Add Recipient
                      </h2>
                    )}
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
                </div>
                <div className="text-center">
                  {props.functionalityType === formFunctionalityTypes.EDIT && (
                    <h2 className="text-2xl font-semibold mb-2">Edit Donor</h2>
                  )}
                  {props.functionalityType ===
                    formFunctionalityTypes.CREATE && (
                    <h2 className="text-2xl font-semibold mb-2">Add Donor</h2>
                  )}
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
            )}
          </div>
        </form>
        <CloseButton onClick={props.onClose} />
        <div className="w-full flex justify-center items-center">
          <div className="w-40">
            {props.functionalityType === formFunctionalityTypes.EDIT && (
              <Button name="Save changes" onClick={buttonOnClick} /> // PUT THE EDITING API FUNCTIONS HERE
            )}
            {props.functionalityType === formFunctionalityTypes.CREATE && (
              <Button
                name={
                  props.displayType === formTypes.PAIR
                    ? "Add pair"
                    : "Add patient"
                }
                onClick={
                  // account for pair in button naming!!!
                  props.displayType === formTypes.DONOR
                    ? sendAddDonorRequest
                    : props.displayType === formTypes.PAIR
                    ? sendAddPairDetailedRequest
                    : sendAddRecipientRequest
                }
              />
            )}
          </div>
        </div>
      </ModalContainer>
    </BlurredBackdrop>
  );
}

export default PatientForm;
