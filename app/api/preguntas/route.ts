import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    try {
        const preguntas = await prisma.$queryRaw`SELECT * FROM questions ORDER BY RANDOM() LIMIT 10`;

        return NextResponse.json({ success: true, preguntas });
    } catch (error) {
        console.error('Error obteniendo preguntas:', error);
        return NextResponse.json(
            { success: false, message: 'Error al cargar el examen' }, 
            { status: 500 }
        );
    }
}