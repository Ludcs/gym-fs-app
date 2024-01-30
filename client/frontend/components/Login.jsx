'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { FaRegUser, FaKey, FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

export default function Login({ setShowRegisterForm }) {
  // const [, setCookies] = useCookies(['access_token']);
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      Cookies.set('userName', data.userName, { expires: 7, path: '/' });
      Cookies.set('userId', data.userId, { expires: 7, path: '/' });
      Cookies.set('isAdmin', data.isAdmin, { expires: 7, path: '/' });
      Cookies.set('token', data.token, { expires: 7, path: '/' });
      console.log(data);

      if (data.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/home');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-primary border border-secondary px-2 py-4 rounded-md flex flex-col gap-2 justify-center items-center"
    >
      <div className="flex w-full gap-2 items-center">
        <FaRegUser size={20} className="text-secondary" />
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
        <button
          className="bg-primary border border-secondary text-secondary w-fit p-2 rounded-md transition-colors duration-300  hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loginValues.email === '' || loginValues.password === ''}
        >
          Ingresar
        </button>
      )}

      <p className="text-secondary">
        No tienes una cuenta? Create una{' '}
        <span
          className="cursor-pointer font-bold underline"
          onClick={() => setShowRegisterForm(true)}
        >
          aca!
        </span>
      </p>
    </form>
  );
}
