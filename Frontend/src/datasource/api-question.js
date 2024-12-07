import { getToken } from "../components/auth/auth-helper";

let apiURL = process.env.REACT_APP_API_URL;

// Function to get all questions related to an ad by adId
const getQuestionsByAdId = async (adId) => {
    try {
        let response = await fetch(apiURL + `/questions/byAdId/${adId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// Function to create a new question related to an ad
const createQuestion = async (question) => {
    try {
        let response = await fetch(apiURL + '/questions/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(question)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// Function to answer a question if the user is the owner of the ad
const answerQuestion = async (questionId, answerText) => {
    try {
        let response = await fetch(apiURL + `/questions/answer/${questionId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify({ answerText })
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { getQuestionsByAdId, createQuestion, answerQuestion };
