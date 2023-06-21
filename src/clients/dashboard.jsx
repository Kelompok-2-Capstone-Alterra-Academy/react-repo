import axios, { DASHBOARD_PREFIX } from './axios';

export function statisctic() {
	return axios({
		method: 'get',
		url: `${DASHBOARD_PREFIX}/statistic`,
	});
}

export function statiscticCourse() {
	return axios({
		method: 'get',
		url: `${DASHBOARD_PREFIX}/statistic-course`,
	});
}

export function analysis() {
	return axios({
		method: 'get',
		url: `${DASHBOARD_PREFIX}/analysis`,
	});
}
