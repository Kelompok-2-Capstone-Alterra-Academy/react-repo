import React from 'react'
import { CardKursus, Profile, Sidebar } from '../../components'

export default function Dashboard() {
    return (
        <>
            <div className='flex'>
                <Sidebar />
                {/* content */}

                <div className='w-3/4'>
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
                    <div className='flex px-6 gap-4'>
                        <CardKursus />
                        <CardKursus />
                        <div class="w-[200px] bg-[#F0FAFF] mt-4 rounded-xl flex justify-center items-center">
                            <div class="grid grid-cols-1 place-content-center justify-items-center gap-3">
                                <div>
                                    <img class="self-center" src="/icon/add-course.svg" alt="" />
                                </div>
                                <div>
                                    <p className='text-xs'>Tambah Kursus</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='bg-[#F0FAFF] w-1/4 p-4'>
                    <Profile
                        name="Jennie BP"
                        pic={'https://i.pravatar.cc/150?img=13'}
                        email="jennieblpk20@email.com"
                    />
                </div>
            </div>
        </>
    )
}
