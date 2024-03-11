'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import SearchUser from '@/components/SearchUser';
import { useState, useEffect } from 'react';
import { FaPlus, FaPen, FaLock, FaUnlock } from 'react-icons/fa6';
import Loader from '@/components/Loader';
import Select from '@/components/Select';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [userNameCookie, setUserNameCookie] = useState('');

  const getAllRoutines = async () => {
    try {
      const res = await axios.get('http://localhost:8000/routines/all');
      return res.data;
    } catch (error) {
      console.error('Error fetching routines:', error);
      return [];
    }
  };

  const getAllUsers = async () => {
    try {
      const routinesData = await getAllRoutines();
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

      const checkUserHasRoutine = (userId) => {
        return routinesData.some(
          (routine) => routine.userId === userId && routine.userHasRoutine
        );
      };

      const usersWithKeyHasRoutine = sortedData.map((user) => ({
        ...user,
        hasRoutine: checkUserHasRoutine(user.id),
      }));

      setUsers(usersWithKeyHasRoutine);
      setFilteredUser(usersWithKeyHasRoutine);
    } catch (error) {
      console.error('Error al obtener todos los usuarios', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
      setUserNameCookie(Cookies.get('userName'));
    };

    fetchData();
  }, []);

  const searchOneUser = (searchString) => {
    if (searchString.trim() === '') {
      setFilteredUser(users);
    } else {
      let userFounded = filteredUser.filter((el) =>
        `${el.name} ${el.lastname}`
          .toLowerCase()
          .includes(searchString.toLowerCase())
      );
      setFilteredUser(userFounded);
    }
  };

  const filterByActivity = (valueActivity) => {
    if (valueActivity === 'active') {
      const activeUsers = users.filter((user) => user.isActive);
      setFilteredUser(activeUsers);
    } else if (valueActivity === 'inactive') {
      const inactiveUsers = users.filter((user) => !user.isActive);
      setFilteredUser(inactiveUsers);
    } else {
      setFilteredUser(users);
    }
  };

  const handleReactiveUser = async (id, name, lastname) => {
    console.log(id);
    const confirmReactive = window.confirm(
      `Estas seguro de reactivar el usuario: ${name} ${lastname}?`
    );
    if (!confirmReactive) return;

    try {
      const res = await axios.put(
        `http://localhost:8000/users/reactive/${id}`,
        {
          isActive: true,
        }
      );
      console.log(res);
      await getAllUsers();
    } catch (error) {
      console.error(`Error al activar usuario con el id ${id}:`, error);
    }
  };

  const handleInactiveUser = async (id, name, lastname) => {
    const confirmDelete = window.confirm(
      `Estas seguro de inactivar el usuario: ${name} ${lastname}?`
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/users/${id}`, {
        isActive: false,
      });
      console.log(res);

      await getAllUsers();
    } catch (error) {
      console.error(`Error al desactivar usuario con el id ${id}:`, error);
    }
  };

  return (
    <div className="p-4 w-full bg-white flex flex-col gap-4">
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
      </div>
      {/* Buscar y filtrar usuarios */}
      <div className="w-full flex justify-between items-center gap-1 sm:w-full sm:items-start md:w-[600px] md:items-start lg:w-[650px] lg:items-start">
        <SearchUser searchOneUser={searchOneUser} />
        <Select filterByActivity={filterByActivity} />
      </div>
      {/* Mapeo de usuarios */}
      <div>
        {users.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : filteredUser.length === 0 ? (
          <p className="font-bold text-center">No se encontró el usuario.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
            {filteredUser
              .filter((el) => el.isAdmin !== true)
              .map((el) => (
                <div
                  key={el.id}
                  className={`${
                    el.isActive === false
                      ? 'flex flex-col justify-center items-center border border-primary text-primary rounded-md p-2 gap-2 opacity-60'
                      : 'flex flex-col justify-center items-center border border-primary text-primary rounded-md p-2 gap-2'
                  }`}
                >
                  <p className="font-bold">
                    {el.name} {el.lastname}
                  </p>
                  <p className="text-center">
                    Se registró el: {el.createdAt.split('T')}
                  </p>
                  {el.isActive === true ? (
                    <p className="font-bold">Estado: Activo</p>
                  ) : (
                    <p className="font-bold">Estado: Inactivo</p>
                  )}
                  <div className="flex flex-row justify-center items-center gap-6">
                    {el.hasRoutine === true ? (
                      <Link
                        href={`/admin/create/${el.id}`}
                        title="Editar rutina"
                      >
                        {el.isActive && (
                          <FaPen
                            size={20}
                            className="cursor-pointer text-blue-600"
                          />
                        )}
                      </Link>
                    ) : (
                      <>
                        {el.isActive && (
                          <Link
                            href={`/admin/create/${el.id}`}
                            title="Crear rutina"
                          >
                            <FaPlus
                              size={20}
                              className="cursor-pointer text-green-600"
                            />
                          </Link>
                        )}
                      </>
                    )}
                    {el.isActive === true ? (
                      <>
                        <FaLock
                          size={20}
                          className="cursor-pointer"
                          title="Inactivar usuario"
                          onClick={() =>
                            handleInactiveUser(el.id, el.name, el.lastname)
                          }
                        />
                      </>
                    ) : (
                      <FaUnlock
                        size={20}
                        className="cursor-pointer"
                        title="Activar usuario"
                        onClick={() =>
                          handleReactiveUser(el.id, el.name, el.lastname)
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
