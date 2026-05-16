import { test, expect } from '@playwright/test';

test.describe('Autenticación (Mocked)', () => {
  test.beforeEach(async ({ page }) => {
    // Interceptamos la llamada al perfil para que siempre devuelva un usuario
    await page.route('**/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 1, email: 'test@example.com', full_name: 'Test User' }),
      });
    });

    // Mock de la lista de métodos de pago
    await page.route('**/payment-methods*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/login');
  });

  test('debe mostrar error 401 con credenciales incorrectas', async ({ page }) => {
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Credenciales inválidas' }),
      });
    });

    await page.fill('input[type="email"]', 'error@test.com');
    await page.fill('input[type="password"]', 'wrong');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Credenciales inválidas')).toBeVisible();
  });

  test('debe iniciar sesión exitosamente y redirigir al inicio', async ({ page }) => {
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ access_token: 'fake-jwt-token', token_type: 'bearer' }),
      });
    });

    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // IMPORTANTE: La ruta del Dashboard es "/" no "/dashboard"
    await expect(page).toHaveURL('http://127.0.0.1:5173/', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Mis Métodos de Pago');
  });
});
