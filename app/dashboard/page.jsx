'use client'
import PrivateRoute from '@/components/PrivateRoute';
import DashboardComp from '../../components/DashboardComp'
import Link from 'next/link';
import { logout } from '@/services/operations/authAPI';
import { useRouter } from 'next/navigation';
import Tabs from '@/components/Tabs';

export default function Dashboard() {
 const router = useRouter();

  return (
    <PrivateRoute>

<div className="container mx-auto p-11 h-full">
{/* <div className='flex flex-row justify-between '>
<div className='flex flex-row justify-start gap-10'>
<h1 className="text-2xl font-bold mb-4 text-[#6557f7]">Dashboard</h1>
<Link href='/tasklist' className='font-bold text-xl ' >Task List</Link>
</div>
<button 
onClick={logout(router.push)}
className='w-fit h-fit bg-blue-500'>
  signout
</button>
</div> */}

<Tabs
      tab1Text="Dashboard"
      tab2Text="Task List"
      content1={
        <div>
          {/* <h1 className="text-2xl font-bold mb-4 text-[#6557f7]">Dashboard</h1> */}
          {/* Dashboard content goes here */}
        </div>
      }
      content2={
        <div>
          {/* <h1 className="text-2xl font-bold mb-4 text-[#6557f7]">Task List</h1> */}
          {/* Task List content goes here */}
        </div>
      }
      router={router}
    />
    <DashboardComp   />




    </div>
    </PrivateRoute>
 
  );

    // return <h1>Welcome to the User Dashboard!</h1>;
  }
  