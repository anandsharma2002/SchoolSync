import React, { useState, useEffect } from 'react'
import Footer from '../Components/Footer'

export default function Read() {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    try {
      const response = await fetch('https://localhost:44313/api/Class');
      if (!response.ok) {
        throw new Error('Failed to fetch class data');
      }
      const data = await response.json();
      console.log(data);
      if (data.isSuccess) {
        setClassData(data.content);
      } else {
        throw new Error(data.errorMessage || 'Failed to fetch data');
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='w-[98%] mx-auto px-4 py-8 flex-grow'>
        <h1 className='text-4xl font-bold mb-6 text-center text-black bg-white bg-opacity-20 px-4 py-2 rounded-lg'>Class Information</h1>
        
        {loading && (
          <div className='text-center text-black text-xl'>
            Loading...
          </div>
        )}

        {error && (
          <div className='text-center text-red-500 text-xl bg-white bg-opacity-30 p-4 rounded-lg'>
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className='bg-white bg-opacity-30 p-6 rounded-lg backdrop-blur-sm overflow-x-auto'>
            <table className='min-w-full bg-white bg-opacity-50 rounded-lg'>
              <thead>
                <tr className='bg-gray-800 text-white'>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>S.No</th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Class Name</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {classData.map((item, index) => (
                  <tr key={item.classId} className='hover:bg-gray-100'>
                    <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{item.className}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
