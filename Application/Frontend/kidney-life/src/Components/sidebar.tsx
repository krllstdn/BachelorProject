import Button from "./button"
import { Tab } from "./tabs";
import Tabs from "./tabs";

export function SideBarItem() {

    return (
        <div className="bg-tertiary mt-4 p-3 rounded-md">
            <p><strong>Pair id</strong> 123</p>
            <p><strong>Blood group:</strong> A</p>
            <p><strong>Type</strong> Deceased</p>
        </div>
    )
}

type SidebarProps = {
    onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    tabs: Tab[]; 
  }

function SideBar(props: SidebarProps) {

    return (
        <div className="flex flex-col bg-secondary p-4 pt-2 pb-2 w-72 h-auto ml-8 mt-2 
                        mb-0 mr-5 rounded-md md:ml-2">

            <div className="flex flex-col flex-grow">

                <Tabs onButtonClick={props.onButtonClick} tabs={props.tabs} />

            </div>
        </div>
    )
}

export default SideBar;
