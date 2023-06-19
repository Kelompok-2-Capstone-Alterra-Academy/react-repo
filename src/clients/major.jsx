import axios, { MAJOR_PREFIX } from './axios';

export function getMajor() {
	return axios({
		method: 'get',
		url: `${MAJOR_PREFIX}`,
	});
}
