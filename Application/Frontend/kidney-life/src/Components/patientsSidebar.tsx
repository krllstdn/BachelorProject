import { SideBarItem } from "./sidebar";
import SideBar from "./sidebar";
import { Tab } from "./tabs";


function PatientsSidebar() {
    const tabs: Tab[] = [
        {
            title: "Pairs",
            content: <div>
                        <SideBarItem />
                        <SideBarItem />
                    </div>
        },
        {
            title: "Recipients",
            content: <div>
                        <SideBarItem />
                        <SideBarItem />
                    </div>
        },
        {
            title: "Donors",
            content: <div>
                        <SideBarItem />
                        <SideBarItem />
                    </div>
        }
    ];

    return (
        <div className="patients-sidebar">
            <SideBar onButtonClick={() => {}} tabs={tabs} />
        </div>
    )
}
