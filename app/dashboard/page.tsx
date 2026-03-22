import React from 'react';
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/auth.config'; // O '@/auth' dependiendo de dónde exportaste auth
import { redirect } from 'next/navigation';
import GenerateQuestionButton from '@/app/ui/GenerateQuestionButton';

export default async function DashboardPage() {
    // 1. Verificación de seguridad: Solo ADMIN puede ver esta página
    const session = await auth();
    // @ts-ignore
    if (!session || session?.user?.role !== 'ADMIN') {
        redirect('/profile'); // Si no es admin, lo mandamos a su perfil
    }

    // 2. Obtenemos las preguntas reales de la base de datos
    const dbQuestions = await prisma.questions.findMany({
        orderBy: { id: 'desc' }
    });

    return (
        <main className="pt-8 px-4 md:px-12 pb-12 min-h-screen bg-gray-50">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Gestión de Preguntas</h1>
                        <p className="text-gray-500">Administra y organiza la base de datos de tus exámenes.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined">download</span>
                            Exportar CSV
                        </button>
                        <GenerateQuestionButton/>
                    </div>
                </div>

                {/* Statistics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">+12% este mes</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Preguntas</p>
                        <p className="text-3xl font-extrabold text-gray-900">{dbQuestions.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
                            </div>
                            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">Nivel Óptimo</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Dificultad Promedio</p>
                        <p className="text-3xl font-extrabold text-gray-900">Media</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            </div>
                            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-full">Tendencia</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Categoría Principal</p>
                        <p className="text-2xl font-extrabold text-gray-900">Lógica</p>
                    </div>
                </div>

                {/* Filters & Table Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Search & Filter Bar */}
                    <div className="p-6 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100">
                        <div className="relative w-full md:w-96">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-gray-700 shadow-sm" placeholder="Buscar pregunta..." type="text" />
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <select className="flex-1 md:flex-none px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none">
                                <option>Todas las categorías</option>
                                <option>Matemáticas</option>
                                <option>Filosofía</option>
                            </select>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Pregunta & Categoría</th>
                                    <th className="px-6 py-4">Respuesta</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dbQuestions.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                            No hay preguntas registradas aún. ¡Añade la primera!
                                        </td>
                                    </tr>
                                ) : (
                                    dbQuestions.map((q) => (
                                        <tr key={q.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-5 font-mono text-xs text-indigo-600 font-bold">#Q-{q.id.toString().padStart(4, '0')}</td>
                                            <td className="px-6 py-5">
                                                <p className="font-semibold text-gray-900 truncate max-w-md">{q.questions}</p>
                                                <p className="text-xs text-gray-500 mt-1">{q.category}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 truncate max-w-xs">
                                                    {q.answer}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors" title="Editar">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" title="Eliminar">
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-xs text-gray-500 font-medium">Mostrando {dbQuestions.length} resultados</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-white text-gray-400 rounded-md text-xs font-bold border border-gray-200 disabled:opacity-50" disabled>Anterior</button>
                            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-bold shadow-sm">1</button>
                            <button className="px-3 py-1 bg-white text-gray-600 rounded-md text-xs font-bold border border-gray-200 hover:bg-gray-50 disabled:opacity-50" disabled>Siguiente</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}