'use client';

import React, { useState } from 'react';

export default function RegisterPage() {
  //datos minimos del fomrulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos a enviar:', formData);
    // recordar que aqui se debe agregar la logica para mandar los datos al backendddd
  };

  return (
    <main className="flex-grow flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">Crear Cuenta</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingresa tu nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="nombre"
              required
            />
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingresa tu correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="correo@gmail.com"
              required
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="**********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-800 transition-colors font-semibold"
          >
            Registrarse
          </button>
        </form>

        
      </div>
    </main>
  );
}