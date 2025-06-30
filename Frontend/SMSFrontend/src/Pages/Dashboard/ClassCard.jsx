import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function ClassCard({ item, index }) {
    
    const navigate = useNavigate()

    
    return (
        <tr key={item?.classId} className="">
            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item?.className}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={()=> navigate('/Students', { state: { classId : item?.classId } })} className="bg-green-500 px-6 py-2 rounded-lg text-white text-[18px]" >See Students</button>
            </td>
        </tr>
    )
}
