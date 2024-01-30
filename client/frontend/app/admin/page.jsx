import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  FaPlus,
  FaSistrix,
  FaPen,
  FaRegTrashCan,
  FaUnlock,
} from 'react-icons/fa6';

const cookieStore = cookies().getAll();
const allCookies = cookieStore.map(({ name, value }) => ({ [name]: value }));
const isAdminObject = allCookies.find((cookie) => 'isAdmin' in cookie);
const isAdmin = isAdminObject ? isAdminObject.isAdmin : null;
console.log(isAdmin);

async function getAllUsers() {
  const res = await fetch(`http://localhost:8000/users`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const formattedData = data.map((user) => {
    const formattedCreatedAt = new Date(user.createdAt).toLocaleDateString();
    return { ...user, createdAt: formattedCreatedAt };
  });

  const sortedData = formattedData.sort((a, b) => a.name.localeCompare(b.name));
  return sortedData;
}

export default async function AdminPage() {
  const data = await getAllUsers();

  // const allCookies = cookieStore.getAll().map((el) => {
  //   return {
  //     name: el.value,
  //   };
  // });

  // const { value } = cookies().get('userName');
  //const {value} = cookies().get('userId');
  // const userName = value;
  // console.log({ userName });
  return (
    <div className="p-4 w-full bg-white flex flex-col gap-4">
      <div className="w-full flex items-center justify-start font-bold">
        <p>Bienvenido administrador:</p>
        {allCookies.map((el, idx) => (
          <p className="pl-1 font-normal" key={idx}>
            {el.userName}
          </p>
        ))}
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
      <form action="">
        <div className="flex relative items-center">
          <FaSistrix size={20} className="absolute left-2 text-primary" />
          <input
            type="text"
            className="border border-primary rounded-md py-2 px-8 w-full outline-none"
            placeholder="Buscar usuario"
          />
        </div>
      </form>
      {/* Mapeo de usuarios */}
      <div className="grid grid-cols-2 gap-4">
        {data.map((el) => (
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
            <p className="text-center">Creado el: {el.createdAt.split('T')}</p>
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
        ))}
      </div>
    </div>
  );
}
