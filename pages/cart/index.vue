<template>
	<view class="wrapper">
		<template v-if="carts.length">
			<!-- 收货信息 -->
			<view class="shipment">
				<template v-if="address">
					<view class="dt">收货人:</view>
					<view class="dd meta">
						<text class="name">{{ address.userName }}</text>
						<text class="phone">{{ address.telNumber }}</text>
					</view>
					<view class="dt">收货地址:</view>
					<view class="dd">
						{{ address.provinceName }} {{ address.cityName }} {{ address.countyName }}
						{{ address.detailInfo }}
					</view>
				</template>
				<button type="primary" v-else @click="getAddress">添加地址</button>
			</view>
			<!-- 购物车 -->
			<view class="carts">
				<view class="item">
					<!-- 店铺名称 -->
					<view class="shopname">优购生活馆</view>
					<!-- <view class="goods" > -->
					<!-- 商品图片 -->
					<van-swipe-cell v-for="(item, index) in carts" :key="item.goods_id" right-width="65" class="goods">
						<van-cell-group class="van-cell-group">
							<image class="pic" :src="item.goods_small_logo"></image>
							<!-- 商品信息 -->
							<view class="meta">
								<view class="name">{{ item.goods_name }}</view>
								<view class="price">
									<text>￥</text>
									{{ item.goods_price }}
									<text>.00</text>
								</view>
								<!-- 加减 -->
								<view class="amount">
									<text class="reduce" @click="num(index, -1)">-</text>
									<input type="number" :value="item.goods_count" class="number" />
									<text class="plus" @click="num(index, +1)">+</text>
								</view>
							</view>
							<!-- 选框 -->
							<view class="checkbox" @click="checkState(index)">
								<icon type="success" size="20" :color="item.goods_state ? '#ea4451' : '#ccc'"></icon>
							</view>
						</van-cell-group>
						<view slot="right" @click="onClose(index)" class="van-swipe-cell__right">删除</view>
					</van-swipe-cell>
					<!-- </view> -->
				</view>
			</view>
			<!-- 其它 -->
			<view class="extra">
				<label class="checkall" @click="checkall">
					<icon type="success" :color="isAll ? '#ea4451' : '#ccc'" size="20"></icon>
					全选
				</label>
				<view class="total">
					合计:
					<text>￥</text>
					<label>{{ total }}</label>
					<text>.00</text>
				</view>
				<navigator class="pay" url="/subpkg/pages/order/index">结算({{ totalCount }})</navigator>
				<!-- <view class="pay">结算({{ totalCount }})</view> -->
			</view>
		</template>
		<view class="tips" v-else>
			空空乳液~
			<!-- <navigator class="pay" ref="addc" url="/pages/index/index" open-type="switchTab">1</navigator> -->
			<button type="primary" @click="dd">快去买呀</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
	computed: {
		...mapState('m_cart', ['carts']),
		...mapState('m_address', ['address']),
		...mapGetters('m_cart', ['isAll', 'total', 'totalCount'])
	},
	watch: {
		totalCount: {
			handler() {
				this.setTabar();
			}
		}
	},
	onLoad() {
		this.setTabar();
	},
	methods: {
		onClose(index) {
			this.$store.commit('m_cart/del', index);
		},
		setTabar() {
			uni.setTabBarBadge({
				index: 2,
				text: this.totalCount + ''
			});
		},
		dd() {
			//跳转去tab的页面
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		async getAddress() {
			//方案一
			// uni.chooseAddress({
			// 	success: res => {
			// 		console.log(res);
			// 		this.$store.commit('m_address/changeaddress', res);
			// 	}
			// });
			//方案二
			const [err, { errMsg, ...address }] = await uni.chooseAddress();
			this.$store.commit('m_address/changeaddress', address);
		},
		num(index, num) {
			if (this.carts[index].goods_count === 1 && num === -1) return;
			this.$store.commit('m_cart/goods_count', { index, num });
		},
		checkall(e) {
			this.$store.commit('m_cart/checkAll', !this.isAll);
		},
		checkState(index) {
			this.$store.commit('m_cart/toggleState', index);
		}
	}
};
</script>

