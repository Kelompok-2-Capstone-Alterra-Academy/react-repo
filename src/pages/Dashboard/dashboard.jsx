import React, { useState } from "react";
import { CardKursus, Profile, Tag } from '../../components'
import styles from './../../App.module.css';


export default function Dashboard() {

    return (
        <>
            <div className='flex'>
                {/* content */}
                <div>
                    <div className='mt-10 ml-6'>
                        <p className=''>Selamat Datang <span className='font-bold'>Jennie !</span></p>
                    </div>
                    <div className='px-6 my-3'>
                        <div className=" rounded-md">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-gray-100 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                        </div>
                    </div>
                    <div className='px-6 py-2 w-full'>
                        <img src="/image/home-banner.png" alt="" />
                    </div>
                    <div className='flex justify-end px-6 gap-4'>
                        <button className="bg-[#4161FF] hover:bg-blue-500 text-white text-xs rounded inline-flex items-center">
                            <img src="/icon/icon-unggah.svg" className='mr-2' alt="" />
                            <span>Unggah Modul</span>
                        </button>
                        <button className="bg-[#22BDFF] hover:bg-blue-600 text-white text-xs rounded inline-flex items-center">
                            <img src="/icon/icon-plus.svg" className='mr-2' alt="" />
                            <span>Tambah Quiz</span>
                        </button>
                    </div>
                    <div className='px-6'>
                        <p className='font-bold'>Kursus Saya</p>
                    </div>
                    <div className='flex justify-around px-6 gap-4'>
                        <CardKursus />
                        <CardKursus />
                        <div className="w-[200px] bg-[#F0FAFF] mt-4 rounded-xl flex justify-center items-center">
                            <div className="grid grid-cols-1 place-content-center justify-items-center gap-3">
                                <div>
                                    <img className="self-center" src="/icon/add-course.svg" alt="" />
                                </div>
                                <div>
                                    <p className='text-xs'>Tambah Kursus</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='px-6 mt-6'>
                        <p className='font-bold'>Statistik</p>
                    </div>
                    <div className='flex px-4 mt-4 justify-around'>
                        <div className='h-20 bg-[#E1EFE1] w-60  rounded-md'>
                            <div className='flex p-1 items-center gap-6 justify-center'>
                                <img src="/image/stats-attendance.png" alt="" />
                                <div>
                                    <p className='text-xs font-semibold text-[#388E3C]'>
                                        Total siswa baru
                                    </p>
                                    <p className='text-xl font-semibold'>120 Siswa</p>
                                </div>
                            </div>

                        </div>
                        <div className='h-20 bg-[#FFE0B2] w-60  rounded-md'>
                            <div className='flex p-1 items-center gap-6 justify-center'>
                                <img src="/image/stats-task.png" alt="" />
                                <div>
                                    <p className='text-xs font-semibold text-[#E65100]'>
                                        Tugas perlu dinilai
                                    </p>
                                    <p className='text-xl font-semibold'>13 Tugas</p>
                                </div>
                            </div>

                        </div>
                        <div className='h-20 bg-[#F0FAFF] w-60  rounded-md'>
                            <div className='flex p-1 items-center gap-6 justify-center'>
                                <img src="/image/stats-time.png" alt="" />
                                <div>
                                    <p className='text-xs font-semibold text-[#1976D2]'>
                                        Akses rata-rata
                                    </p>
                                    <p className='text-xl font-semibold'>40 Menit</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='px-6 mt-6'>
                        <p className='font-bold'>Analisis Siswa</p>
                    </div>
                    <div className='px-6 mt-4'>
                        <table className="table w-full border-gray-300 text-center">
                            <thead>
                                <tr>
                                    <th className="text-gray-600 font-semibold">No.</th>
                                    <th className="text-gray-600 font-semibold">Nama Siswa</th>
                                    <th className="text-gray-600 font-semibold">Waktu Pengumpulan</th>
                                    <th className="text-gray-600 font-semibold">Status</th>
                                    <th className="text-gray-600 font-semibold">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Joel</td>
                                    <td>25 April 2023 23.47</td>
                                    <td className='justify-center flex'>
                                        <Tag className={styles.tag} type="Green">
                                            <span>Sudah dinilai</span>
                                        </Tag>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

                <div className='bg-[#F0FAFF] p-4'>
                    <Profile
                        data={{
                            name: 'Aldi Taher',
                            pic: 'https://avatars.githubusercontent.com/u/55269572?v=4',
                            email: 'look_at_the_star@gmail.com',
                            role: 'Instructor',
                        }}
                    />
                    <div className="mt-6">
                        <p className='font-bold'>Acara Mendatang</p>
                    </div>
                    <div className='h-20 mt-3 bg-gradient-to-r from-[#4161FF] to-[#2196F3] w-70  rounded-md'>
                        <div className='flex px-4 py-2 items-center gap-6 justify-start'>
                            <div className="rounded-md bg-white w-14 flex items-center text-center justify-center h-16">
                                <div>
                                    <p>Sen</p>
                                    <p>10</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-xs font-semibold text-white'>
                                    Live Session Kelas A
                                </p>
                                <p className='text-xs mt-2 text-white'>9.30 - 11.00 WIB</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-20 mt-3 bg-gradient-to-r from-[#4161FF] to-[#2196F3] w-70  rounded-md'>
                        <div className='flex px-4 py-2 items-center gap-6 justify-start'>
                            <div className="rounded-md bg-white w-14 flex items-center text-center justify-center h-16">
                                <div>
                                    <p>Sen</p>
                                    <p>10</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-xs font-semibold text-white'>
                                    Live Session Kelas A
                                </p>
                                <p className='text-xs mt-2 text-white'>9.30 - 11.00 WIB</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className='font-bold'>Tugas Belum dinilai</p>
                    </div>
                    <div className='h-20 mt-2 bg-[#2196F3] w-70 rounded-md'>
                        <div className='flex content-center p-2 justify-center'>
                            <img src="/image/papan-ujian.svg" alt="" />
                            <div>
                                <p className='text-[10px] text-white'>
                                    Deadline 20 April 2023
                                </p>
                                <p className='text-xs font-bold text-white'>Latihan 1 - Trigonometri</p>
                                <p className='text-[10px] mt-1 text-white'>Agnes</p>
                                <p className='text-[10px]  text-white'>Matematika</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-20 mt-2 bg-[#2196F3] w-70 rounded-md'>
                        <div className='flex content-center py-2 justify-center'>
                            <img src="/image/papan-ujian.svg" alt="" />
                            <div>
                                <p className='text-[10px] text-white'>
                                    Deadline 20 April 2023
                                </p>
                                <p className='text-xs font-bold text-white'>Latihan 1 - Trigonometri</p>
                                <p className='text-[10px] mt-1 text-white'>Agnes</p>
                                <p className='text-[10px]  text-white'>Matematika</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className='font-bold'>Customer Baru</p>
                    </div>
                    <div className='h-20 mt-3 bg-white w-70 drop-shadow-lg rounded-md items-center'>
                        <div className='flex px-4 py-3 items-center gap-6 justify-between'>
                            <div className="flex items-center">
                                <div className="rounded-full bg-green-200 w-12 h-12 flex items-center text-center justify-center">
                                    <img src="/image/ava.jpg" className="w-12 h-12 object-cover rounded-full" alt="" />
                                </div>
                                <div className="ml-2">
                                    <p className='text-xs font-semibold '>
                                        Bunga Rose
                                    </p>
                                    <p className='text-xs mt-2'>Kimia</p>
                                </div>
                            </div>
                            <div>
                                <img src="/image/icon-whatsapp.png" width={20} alt="" />

                            </div>
                        </div>
                    </div>
                    <div className='h-20 mt-3 bg-white w-70 drop-shadow-lg rounded-md items-center'>
                        <div className='flex px-4 py-3 items-center gap-6 justify-between'>
                            <div className="flex items-center">
                                <div className="rounded-full bg-green-200 w-12 h-12 flex items-center text-center justify-center">
                                    <img src="/image/ava.jpg" className="w-12 h-12 object-cover rounded-full" alt="" />
                                </div>
                                <div className="ml-2">
                                    <p className='text-xs font-semibold '>
                                        Bunga Rose
                                    </p>
                                    <p className='text-xs mt-2'>Kimia</p>
                                </div>
                            </div>
                            <div>
                                <img src="/image/icon-whatsapp.png" width={20} alt="" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
