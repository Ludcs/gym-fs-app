'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import SearchUser from '@/components/SearchUser';
import { useState, useEffect } from 'react';
import {
  FaPlus,
  FaPen,
  FaRegTrashCan,
  FaLock,
  FaUnlock,
} from 'react-icons/fa6';
import Loader from '@/components/Loader';
import Select from '@/components/Select';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [userRoutines, setUserRoutines] = useState([]);
  const [userNameCookie, setUserNameCookie] = useState('');

  const getAllRoutines = async () => {
    try {
      const res = await axios.get('http://localhost:8000/routines/all');
      return res.data;
      //setUserRoutines(res.data);
    } catch (error) {
      console.error('Error fetching routines:', error);
      return [];
    }
  };

  // const checkUserHasRoutine = (userId) => {
  //   return userRoutines.some(
  //     (routine) => routine.userId === userId && routine.userHasRoutine
  //   );
  // };

  const getAllUsers = async () => {
    try {
      //await getAllRoutines();
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

      // const usersWithKeyHasRoutine = sortedData.map((user) => ({
      //   ...user,
      //   hasRoutine: checkUserHasRoutine(user.id),
      // }));

      // setUsers(usersWithKeyHasRoutine);
      // setFilteredUser(usersWithKeyHasRoutine);
    } catch (error) {
      console.error('Error al obtener todos los usuarios', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
      //await getAllRoutines();
      //Para no tener problema de hidratacion con el client component:
      setUserNameCookie(Cookies.get('userName'));
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const checkUserHasRoutine = (userId) => {
  //     return userRoutines.some(
  //       (routine) => routine.userId === userId && routine.userHasRoutine
  //     );
  //   };

  //   const usersWithKeyHasRoutine = users.map((user) => ({
  //     ...user,
  //     hasRoutine: checkUserHasRoutine(user.id),
  //   }));
  //   setUsers(usersWithKeyHasRoutine);
  //   setFilteredUser(usersWithKeyHasRoutine);
  //   //setForceUpdate(false);
  //   console.log('users con hasRoutine', users);
  //   console.log('filteredUser con hasRoutine', filteredUser);
  // }, [userRoutines]);

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

  //TODO: al reactivar un usuario, todos los demas tienen signo "+" en vez de "lapiz"
  //!El problema es volver a llamar a getAllUsers, dado que me setea los users originales sin la key hasRoutine
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
      // await getAllRoutines();
      // const checkUserHasRoutine = (userId) => {
      //   return userRoutines.some(
      //     (routine) => routine.userId === userId && routine.userHasRoutine
      //   );
      // };

      // const usersWithKeyHasRoutine = users.map((user) => ({
      //   ...user,
      //   hasRoutine: checkUserHasRoutine(user.id),
      // }));
      // setUsers(usersWithKeyHasRoutine);
      // setFilteredUser(usersWithKeyHasRoutine);
    } catch (error) {
      console.error(`Error al activar usuario con el id ${id}:`, error);
    }
  };

  //TODO: al inactivar un usuario, todos los demas tienen signo "+" en vez de "lapiz"
  //!El problema es volver a llamar a getAllUsers, dado que me setea los users originales sin la key hasRoutine

  const handleInactiveUser = async (id, name, lastname) => {
    //console.log(id);
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
      </div>
      {/* Buscar y filtrar usuarios */}
      <div className="w-full flex justify-between items-center gap-1">
        <SearchUser searchOneUser={searchOneUser} />
        <Select filterByActivity={filterByActivity} />
      </div>
      {/* Mapeo de usuarios */}
      <div className="grid grid-cols-2 gap-4">
        {users.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : filteredUser.length === 0 ? (
          <p className="font-bold">No se encontro el usuario.</p>
        ) : (
          filteredUser
            .filter((el) => el.isAdmin !== true)
            .map((el) => (
              <div
                key={el.id}
                className={`${
                  el.isActive === false
                    ? 'flex flex-col justify-center items-center border border-primary  text-primary rounded-md p-2 gap-2 opacity-60'
                    : 'flex flex-col justify-center items-center border border-primary text-primary rounded-md p-2 gap-2'
                }`}
              >
                <p className="font-bold">
                  {el.name} {el.lastname}
                </p>
                <p className="text-center">
                  Se registro el: {el.createdAt.split('T')}
                </p>
                {el.isActive === true ? (
                  <p className="font-bold">Estado: Activo</p>
                ) : (
                  <p className="font-bold">Estado: Inactivo</p>
                )}
                <div className="flex flex-row justify-center items-center gap-6">
                  {el.hasRoutine === true ? (
                    <Link href={`/admin/create/${el.id}`} title="Editar rutina">
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
                      <FaRegTrashCan
                        size={20}
                        className="cursor-pointer"
                        title="Eliminar usuario"
                        //onClick={() => handleDisabledUser(el.id)}
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

// const handleAddRoutineById = async (id) => {
//   console.log(id);

//   try {
//     const { data } = await axios.get(`http://localhost:8000/users/${id}`);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
