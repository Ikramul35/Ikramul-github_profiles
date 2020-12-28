import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './SearchField.module.css';
import Suggestion from './Suggestion';

let SearchBar = () => {
    const { setUserName, userName } = useContext(UserContext);
    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Type the name of User"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className={styles.inputField}
            />
            {userName && <Suggestion />}
        </div>
    );
};

export default SearchBar;
