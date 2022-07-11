import axios from "axios";
let service = axios.create({
    baseURL: 'http://localhost:3000/',
    // baseURL: 'http://openapi.music.163.com/openapi/music/basic/',
    timeout: 3000
});
export default service;