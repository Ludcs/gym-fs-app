'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars } from 'react-icons/fa6';
import Sidebar from './Sidebar';
import Link from 'next/link';

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

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
      {(pathname !== '/') &
      (pathname !== '/login') &
      (pathname !== '/register') ? (
        <FaBars
          className="cursor-pointer text-primary"
          size={20}
          onClick={() => setShowSidebar(true)}
        />
      ) : null}
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      <Link
        href={'/'}
        className="w-full text-primary font-bold text-lg text-end"
      >
        Devs Gym
      </Link>
    </div>
  );
}
