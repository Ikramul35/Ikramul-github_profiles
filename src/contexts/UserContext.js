import React, { createContext, useEffect, useState } from 'react';
import { getUserInfo, getUsersRepos } from '../api/api';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState({});
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notify, setNotify] = useState(false);

    useEffect(() => {
        let fetchUsers = async () => {
            let res = await getUserInfo(userName);
            if ('error' in res) {
                setUser({});
            } else {
                setUser(res);
            }
        };
        if (userName.length) {
            fetchUsers();
        } else {
            setUser({});
        }
    }, [userName]);

    useEffect(() => {
        if (localStorage.getItem('GithubUsers')) {
            setUsers(JSON.parse(localStorage.getItem('GithubUsers')));
        }
    }, []);

    const notifyUser = (message) => {
        setNotificationMessage(message);
        setNotify(true);
        setTimeout(() => {
            setNotify(true);
        }, 500);
        setTimeout(() => {
            setNotify(false);
        }, 3500);
        setTimeout(() => {
            setNotificationMessage('');
        }, 4000);
    };

    const addUser = async () => {
        let userExits = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                userExits = true;
            }
        }

        if (!userExits) {
            let repos = await getUsersRepos(user.login);
            const newUsers = [{ ...user, repos }, ...users];
            setUsers(newUsers);
            localStorage.setItem('GithubUsers', JSON.stringify(newUsers));
            notifyUser(`User ${user.login} is added`);
        } else {
            notifyUser(`User ${user.login} already exists`);
        }
        setUserName('');
        setUser({});
    };

    const delUser = (loginName) => {
        let newUsers = users.filter((usr) => usr.login !== loginName);
        setUsers(newUsers);
        localStorage.setItem('GithubUsers', JSON.stringify(newUsers));
        notifyUser(`User ${loginName} is deleted`);
    };

    return (
        <UserContext.Provider
            value={{
                userName,
                setUserName,
                user,
                addUser,
                delUser,
                users,
                notificationMessage,
                notify,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
