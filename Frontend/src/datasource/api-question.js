import { getToken } from "../components/auth/auth-helper";
let apiURL = process.env.REACT_APP_API_URL;
//let apiURL = "http://localhost:3001";
const list = async () => {
    try {
        let response = await fetch(apiURL + '/question/list', {
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

const create = async (question) => {
    try {
        let response = await fetch(apiURL + '/question/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}



const getQuestion = async (id, question) => {
    try {
        let response = await fetch(apiURL + '/question/get/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const answer = async (id) => {
    try {
        let response = await fetch(apiURL + '/question/get/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const deleteQuestion = async (id,question) => {
    try {
        let response = await fetch(apiURL + '/question/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(question)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


export { list, create, getQuestion, answer, deleteQuestion }