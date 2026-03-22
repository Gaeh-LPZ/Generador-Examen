import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/auth.config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session || session?.user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 401 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // 1. ACTUALIZAMOS EL PROMPT PARA PEDIR LAS OPCIONES Y LA EXPLICACIÓN
        const prompt = `
            Eres un experto en programación web (HTML, CSS, JavaScript, React, Node.js, etc.).
            Genera UNA nueva pregunta técnica de nivel intermedio sobre programación web.
            
            Debes responder ÚNICAMENTE con un objeto JSON válido que tenga esta estructura exacta, sin texto adicional ni bloques de markdown:
            {
                "questions": "La pregunta detallada aquí",
                "answer": "La letra de la respuesta correcta (ej. B)",
                "category": "La tecnología principal (ej. React)",
                "options": [
                    { "id": "A", "text": "Primera opción" },
                    { "id": "B", "text": "Segunda opción (correcta si answer es B)" },
                    { "id": "C", "text": "Tercera opción" },
                    { "id": "D", "text": "Cuarta opción" }
                ],
                "explanation": "Explicación detallada de por qué esa es la respuesta correcta."
            }
        `;

        const result = await model.generateContent(prompt);
        let textResult = result.response.text();

        textResult = textResult.replace(/```json\n?|```/g, '').trim();
        const questionData = JSON.parse(textResult);

        // 2. ACTUALIZAMOS EL GUARDADO PARA INCLUIR LOS NUEVOS CAMPOS
        const savedQuestion = await prisma.questions.create({
            data: {
                questions: questionData.questions,
                answer: questionData.answer,
                category: questionData.category,
                options: questionData.options,         // <-- Guardamos el JSON de opciones
                explanation: questionData.explanation  // <-- Guardamos la explicación
            }
        });

        return NextResponse.json({ success: true, data: savedQuestion });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
    }
}