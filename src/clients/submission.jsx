import axios, { SUBMISSION_PREFIX } from './axios';

export function putSubmission({ id, data }) {
	return axios({
		method: 'put',
		url: `${SUBMISSION_PREFIX}/${id}`,
		data,
	});
}
