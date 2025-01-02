import React, { useState } from 'react';
// import Link from 'next/link';
import { Suspense } from 'react'

import { logout } from '@/services/operations/authAPI';
// import { useRouter } from 'next/navigation';

const Tabs = ({ tab1Text, tab2Text, router }) => {
  const [activeTab, setActiveTab] = useState('tab1'); // Default active tab
    // const router = useRouter()
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if(tab==='tab1')
        {
            router.push('/dashboard')
        }
    else{
        router.push('/tasklist')
    }
    
  };

  return (
    <Suspense fallback={<div>Loading Tabs...</div>}>
  <div>
      {/* Tab Navigation */}
      <div className='flex flex-row justify-between mb-20'>
      <div className='flex flex-row justify-start gap-10'>
  {/* Tab Buttons */}
  <button
    className={`font-bold text-xl py-2 px-4 rounded-full transition duration-300 ${activeTab === 'tab1' ? 'bg-[#6557f7] text-white shadow-lg' : 'text-black bg-white'}`}
    onClick={() => handleTabClick('tab1')}
  >
    {tab1Text}
  </button>
  <button
    className={`font-bold text-xl py-2 px-4 rounded-full transition duration-300 ${activeTab === 'tab2' ? 'bg-[#6557f7] text-white shadow-lg' : 'text-black bg-white'}`}
    onClick={() => handleTabClick('tab2')}
  >
    {tab2Text}
  </button>
</div>


        {/* Logout Button */}
        <button
          onClick={logout(router.push)}
          className='w-fit h-fit bg-blue-500'
        >
          Signout
        </button>
      </div>

    </div>
    </Suspense>
  
  );
};

export default Tabs;
