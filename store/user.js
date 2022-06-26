export default {
	namespaced: true,
	state() {
		return {
			// 初始的状态数据
			address: uni.getStorageSync('address') || null,
			userProfile: uni.getStorageSync('userProfile') || {
				avatarUrl: 'http://static.botue.com/ugo/uploads/monkey.png',
				nickName: '微信用户'
			},
			token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjU5LCJpYXQiOjE2NTYyMzIxNTQsImV4cCI6MTAwMTY1NjIzMjE1M30.F6HKP7fozTR71W_uIE__zKa8fxVNWSZWtx2EMu3dXAw"

		}
	},
	actions: {
		async getToken() {
			const [err, {
				code
			}] = await uni.login();
			console.log(code);
			const [res,
				userInfo
			] = await uni.getUserInfo();
			console.log(userInfo);
			const resault = await uni.$http.post('/api/public/v1/users/wxlogin', {
				code: code,
				encryptedData: userInfo.encryptedData,
				iv: userInfo.iv,
				rawData: userInfo.rawData,
				signature: userInfo.signature
			})
			console.log('111', resault);
		}
	},
	mutations: {
		changeaddress(state, address) {
			state.address = address
			uni.setStorageSync('address', state.address)
		},
		changeuserProfile(state, userProfile) {
			state.userProfile = userProfile

			uni.setStorageSync('userProfile', userProfile)
		},
	}
}
