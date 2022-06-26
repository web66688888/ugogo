<template>
	<view>
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="UserProfile.avatarUrl"></image>
		</button>
		<view class="nickname-wrapper">
			<label for="">昵称:</label>
			<input type="nickname" :value="UserProfile.nickName" @blur="onBlurNickName" placeholder="请输入昵称" />
		</view>
		<van-button type="primary" block @click="saveuserProfile">确认</van-button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			UserProfile: {
				avatarUrl: '',
				nickName: ''
			}
		};
	},
	onLoad() {
		this.UserProfile = { ...this.userProfile };
	},
	computed: {
		...mapState('m_address', ['userProfile'])
	},
	methods: {
		saveuserProfile() {
			console.log(this.UserProfile);
			this.$store.commit('m_address/changeuserProfile', this.UserProfile);
			uni.navigateBack();
		},
		onBlurNickName(ev) {
			console.log(ev);
			this.UserProfile.nickName = ev.detail.value;
		},
		onChooseAvatar(e) {
			console.log(e);
			this.UserProfile.avatarUrl = e.detail.avatarUrl;
		}
	}
};
</script>

<style lang="scss" scoped>
.profile {
	padding: 0 40rpx;
}

.avatar-wrapper {
	padding: 0;
	width: 112rpx;
	border-radius: 16rpx;
	margin-top: 80rpx;
	margin-bottom: 120rpx;

	&::after {
		content: '';
		border: none;
	}

	.avatar {
		display: block;
		width: 112rpx;
		height: 112rpx;
	}
}

.nickname-wrapper {
	display: flex;
	align-items: center;
	height: 80rpx;
	border-bottom: 1rpx solid #eee;
	margin-bottom: 40rpx;

	label {
		width: 100rpx;
		color: #333;
		font-size: 34rpx;
	}

	input {
		color: #666;
		font-size: 34rpx;
	}
}
</style>
