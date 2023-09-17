import React, { useState } from 'react';
import './App.css';
import SideBar from './components/sidebar';
import NavBar from './components/navbar';
import AddNewPairNew from './components/addNewPairNew';
import AddNewPairExisting from './components/addNewPairExisting';
import AddNewPair from './components/addNewPair';
import InfoDisplay from './components/infoDisplay';
import Button from './components/button';
import ParamDisplay from './components/paramDisplay';
import {SideBarItem} from './components/sidebar';
import { Tab } from './components/tabs';

function App() {
  const infoDataRecipient = {
    header: "Recipient info",
    fields: {
        "Name": "John Doe",
        "Age": "25",
        "Blood Group": "A+",
        "Gender": "Male",
        "Use of Dyalisis": "No",
        "Race": "White"
    }
  };

  const infoDataDonor = {
    header: "Donor info",
    fields: {
        "Name": "Jane Doe",
        "Age": "25",
        "Blood Group": "A+",
        "Gender": "Female",
        "Donor Type": "Living",
        "Race": "White"
    }
  };

  const infoPrediction = {
    header: "Prediction",
    fields: {
        "Probability": "0.8",
        "Confidence": "0.9",
        "Years": "5.3",
        "Risk Score": "0.7"
  }
  };

  const VIEWS = {
    NONE: 'NONE',
    ADD_NEW_PAIR: 'ADD_NEW_PAIR',
    ADD_NEW_PAIR_NEW: 'ADD_NEW_PAIR_NEW',
    ADD_NEW_PAIR_EXISTING: 'ADD_NEW_PAIR_EXISTING'
  };

  const [currentView, setCurrentView] = useState(VIEWS.NONE);

  const handleOpenAddNewPair = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR);
  };

  const handleClose = () => {
    setCurrentView(VIEWS.NONE);
  };

  const handleOpenAddNewPairNew = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR_NEW);
  };

  const handleOpenAddNewPairExisting = () => {
    setCurrentView(VIEWS.ADD_NEW_PAIR_EXISTING);
  };

  const tab: Tab[] = [
    {
        title: "Pairs",
        content: <div>
                    <SideBarItem />
                    <SideBarItem />
                </div>
    }];

  return (
      <div className="App-body">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="add-new-pair">
        {currentView === VIEWS.ADD_NEW_PAIR && (
          <AddNewPair
            onClickNew={handleOpenAddNewPairNew}
            onClickExisting={handleOpenAddNewPairExisting}
            onClose={handleClose}
          />
        )}
        {currentView === VIEWS.ADD_NEW_PAIR_NEW && (
          <AddNewPairNew onClose={handleClose} />
        )}

        {currentView === VIEWS.ADD_NEW_PAIR_EXISTING && (
          <AddNewPairExisting onClose={handleClose} />
        )}
        </div>
        <div className="main flex pr-5 w-screen">
          <div className="sidebar inline-block">
            <SideBar tabs={tab} onButtonClick={handleOpenAddNewPair}/>
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <InfoDisplay data={infoPrediction} styles='m-3 mb-0 p-12 pb-28'/>
              <ParamDisplay />
            </div>
            <div className="flex justify-between">
              <InfoDisplay data={infoDataRecipient} styles='m-3 mb-0 p-12 pb-28' />
              <InfoDisplay data={infoDataDonor} styles='m-3 mb-0 p-12 pb-28'/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
