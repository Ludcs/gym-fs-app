'use client';
import axios from 'axios';
import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
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
    userHasRoutine: null,
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
        userHasRoutine: data.userHasRoutine,
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

  const createOrUpdateRoutine = async () => {
    try {
      if (routineValues.userHasRoutine) {
        // Actualizar rutina existente
        await axios.put(
          `http://localhost:8000/users/updateRoutine/${id}`,
          routineValues
        );
        // toast.success('Rutina actualizada, redirigiendo al inicio', {
        //   position: 'top-right',
        //   pauseOnHover: false,
        //   theme: 'colored',
        //   closeButton: false,
        //   style: { textAlign: 'center' },
        // });
      } else {
        // Crear nueva rutina
        const res = await axios.post(
          `http://localhost:8000/users/createRoutine/${id}`,
          routineValues
        );
        console.log(res.data.success);
        await axios.put(`http://localhost:8000/users/${id}`, {
          isActive: true,
        });
      }
      // setTimeout(() => {}, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  //*Dia corriente para el input type=date en su prop max!
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
  const year = today.getFullYear();
  const formattedToday = `${year}-${month}-${day}`;

  const formatDateForBackend = (dateString) => {
    //console.log(dateString);
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleRoutineValues = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });

    setRoutineValues((prevValues) => ({
      ...prevValues,
      [name]: name === 'startDate' ? formatDateForBackend(value) : value,
    }));
  };

  const handleQuillChange = (value) => {
    console.log(value);
    setQuillValue(value);
    setRoutineValues((prevValues) => ({
      ...prevValues,
      descriptionRoutine: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRoutineValues({
      ...routineValues,
      descriptionRoutine: quillValue,
    });
    console.log(routineValues);
    try {
      await createOrUpdateRoutine();
      router.push('/admin');
    } catch (error) {
      console.error('Error al crear o actualizar la rutina:', error);
    }
  };

  return (
    <div className="p-4 w-full bg-white flex flex-col text-primary gap-4">
      {routineValues.userHasRoutine ? (
        <h1 className="font-bold">ACTUALIZAR</h1>
      ) : (
        <h1 className="font-bold">CREAR</h1>
      )}

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
          max={formattedToday}
          className="outline-none border border-primary rounded-md p-2"
        />
        <ReactQuill
          modules={modules}
          formats={formats}
          value={quillValue}
          onChange={handleQuillChange}
          autoComplete="off"
        />
        <p className="w-full text-center underline font-bold">
          Previsualizacion, asi lo vera el usuario:
        </p>
        <div
          className="ql-editor border border-solid shadow-md"
          dangerouslySetInnerHTML={{ __html: quillValue }}
        />
        <button
          className="w-fit m-auto border border-primary p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          routineValues
          disabled={
            routineValues.objetive === '' ||
            routineValues.medicalBackground === '' ||
            routineValues.startDate === '' ||
            routineValues.descriptionRoutine === '' ||
            quillValue.replace('<p><br></p>', '').trim() === ''
          }
        >
          {routineValues.userHasRoutine ? 'Actualizar' : 'Crear'}
        </button>
        {/* <ToastContainer autoClose={3500} /> */}
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
