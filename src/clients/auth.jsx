import axios, { AUTH_PREFIX } from './axios';

export function login(data) {
	return axios({
		method: 'post',
		url: `login`,
		data: data,
	});
}

export function register(data) {
	return axios({
		method: 'post',
		url: `registrasi-mentor`,
		data: data,
	});
}

export function logout() {
	return axios({
		method: 'post',
		url: `${AUTH_PREFIX}/logout`,
	});
}

export function checkEmailAvailability(email) {
	return axios({
	  method: 'get',
	  url: 'check-email-availability',
	  params: { email },
	});
  }
