import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './Suggestion.module.css';

const Suggestion = () => {
    const { user, addUser, userName } = useContext(UserContext);

    return (
        <div className={styles.searchResult} onClick={addUser}>
            {user.login ? (
                <>
                    <img
                        src={user.avatar_url}
                        alt="Users Avatar"
                        className={styles.userAvatar}
                    />
                    <p className={styles.userName}>
                        {user.login} ({user.name})
                    </p>
                </>
            ) : userName.length ? (
                <p>Please input a valid name</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Suggestion;
