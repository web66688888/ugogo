import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
// 'https://uinav.com'
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '正在加载',
		mask: true
	})

}
// 请求完成之后做一些事情
$http.afterRequest = function(options) {
	if (options.data.meta.status !== 200) {
		return uni.showToast({
			title: '加载未完成',
			icon: 'none',
			duration: 1500
		})

	}
	// console.log(options.data.meta.status);
	// // 隐藏加载提示
	uni.hideLoading()
}
