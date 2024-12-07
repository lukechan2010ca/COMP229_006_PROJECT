let apiURL = process.env.REACT_APP_API_URL;
//let apiURL = "http://localhost:3001";
const signin = async (user) => {
    try {
        let response = await fetch(apiURL + '/users/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const signup = async (user) => {
    try {
        let response = await fetch(apiURL + '/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Registration failed' };
    }
};

const editProfile = async (user, userId) => {
    try {
        let response = await fetch(`${apiURL}/users/edit/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        console.log("this is the part of api-user.js");
        console.log(user);
        console.log(JSON.stringify(user, null, 2));
        return await response.json()
    } catch (err) {
        console.log(err)
    }
};

const getUserProfile = async (userId) => {
    try {
        let response = await fetch(`${apiURL}/users/get/${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Failed to fetch user profile' };
    }
};

export { signin, signup, editProfile, getUserProfile };