import React from 'react';
import './App.css';
import Notify from './components/notification/Notify';
import ProfileList from './components/profileList/ProfileList';
import SearchBar from './components/search/SearchField';
import UserContextProvider from './contexts/UserContext';

function App() {
    return (
        <div className="App">
            <UserContextProvider>
                <SearchBar />
                <ProfileList />
                <Notify />
            </UserContextProvider>
        </div>
    );
}

export default App;
