import { prisma } from "./prisma";

export async function addUser(formData:FormData) {
    try {
        await prisma.users.create({
            data: {
                username: formData.get('nombre') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                score: 0
            }
        });

        console.log('user added successfully');
        return { success: true}
    } catch(e) {
        console.error('Error creating the user');
        return { success: false, message: 'Error creating the user'}
    }
}

export async function login(formData:FormData) {
    
}