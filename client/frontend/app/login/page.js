'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import {
  FaKey,
  FaRegEyeSlash,
  FaRegEye,
  FaSquareEnvelope,
} from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/components/Loader';

export default function Login() {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:8000/auth/login',
        loginValues
      );
      Cookies.set('userName', data.userName, { expires: 1 / 12, path: '/' }); //Expire in 2hs: 24hs(1 dia) dividido en 12hs = 2hs
      Cookies.set('userId', data.userId, { expires: 1 / 12, path: '/' });
      Cookies.set('isAdmin', data.isAdmin, { expires: 1 / 12, path: '/' });
      Cookies.set('token', data.token, { expires: 1 / 12, path: '/' });

      if (data.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/home');
      }
    } catch (error) {
      console.log(error);
      setLoginError(true);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 flex flex-col gap-5 sm:w-[500px] sm:mx-auto md:w-[600px] md:mx-auto lg:w-[650px] lg:mx-auto">
      <p className="text-secondary text-center text-lg font-bold">
        Si ya tienes una cuenta o si recien te registraste, aqui puedes iniciar
        sesion ingresando tu email y password
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-primary border border-secondary px-2 py-4 rounded-md flex flex-col gap-2 justify-center items-center"
      >
        <div className="flex w-full gap-2 items-center">
          <FaSquareEnvelope size={20} className="text-secondary" />
          <input
            className="w-full outline-none p-2 bg-primary border-b border-secondary text-secondary"
            type="email"
            name="email"
            value={loginValues.email}
            placeholder="Email"
            autoFocus={true}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full gap-2 items-center">
          <FaKey size={20} className="text-secondary" />
          <div className="w-full flex items-center relative">
            <input
              className="w-full outline-none p-2 bg-primary border-b border-secondary text-secondary"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginValues.password}
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            {showPassword ? (
              <FaRegEye
                size={20}
                className="absolute right-0.5 cursor-pointer text-secondary"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="absolute right-0.5 cursor-pointer text-secondary"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {loginError && (
              <p className="text-red-500">Usuario o password incorrecto</p>
            )}
            <button
              className="bg-primary border border-secondary text-secondary w-fit p-2 rounded-md transition-colors duration-300  hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loginValues.email === '' || loginValues.password === ''}
            >
              Iniciar sesion
            </button>
          </>
        )}

        <p className="text-secondary">
          No tienes una cuenta? Registrate{' '}
          <Link href={'/register'} className=" italic hover:underline">
            aca!
          </Link>
        </p>
      </form>
    </div>
  );
}
