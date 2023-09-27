import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import { SideBarItemData } from "../layout/Sidebar";
import { SideBarItem } from "../layout/Sidebar";
import { Dispatch, SetStateAction } from "react";
import { get } from "http";

export type Tab = {
  title: string;
  content: SideBarItemData[];
};

type TabsProps = {
  tabs: Tab[];
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setActiveTab?: Dispatch<SetStateAction<number>>;
  onOpenCreateDonor?: () => void;
  onOpenCreateRecipient?: () => void;
  onOpenCreatePair?: () => void;
};

interface ResultItem {
  recipient_data: any; // Be more specific if possible.
}

interface Response {
  count: number;
  next: any;
  previous: any;
  results: ResultItem[];
}

function Tabs(props: TabsProps) {
  const tabs = props.tabs;
  const setActiveTab = props.setActiveTab || (() => {});
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [recipientData, setRecipientData] = useState<Response>();
  const [donorData, setDonorData] = useState<Response>();
  const [pairData, setPairData] = useState<Response>();

  const fetchData = async (url: string, setData: Function) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      // console.log(jsonData);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const getRecipients = async () => {
    await fetchData("http://127.0.0.1:8000/recipient", setRecipientData);
  };

  const getDonors = async () => {
    await fetchData("http://127.0.0.1:8000/donor", setDonorData);
  };

  const getPairs = async () => {
    await fetchData("http://127.0.0.1:8000/pair", setPairData);
  };

  useEffect(() => {
    // getRecipients();
    // getDonors();
    // getPairs();
  }, []);

  const renderSideBarItem = (item: SideBarItemData, index: number) => {
    return (
      <SideBarItem
        fields={item}
        key={index}
        isSelected={selectedItem === index}
        onClick={() => setSelectedItem(index)}
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
        {tabs[0].content.map(
          (item, index) =>
            SideBarItem({
              fields: item,
              key: index,
              isSelected: selectedItem === index,
              onClick: () => setSelectedItem(index),
            }) // why is it a function?
        )}
        <div className="mt-4">
          {props.onButtonClick ? (
            <Button
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
          {tab.content.map((item, itemIndex) =>
            renderSideBarItem(item, itemIndex)
          )}
          {/* {donorData.results.map((item, itemIndex) =>
            renderSideBarItem(item, itemIndex)
          )} */}
        </div>
      ))}

      <div className="mt-5 mb-2">{renderAddButton()}</div>
    </div>
  );
}

export default Tabs;
