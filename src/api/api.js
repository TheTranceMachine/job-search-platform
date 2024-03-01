import axios from 'axios';

const apiCall = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_AUTH_SERVICE_URL
})

const post = async (...args) => {
    try {
        return await apiCall.post(...args);
    } catch (e) {
        return { error: e.response.data };
    }
}

const get = async (...args) => {
    try {
        return await apiCall.get(...args);
    } catch (e) {
        return { error: e.response.data };
    }
}

const registerUser = (payload) => post('/register', payload);

const registrationEmailResend = (payload) => post('/register/resend', payload);

const forgottenPasswordEmail = (payload) => post('/forgot_password', payload);

const loginUser = (payload) => post('/login', payload);

const fetchAllToDos = () => get('/todos');

const fetchAllSavedJobs = () => get('/jobs');

const fetchHackerNewsJob = (payload) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${payload.id}.json`);

const fetchAllHackerNewsJobs = () => axios.get('https://hacker-news.firebaseio.com/v0/jobstories.json');

const logoutUser = () => get('/logout');


export { registerUser, registrationEmailResend, loginUser, forgottenPasswordEmail, fetchAllToDos, fetchHackerNewsJob, fetchAllHackerNewsJobs, fetchAllSavedJobs, logoutUser }
