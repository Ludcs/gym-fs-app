'use client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

export default function CreatePage() {
  const [quillValue, setQuillValue] = useState('');
  const [routineValues, setRoutineValues] = useState({
    userId: 5,
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

  const handleRoutineValues = (event) => {
    const { name, value } = event.target;
    setRoutineValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRoutineValues((prevValues) => ({
      ...prevValues,
      descriptionRoutine: quillValue,
    }));
    console.log(routineValues);
  };

  return (
    <div className="p-4 w-full bg-white flex flex-col text-primary gap-4">
      <h1 className="font-bold">Crear rutina</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={routineValues.name}
          onChange={handleRoutineValues}
          placeholder="Name"
          className="outline-none border border-primary rounded-md p-2"
        />
        <input
          type="text"
          name="lastname"
          value={routineValues.lastname}
          onChange={handleRoutineValues}
          placeholder="Lastname"
          className="outline-none border border-primary rounded-md p-2"
        />
        <input
          type="text"
          name="objetive"
          value={routineValues.objetive}
          onChange={handleRoutineValues}
          placeholder="Objetive"
          className="outline-none border border-primary rounded-md p-2"
        />
        <input
          type="text"
          name="medicalBackground"
          value={routineValues.medicalBackground}
          onChange={handleRoutineValues}
          placeholder="Medical background"
          className="outline-none border border-primary rounded-md p-2"
        />
        <input
          type="date"
          name="startDate"
          value={routineValues.startDate}
          onChange={handleRoutineValues}
          placeholder="Start date"
          className="outline-none border border-primary rounded-md p-2"
        />
        <ReactQuill
          modules={modules}
          formats={formats}
          value={quillValue}
          onChange={setQuillValue}
        />
        <div dangerouslySetInnerHTML={{ __html: quillValue }} />
        <button className="w-fit m-auto border border-primary p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200">
          Crear
        </button>
      </form>
    </div>
  );
}
