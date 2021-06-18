import axios from 'axios'

const AXIOS = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 5000
});

AXIOS.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

AXIOS.interceptors.response.use(
    // 请求成功
    res => Promise.resolve(res),
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        }
    });
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            // toLogin();
            break;
        // 404请求不存在
        case 404:
            // message.error('请求的资源不存在', 5);
            break;
        default:
            console.log(other);
    }
};

export default AXIOS;