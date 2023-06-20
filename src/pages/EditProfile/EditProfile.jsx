import React, { useState, useEffect } from 'react';
import { Header, MyTextField } from '../../components';
import jwt from "jwt-decode"
import axios from 'axios';

export default function EditProfile() {
	const [name, setName] = useState('');
	const [kelas, setKelas] = useState('');
	const [role, setRole] = useState('')
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [status, setStatus] = useState('')
	const [gender, setGender] = useState('');
	const [currentUser, setCurrentUser] = useState({})

	// get current user
	const cookieToken = document.cookie.split("=")[1]
	const decodeToken = jwt(cookieToken)

	async function getCurrentUser() {
		const response = await axios.get(`http://3.26.234.145:8081/mentors/users/${decodeToken.id}`, { headers: { "Authorization": `Bearer ${cookieToken}` } })
		setCurrentUser(response.data.data)
		console.log(currentUser)
	}

	useEffect(() => {
		getCurrentUser()
	}, [])



	return (
		<>
			<Header
				breadCrumbData={{
					name: 'Edit Profile',
					links: [
						{ link: '/dashboard', title: 'Dashboard' },
						{ link: '/edit-profile', title: 'Edit Profile' },
					],
				}}
				profileData={{
					name: 'Admin',
					role: 'Admin',
					pic: 'https://i.pravatar.cc/150?img=21',
					email: 'testing@gmail.com',
				}}
			/>
			<div className="mb-10">
				<div className="w-100 border rounded-2xl px-6">
					<div className="flex items-center justify-between mt-10">
						<div className="flex items-center">
							<img src={currentUser?.profile} alt="" width={100} />
							<div className="ml-3">
								<p className="font-bold text-xl">Jennie BP</p>
								<p className="text-gray-700">jennieblpk20@email.com</p>
							</div>
						</div>
						<div className="">
							<button className="rounded-sm bg-blue-500 px-8 py-2 text-xs text-white">
								Ganti foto profil
							</button>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mt-20">
						<div>
							<label htmlFor="name">Nama Lengkap</label>
							<MyTextField value={currentUser?.name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div>
							<label htmlFor="ttl">Role</label>

							<MyTextField value={currentUser?.role} onChange={(e) => setKelas(e.target.value)} />
						</div>
						<div>
							<label htmlFor="kelas">Kelas</label>
							<MyTextField value={currentUser?.class} onChange={(e) => setKelas(e.target.value)} />
						</div>
						<div>
							<label htmlFor="contact">Contact</label>
							<MyTextField value={currentUser?.phone_number} onChange={(e) => setContact(e.target.value)} />
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								className="shadow-sm appearance-none bg-[#F5F5F5] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Enter your email here"
								type="email"
								value={decodeToken?.email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="email">Status</label>

							<MyTextField value={currentUser?.status} onChange={(e) => setContact(e.target.value)} />
						</div>
						<div className=" items-center gap-4 mb-6">
							<label htmlFor="email">Gender</label>
							<div className='flex gap-5'>
								<div>
									<input
										id="male"
										type="radio"
										value="male"
										name="gender"
										checked={currentUser?.gender === "male"}
										onChange={(e) => setGender(e.target.value)}
									/>
									<label htmlFor="male" className="ml-2 text-sm font-medium text-gray-800">
										Male
									</label>
								</div>
								<div>
									<input
										id="female"
										type="radio"
										value="female"
										name="gender"
										checked={currentUser?.gender === "female"}
										onChange={(e) => setGender(e.target.value)}
									/>
									<label htmlFor="female" className="ml-2 text-sm font-medium text-gray-800">
										Female
									</label>
								</div>
							</div>
						</div>

						<div className='mb-6'>
							<button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border w-full border-blue-700 rounded">
								Simpan Perubahan
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
