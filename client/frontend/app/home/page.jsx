'use client';
import Loader from '@/components/Loader';
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
import { useEffect, useState } from 'react';

const userId = Cookies.get('userId');
const userName = Cookies.get('userName');

export default function HomePage() {
  // const userRoutine = await getRoutineByUserId();

  // const { objetive, medicalBackground, descriptionRoutine } = userRoutine;
  const [objetive, setObjetive] = useState('');
  const [medicalBackground, setMedicalBackground] = useState('');
  const [startDate, setStartDate] = useState();
  const [descriptionRoutine, setDescriptionRoutine] = useState('');
  const [loading, setLoading] = useState(true);

  const getRoutineByUserId = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/users/routine/${userId}`
      );
      // console.log({ data });
      setObjetive(data.objetive);
      setMedicalBackground(data.medicalBackground);
      setStartDate(data.startDate);
      setDescriptionRoutine(data.descriptionRoutine);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoutineByUserId();
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
          <div className="py-2">
            <h1 className="text-center uppercase font-bold text-xl">
              {userName}
            </h1>
            {formattedDate ? (
              <p className="text-center">
                Esta es tu rutina actual creada el:{' '}
                <span className="font-bold">{formattedDate}</span>
              </p>
            ) : (
              <p className="text-center">Aun no tienes una rutina</p>
            )}
          </div>
          <div className="py-4">
            {objetive && <p>🟡 Objetivo: {objetive}</p>}
            {medicalBackground && (
              <p>🟡 Antecedente medico: {medicalBackground}</p>
            )}
          </div>
          <div className="py-4">
            <h2 className="text-center uppercase text-lg pb-2 font-bold">
              Rutina
            </h2>
            {/* <p className="text-justify">{descriptionRoutine}</p> */}
            {descriptionRoutine && (
              <p dangerouslySetInnerHTML={{ __html: descriptionRoutine }} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
