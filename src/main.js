import './assets/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = 'http://10.194.59.163:8000';

axios.interceptors.request.use( config =>{
    const token = sessionStorage.getItem('token')
    if(token) config.headers.Authorization = token
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use( response => {
    if(response.data.code === 0 && response.data.message === 'NOT_LOGIN') {
        sessionStorage.removeItem('token')
        alert("deng lu guo qi")
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

