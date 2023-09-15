import React from 'react';
import './App.css';
import SideBar from './components/sidebar';
import NavBar from './components/navbar';
import AddNewPairNew from './components/addNewPairNew';
import AddNewPairExisting from './components/addNewPairExisting';
import AddNewPair from './components/addNewPair';
import InfoDisplay from './components/infoDisplay';
import Button from './components/button';
import ParamDisplay from './components/paramDisplay';

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

  return (
      <div className="App-body">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="add-new-pair">
          {/* <AddNewPairExisting /> */}
          {/* <AddNewPairNew /> */}
        </div>
        <div className="main flex pr-5 w-screen">
          <div className="sidebar inline-block">
            <SideBar />
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <InfoDisplay data={infoPrediction} />
              <ParamDisplay />
            </div>
            <div className="flex justify-between">
              <InfoDisplay data={infoDataRecipient} />
              <InfoDisplay data={infoDataDonor} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
