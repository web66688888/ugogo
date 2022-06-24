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
		}
	},
	mutations: {
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
				res.goods_count++
			} else {

				state.carts.push(goods)
			}
			//存入本地存储
			uni.setStorageSync('carts', state.carts)
		}
	}
}
