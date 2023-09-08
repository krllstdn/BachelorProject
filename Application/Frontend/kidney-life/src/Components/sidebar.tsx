

function SideBarItem() {
    return (
        <div className="bg-tertiary mt-4 p-3 rounded-md">
            <p><strong>Pair id</strong> 123</p>
            <p><strong>Blood group:</strong> A</p>
            <p><strong>Type</strong> Deceased</p>
        </div>
    )
}

function AddPairButton() {
    return (
        <div className="add-pair-button mt-6"> 
            <button className="bg-primary rounded-md p-2 w-full text-white">
                Add Pair +
            </button>
        </div>
    )
}


function SideBar() {
    return (
        <div className="flex flex-col bg-secondary p-4 w-72 h-auto ml-8 mt-5 
                        mb-8 rounded-md">
            <h1 className="text-center text-2xl font-semibold">Pairs</h1>
            <div className="flex flex-col flex-grow">
                <SideBarItem />
                <SideBarItem />

                <AddPairButton />
            </div>
        </div>
    )
}

export default SideBar;
