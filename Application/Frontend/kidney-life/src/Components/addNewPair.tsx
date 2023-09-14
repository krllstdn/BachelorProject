import Button from "./button"
import { AddNewPairButton } from "./button"
import SideBar from "./sidebar"
import React, { useState } from 'react';


export function AddNewPair() {
    return (
        <div className="absolute top-0 left-0 z-10 flex justify-center 
                        items-center bg-opacity-10 bg-black backdrop-blur-sm 
                        h-screen w-screen">
            <div className="relative w-96 bg-secondary pr-5 pl-5 pt-5 pb-8
                            rounded-md border-2 border-primary">
                <h1 className="text-center text-2xl font-semibold">Add new pair</h1>
                <div className="flex flex-col space-y-4">
                    <Button name="New patients" />
                    <Button name="Existing patients" />
                </div>
                <button className="absolute top-0 right-0 text-primary pr-2
                                    text-3xl">
                    &times;
                </button>

            </div>
        </div>
    )
}

type InputFieldProps = {
    name: string;
    text: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField(props: InputFieldProps) {
    return (
        <div className="bg-quaternary p-3 mb-3">
            <label className="text-primary font-semibold mr-3">{props.text}</label>
            <input name={props.name} className="border-none outline-none bg-inherit border-primary"
                type="text" onChange={props.onChange} value={props.value} />
        </div>
    )
}

type SelectFieldProps = {
    name: string;
    text: string;
    options: string[];
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};


function SelectField(props: SelectFieldProps) {
    return (
        <div className="bg-quaternary p-3 text-left flex mb-3">
            <label className="text-primary font-semibold mr-3">{props.text}</label>
            <select className="flex-grow border-0 bg-inherit outline-none border-primary"
                onChange={props.onChange} value={props.value}>
                {props.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}


type SetterMap = {
    [key: string]: React.Dispatch<React.SetStateAction<string>>;
};


export default function AddNewPairNew() {
    // array of options for select fields
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    const useOfDyalisis = ["Yes", "No"]
    const race = ["White", "Black", "Asian", "Other"]
    const gender = ["Male", "Female"]
    const donorType = ["Living", "Deceased"]

    const [recipientFirstName, setRecipientFirstName] = useState<string>("");
    const [recipientLastName, setRecipientLastName] = useState<string>("");
    const [recipientGender, setRecipientGender] = useState<string>("");
    const [recipientBloodType, setRecipientBloodType] = useState<string>("");
    const [recipientRace, setRecipientRace] = useState<string>("");
    const [recipientUseOfDyalisis, setRecipientUseOfDyalisis] = useState<string>("");

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const setter = setters[name];
        if (setter) {
            setter(value);
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    };

    return (
        <div className="absolute top-0 left-0 z-10 flex justify-center 
                        items-center bg-opacity-10 bg-black backdrop-blur-sm 
                        h-screen w-screen">
            <div className="relative w-1/2 md:w-2/3 bg-secondary pr-5 pl-5 
                            pt-5 pb-8 rounded-md border-2 border-primary">
                <h1 className="text-center text-3xl font-semibold mb-2">
                    Add new pair: New</h1>
                <form>
                    <div className="flex justify-evenly">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold mb-2">
                                New Recipient</h2>
                            <InputField name="recipientFirstName" text="First name:"
                                        value={recipientFirstName} 
                                        onChange={handleInputChange} />
                            <InputField name="recipientLastName" text="Last name:"
                                        value={recipientLastName} 
                                        onChange={handleInputChange} />
                            <SelectField name="recipientGender" text="Gender:"
                                        options={gender} value={recipientGender} 
                                        onChange={handleSelectChange} />
                            <SelectField name="recipientBloodType" text="Blood type:"
                                        options={bloodTypes} value={recipientBloodType} 
                                        onChange={handleSelectChange} />
                            <SelectField name="recipientRace" text="Race:"
                                        options={race} value={recipientRace} 
                                        onChange={handleSelectChange} />
                            <SelectField name="recipientUseOfDyalisis"
                                        text="Use of dialysis:" options={useOfDyalisis} 
                                        value={recipientUseOfDyalisis} 
                                        onChange={handleSelectChange} />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold mb-2">New Donor</h2>
                            {/* add validation logic */}
                            <InputField name="donorFirstName" text="First name:"
                                        value={donorFirstName} 
                                        onChange={handleInputChange} />
                            <InputField name="donorLastName" text="Last name:"
                                        value={donorLastName} 
                                        onChange={handleInputChange} />
                            <SelectField name="donorGender" text="Gender:" 
                                        options={gender} value={donorGender}
                                        onChange={handleSelectChange} />
                            <SelectField name="donorBloodType" text="Blood type:" 
                                        options={bloodTypes} value={donorBloodType}
                                        onChange={handleSelectChange}/>
                            <SelectField name="donorRace" text="Race:" 
                                        options={race} value={donorRace}
                                        onChange={handleSelectChange} />
                            <SelectField name="donorDonorType" text="Donor type:" 
                                        options={donorType} value={donorDonorType}
                                        onChange={handleSelectChange} />
                        </div>
                    </div>
                </form>
                <button className="absolute top-0 right-0 text-primary pr-5 pt-2
                                    text-3xl" type="button"> &times;</button>
                <div className="w-full flex justify-center items-center">
                    <div className="w-40">
                        {/* <AddNewPairButton /> */}
                        <Button name="Add pair +" onClick={buttonOnClick}></Button>
                    </div>
                </div>
            </div>

        </div>
    )
}


export function AddNewPairExisting() {
    return (
        <div className="absolute top-0 left-0 z-10 flex justify-center 
                        items-center bg-opacity-10 bg-black backdrop-blur-sm 
                        h-screen w-screen">
            <div className="relative w-1/2 md:w-2/3 bg-secondary pr-5 pl-5 pt-5 pb-8
                            rounded-md border-2 border-primary">
                <h1 className="text-center text-3xl font-semibold mb-2">Add new pair: Existing</h1>
                <div className="flex justify-evenly">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">New Recipient</h2>

                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">New Donor</h2>

                    </div>
                </div>
            </div>
        </div>
    )
}