<style scoped lang="scss">
.van-cell-group {
	margin-left: 100rpx;
	width: 600rpx;
	height: 100%;
	display: flex;
	justify-content: space-between;
}
.van-swipe-cell__right {
	display: inline-block;
	width: 55px;
	height: 100%;
	font-size: 15px;
	line-height: 115px;
	color: #fff;
	text-align: center;
	background-color: #f44;
}

.shipment {
	height: 100rpx;
	line-height: 2;
	padding: 30rpx 30rpx 40rpx 30rpx;
	font-size: 27rpx;
	color: #333;
	background-color: #fff;
	background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
	background-size: contain;
	background-repeat: no-repeat;
	background-position: bottom;

	.dt {
		width: 140rpx;
		float: left;
		clear: both;
	}

	.dd {
		padding-left: 160rpx;
	}

	.meta {
		padding-right: 50rpx;
	}

	text.phone {
		float: right;
	}
}

.carts {
	background-color: #f4f4f4;
	padding-bottom: 110rpx;
	overflow: hidden;

	.shopname {
		padding: 30rpx;
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #333;
		background-color: #fff;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;
	}

	.goods {
		display: flex;
		padding: 30rpx 20rpx 30rpx 0;
		border-bottom: 1rpx solid #eee;
		background-color: #fff;
		// overflow: hidden;
		position: relative;

		.checkbox {
			width: 101rpx;
			height: 100%;
			background-color: #fff;

			display: flex;
			justify-content: center;
			align-items: center;

			position: absolute;
			left: 0rpx;
			top: 0;
		}

		&:last-child {
			border-bottom: none;
		}

		.pic {
			width: 200rpx;
			height: 200rpx;
			margin-right: 30rpx;
		}

		.meta {
			flex: 1;
			font-size: 27rpx;
			color: #333;
			position: relative;
		}

		.name {
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.price {
			position: absolute;
			bottom: 0;

			color: #ea4451;
			font-size: 33rpx;

			text {
				font-size: 22rpx;
			}
		}

		.amount {
			position: absolute;
			bottom: 0;
			right: 20rpx;

			height: 48rpx;
			text-align: center;
			border: 1rpx solid #ddd;
			border-radius: 8rpx;

			display: flex;
			align-items: center;

			text {
				display: block;
				width: 60rpx;
				line-height: 48rpx;
				font-size: 36rpx;
				color: #ddd;
				text-align: center;
			}

			input {
				width: 60rpx;
				height: 48rpx;
				min-height: 48rpx;
				font-size: 27rpx;
				border-left: 1rpx solid #ddd;
				border-right: 1rpx solid #ddd;
			}
		}
	}
}

.extra {
	position: fixed;
	bottom: 0;
	/* #ifdef H5 */
	bottom: 50px;
	/* #endif */
	left: 0;
	z-index: 9;

	width: 750rpx;
	height: 96rpx;
	text-align: center;
	line-height: 96rpx;
	font-size: 36rpx;
	border-top: 1rpx solid #eee;
	background-color: #fff;
	color: #333;
	display: flex;

	.checkall {
		width: 140rpx;
		line-height: 1;
		margin-left: 25rpx;
		display: flex;
		align-items: center;

		icon {
			margin-right: 20rpx;
		}
	}

	.total {
		display: flex;
		justify-content: center;
		flex: 1;

		label,
		text {
			color: #ea4451;
			vertical-align: bottom;
			position: relative;
			bottom: -2rpx;
		}

		text {
			position: relative;
			bottom: -3rpx;
			font-size: 24rpx;

			&:first-child {
				margin-left: 10rpx;
			}
		}
	}

	.pay {
		width: 200rpx;
		background-color: #ea4451;
		color: #fff;
	}
}
</style>
