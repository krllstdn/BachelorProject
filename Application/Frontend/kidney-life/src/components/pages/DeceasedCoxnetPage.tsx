import { useState, useEffect } from "react";
import InputField from "../forms/InputField";
import { SelectFieldCox } from "../forms/SelectField";
import features from "../../models/coxnet_deceased_desc.json";
import ModalContainer from "../wrappers/ModalContainer";
import Button from "../buttons/Button";

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
  //   const [featureStates, setFeatureStates] = useState(
  //     features.features.reduce((acc, feature) => {
  //       acc[feature.name] = feature.type === "categorical" ? "" : 0; // initial state
  //       return acc;
  //     }, {})
  //   );

  return (
    <div>
      {/* <div className="flex items-center justify-center min-h-screen"> */}
      <ModalContainer className="w-2/5 h-full pr-5 pl-5 pt-6 pb-8 ml-7 mt-3">
        <h1 className="text-3xl text-center pb-5">Deceased Coxnet Page</h1>
        {features.features.map((feature) =>
          feature.type === "categorical" ? (
            <SelectFieldCox
              name={feature.name}
              //   label={feature.description}
              key={feature.name}
              text={feature.short_description}
              value=""
              description={feature.description}
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
            />
          )
        )}
        <Button additionalStyles="mt-3" name="Submit" />
      </ModalContainer>
      {/* </div> */}
    </div>
  );
}

export default DeceasedCoxnetPage;
