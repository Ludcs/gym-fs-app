'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FaPlus, FaPen, FaRegTrashCan, FaUnlock } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import SearchUser from '@/components/SearchUser';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [userNameCookie, setUserNameCookie] = useState('');

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/users`);
      const usersData = res.data;

      const formattedData = usersData.map((user) => {
        const formattedCreatedAt = new Date(
          user.createdAt
        ).toLocaleDateString();
        return { ...user, createdAt: formattedCreatedAt };
      });

      const sortedData = formattedData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setUsers(sortedData);
      setFilteredUser(sortedData);
    } catch (error) {
      console.error('Error al obtener todos los usuarios', error);
    }
  };

  useEffect(() => {
    getAllUsers();
    //Para no tener problema de hidratacion con el client component:
    setUserNameCookie(Cookies.get('userName'));
  }, []);

  const searchOneUser = (searchString) => {
    let userFounded = users.filter((el) =>
      `${el.name} ${el.lastname}`
        .toLowerCase()
        .includes(searchString.toLowerCase())
    );
    setFilteredUser(userFounded);
  };

  return (
    <div className="p-4 w-full bg-white flex flex-col gap-4 min-h-screen">
      <div className="w-full flex items-center justify-start font-bold">
        <p>
          Bienvenido administrador:{' '}
          <span className="pl-1 font-normal">
            {userNameCookie ? userNameCookie : null}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center w-full text-primary">
        <h1 className="font-bold uppercase">Lista de usuarios</h1>
        <div className="flex justify-between items-center bg-white text-primary border border-primary p-2 gap-2 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200">
          <Link href={'/admin/create'}>
            <button>Crear rutina</button>
          </Link>
          <FaPlus size={20} />
        </div>
      </div>
      {/* Buscar usuario */}
      <SearchUser searchOneUser={searchOneUser} />
      {/* Mapeo de usuarios */}
      <div className="grid grid-cols-2 gap-4">
        {users.length === 0 ? (
          <p>Cargando...</p>
        ) : filteredUser.length === 0 ? (
          <p>No se encontro el usuario</p>
        ) : (
          filteredUser.map((el) => (
            <div
              key={el.id}
              className={`${
                el.isActive === false
                  ? 'flex flex-col justify-center items-center border border-red-600  text-red-600 rounded-md p-2 gap-2'
                  : 'flex flex-col justify-center items-center border border-primary text-primary rounded-md p-2 gap-2'
              }`}
            >
              <p className="font-bold">
                {el.name} {el.lastname}
              </p>
              <p className="text-center">
                Creado el: {el.createdAt.split('T')}
              </p>
              {el.isActive === true ? (
                <p className="font-bold">Estado: Activo</p>
              ) : (
                <p className="font-bold">Estado: Inactivo</p>
              )}
              <div className="flex flex-row justify-center items-center gap-6">
                {el.isActive === true && (
                  <FaPen size={20} className="cursor-pointer" />
                )}
                {el.isActive === true ? (
                  <FaRegTrashCan size={20} className="cursor-pointer" />
                ) : (
                  <FaUnlock size={20} className="cursor-pointer" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// const cookieStore = cookies().getAll();
// const allCookies = cookieStore.map(({ name, value }) => ({ [name]: value }));
// const isAdminObject = allCookies.find((cookie) => 'isAdmin' in cookie);
// const isAdmin = isAdminObject ? isAdminObject.isAdmin : null;

// async function getAllUsers() {
//   const res = await fetch(`http://localhost:8000/users`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   const data = await res.json();

// const formattedData = data.map((user) => {
//   const formattedCreatedAt = new Date(user.createdAt).toLocaleDateString();
//   return { ...user, createdAt: formattedCreatedAt };
// });

//   const sortedData = formattedData.sort((a, b) => a.name.localeCompare(b.name));
//   return sortedData;
// }

// async function getUserByName(name = 'Luciano', lastname = 'De Carolis') {
//   const res = await fetch(
//     `http://localhost:8000/users/search?name=${name}&lastname=${lastname}`
//   );

//   if (!res.ok) {
//     throw new Error('Failed to fetch user data');
//   }
//   const data = await res.json();
//   return data;
// }
