'use client';
import { useState } from 'react';
import { FaRegUser, FaKey, FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action=""
      className="w-full bg-primary border border-secondary px-2 py-4 rounded-md flex flex-col gap-4 justify-center items-center"
    >
      <div className="flex w-full gap-2 items-center">
        <FaRegUser size={20} className="text-secondary" />
        <input
          className="w-full outline-none p-2 bg-primary border-b border-secondary text-secondary"
          type="email"
          placeholder="Email"
          autoFocus={true}
        />
      </div>
      <div className="flex w-full gap-2 items-center">
        <FaKey size={20} className="text-secondary" />
        <div className="w-full flex items-center relative">
          <input
            className="w-full outline-none p-2 bg-primary border-b border-secondary text-secondary"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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
      <button className="bg-primary border border-secondary text-secondary w-fit p-2 rounded-md transition-colors duration-300  hover:bg-secondary hover:text-primary">
        Ingresar
      </button>
    </form>
  );
}
