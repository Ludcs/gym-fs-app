'use client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  FaClipboardUser,
  FaHouse,
  FaRightFromBracket,
  FaXmark,
} from 'react-icons/fa6';

export default function Sidebar({ setShowSidebar }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = Cookies.get('isAdmin');

  const clearCookies = () => {
    Cookies.remove('userName');
    Cookies.remove('userId');
    Cookies.remove('isAdmin');
    Cookies.remove('token');
  };

  const handleLogout = () => {
    clearCookies();
    setShowSidebar(false);
    router.push('/');
  };

  return (
    <div className="bg-white h-screen absolute left-0 top-0 py-4 pt-6 flex flex-col pl-4 pr-8 z-10">
      <button
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowSidebar(false)}
      >
        <FaXmark size={20} className="text-primary" />
      </button>
      <ul className="flex flex-col flex-1 gap-4">
        <Link href={isAdmin === 'true' ? '/admin' : '/home'}>
          <div
            className={`${
              pathname === '/admin' || pathname === '/home'
                ? 'text-primary w-full flex items-center gap-4 border-b-2 cursor-default border-primary pb-1 '
                : 'text-slate-600 w-full flex items-center gap-4 cursor-pointer hover:text-primary border-b-2 border-transparent pb-1'
            }`}
          >
            <FaHouse size={20} />
            <li className="">Inicio</li>
          </div>
        </Link>

        <Link href={isAdmin === 'true' ? ' /admin/create ' : '/home/routine'}>
          <div
            className={`${
              pathname === '/admin/create' || pathname === '/home/routine'
                ? 'text-primary w-full flex items-center gap-4 border-b-2 cursor-default border-primary pb-1 '
                : 'text-slate-600 w-full flex items-center gap-4 cursor-pointer hover:text-primary border-b-2 border-transparent pb-1'
            }`}
          >
            <FaClipboardUser size={20} />
            {isAdmin === 'true' ? <li>Crear rutina</li> : <li>Ver rutina</li>}
          </div>
        </Link>
        <div className="mt-auto">
          <Link href={'/'} onClick={handleLogout}>
            <div className="text-primary w-full flex items-center gap-4 cursor-pointer hover:text-red-500 transition-colors duration-200">
              <FaRightFromBracket size={20} />
              <li>Salir</li>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
}
