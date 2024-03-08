'use client';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaRightFromBracket } from 'react-icons/fa6';
//import Sidebar from './Sidebar';
import Link from 'next/link';

export default function Navbar() {
  //const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

  // const isAdmin = Cookies.get('isAdmin');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', clearCookies);

      return () => {
        window.removeEventListener('beforeunload', clearCookies);
      };
    }
  }, []);

  const clearCookies = () => {
    Cookies.remove('userName');
    Cookies.remove('userId');
    Cookies.remove('isAdmin');
    Cookies.remove('token');
  };

  const handleLogout = () => {
    clearCookies();
    window.location.href = '/';
    //router.push('/');
  };

  return (
    <div className="bg-secondary flex justify-between items-center p-4">
      {/* {pathname !== '/' && showSidebar ? (
        <Sidebar setShowSidebar={setShowSidebar} />
      ) : (
        <FaBars
          className="cursor-pointer text-primary"
          size={20}
          onClick={() => setShowSidebar(true)}
        />
      )} */}
      {/* <FaBars
        className={`cursor-pointer text-primary ${
          pathname === '/' || pathname === '/login' || pathname === '/register'
            ? 'invisible'
            : ''
        }`}
        size={20}
        onClick={() => setShowSidebar(true)}
      />
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />} */}
      <Link
        href={'/'}
        onClick={handleLogout}
        className={`${
          pathname === '/' || pathname === '/login' || pathname === '/register'
            ? 'invisible'
            : ''
        }`}
      >
        <div className="text-primary w-full flex items-center gap-2 font-bold cursor-pointer hover:text-red-500 transition-colors duration-200">
          <FaRightFromBracket size={20} />
          <p>Salir</p>
        </div>
      </Link>
      {pathname === '/login' || pathname === '/register' ? (
        <Link href={'/'} className="text-primary font-bold text-lg text-end">
          Devs Gym
        </Link>
      ) : (
        <p className="text-primary font-bold text-lg text-end">Devs Gym</p>
      )}
    </div>
  );
}
