import Vue from 'vue';
import Vuex from 'vuex';
import cartModule from './cart'
import userModule from './user'
// 安装 Vuex
Vue.use(Vuex);

// 创建 store 
const store = new Vuex.Store({
	state: {
		msg: 'vuex 成功运行...'
	},
	modules: {
		'm_cart': cartModule,
		'm_address': userModule
	}
})
export default store
