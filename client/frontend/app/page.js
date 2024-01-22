'use client';
import Image from 'next/image';
import LogoGym from '@/assets/LogoGym.jpg';
import Login from '@/components/Login';
import Register from '@/components/Register';
import { useState } from 'react';

export default function Home() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className="px-4 py-6">
      <div className="w-full flex justify-center">
        <Image
          src={LogoGym}
          width={500}
          height={500}
          className="rounded-md mb-6"
          alt="Logo Gym"
        />
      </div>
      {showRegisterForm ? (
        <Register setShowRegisterForm={setShowRegisterForm} />
      ) : (
        <Login setShowRegisterForm={setShowRegisterForm} />
      )}
    </div>
  );
}
