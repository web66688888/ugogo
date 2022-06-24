import Vue from 'vue'
import App from './App'
import 'utils/http.js'
import store from './store/store'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
