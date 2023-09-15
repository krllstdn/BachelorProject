import React from 'react';
import SelectField from './selectField';

// type ParamDisplayProps = {
//     data: {
//         header: string;
//         fields: {
//             [key: string]: string;
//         };
//     };
// };

// duplication of code from addNewPairNew.tsx
type SetterMap = {
    [key: string]: React.Dispatch<React.SetStateAction<string>>;
};

function ParamDisplay() {
    const models = ["Random Survival Forest", "Cox Proportional Hazards", 
                    "DeepSurv", "DeepHit", "DeepHit with Cox"];
    const funcType = ["Survival Function", "Hazard Function"];
    const timeframe = ["1 year", "2 years", "3 years", "4 years", "5 years",
                       "6 years", "7 years", "8 years", "9 years", "10 years"];
    
    const [model, setModel] = React.useState<string>("");
    const [functionType, setFunctionType] = React.useState<string>("");
    const [timeFrame, setTimeFrame] = React.useState<string>("");

    const setters: SetterMap = {
        model: setModel,
        functionType: setFunctionType,
        timeFrame: setTimeFrame,
    };

    const selectParametersConfig = [
        { name: "model", text: "Model:", options: models, value: model},
        { name: "functionType", text: "Function Type:", options: funcType, value: functionType},
        { name: "timeFrame", text: "Time Frame:", options: timeframe, value: timeFrame},
    ]

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const setter = setters[name];
        if (setter) {
            setter(value);
        }
    };

    return (
        <div className="info-display flex-grow mt-2">
            <div className="bg-secondary m-3 mb-0 p-4 pr-8 pl-8 rounded-md text-lg 
                            ">
                <h2 className='text-3xl font-semibold mb-4'>Parameters</h2>
                {selectParametersConfig.map((config) => (
                    <SelectField key={config.name}
                                name={config.name}
                                text={config.text}
                                options={config.options}
                                value={config.value}
                                onChange={handleSelectChange} />
                ))}

            </div>
        </div>
    );
}

export default ParamDisplay;

