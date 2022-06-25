export default {
	namespaced: true,
	state() {
		return {
			// 初始的状态数据
			address: uni.getStorageSync('address') || null,
			userProfile: uni.getStorageSync('userProfile') || null

		}
	},
	mutations: {
		changeaddress(state, address) {
			state.address = address
			uni.setStorageSync('address', state.address)
		},
		changeuserProfile(state, userProfile) {
			state.userProfile = userProfile
			uni.setStorageSync('userProfile', state.userProfile)
		},
	}
}
