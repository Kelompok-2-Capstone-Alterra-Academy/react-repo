import axios, { CUSTOMER_PREFIX } from './axios';

export function getCustomer() {
	return axios({
		method: 'get',
		url: `${CUSTOMER_PREFIX}`,
	});
}
