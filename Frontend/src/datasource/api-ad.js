import { getToken } from "../components/auth/auth-helper";

let apiURL = process.env.REACT_APP_API_URL;
//let apiURL = "http://localhost:3001";
const list = async () => {
    try {
        let response = await fetch(apiURL + '/ad/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    } catch (err) {
        console.log(err)
    }
}

const create = async (ad) => {
    try {
        let response = await fetch(apiURL + '/ad/add/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            },
            body: JSON.stringify(ad)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}



const update = async (id, ad) => {
    try {
        let response = await fetch(apiURL + '/ad/edit/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(ad)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const read = async (id) => {
    try {
        let response = await fetch(apiURL + '/ad/get/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { list, create, update, read }