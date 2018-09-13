import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

	state: {
		userInfo: {},
		devInfo: {},
		xueyuan: [
			{
				value: '马克思主义学院',
				label: '马克思主义学院'
			},
			{
				value: '历史与社会学院',
				label: '历史与社会学院'
			},
			{
				value: '教育科学学院',
				label: '教育科学学院'
			},
			{
				value: '体育与健康科学学院',
				label: '体育与健康科学学院'
			},
			{
				value: '文学院',
				label: '文学院'
			},
			{
				value: '外国语学院',
				label: '外国语学院'
			},
			{
				value: '音乐学院',
				label: '音乐学院'
			},
			{
				value: '美术学院',
				label: '美术学院'
			},
			{
				value: '新闻与传媒学院（新媒体学院）',
				label: '新闻与传媒学院（新媒体学院）'
			},
			{
				value: '数学科学学院',
				label: '数学科学学院'
			},
			{
				value: '物理与电子工程学院',
				label: '物理与电子工程学院'
			},
			{
				value: '化学学院',
				label: '化学学院'
			},
			{
				value: '生命科学学院',
				label: '生命科学学院'
			},
			{
				value: '地理与旅游学院',
				label: '地理与旅游学院'
			},
			{
				value: '经济与管理学院',
				label: '经济与管理学院'
			},
			{
				value: '计算机与信息科学学院',
				label: '计算机与信息科学学院'
			},
			{
				value: '初等教育学院',
				label: '初等教育学院'
			},
			{
				value: '其他',
				label: '其他'
			},
		],
		status: [
			{
				value: '1',
				label: '待店维修'
			},
			{
				value: '2',
				label: '售后'
			},
			{
				value: '3',
				label: '送修'
			}
		],
		searchCategoryNames: [
			{
				value: '1',
				label: '待店维修'
			},
			{
				value: '2',
				label: '售后'
			},
			{
				value: '3',
				label: '送修'
			},
			{
				value: '4',
				label: '已完成'
			},
			{
				value: '5',
				label: '已废除'
			}
		],
		addDevInfo: {}
	},
	mutations: {
		CHANGEUSERINFO(state, userInfo) {
			state.userInfo = userInfo;
			state.addDevInfo.repairtor_id = userInfo.id;
			state.addDevInfo.repairtor = userInfo.username;
		},
		CHANGEADDDEVINFO(state, addDevInfo) {
			let attr = addDevInfo.attr;
			let value = addDevInfo.value;
			state.addDevInfo[attr] = value;
		},
		CLEARDEVINFO(state) {
			state.addDevInfo.dev_name = '';
			state.addDevInfo.username = '';
			state.addDevInfo.tel = '';
			state.addDevInfo.xueyuan = '';
			state.addDevInfo.zhuanye = '';
			state.addDevInfo.content = '';

		}
	},
	actions: {
		changeUserInfo({commit}, userInfo) {
			commit('CHANGEUSERINFO', userInfo);
		},
		changeAddDevInfo({commit}, addDevInfo) {
			commit('CHANGEADDDEVINFO', addDevInfo);
		},
		clearDevInfo({commit}) {
			commit('CLEARDEVINFO');
		}
	}

});

export default store;