let apiURL = process.env.REACT_APP_APIURL
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
        let response = await fetch(apiURL + '/users/register', {
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

export { signin, signup }