import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://k-burger-builder.firebaseio.com/'
});

export default instance;