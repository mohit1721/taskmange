'use client'
import PrivateRoute from '@/components/PrivateRoute';
import DashboardComp from '../../components/DashboardComp'
// import Link from 'next/link';
// import { logout } from '@/services/operations/authAPI';
import { useRouter } from 'next/navigation';
import Tabs from '@/components/Tabs';

export default function Dashboard() {
 const router = useRouter();

  return (
    <PrivateRoute>

<div className="container mx-auto p-11 h-full">


<Tabs
      tab1Text="Dashboard"
      tab2Text="Task List"
      router={router}
    />
    <DashboardComp   />




    </div>
    </PrivateRoute>
 
  );

    // return <h1>Welcome to the User Dashboard!</h1>;
  }
  