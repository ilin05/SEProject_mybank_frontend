import './assets/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {sha256} from "js-sha256";
import SHA256 from 'crypto-js/sha256';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


//axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'http://10.195.2.78:8000';

axios.defaults.baseURL = 'http://10.194.101.53:8080';

axios.interceptors.request.use( config =>{
    const token = sessionStorage.getItem('token')
    if(token) config.headers.Authorization = token
    // if(config.data && config.data.password) {
    //     const hashPassword = SHA256(config.data.password).toString();
    //     config.data.password = hashPassword;
    // }
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use( response => {
    if(response.data.code === 0 && response.data.message === 'NOT_LOGIN') {
        sessionStorage.removeItem('token')
        alert("登陆过期")
        router.push('/login')
    }
    return response
},error => {
    return Promise.reject(error)
})



app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')

