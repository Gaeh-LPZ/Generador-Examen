// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth.config";

// Esto exporta los métodos GET y POST que NextAuth necesita
export const { GET, POST } = handlers;