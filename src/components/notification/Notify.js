import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './Notify.module.css';

const Notify = () => {
    const { notificationMessage, notify } = useContext(UserContext);
    return (
        notificationMessage && (
            <div
                className={
                    notify
                        ? styles.displayedNotification
                        : styles.hiddenNotification
                }
            >
                <p className={styles.notificationText}>{notificationMessage}</p>
            </div>
        )
    );
};

export default Notify;
