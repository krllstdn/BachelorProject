import Button from "../buttons/Button";
import { Tab } from "../forms/Tabs";
import Tabs from "../forms/Tabs";
import { Dispatch, SetStateAction } from "react";

export type SideBarItemData = {
  [key: string]: string | number;
};

export type SideBarItemProps = {
  key: number;
  isSelected: boolean;
  onClick: () => void;
  fields: SideBarItemData;
};

export function SideBarItem({
  key = 1,
  isSelected = false,
  onClick = () => {},
  fields = { "Pair id": 123, "Blood group": "A", Type: "Deceased" },
}: SideBarItemProps) {
  return (
    <div
      key={key}
      onClick={onClick}
      className={
        "bg-tertiary mt-4 p-3 rounded-md transition duration-800 cursor-pointer " +
        (isSelected ? "border-r-6 border-primary" : "")
      }
    >
      {Object.entries(fields).map(([text, value]) => (
        <p key={text}>
          <strong>{text}:</strong> {value}
        </p>
      ))}
    </div>
  );
}

type SidebarProps = {
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tabs: Tab[];
  setActiveTab?: Dispatch<SetStateAction<number>>;
  onOpenCreateDonor?: () => void;
  onOpenCreateRecipient?: () => void;
  onOpenCreatePair?: () => void;
};

function SideBar(props: SidebarProps) {
  return (
    <div
      className="flex flex-col bg-secondary p-4 pt-2 pb-2 w-72 h-auto ml-8 mt-2 
                        mb-0 mr-5 rounded-md md:ml-2"
    >
      <div className="flex flex-col flex-grow">
        <Tabs
          onButtonClick={props.onButtonClick}
          tabs={props.tabs}
          setActiveTab={props.setActiveTab}
          onOpenCreateDonor={props.onOpenCreateDonor}
          onOpenCreateRecipient={props.onOpenCreateRecipient}
          onOpenCreatePair={props.onOpenCreatePair}
        />
      </div>
    </div>
  );
}

export default SideBar;
