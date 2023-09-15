import React from 'react';
import './App.css';
import SideBar from './components/sidebar';
import NavBar from './components/navbar';
import AddNewPairNew from './components/addNewPairNew';
import AddNewPairExisting from './components/addNewPairExisting';
import AddNewPair from './components/addNewPair';
import InfoDisplay from './components/infoDisplay';

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

  return (
      <div className="App-body">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="add-new-pair">
          {/* <AddNewPairExisting /> */}
          {/* <AddNewPairNew /> */}
        </div>
        <div className="main flex justify-between pr-5">
          <div className="sidebar inline-block">
            <SideBar />
          </div>
          <InfoDisplay data={infoDataRecipient} />
          <InfoDisplay data={infoDataDonor} />
        </div>
      </div>
  );
}

export default App;
