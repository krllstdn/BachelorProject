import { useState, useEffect } from "react";
import InputField from "../forms/InputField";
import { SelectFieldCox } from "../forms/SelectField";
import features from "../../models/coxnet_deceased_desc.json";
import ModalContainer from "../wrappers/ModalContainer";
import Button from "../buttons/Button";
import SurvivalCurvesImage from "../../assets/survival_curves.png";

type Feature = {
  name: string;
  type: string;
  short_description: string;
  description: string;
  possible_values?: {
    [key: string]: string;
  };
};

type FeaturesData = {
  features: Feature[];
};

function DeceasedCoxnetPage() {
  const [featureStates, setFeatureStates] = useState(
    features.features.reduce(
      (acc: { [key: string]: string | number }, feature) => {
        acc[feature.name] =
          feature.type === "categorical"
            ? Object.keys(feature.possible_values || {})[0]
            : 0; // initial state
        return acc;
      },
      {}
    )
  );
  const [showImage, setShowImage] = useState<boolean>(false);

  const sendRequest = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/prediction/predict/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(featureStates),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log(data);
      setShowImage(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-evenly">
      {/* <div className="flex items-center justify-center min-h-screen"> */}
      <ModalContainer className="w-2/5 h-full pr-5 pl-5 pt-6 pb-8 ml-7 mt-3">
        <h1 className="text-3xl text-center pb-5">Coxnet Deceased</h1>
        {features.features.map((feature) =>
          feature.type === "categorical" ? (
            <SelectFieldCox
              name={feature.name}
              //   label={feature.description}
              key={feature.name}
              text={feature.short_description}
              value={featureStates[feature.name]}
              description={feature.description}
              onChange={(e) =>
                setFeatureStates({
                  ...featureStates,
                  [feature.name]: e.target.value,
                })
              }
              options={Object.entries(feature.possible_values || {}).map(
                ([key, value]) => ({
                  value: key,
                  label: value,
                })
              )}
            />
          ) : (
            <InputField
              name={feature.name}
              //   label={feature.description}
              type={feature.type}
              key={feature.name}
              text={feature.short_description}
              description={feature.description}
              onChange={(e) =>
                setFeatureStates({
                  ...featureStates,
                  [feature.name]: e.target.value,
                })
              }
            />
          )
        )}
        <Button
          additionalStyles="mt-3"
          name="Submit"
          onClick={sendRequest}
          // onClick={() => console.log(featureStates)}
        />
      </ModalContainer>
      <div className="w-1/2 ">
        {showImage && (
          <img className="w-full h-50" src={SurvivalCurvesImage} alt="" />
        )}
      </div>
    </div>
  );
}

export default DeceasedCoxnetPage;
