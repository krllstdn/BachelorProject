import React, { useState } from "react";
import Button from "./button";
import { SideBarItemData } from "./sidebar";
import { SideBarItem } from "./sidebar";

export type Tab = {
  title: string;
  content: SideBarItemData[];
};

type TabsProps = {
  tabs: Tab[];
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function Tabs(props: TabsProps) {
  const tabs = props.tabs;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

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
          <button key={index} onClick={() => setActiveTabIndex(index)}>
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs[0].content.map(
          (item, index) =>
            SideBarItem({
              fields: item,
              key: index,
              isSelected: selectedItem === index,
              onClick: () => setSelectedItem(index),
            }) // why is it a function?
        )}
      </div>
      <div className="mt-4">
        <Button
          name={"Add " + tabs[activeTabIndex].title + " +"}
          onClick={props.onButtonClick}
        />
      </div>
    </div>
  );
}

export default Tabs;
