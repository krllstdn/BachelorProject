import Button from "./button"


export default function AddNewPair() {
    return (
        <div className="absolute top-0 left-0 z-10 flex justify-center 
                        items-center bg-opacity-10 bg-black backdrop-blur-sm 
                        h-screen w-screen">
            <div className="w-96 bg-secondary pr-5 pl-5 pt-5 pb-8">
                <h1 className="text-center text-2xl font-semibold">Add new pair</h1>
                <div className="flex flex-col space-y-4">
                    <Button name="New patients" />
                    <Button name="Existing patients" />
                </div>
                {/* <p className="text-black z-10">X</p> */}
            </div>
        </div>
    )
}


function addNewPairNew() {
    return (
        <div>
        </div>
    )
}

 
function addNewPairExisting() {
    return (
        <div>
        </div>
    )
}

