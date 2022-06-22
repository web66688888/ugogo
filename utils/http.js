import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '正在加载',
		mask: true
	})

}
// 请求完成之后做一些事情
$http.afterRequest = function() {
	// 隐藏加载提示
	uni.hideLoading()
}
