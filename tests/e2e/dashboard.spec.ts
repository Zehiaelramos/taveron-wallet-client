import { test, expect } from '@playwright/test';

test.describe('Dashboard General (Mocked)', () => {
  test.beforeEach(async ({ page }) => {
    // Interceptamos todo antes de navegar
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ access_token: 'tk', token_type: 'bearer' }) });
    });
    await page.route('**/auth/me', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ id: 1, email: 't@t.com', full_name: 'User' }) });
    });

    await page.goto('/login');
    await page.fill('input[type="email"]', 't@t.com');
    await page.fill('input[type="password"]', 'p');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('debe mostrar el "Empty State" cuando no hay registros', async ({ page }) => {
    await page.route('**/payment-methods*', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify([]) });
    });
    
    await page.reload();
    await expect(page.locator('text=Aún no tienes métodos de pago')).toBeVisible();
  });

  test('debe listar los métodos de pago correctamente', async ({ page }) => {
    await page.route('**/payment-methods*', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([{ id: 1, name: 'Visa Gold', type: 'CARD', identifier: '1234', is_active: true }]),
      });
    });

    await page.reload();
    await expect(page.locator('text=Visa Gold')).toBeVisible();
  });
});
