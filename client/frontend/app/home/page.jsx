'use client';

// import { cookies } from 'next/headers';

// const cookieStore = cookies().getAll();
// const allCookies = cookieStore.map(({ name, value }) => ({ [name]: value }));
// console.log({ allCookies });

// const userIdObject = allCookies.find((cookie) => 'userId' in cookie);
// const userId = userIdObject ? userIdObject.userId : null;

// const userNameObject = allCookies.find((cookie) => 'userName' in cookie);
// const userName = userNameObject ? userNameObject.userName : null;

// async function getRoutineByUserId() {
//   //console.log({ userId });
//   const res = await fetch(`http://localhost:8000/users/routine/${userId}`);
//   const data = await res.json();
//   //console.log({ data });
//   return data;
// }
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader';
import 'react-quill/dist/quill.core.css';
import { useEffect, useState } from 'react';

const userId = Cookies.get('userId');
const userName = Cookies.get('userName');

export default function HomePage() {
  // const userRoutine = await getRoutineByUserId();

  // const { objetive, medicalBackground, descriptionRoutine } = userRoutine;
  const [userInfo, setUserInfo] = useState({});
  const [objetive, setObjetive] = useState('');
  const [medicalBackground, setMedicalBackground] = useState('');
  const [startDate, setStartDate] = useState();
  const [descriptionRoutine, setDescriptionRoutine] = useState('');
  const [loading, setLoading] = useState(true);
  const [noRoutine, setNoRoutine] = useState(false);

  const getRoutineByUserId = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/users/routine/${userId}`
      );
      console.log({ data });
      setObjetive(data.objetive);
      setMedicalBackground(data.medicalBackground);
      setStartDate(data.startDate);
      setDescriptionRoutine(data.descriptionRoutine);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setNoRoutine(true);
    }
  };

  const getUserById = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/users/${userId}`);
      console.log(data);
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoutineByUserId();
    getUserById();
  }, []);

  //if (loading) return <p>Cargando...</p>;

  const backendDate = new Date(startDate);
  const formattedDate = `${backendDate.getDate()}/${
    backendDate.getMonth() + 1
  }/${backendDate.getFullYear()}`;

  return (
    <div className="px-4 py-6 w-full flex flex-col text-secondary">
      {loading ? (
        <div className="w-full flex flex-col justify-center items-center h-[calc(100vh-150px)]">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-center uppercase font-bold text-xl">
            <span className="font-normal">Bienvenido</span> {userName} 👋
          </h1>
          {userInfo.isActive === false ? (
            <p className="py-5 flex flex-col justify-center text-center">
              <span className="text-red-500 text-2xl">
                No estas activo en el sistema ⛔
              </span>{' '}
              <span className="text-white">
                Por favor comunicate con la administracion del gimnasio.
              </span>
            </p>
          ) : (
            <>
              <div className="py-2 flex flex-col gap-2">
                {startDate !== undefined ? (
                  <p className="text-center">
                    Esta es tu rutina actual creada el:{' '}
                    <span className="font-bold">{formattedDate}</span>
                  </p>
                ) : (
                  <p className="text-center text-lg p-4">
                    Aun no tienes una rutina, contacta con tu profesor para que
                    te cree una! Cuando la tengas la podras ver aca 🏋️‍♂️
                  </p>
                )}
              </div>
              <div className="py-4 flex flex-col gap-2">
                {objetive && (
                  <p>
                    🟡 Objetivo: <span className="font-bold">{objetive}</span>
                  </p>
                )}
                {medicalBackground && (
                  <p>
                    🟡 Antecedente medico:{' '}
                    <span className="font-bold">{medicalBackground}</span>
                  </p>
                )}
              </div>
              {descriptionRoutine !== '' ? (
                <div className="py-4 border border-solid rounded border-opacity-30 border-secondary shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                  <h2 className="text-center uppercase text-lg pb-2 font-bold">
                    Rutina
                  </h2>
                  {/* <p className="text-justify">{descriptionRoutine}</p> */}
                  {descriptionRoutine && (
                    <p
                      className="ql-editor"
                      dangerouslySetInnerHTML={{ __html: descriptionRoutine }}
                    />
                  )}
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
}
