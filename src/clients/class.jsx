import axios, { CLASS_PREFIX } from './axios';

export function getClass() {
	return axios({
		method: 'get',
		url: `${CLASS_PREFIX}`,
	});
}
