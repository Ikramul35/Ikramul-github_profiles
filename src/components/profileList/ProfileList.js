import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './ProfileList.module.css';

const ProfileList = () => {
    const { users, delUser } = useContext(UserContext);

    return (
        <>
            <h2 className={styles.header}>Users</h2>
            <div className={styles.profileListContainer}>
                {users.length ? (
                    users.map((user) => (
                        <div className={styles.profileContainer} key={user.id}>
                            <div className={styles.userAvatarContainer}>
                                <img
                                    className={styles.userAvatar}
                                    src={user.avatar_url}
                                    alt="User Avatar"
                                />
                            </div>
                            <div className={styles.userInfo}>
                                <p>
                                    <a
                                        href={user.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {user.login}
                                    </a>
                                    {user.name ? ` (${user.name})` : ''}
                                </p>
                                {user.bio && (
                                    <p className={styles.userBio}>
                                        {user.bio.length < 90
                                            ? user.bio
                                            : `${user.bio.slice(0, 90)}...`}
                                    </p>
                                )}
                                {user.repos.length ? (
                                    <ul>
                                        Top {user.repos.length} repos:
                                        {user.repos.map((repo) => (
                                            <li key={repo.id}>
                                                <a
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {repo.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className={styles.userDeleteButton}>
                                <button onClick={() => delUser(user.login)}>
                                    X
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No User Added</p>
                )}
            </div>
        </>
    );
};

export default ProfileList;
