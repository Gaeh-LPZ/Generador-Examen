'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: number;
    category: string;
    questions: string;
    options: Option[];
    answer: string;
    explanation: string;
}

export default function JuegoPage() {
    const router = useRouter();
    const [questionsDb, setQuestionsDb] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch('/api/preguntas');
                const data = await res.json();
                if (data.success) {
                    setQuestionsDb(data.preguntas);
                }
            } catch (error) {
                console.error("Error cargando preguntas", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
                <span className="material-symbols-outlined animate-spin text-4xl text-indigo-600">sync</span>
                <p className="font-bold text-gray-600">Preparando tu examen...</p>
            </div>
        );
    }

    if (questionsDb.length === 0) {
        return <div className="min-h-screen flex items-center justify-center font-bold text-red-500">No hay preguntas disponibles aún.</div>;
    }

    const currentQ = questionsDb[currentIndex];

    const handleOptionSelect = (optionId: string) => {
        if (isAnswered) return;
        setSelectedOption(optionId);
        setIsAnswered(true);

        if (optionId === currentQ.answer) {
            setScore(prev => prev + 10);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < questionsDb.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            alert(`¡Examen terminado! Tu puntuación final es: ${score}`);
            router.push('/profile');
        }
    };

    const successRate = currentIndex > 0 ? Math.round((score / (currentIndex * 10)) * 100) : 0;

    return (
        <main className="pt-24 pb-12 px-4 md:px-8 lg:px-12 min-h-screen flex flex-col items-center bg-gray-50 text-gray-900">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            {/* max-w-7xl permite que ocupe gran parte de la pantalla sin deformarse en monitores ultra-anchos */}
            <div className="w-full max-w-7xl space-y-8"> 

                {/* Header & Progress */}
                <div className="w-full space-y-4">
                    <div className="flex justify-between items-end mb-2">
                        <div className="space-y-1">
                            <span className="text-gray-500 text-sm uppercase tracking-wider font-bold">Progreso Actual</span>
                            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Pregunta {currentIndex + 1} de {questionsDb.length}</h2>
                        </div>
                        <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm">
                            <span className="font-bold text-indigo-600 text-lg tabular-nums">{score} pts</span>
                        </div>
                    </div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${((currentIndex) / questionsDb.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Layout a 2 columnas en escritorio (lg:grid-cols-12) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* COLUMNA PRINCIPAL (Pregunta y Opciones - 8/12 del ancho) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200">
                            
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold mb-6">
                                {currentQ.category}
                            </div>
                            
                            {/* Texto de pregunta reducido a un tamaño más elegante y legible */}
                            <h1 className="text-xl md:text-2xl font-semibold leading-relaxed text-gray-900 mb-8">
                                {currentQ.questions}
                            </h1>
                            
                            <div className="space-y-4">
                                {currentQ.options.map((opt) => {
                                    const isSelected = selectedOption === opt.id;
                                    const isCorrect = isAnswered && opt.id === currentQ.answer;
                                    const isWrong = isSelected && !isCorrect;

                                    let buttonClass = "w-full group flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border transition-all text-left bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50";
                                    let letterClass = "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors";
                                    let textClass = "text-base md:text-lg font-medium text-gray-700";

                                    if (isCorrect) {
                                        buttonClass = "w-full flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border-2 transition-all text-left bg-green-50 border-green-500";
                                        letterClass = "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-green-500 font-bold text-white";
                                        textClass = "text-base md:text-lg font-bold text-green-900";
                                    } else if (isWrong) {
                                        buttonClass = "w-full flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border-2 transition-all text-left bg-red-50 border-red-500";
                                        letterClass = "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 font-bold text-white";
                                        textClass = "text-base md:text-lg font-bold text-red-900";
                                    } else if (isAnswered) {
                                        buttonClass = "w-full flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border transition-all text-left bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed";
                                    }

                                    return (
                                        <button 
                                            key={opt.id}
                                            onClick={() => handleOptionSelect(opt.id)}
                                            disabled={isAnswered}
                                            className={buttonClass}
                                        >
                                            <span className={letterClass}>{opt.id}</span>
                                            <span className={textClass}>{opt.text}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Explicación de la IA con un diseño más integrado */}
                        {isAnswered && (
                            <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500 flex gap-4 animate-in fade-in slide-in-from-bottom-4 shadow-sm">
                                <span className="material-symbols-outlined text-indigo-600 mt-0.5">auto_awesome</span>
                                <div>
                                    <h4 className="font-bold text-indigo-900 mb-2">Explicación de la IA</h4>
                                    <p className="text-indigo-800 text-sm leading-relaxed">
                                        {currentQ.explanation}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* COLUMNA LATERAL (Estadísticas y Botones - 4/12 del ancho) */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Tarjeta de Rendimiento */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                            <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-4">Rendimiento de la Sesión</h3>
                            
                            <div className="pt-2">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-500">Tasa de Aciertos</span>
                                    <span className="text-lg font-black text-indigo-600">{successRate}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3">
                                  <div className="bg-indigo-600 h-3 rounded-full transition-all duration-700" style={{ width: `${successRate}%` }}></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-4 text-center">
                                    Has respondido {currentIndex} pregunta(s) hasta ahora.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta Decorativa de Gamificación */}
                        <div className="bg-linear-to-br from-indigo-600 to-indigo-800 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                            <div className="relative z-10 space-y-3">
                                <h3 className="font-bold text-lg leading-tight">Nivel de Maestría</h3>
                                <p className="text-indigo-100 text-sm">Sigue así para desbloquear nuevas categorías.</p>
                            </div>
                            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-white opacity-10">trending_up</span>
                        </div>

                        {/* Botón Siguiente (Flotante al final de la columna lateral) */}
                        {isAnswered && (
                            <button 
                                onClick={handleNextQuestion}
                                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                            >
                                {currentIndex < questionsDb.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Examen'}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}