import React from 'react'

export default function ClassCard({ image, name, buttonText, onButtonClick }) {
    return (
        <div className="w-full max-w-xs sm:max-w-xs md:max-w-xs lg:w-[220px] border border-gray-200 rounded-xl shadow-md bg-white flex flex-col items-center m-2">
            <img className="rounded-t-lg w-full h-32 object-cover sm:h-32 md:h-32 lg:w-[120px] lg:h-[120px]" src={image} alt={name} />
            <div className='flex justify-around items-center w-full py-4' style={{ background: 'linear-gradient(90deg, #e3ffe8 0%, #d0eaff 100%)', borderRadius: '0 0 12px 12px' }}>
                <span className="font-semibold text-base sm:text-lg md:text-lg lg:text-lg">{name}</span>
                <button style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: '#1976d2', color: '#fff', fontWeight: 500, cursor: 'pointer', fontSize: 15 }} onClick={onButtonClick}>{buttonText}</button>
            </div>
        </div>
    )
}
