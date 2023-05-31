import React, { useState } from 'react'
import { Footer, MyTextField } from '../../components';

export default function EditProfile() {
    const [name, setName] = useState("");
    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [value, setValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("")
    const [gender, setGender] = useState('');
    return (
        <>
            <div className='flex justify-center py-6'>
                <img src="/image/logo-starMyDashboard.png" width={338} alt="" />
            </div>

            <div className='flex gap-8 mb-[7.5rem]'>
                <div className='bg-[#F0FAFF] rounded-lg h-[45rem] ml-8'>
                    {/* Avatar */}
                    <div className='flex items-center  pt-[4.5rem] pb-12 pl-4 pr-6'>
                        <img src="/image/profile-edit.svg" width={56} alt="avatar" />
                        <div>
                            <h2 className='font-semibold text-[#212121] text-base'>Jennie BP</h2>
                            <p className='text-[#616161] text-[0.625rem] font-medium'>jennieblpk20@email.com</p>
                        </div>
                    </div>
                    {/* SideBar Component */}
                    <div className='flex flex-col justify-center items-center gap-y-2'>
                        <div className='flex items-center bg-[#2196F3] py-2 pl-4 rounded-xl w-10/12 gap-3'>
                            <img src="/gear_icon.svg" alt="" />
                            <p className='text-white text-xs font-semibold'>Edit Profile</p>
                        </div>
                        <div className='flex items-center bg-white py-2 pl-4 rounded-xl w-10/12 gap-3'>
                            <img src="/file_icon.svg" alt="" />
                            <p className='text-xs font-semibold'>Kursus Saya</p>
                        </div>
                        <div className='flex items-center bg-white py-2 pl-4 rounded-xl w-10/12 gap-3'>
                            <img src="/money_icon.svg" alt="" />
                            <p className='text-xs font-semibold'>Pendapatan</p>
                        </div>
                        <div className='flex items-center bg-white py-2 pl-4 rounded-xl w-10/12 gap-3'>
                            <img src="/call.svg" alt="" />
                            <p className='text-xs font-semibold'>Kontak CS</p>
                        </div>
                    </div>
                    <button className='bg-white py-2 px-[5.313rem] flex justify-center mx-auto w-10/12 rounded-xl mt-[18.75rem]'>
                        <p className='text-xs font-semibold text-[#2196F3]'>Keluar</p>
                    </button>
                </div>

                <div className='w-9/12 border rounded-2xl px-6'>
                    <div className='flex items-center justify-between mt-10'>
                        <div className='flex items-center'>
                            <img src="/image/profile-edit.svg" alt="" />
                            <div className='ml-3'>
                                <p className='font-bold text-xl'>Jennie BP</p>
                                <p className='text-gray-700'>jennieblpk20@email.com</p>
                            </div>
                        </div>
                        <div className=''>
                            <button className="rounded-sm bg-blue-500 px-8 py-2 text-xs text-white">Ganti foto profil</button>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-20'>
                        <div>
                            <label htmlFor="name">Nama Lengkap</label>
                            <MyTextField
                                value={name}
                                onChange={e => setName(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="ttl">Tanggal Lahir</label>
                            <input
                                type='date'
                                className="shadow-sm appearance-none bg-[#F5F5F5] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={value}
                                onChange={e => setValue(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <MyTextField
                                value={username}
                                onChange={e => setUserame(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="contact">Contact</label>
                            <MyTextField
                                value={contact}
                                onChange={e => setContact(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                className="shadow-sm appearance-none bg-[#F5F5F5] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email here"
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="email">Bidang Keahlian</label>
                            <select className="shadow-sm appearance-none bg-[#F5F5F5] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="">Select an option</option>
                                <option value="Option 1">Ilmu Terapan</option>
                                <option value="Option 2">Informatika</option>
                                <option value="Option 3">Public Relation</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <div>
                                <input
                                    id="male"
                                    type="radio"
                                    value="male"
                                    name="gender"
                                    checked={gender === 'male'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label for="male" className="ml-2 text-sm font-medium text-gray-800">Male</label>
                            </div>
                            <div>
                                <input
                                    id="female"
                                    type="radio"
                                    value="female"
                                    name="gender"
                                    checked={gender === 'female'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label for="female" className="ml-2 text-sm font-medium text-gray-800">Female</label>
                            </div>
                        </div>

                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border w-full border-blue-700 rounded">
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}
