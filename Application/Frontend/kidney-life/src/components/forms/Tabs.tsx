import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import { SideBarItemData } from "../layout/Sidebar";
import { SideBarItem } from "../layout/Sidebar";
import { Dispatch, SetStateAction } from "react";
import { PatientData } from "../../services/api";

export type Tab = {
  title: string;
  content?: PatientData[];
};

type TabsProps = {
  tabs: Tab[];
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setActiveTab?: Dispatch<SetStateAction<number>>;
  onOpenCreateDonor?: () => void;
  onOpenCreateRecipient?: () => void;
  onOpenCreatePair?: () => void;
  donorData?: any;
  setActiveDonor?: Dispatch<SetStateAction<number | null>>;
  setActiveRecipient?: Dispatch<SetStateAction<number | null>>;
  setActivePair?: Dispatch<SetStateAction<number | null>>;
};

function Tabs(props: TabsProps) {
  const tabs = props.tabs;
  const setActiveTab = props.setActiveTab || (() => {});
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const [fadeOut, setFadeOut] = useState(false);

  const renderSideBarItem = (item: PatientData, index: number) => {
    return (
      <SideBarItem
        fields={item}
        key={index}
        isSelected={selectedItem === index}
        onClick={() => {
          setSelectedItem(index);
          if (tabs[activeTabIndex].title === "Donors") {
            props.setActiveDonor!(index);
          }
          if (tabs[activeTabIndex].title === "Recipients") {
            props.setActiveRecipient!(index);
          }
          if (tabs[activeTabIndex].title === "Pairs") {
            props.setActivePair!(index);
          }
        }}
      />
    );
  };

  const renderAddButton = () => {
    return (
      <Button
        name={"Add " + tabs[activeTabIndex].title.slice(0, -1) + " +"}
        onClick={
          tabs[activeTabIndex].title === "Donors"
            ? props.onOpenCreateDonor
            : tabs[activeTabIndex].title === "Recipients"
            ? props.onOpenCreateRecipient
            : props.onOpenCreatePair
        }
      />
    );
  };

  const onTabClick = (index: number) => {
    setFadeOut(true);

    setTimeout(() => {
      setActiveTabIndex(index);
      setActiveTab(index);
      setFadeOut(false);
    }, 150);
  };

  if (tabs.length === 1) {
    return (
      <div>
        <h1 className="text-center text-2xl font-semibold">{tabs[0].title}</h1>
        {tabs[0].content?.map((item, itemIndex) =>
          renderSideBarItem(item, itemIndex)
        )}
        <div className="mt-4">
          {props.onButtonClick ? (
            <Button // TODO: change to renderAddButton()
              name={"Add " + tabs[0].title + " +"}
              onClick={props.onButtonClick}
            />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabClick(index)}
            className={
              "mr-4 mt-4 mb-1 text-xl font-semibold transition duration-800 " +
              (activeTabIndex === index ? "border-b-3 border-primary" : "")
            }
          >
            {tab.title}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tabs-content transition-opacity duration-800 ease-in ${
            activeTabIndex === index ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          {tab.content?.map((item, itemIndex) =>
            renderSideBarItem(item, itemIndex)
          )}
        </div>
      ))}

      <div className="mt-5 mb-2">{renderAddButton()}</div>
    </div>
  );
}

export default Tabs;
