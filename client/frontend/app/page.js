import Image from 'next/image';
import LogoGym from '@/assets/LogoGym.jpg';
import Login from '@/components/Login';

export default function Home() {
  return (
    <div className="px-4 py-6">
      <div className="w-full flex justify-center">
        <Image
          src={LogoGym}
          width={500}
          height={500}
          className="rounded-md mb-6"
        />
      </div>
      <Login />
    </div>
  );
}
