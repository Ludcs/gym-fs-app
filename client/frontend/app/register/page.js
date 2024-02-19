'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaKey,
  FaRegEye,
  FaRegEyeSlash,
  FaRegUser,
  FaSquareEnvelope,
} from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [registerValues, setRegisterValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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
      console.log(res);
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-6 flex flex-col gap-5">
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
      </form>
    </div>
  );
}
