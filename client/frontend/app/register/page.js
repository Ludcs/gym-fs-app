'use client';
import axios from 'axios';
import Link from 'next/link';
import {
  FaKey,
  FaRegEye,
  FaRegEyeSlash,
  FaRegUser,
  FaSquareEnvelope,
} from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [registerValues, setRegisterValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/auth/register',
        registerValues
      );
      toast('🏋️‍♂️ Registro exitoso, redirigiendo para iniciar sesión', {
        position: 'bottom-center',
        pauseOnHover: false,
        theme: 'dark',
        closeButton: false,
        style: { textAlign: 'center' },
      });
      setTimeout(() => {
        router.push('/login');
      }, 4000);
    } catch (error) {
      console.log(error);
      setRegisterError(true);
    }
  };

  return (
    <div className="px-4 py-6 flex flex-col gap-5 sm:w-[500px] sm:mx-auto md:w-[600px] md:mx-auto lg:w-[650px] lg:mx-auto">
      <p className="text-secondary text-center text-lg font-bold">
        Completa tus datos personales para registrarte en el sistema
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-primary border border-secondary px-2 py-4 rounded-md flex flex-col gap-2 justify-center items-center"
      >
        <div className="flex w-full gap-2 items-center">
          <FaRegUser size={20} className="text-secondary" />
          <input
            className="w-full outline-none p-2 bg-primary border-b border-secondary text-secondary"
            type="text"
            name="name"
            value={registerValues.name}
            placeholder="Name"
            autoFocus={true}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full gap-2 items-center">
          <FaRegUser size={20} className="text-secondary" />
          <input
            className="w-full outline-none p-2 bg-primary border-b border-secondary text-secondary"
            type="text"
            name="lastname"
            value={registerValues.lastname}
            placeholder="Lastname"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full gap-2 items-center">
          <FaSquareEnvelope size={20} className="text-secondary" />
          <input
            className="w-full outline-none p-2 bg-primary border-b border-secondary text-secondary"
            type="email"
            name="email"
            value={registerValues.email}
            placeholder="Email"
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
              value={registerValues.password}
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
        {registerError && (
          <p className="text-red-500">Este usuario ya esta registrado</p>
        )}
        <button
          className="bg-primary border border-secondary text-secondary w-fit p-2 rounded-md transition-colors duration-300  hover:bg-secondary hover:text-primary hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            registerValues.name === '' ||
            registerValues.lastname === '' ||
            registerValues.email === '' ||
            registerValues.password === ''
          }
        >
          Registrarse
        </button>
        <p className="text-secondary">
          Ya tienes una cuenta? Inicia sesion{' '}
          <Link href={'/login'} className="italic hover:underline">
            aca!
          </Link>
        </p>
        <ToastContainer autoClose={3500} />
      </form>
    </div>
  );
}
