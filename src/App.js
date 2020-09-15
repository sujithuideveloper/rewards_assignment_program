import React, { useState } from 'react';
import UserRewardTable from './userRewardTable';
import { users } from './users';
import './App.css';

function App() {
  const selectOptions = ['Select', ...Object.keys(users)];
  const [selectedUser, setSelectedUser] = useState('Select');
  const setUser = (event) => {
    setSelectedUser(event.target.value);
  }
  return (
    <div className="App">
      <h3>Generate Three month reward points</h3>
      <select onChange={(e) => setUser(e)}>
        {selectOptions.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      {selectedUser !== 'Select' && <UserRewardTable userData={users[selectedUser]} />}
    </div>
  );
}

export default App;
