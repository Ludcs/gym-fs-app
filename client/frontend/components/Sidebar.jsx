import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaClipboardUser,
  FaHouse,
  FaRightFromBracket,
  FaXmark,
} from 'react-icons/fa6';

export default function Sidebar({ setShowSidebar }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="bg-white h-screen absolute left-0 top-0 py-4 pt-6 flex flex-col pl-4 pr-8">
      <button
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowSidebar(false)}
      >
        <FaXmark size={20} className="text-primary" />
      </button>
      <ul className="flex flex-col flex-1 gap-4">
        <Link
          href={'/admin'}
          onClick={() => setShowSidebar(false)}
          className={`${
            pathname === '/admin' ? 'bg-slate-400 p-2 rounded-md' : 'p-2'
          }`}
        >
          <div className="text-primary w-full flex items-center gap-4 cursor-pointer">
            <FaHouse size={20} />
            <li className="">Inicio</li>
          </div>
        </Link>
        <Link
          href={'/admin/create'}
          onClick={() => setShowSidebar(false)}
          className={`${
            pathname === '/admin/create' ? 'bg-slate-400 p-2 rounded-md' : 'p-2'
          }`}
        >
          <div className="text-primary w-full flex items-center gap-4 cursor-pointer">
            <FaClipboardUser size={20} />
            <li>Crear rutina</li>
          </div>
        </Link>
        <div className="mt-auto">
          <Link href={'/'} onClick={() => setShowSidebar(false)}>
            <div className="text-primary w-full flex items-center gap-4 cursor-pointer hover:text-red-500">
              <FaRightFromBracket size={20} />
              <li>Salir</li>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
}
