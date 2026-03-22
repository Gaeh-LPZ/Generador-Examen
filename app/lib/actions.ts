'use server';

import { prisma } from "./prisma";
import bcrypt from "bcrypt"
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export async function addUser(formData:FormData) {
    const rawPassword =  formData.get('password') as string;

    if (!rawPassword){
        return { success: false, message: 'The password must be obligatory'}
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    try {
        await prisma.users.create({
            data: {
                username: formData.get('nombre') as string,
                email: formData.get('email') as string,
                password: hashedPassword,
                score: 0
            }
        });

        console.log('user added successfully');
        return { success: true}
    } catch(e) {
        console.error('Error creating the user. Error: ', e);
        return { success: false, message: 'Error creating the user'}
    }
}