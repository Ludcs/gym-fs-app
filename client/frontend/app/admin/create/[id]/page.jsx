'use client';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CreatePage() {
  const { id } = useParams();
  const [quillValue, setQuillValue] = useState('');
  const [routineValues, setRoutineValues] = useState({
    userId: id,
    name: '',
    lastname: '',
    objetive: '',
    medicalBackground: '',
    startDate: '',
    descriptionRoutine: '',
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
  ];

  useEffect(() => {
    getRoutineByUserId();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getRoutineByUserId = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/users/routine/${id}`
      );
      console.log(data);
      const formattedStartDate = formatDate(data.startDate);
      //console.log(formattedStartDate);
      setRoutineValues((prevState) => ({
        ...prevState,
        userId: data.userId,
        name: data.name,
        lastname: data.lastname,
        objetive: data.objetive,
        medicalBackground: data.medicalBackground,
        startDate: formattedStartDate,
        descriptionRoutine: data.descriptionRoutine,
      }));
      setQuillValue(data.descriptionRoutine);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const { data } = await axios.get(`http://localhost:8000/users/${id}`);
        console.log(data);
        setRoutineValues((prevState) => ({
          ...prevState,
          name: data.name,
          lastname: data.lastname,
        }));
      } else {
        throw error;
      }
    }
  };

  //TODO: no puedo depender de si hay o no userId porque siempre va a haber. Probar agregar otra key al model de Routine x ej: hasRoutine = false (by default) y despues al crear la rutina pasarlo a true
  const createOrUpdateRoutine = async () => {
    try {
      if (routineValues.userId) {
        // Actualizar rutina existente
        await axios.put(
          `http://localhost:8000/users/routine/${routineValues.userId}`,
          routineValues
        );
      } else {
        // Crear nueva rutina
        await axios.post(
          `http://localhost:8000/users/createRoutine/${id}`,
          routineValues
        );
      }
      // Redireccionar o mostrar mensaje de éxito
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoutineValues = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setRoutineValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRoutineValues({
      ...routineValues,
      descriptionRoutine: quillValue,
    });
    console.log(routineValues);
    await createOrUpdateRoutine();
  };

  return (
    <div className="p-4 w-full bg-white flex flex-col text-primary gap-4">
      <h1 className="font-bold">Crear rutina</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          className="outline-none border border-primary rounded-md p-2"
          type="text"
          name="name"
          value={routineValues.name}
          placeholder="Name"
          autoComplete="off"
          onChange={handleRoutineValues}
        />
        <input
          type="text"
          name="lastname"
          value={routineValues.lastname}
          onChange={handleRoutineValues}
          placeholder="Lastname"
          autoComplete="off"
          className="outline-none border border-primary rounded-md p-2"
        />
        <input
          type="text"
          name="objetive"
          value={routineValues.objetive}
          onChange={handleRoutineValues}
          placeholder="Objetive"
          autoComplete="off"
          className="outline-none border border-primary rounded-md p-2"
        />
        <input
          type="text"
          name="medicalBackground"
          value={routineValues.medicalBackground}
          onChange={handleRoutineValues}
          placeholder="Medical background"
          autoComplete="off"
          className="outline-none border border-primary rounded-md p-2"
        />
        <input
          type="date"
          name="startDate"
          value={routineValues.startDate.split('/').reverse().join('-')}
          onChange={handleRoutineValues}
          placeholder="Start date"
          autoComplete="off"
          className="outline-none border border-primary rounded-md p-2"
        />
        <ReactQuill
          modules={modules}
          formats={formats}
          value={quillValue}
          onChange={setQuillValue}
          autoComplete="off"
        />
        {/* <div dangerouslySetInnerHTML={{ __html: quillValue }} /> */}
        <button className="w-fit m-auto border border-primary p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200">
          {routineValues.descriptionRoutine ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
}

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       await getRoutineByUserId();
//     } catch (error) {
//       if (error.response.status === 404) {
//         // No se encontró la rutina, actualizar solo con los datos del usuario
//         await getUserById();
//       } else {
//         console.log(error);
//       }
//     }
//   };
//   fetchData();
// }, []);

// const getUserById = async () => {
//   try {
//     const { data } = await axios.get(`http://localhost:8000/users/${id}`);
//     setRoutineValues((prevState) => ({
//       ...prevState,
//       name: data.name,
//       lastname: data.lastname,
//     }));
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getRoutineByUserId = async () => {
//   try {
//     const { data } = await axios.get(
//       `http://localhost:8000/users/routine/${id}`
//     );

//     const formattedStartDate = formatDate(data.startDate);
//     console.log(formattedStartDate);
//     setRoutineValues((prevState) => ({
//       ...prevState,
//       userId: data.userId,
//       name: data.name,
//       lastname: data.lastname,
//       objetive: data.objetive,
//       medicalBackground: data.medicalBackground,
//       startDate: formattedStartDate,
//     }));
//     setQuillValue(data.descriptionRoutine);
//   } catch (error) {
//     throw error;
//   }
// };