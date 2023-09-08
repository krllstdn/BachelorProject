import Button from "./button"

function SideBarItem() {
    return (
        <div className="bg-tertiary mt-4 p-3 rounded-md">
            <p><strong>Pair id</strong> 123</p>
            <p><strong>Blood group:</strong> A</p>
            <p><strong>Type</strong> Deceased</p>
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

                <Button name="Add Pair +" />
            </div>
        </div>
    )
}

export default SideBar;
