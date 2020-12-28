import axios from 'axios';

const getUserInfo = async (userName) => {
    try {
        let response = await axios.get(
            `https://api.github.com/users/${userName}`
        );
        const { id, login, avatar_url, bio, html_url, name } = response.data;
        return { id, login, avatar_url, bio, html_url, name };
    } catch (error) {
        return { error };
    }
};

const getUsersRepos = async (userName) => {
    try {
        let response = await axios.get(
            `https://api.github.com/users/${userName}/repos`
        );
        response = response.data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 5)
            .map(({ id, name, html_url }) => {
                return { id, name, html_url };
            });
        return response;
    } catch (error) {
        return { error };
    }
};

export { getUserInfo, getUsersRepos };
