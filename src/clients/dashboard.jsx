import axios, { DASHBOARD_PREFIX } from 'axios';

export function getSomething() {
	return axios({
		method: 'get',
		url: `${DASHBOARD_PREFIX}`,
	});
}

export function getSomethingByParam(params) {
	return axios({
		method: 'get',
		url: `${DASHBOARD_PREFIX}/${params}`,
	});
}

export function postSomething(data) {
	return axios({
		method: 'post',
		url: `${DASHBOARD_PREFIX}`,
		data: data,
	});
}

export function updateSomething(id, data) {
	return axios({
		method: 'put',
		url: `${DASHBOARD_PREFIX}/${id}`,
		data: data,
	});
}

export function deleteSomething(id) {
	return axios({
		method: 'delete',
		url: `${DASHBOARD_PREFIX}/${id}`,
	});
}
