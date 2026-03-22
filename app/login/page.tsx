'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// 1. Importamos el signIn de next-auth/react (para cliente)
import { signIn } from 'next-auth/react'; 

export default function LoginPage() {
  const router = useRouter();
const [formData, setFormData] = useState({ email: '', password: '' });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales incorrectas. Revisa tu correo o contraseña.');
      } else {
        router.push('/dashboard');
        router.refresh(); 
      }
      
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado. Revisa tu conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-4 bg-gray-50 text-black">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">Iniciar Sesión</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta? <a href="/registro" className="text-indigo-600 font-bold hover:underline">Regístrate</a>
        </p>
      </div>
    </main>
  );
}