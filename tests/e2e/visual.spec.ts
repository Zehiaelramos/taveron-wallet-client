import { test, expect } from '@playwright/test';

test.describe('Consistencia Visual y Diseño Premium', () => {
  test('debe aplicar la paleta de colores Dark Mode Fintech', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('body');
    
    const bodyColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(bodyColor).toBe('rgb(5, 5, 5)');
  });

  test('debe utilizar las fuentes premium (Outfit e Inter)', async ({ page }) => {
    await page.goto('/');
    // Esperamos a que el h1 del landing o login aparezca
    await page.waitForSelector('h1');
    
    const h1Font = await page.evaluate(() => {
      const el = document.querySelector('h1');
      return el ? window.getComputedStyle(el).fontFamily : '';
    });
    
    expect(h1Font).toContain('Outfit');
    
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    expect(bodyFont).toContain('Inter');
  });

  test('debe mostrar los efectos de Glassmorphism en el login', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('.glass');
    
    const glassCard = page.locator('.glass').first();
    const blurEffect = await glassCard.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter;
    });
    expect(blurEffect).toContain('blur');
  });
});
