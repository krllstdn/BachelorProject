import Button from "./button"
import { AddNewPairButton } from "./button"

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

function InputField(props: {name: string}) {
    return (
        <div className="bg-quaternary p-3 mb-3">
            <label className="text-primary font-semibold mr-3">{props.name}</label>
            <input className="border-none outline-none bg-inherit border-primary" 
                    type="text" />
        </div>
    )
}

function SelectField(props: {name: string, options: string[]}) {    
    return (
        <div className="bg-quaternary p-3 text-left flex mb-3">
            <label className="text-primary font-semibold mr-3">{props.name}</label>
            <select className="flex-grow border-0 bg-inherit outline-none border-primary">
                {props.options.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}


export default function AddNewPairNew() {
    // array of options for select fields
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    const useOfDyalisis = ["Yes", "No"]
    const race = ["White", "Black", "Asian", "Other"]
    const gender = ["Male", "Female"]
    const donorType = ["Living", "Deceased"]

    return (
        <div className="absolute top-0 left-0 z-10 flex justify-center 
                        items-center bg-opacity-10 bg-black backdrop-blur-sm 
                        h-screen w-screen">
            <div className="relative w-1/2 md:w-2/3 bg-secondary pr-5 pl-5 pt-5 pb-8
                            rounded-md border-2 border-primary">
                <h1 className="text-center text-3xl font-semibold mb-2">Add new pair: New</h1>
                <div className="flex justify-evenly">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">New Recipient</h2>
                        <InputField name="First name:" />
                        <SelectField name="Gender:" options={gender} />
                        <SelectField name="Blood type:" options={bloodTypes} />
                        <SelectField name="Race:" options={race} />
                        <SelectField name="Use of dialysis:" options={useOfDyalisis} />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">New Donor</h2>
                        <InputField name="First name:" />
                        <SelectField name="Gender:" options={gender} />
                        <SelectField name="Blood type:" options={bloodTypes} />
                        <SelectField name="Race:" options={race} />
                        <SelectField name="Donor type:" options={donorType} />
                    </div>
                </div>
                <button className="absolute top-0 right-0 text-primary pr-5 pt-2
                                    text-3xl"> &times;</button>
                <div className="w-full flex justify-center items-center">
                    <div className="w-40">
                        <AddNewPairButton />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

 
export function AddNewPairExisting() {
    return (
        <div>
        </div>
    )
}

