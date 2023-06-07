import axios, { AUTH_PREFIX } from 'axios';

export function login(data) {
	return axios({
		method: 'post',
		url: `login`,
		data: data,
	});
}

export function logout() {
	return axios({
		method: 'get',
		url: `${AUTH_PREFIX}/logout`,
	});
}
