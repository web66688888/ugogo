<template>
	<view>
		<!-- 筛选 -->
		<view class="filter">
			<text class="active">综合</text>
			<text>销量</text>
			<text>价格</text>
		</view>
		<!-- 商品列表 -->
		<scroll-view class="goods" scroll-y>
			<view class="item" @click="goDetail" v-for="item in GoodsList" :key="item.cat_id">
				<!-- 商品图片 -->
				<image class="pic" :src="item.goods_small_logo"></image>
				<!-- 商品信息 -->
				<view class="meta">
					<view class="name">【海外购自营】{{ item.goods_name }} 【保税仓发货】</view>
					<view class="price">
						<text>￥</text>
						{{ item.goods_price }}
						<text>.00</text>
					</view>
				</view>
			</view>
			<!-- 加载更多 -->
			<view class="getMore">正在加载...</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			q: {
				query: ''
			},
			GoodsList: []
		};
	},
	onLoad(option) {
		console.log(option);
		this.q.query = option.query;
		console.log(this.q.query);
		this.getGoodsList();
	},
	methods: {
		goDetail() {
			uni.navigateTo({
				url: '/subpkg/pages/goods/index'
			});
		},
		async getGoodsList() {
			console.log(this.q.query);
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.q);
			console.log(res);
			this.GoodsList = res.message.goods;
			console.log(this.GoodsList);
		}
	}
};
</script>

<style scoped lang="scss">
.filter {
	display: flex;
	height: 96rpx;
	line-height: 96rpx;
	border-bottom: 1rpx solid #ddd;

	/* #ifdef H5 */
	position: relative;
	z-index: 99;
	/* #endif */

	text {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		color: #333;

		&.active {
			color: #ea4451;
		}
	}
}

.goods {
	position: absolute;
	width: 100%;
	top: 97rpx;
	bottom: 0;
}

.item {
	display: flex;
	padding: 30rpx 20rpx 30rpx 0;
	margin-left: 20rpx;
	border-bottom: 1rpx solid #eee;

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
}
</style>
