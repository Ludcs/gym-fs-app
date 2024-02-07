import Image from 'next/image';
import LogoGym from '@/assets/LogoGym.jpg';
import Link from 'next/link';
// import Login from '@/components/Login';
// import Register from '@/components/Register';
// import { useState } from 'react';

export default function Home() {
  // const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className="px-4 py-6 text-secondary flex flex-col gap-10">
      <div className="w-full flex justify-center">
        <Image
          src={LogoGym}
          width={500}
          height={500}
          className="rounded-md mb-6"
          alt="Logo Gym"
          priority={true}
        />
      </div>
      <div className="px-4 py-6 flex flex-col justify-center items-center w-full gap-2 border-t-2 border-b-2 border-secondary">
        <h1 className="text-2xl text-center italic font-bold">
          "Forge your destiny, sculpt your strength"
        </h1>
      </div>
      <div className="flex justify-center items-center w-full gap-10 font-bold text-lg">
        <Link href={'/login'} className="hover:underline uppercase">
          Iniciar sesion
        </Link>
        <Link href={'/register'} className="hover:underline uppercase">
          Registrarse
        </Link>
      </div>
    </div>
  );
}
