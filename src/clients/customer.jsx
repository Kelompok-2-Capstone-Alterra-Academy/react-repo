import axios, { CUSTOMER_PREFIX } from './axios';

export function getCustomer() {
	return axios({
		method: 'get',
		url: `${CUSTOMER_PREFIX}/45`,
	});
}

export function getCustomerByIDCourse(id) {
	return axios({
		method: 'get',
		url: `${CUSTOMER_PREFIX}/${id}`,
	});
}

export function deleteCustomer(customerID, courseID) {
	return axios({
		method: 'delete',
		url: `mentors/my-course/delete/${customerID}/course/${courseID}`,
	});
}