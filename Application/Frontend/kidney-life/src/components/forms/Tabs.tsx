import React, { useState } from "react";
import Button from "../buttons/Button";
import { SideBarItemData } from "../layout/Sidebar";
import { SideBarItem } from "../layout/Sidebar";
import { Dispatch, SetStateAction } from "react";

export type Tab = {
  title: string;
  content: SideBarItemData[];
};

type TabsProps = {
  tabs: Tab[];
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setActiveTab?: Dispatch<SetStateAction<number>>;
};

function Tabs(props: TabsProps) {
  const tabs = props.tabs;
  const setActiveTab = props.setActiveTab || (() => {});
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(0);
  const [fadeOut, setFadeOut] = useState(false);

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
            onClick={() => {
              setFadeOut(true);

              setTimeout(() => {
                setActiveTabIndex(index);
                setActiveTab(index);
                setFadeOut(false);
              }, 150);
            }}
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
            SideBarItem({
              fields: item,
              key: itemIndex,
              isSelected: selectedItem === itemIndex,
              onClick: () => setSelectedItem(itemIndex),
            })
          )}
        </div>
      ))}

      <div className="mt-5 mb-2">
        <Button
          name={"Add " + tabs[activeTabIndex].title + " +"}
          onClick={props.onButtonClick}
        />
      </div>
    </div>
  );
}

export default Tabs;
