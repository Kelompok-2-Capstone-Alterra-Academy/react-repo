import AxiosInstances from 'axios';

function getCookieValue(cookieName) {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(`${cookieName}=`)) {
			return cookie.substring(cookieName.length + 1) ?? '';
		}
	}
	return '';
}

const token = getCookieValue('token');

const axios = AxiosInstances.create({
	baseURL: 'http://3.26.234.145:8081/',
	headers: {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'multipart/form-data',
	},
});

export function putUser({ id, data }) {
	return axios({
		method: 'put',
		url: `mentors/user/profile/${id}`,
		data: data,
	});
}
