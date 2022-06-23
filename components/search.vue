<template>
	<!-- 搜索 -->
	<view class="search" :class="{ focused: focused }">
		<!-- 搜索框 -->
		<view class="input-wrap" @click="goSearch">
			<input
				class="input"
				type="text"
				v-model="query"
				@input="searchQuery"
				:placeholder="placeholder"
				@confirm="addHistoryList"
			/>
			<text class="cancle" @click.stop="cancleSearch">取消</text>
		</view>
		<!-- 搜索结果 -->
		<view class="content" v-if="historyList.length">
			<view class="title">
				搜索历史
				<text class="clear"></text>
			</view>
			<view class="history">
				<navigator
					class="navigator"
					:url="`/subpkg/pages/list/index?query=${item}`"
					v-for="item in historyList"
					:key="item"
				>
					{{ item }}
				</navigator>
			</view>
			<!-- 结果 -->
			<scroll-view v-if="query" scroll-y class="result">
				<navigator
					class="navigator"
					:url="`/subpkg/pages/goods/index?query=${item.goods_id}`"
					v-for="item in SearchList"
					:key="item.goods_id"
				>
					{{ item.goods_name }}
				</navigator>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { debounce } from 'lodash';
export default {
	data() {
		return {
			focused: false,
			placeholder: '',
			query: '',
			SearchList: [],
			historyList: uni.getStorageSync('history') || []
		};
	},
	methods: {
		addHistoryList() {
			//去重
			if (this.historyList.includes(this.query)) return;
			this.historyList.push(this.query);
			console.log(this.historyList);
			//存入本地存储
			uni.setStorageSync('history', this.historyList);
		},

		goSearch(ev) {
			this.focused = true;
			this.placeholder = '请输入您要搜索的内容';

			// 触发父组件自定义事件
			this.$emit('search', {
				pageHeight: uni.getSystemInfoSync().windowHeight
			});

			// 隐藏tabBar
			uni.hideTabBar();
		},
		cancleSearch() {
			this.focused = false;
			this.placeholder = '';
			// this.query = '';
			// 触发父组件自定义事件
			this.$emit('search', {
				pageHeight: 'auto'
			});

			// 显示tabBar
			uni.showTabBar();
		},
		//防抖函数
		searchQuery: debounce(async function() {
			if (this.query.trim().length === 0) return;
			const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.query });
			console.log(res);
			this.SearchList = res.message;
		}, 500)
	}
};
</script>

<style lang="scss" scoped>
.search {
	display: flex;
	flex-direction: column;

	// 搜索框
	.input-wrap {
		display: flex;
		height: 100rpx;
		padding: 20rpx 30rpx;
		background-color: #ea4451;
		box-sizing: border-box;
		position: relative;

		&::before,
		&::after {
			height: 44rpx;
			line-height: 1;
			background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
			background-size: 32rpx;
			background-position: 6rpx center;
			background-repeat: no-repeat;

			position: absolute;
			top: 28rpx;
			z-index: 9;
		}

		&::before {
			content: '搜索';
			display: block;

			width: 100rpx;
			padding: 11rpx 0 10rpx 44rpx;
			box-sizing: border-box;
			color: #666;
			font-size: 24rpx;
			left: 325rpx;
		}

		&::after {
			display: none;
			content: '';
			width: 44rpx;
			left: 40rpx;
		}

		.input {
			flex: 1;
			height: 60rpx;
			padding: 0 20rpx 0 64rpx;
			background-color: #fff;
			border-radius: 8rpx;
			font-size: 24rpx;
			color: #666;
		}

		span.cancle {
			display: none;
			width: 80rpx;
			text-align: right;
			line-height: 60rpx;
			font-size: 27rpx;
			color: #666;
		}
	}

	// 搜索结果
	.content {
		display: none;
		flex: 1;
		padding: 27rpx;
		background-color: #fff;
		position: relative;

		.title {
			font-size: 27rpx;
			line-height: 1;
			color: #333;
		}

		.clear {
			display: block;
			width: 27rpx;
			height: 27rpx;
			float: right;
			background-image: url(http://static.botue.com/ugo/images/clear.png);
			background-size: cover;
		}

		.history {
			padding-top: 30rpx;

			.navigator {
				display: inline-block;
				line-height: 1;
				padding: 15rpx 20rpx 12rpx;
				background-color: #ddd;
				font-size: 24rpx;
				margin-right: 20rpx;
				margin-bottom: 15rpx;
				color: #333;
			}
		}

		.result {
			// display: none;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: #fff;

			.navigator {
				line-height: 1;
				padding: 20rpx 30rpx;
				font-size: 24rpx;
				color: #666;
				border-bottom: 1px solid #eee;

				&:last-child {
					border-bottom: none;
				}
			}
		}
	}

	// 获得焦点状态
	&.focused {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;

		.input-wrap {
			background-color: #eee;

			&::before {
				display: none;
			}

			&::after {
				display: block;
			}
		}

		span.cancle {
			display: block;
		}

		.content {
			display: block;
		}
	}
}
</style>
