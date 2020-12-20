import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://project-management-tool-ae99c-default-rtdb.firebaseio.com/'
});

export default instance;