import './App.css';
import axios from 'axios'
import React from 'react';

function App() {

  const baseUrl = "https://192.168.42.44:7234/api/Lights";
  const [christmafyingStatus, setChristmafyingStatus] = React.useState("");

  async function Christmafy(){
    const groupsSelect = document.getElementById("groups");
    const selectedGroup = groupsSelect.value;
    setChristmafyingStatus(`Christmafying ${selectedGroup} ...`)
    console.log(christmafyingStatus)
    await axios.post(baseUrl + "/Christmafy",  null, {
      params: {
        groupName: selectedGroup
      }
    })
    setChristmafyingStatus('Christmafied')
  }

  function resetChristmafyingStatus(){
    setChristmafyingStatus("")
  }
  const [groups, setGroups] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseUrl + "/groups").then((response) => {
      setGroups(response.data);
    });
  }, []);

  if (!groups) return "GROUPS WAS NULL"
  return (
    <div>
      <h1 className="groupSelectText">Choose a group:</h1>
      <select className="groupSelect" name="groups" id="groups" onClick={resetChristmafyingStatus}>
        {groups.map((group, index) => (
          <option key={index} value={group}>
            {group}
          </option> 
        ))}
      </select>
      <button className="christmafyButton" onClick={Christmafy}>
        Christmafy!
      </button>
      <h2 className="christmafyingStatusText">{christmafyingStatus}</h2>
    </div>
  );
}

export default App;
