import React from 'react';
import Link from 'next/link';
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth.config";
import { redirect } from 'next/navigation';
import { signOut } from "@/auth.config"; // Importamos el método de salida del lado del servidor

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = await prisma.users.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  if (!user) {
    return <main className="p-10 text-black">Usuario no encontrado.</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 text-black">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/dashboard" className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center font-medium transition-colors">
          ← Volver al Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-indigo-600 h-32"></div>
          
          <div className="px-8 pb-8">
            <div className="relative">
              <div className="absolute -top-12 left-0 bg-white p-2 rounded-full shadow-lg">
                <div className="bg-indigo-100 text-indigo-700 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="pt-12 flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Puntaje Total</p>
                <p className="text-4xl font-black text-indigo-600 mt-2">{user.score} pts</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">ID de Usuario</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">#{user.id}</p>
              </div>
            </div>

              {/* Para cerrar sesión en un Server Component usamos un form con una Server Action */}
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <button 
                  type="submit"
                  className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-100 transition-all text-center mt-3"
                >
                  Cerrar Sesión
                </button>
              </form>
            
          </div>
        </div>
      </div>
    </main>
  );
}