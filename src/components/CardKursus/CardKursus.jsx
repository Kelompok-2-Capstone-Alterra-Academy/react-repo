import React from 'react'

export default function CardKursus() {
    return (
        <>
            <div className='w-64 border rounded-lg mt-4'>
                <div className='grid grid-cols-2 gap-4 p-4 justify-items-center items-center'>
                    <div className=''>
                        <img src="/image/calculator.png" alt="" />
                    </div>
                    <div className='text-center'>
                        <p className='text-sm font-semibold'>Matematika</p>
                        <div className='flex mt-2 gap-1 justify-center'>
                            <img src="/icon/men.svg" alt="" />
                            <p className='text-[7px]'>Laki-laki</p>
                            <img src="/icon/women.svg" alt="" />
                            <p className='text-[7px]'>Perempuan</p>
                        </div>
                        <div className='flex gap-6 justify-center'>
                            <p>32</p>
                            <p>12</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div className='text-center'>
                        <p className='text-[10px] text-gray-600'>Jumlah Siswa</p>
                        <p className='text-lg font-bold'>44</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-[10px] text-gray-600'>Jumlah Section</p>
                        <p className='text-lg font-bold'>12</p>
                    </div>
                </div>
                <div className='flex p-3'>
                    <p className='text-[10px] text-gray-600'>Jadwal Live Session : </p>
                    <p className='text-[10px] font-bold'>Senin, Kamis 13.00-15.00</p>
                </div>
                <div className='w-full h-1 bg-blue-600 rounded-full'></div>
            </div>
        </>
    )
}
