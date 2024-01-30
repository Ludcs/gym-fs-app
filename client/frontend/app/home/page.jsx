import { cookies } from 'next/headers';

const cookieStore = cookies().getAll();
const allCookies = cookieStore.map(({ name, value }) => ({ [name]: value }));
// console.log(allCookies);

const userIdObject = allCookies.find((cookie) => 'userId' in cookie);
const userId = userIdObject ? userIdObject.userId : null;

const userNameObject = allCookies.find((cookie) => 'userName' in cookie);
const userName = userNameObject ? userNameObject.userName : null;

async function getRoutineByUserId() {
  const res = await fetch(`http://localhost:8000/users/routine/${userId}`);
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const userRoutine = await getRoutineByUserId();

  const startDate = new Date(userRoutine.startDate);
  const formattedDate = `${startDate.getDate()}/${
    startDate.getMonth() + 1
  }/${startDate.getFullYear()}`;

  const { objetive, medicalBackground, descriptionRoutine } = userRoutine;

  return (
    <div className="px-4 py-6 w-full flex flex-col text-secondary">
      <div className="py-2">
        <h1 className="text-center uppercase font-bold text-xl">{userName}</h1>
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
        <p>🟡 Objetivo: {objetive}</p>
        <p>🟡 Antecedente medico: {medicalBackground}</p>
      </div>
      <div className="py-4">
        <h2 className="text-center uppercase text-lg pb-2 font-bold">Rutina</h2>
        <p className="text-justify">{descriptionRoutine}</p>
      </div>
    </div>
  );
}
