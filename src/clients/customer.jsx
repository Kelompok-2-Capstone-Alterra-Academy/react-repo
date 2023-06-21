import axios, { CUSTOMER_PREFIX2 } from './axios';

export function getCustomer() {
	return axios({
		method: 'get',
		url: `${CUSTOMER_PREFIX2}`,
	});
}
