import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import { SideBarItem } from "../layout/Sidebar";
import { PatientData } from "../../services/api";
import { usePatients } from "../../context/patientsPageContext";

export type Tab = {
  title: string;
  content?: PatientData[];
};

type TabsProps = {
  tabs: Tab[];
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenCreateDonor?: () => void;
  onOpenCreateRecipient?: () => void;
  onOpenCreatePair?: () => void;
};

function Tabs(props: TabsProps) {
  const tabs = props.tabs;
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const [fadeOut, setFadeOut] = useState(false);

  const {
    donorData,
    setDonorData,
    recipientData,
    setRecipientData,
    pairData,
    setPairData,
    activeTab,
    setActiveTab,
    selectedPair,
    setSelectedPair,
    selectedRecipient,
    setSelectedRecipient,
    selectedDonor,
    setSelectedDonor,
    handleOpenCreateDonor,
    handleOpenCreateRecipient,
    handleOpenEditPair,
  } = usePatients();

  const renderSideBarItem = (item: PatientData, index: number) => {
    return (
      <SideBarItem
        fields={item}
        key={index}
        isSelected={selectedItem === index}
        onClick={() => {
          setSelectedItem(index);
          if (tabs[activeTab].title === "Donors") {
            setSelectedDonor!(index);
          }
          if (tabs[activeTab].title === "Recipients") {
            setSelectedRecipient!(index);
          }
          if (tabs[activeTab].title === "Pairs") {
            setSelectedPair!(index);
          }
        }}
      />
    );
  };

  const renderAddButton = () => {
    return (
      <Button
        name={"Add " + tabs[activeTab].title.slice(0, -1) + " +"}
        onClick={
          tabs[activeTab].title === "Donors"
            ? handleOpenCreateDonor
            : tabs[activeTab].title === "Recipients"
            ? handleOpenCreateRecipient
            : handleOpenEditPair
        }
      />
    );
  };

  const onTabClick = (index: number) => {
    setFadeOut(true);

    setTimeout(() => {
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
              (activeTab === index ? "border-b-3 border-primary" : "")
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
            activeTab === index ? "opacity-100" : "opacity-0 hidden"
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
