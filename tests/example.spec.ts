import { test, expect } from '@playwright/test';

// Generamos un correo aleatorio para cada prueba y así evitar el error de "Usuario ya existe" de Prisma
const randomUser = `usuario_${Date.now()}`;
const randomEmail = `${randomUser}@gmail.com`;
const password = 'PasswordSeguro123';

test.describe('Flujo E2E: Autenticación y Juego', () => {

  test('Debe registrarse, iniciar sesión, jugar y cerrar sesión', async ({ page }) => {
    
    // ==========================================
    // 1. PRUEBA DE REGISTRO (SIGN UP)
    // ==========================================
    await test.step('Registro de usuario nuevo', async () => {
      // Navegamos a la página de registro
      await page.goto('http://localhost:3000/registro');

      // Llenamos el formulario
      await page.fill('input[name="nombre"]', randomUser);
      await page.fill('input[name="email"]', randomEmail);
      await page.fill('input[name="password"]', password);

      // Enviamos el formulario
      await page.click('button[type="submit"]');

      // Esperamos que la redirección al login sea exitosa
      await expect(page).toHaveURL('http://localhost:3000/login');
    });

    // ==========================================
    // 2. PRUEBA DE INICIO DE SESIÓN (LOGIN)
    // ==========================================
    await test.step('Inicio de sesión', async () => {
      // Llenamos el formulario de login con los datos recién creados
      await page.fill('input[name="email"]', randomEmail);
      await page.fill('input[name="password"]', password);
      
      await page.click('button[type="submit"]');

      // Esperamos a que nos redirija al perfil o dashboard tras el inicio de sesión
      // (NextAuth puede tardar un par de segundos)
      await page.waitForURL('**/profile');
      
      // Verificamos que el botón de cerrar sesión exista en el navbar
      await expect(page.locator('button', { hasText: 'Cerrar Sesión' })).toBeVisible();
    });

    // ==========================================
    // 3. PRUEBA DEL EXAMEN (JUEGO)
    // ==========================================
    await test.step('Completar una pregunta del examen', async () => {
      // Hacemos clic en el enlace "Create exam" del Header
      await page.click('text="Create exam"');

      // Verificamos que llegamos a la ruta correcta
      await expect(page).toHaveURL('http://localhost:3000/juego');

      // Esperamos a que el texto "Progreso Actual" o "Pregunta 1 de" aparezca 
      // para confirmar que el fetch a tu API de la BD ya terminó
      await expect(page.locator('text=/Pregunta 1 de/i')).toBeVisible();

      // Buscamos el botón de la opción "A" y le damos clic.
      // Usamos el exact: true para que busque exactamente la letra "A" en el span
      await page.getByText('A', { exact: true }).click();

      // Verificamos que, al responder, aparezca la explicación de la IA
      await expect(page.locator('text="Explicación de la IA"')).toBeVisible();

      // Buscamos el botón para avanzar (Siguiente Pregunta o Finalizar Examen) y le damos clic
      const nextButton = page.locator('button', { hasText: /Siguiente Pregunta|Finalizar Examen/ });
      await nextButton.click();
    });

    // ==========================================
    // 4. PRUEBA DE CERRAR SESIÓN (LOGOUT)
    // ==========================================
    await test.step('Cerrar sesión', async () => {
      // Hacemos clic en el botón de cerrar sesión en el navbar
      await page.goto('http://localhost:3000/profile');

      await page.click('button:has-text("Cerrar Sesión")');

      // Verificamos que el botón "Entrar" vuelva a aparecer, confirmando que salimos
      await expect(page.locator('text="Entrar"')).toBeVisible();
    });

  });
});