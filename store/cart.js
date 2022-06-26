export default {
	namespaced: true,
	state() {
		return {
			// 初始的状态数据
			carts: uni.getStorageSync('carts') || []
		}
	},
	getters: {
		cartCount(state) {
			return state.carts.length
		},
		isAll(state) {
			return state.carts.every(item => item.goods_state === true)
		},
		total(state) {
			return state.carts.filter(item => item.goods_state === true).reduce((acc, item) => acc += item
				.goods_number *
				item.goods_price, 0)
		},
		totalCount(state) {

			return state.carts.filter(item => item.goods_state === true).reduce((acc, item) => acc += item.goods_number,
				0)
		}
	},
	mutations: {
		del(state, index) {
			state.carts.splice(index, 1)
			this.commit('m_cart/setStorage')
		},
		goods_number(state, num) {
			state.carts[num.index].goods_number += num.num
			this.commit('m_cart/setStorage')
		},
		checkAll(state, Isall) {
			state.carts.forEach(item => item.goods_state = Isall)
		},
		toggleState(state, index) {
			//切换选中状态
			state.carts[index].goods_state = !state.carts[index].goods_state
		},
		addToCart(state, goods) {
			//如果是同样的商品让其数量++
			let res = state.carts.find(item => item.goods_id === goods.goods_id)
			if (res) {
				res.goods_number++
			} else {

				state.carts.push(goods)
			}
			//存入本地存储
			this.commit('m_cart/setStorage')
		},
		//存入本地存储
		setStorage(state) {
			uni.setStorageSync('carts', state.carts)
		}
	}
}
