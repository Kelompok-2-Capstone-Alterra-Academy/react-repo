import moment from 'moment';

export function dateToTimestamp(dateString) {
	const momentObj = moment(dateString);
	const timestamp = momentObj.valueOf();
	return timestamp;
}

export function convertToDate(date, time) {
	const momentObj = moment(date);
	const formattedDate = momentObj.format('YYYY-MM-DD');
	return formattedDate + 'T' + time + ':00Z';
}

export function displayDate(dateTime) {
	return moment.utc(dateTime).format('D MMMM YYYY - HH:mm');
}
