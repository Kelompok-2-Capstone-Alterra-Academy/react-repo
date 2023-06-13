import axios, { CUSTOMER_PREFIX } from './axios';

export function createCourse() {
	return axios({
		method: 'get',
		url: `${CUSTOMER_PREFIX}`,
	});
}
