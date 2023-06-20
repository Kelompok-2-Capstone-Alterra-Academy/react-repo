import axios, { USER_PREFIX } from './axios';

export function getUser(id) {
	return axios({
		method: 'get',
		url: `${USER_PREFIX}/${id}`,
	});
}
