import { test, expect } from '@playwright/test';

test.describe('Acciones Sensibles (Mocked)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ access_token: 'tk', token_type: 'bearer' }) });
    });
    await page.route('**/auth/me', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ id: 1, email: 't@t.com', full_name: 'User' }) });
    });
    await page.route('**/payment-methods*', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([{ id: 1, name: 'Card', type: 'CARD', identifier: '4111222233334444', is_active: true }]),
      });
    });

    await page.goto('/login');
    await page.fill('input[type="email"]', 't@t.com');
    await page.fill('input[type="password"]', 'p');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('debe permitir revelar el identificador sensible', async ({ page }) => {
    const card = page.locator('.payment-method-card').first();
    await expect(card.locator('text=••••')).toBeVisible();

    const revealButton = card.locator('button:has-text("Revelar")');
    await revealButton.click();

    await expect(card.locator('text=4111222233334444')).toBeVisible();
  });

  test('debe mostrar el Toast de confirmación al copiar', async ({ page }) => {
    const card = page.locator('.payment-method-card').first();
    
    // Seleccionamos el botón que tiene el icono de copiar (Lucide Copy suele tener el título o podemos usar aria-label)
    // En nuestro componente, el botón de copiar es el que NO es "Revelar" y NO es el toggle
    await card.locator('button:has(svg)').nth(0).click(); 
    
    await expect(page.locator('text=Copiado al portapapeles')).toBeVisible();
  });
});
