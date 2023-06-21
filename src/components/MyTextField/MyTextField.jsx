import React from 'react';

export default function MyTextField({ value, onChange }) {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			className="shadow-sm appearance-none bg-[#F5F5F5] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			placeholder="Enter your text here"
		/>
	);
}
