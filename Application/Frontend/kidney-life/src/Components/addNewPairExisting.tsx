

function AddNewPairExisting() {
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

export default AddNewPairExisting;
