'use client'; // ¡Muy importante para poder usar onClick y estados!

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GenerateQuestionButton() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleGenerate = async () => {
        try {
            setIsLoading(true);
            
            // 1. Llamamos a nuestra API de Gemini
            const response = await fetch('/api/preguntas/generar', {
                method: 'POST',
            });

            const data = await response.json();

            if (data.success) {
                // 2. MAGIA DE NEXT.JS: Esto le dice al servidor que vuelva a ejecutar 
                // prisma.questions.findMany() y actualice la tabla automáticamente en la pantalla
                router.refresh(); 
            } else {
                alert(data.message || 'Error al generar la pregunta');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error de conexión al generar la pregunta. Revisa tu consola.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className={`px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${
                isLoading 
                ? 'bg-indigo-400 text-white cursor-not-allowed shadow-none' 
                : 'bg-linear-to-r from-indigo-600 to-indigo-700 text-white hover:scale-[1.02] active:scale-[0.98] shadow-indigo-500/30'
            }`}
        >
            {isLoading ? (
                <>
                    {/* Icono animado girando cuando está cargando */}
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Generando...
                </>
            ) : (
                <>
                    {/* Icono de chispas/IA cuando está listo */}
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Nueva Pregunta (IA)
                </>
            )}
        </button>
    );
}