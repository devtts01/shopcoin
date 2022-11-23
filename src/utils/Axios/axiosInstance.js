import axios from 'axios';

// AUTHENTICATION
export const authInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/authentication/`,
    // baseURL: 'http://localhost:8000/authen/',
    withCredentials: true,
});
export const authPost = async (path, options = {}) => {
    const res = await authInstance.post(path, options);
    return res.data;
};
// REFRESH TOKEN
export const refreshToken = async (path, options = {}) => {
    const res = await authInstance.post(path, options);
    return res.data;
};
// ADMIN
export const adminInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/admin/`,
    // baseURL: 'http://localhost:8000/admin/',
    withCredentials: true,
});
export const adminGet = async (path, options = {}) => {
    const res = await adminInstance.get(path, options);
    return res.data;
};
export const adminPost = async (path, options = {}) => {
    const res = await adminInstance.post(path, options);
    return res.data;
};
export const adminPut = async (path, options = {}) => {
    const res = await adminInstance.put(path, options);
    return res.data;
};
export const adminDelete = async (path, options = {}) => {
    const res = await adminInstance.delete(path, options);
    return res.data;
};
// USERS
export const userInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/users/`,
    // baseURL: 'http://localhost:8000/users/',
    withCredentials: true,
});
export const userGet = async (path, options = {}) => {
    const res = await userInstance.get(path, options);
    return res.data;
};
export const userPost = async (path, options = {}) => {
    const res = await userInstance.post(path, options);
    return res.data;
};
export const userPut = async (path, options = {}) => {
    const res = await userInstance.put(path, options);
    return res.data;
};
export const userDelete = async (path, options = {}) => {
    const res = await userInstance.delete(path, options);
    return res.data;
};
// COINS
export const coinInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/coins/`,
    // baseURL: 'http://localhost:8000/coins/',
    withCredentials: true,
});
export const coinGet = async (path, options = {}) => {
    const res = await coinInstance.get(path, options);
    return res.data;
};
export const coinPost = async (path, options = {}, others = {}) => {
    const res = await coinInstance.post(path, options, others);
    return res.data;
};
export const coinPut = async (path, options = {}, others = {}) => {
    const res = await coinInstance.put(path, options, others);
    return res.data;
};
export const coinDelete = async (path, options = {}, others = {}) => {
    const res = await coinInstance.delete(path, options, others);
    return res.data;
};
