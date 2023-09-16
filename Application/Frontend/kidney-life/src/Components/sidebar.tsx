import Button from "./button"

function SideBarItem() {
    // use ternary operator and props to show different info: donor or recipient
    return (
        <div className="bg-tertiary mt-4 p-3 rounded-md">
            <p><strong>Pair id</strong> 123</p>
            <p><strong>Blood group:</strong> A</p>
            <p><strong>Type</strong> Deceased</p>
        </div>
    )
}

type ButtonComponentProps = {
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

function SideBar(props: ButtonComponentProps) {
    // use ternary operator and props to show different info: donor or recipient
    // i need to do tabs here
    return (
        <div className="flex flex-col bg-secondary p-4 w-72 h-auto ml-8 mt-5 
                        mb-8 mr-5 rounded-md">
            <h1 className="text-center text-2xl font-semibold">Pairs</h1>
            <div className="flex flex-col flex-grow">
                <SideBarItem />
                <SideBarItem />
                <SideBarItem />
                <SideBarItem />
                <SideBarItem />
                <SideBarItem />

                <Button name="Add Pair +" onClick={props.onButtonClick} />
            </div>
        </div>
    )
}

export default SideBar;
