import { test, expect } from '@playwright/test';

async function waitReady(page){await expect(page.locator('body')).toHaveAttribute('data-ready','true')}

test('home search, filters and language switch', async ({ page }) => {
  await page.goto('/es/');
  await waitReady(page);
  await expect(page.locator('.card[data-category]')).toHaveCount(7);
  await page.getByRole('button', { name: 'Restauración' }).click();
  await expect(page.locator('.card[data-category]:not([hidden])')).toHaveCount(1);
  await page.getByRole('button', { name: 'Todas' }).click();
  await page.locator('#tool-search').fill('devoluciones');
  await expect(page.locator('.card[data-category]:not([hidden])')).toHaveCount(1);
  await expect(page.locator('.card[data-category]:not([hidden])')).toContainText('margen de producto');
  await page.getByRole('link', { name: 'EN' }).click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('dynamic rows persist after reload', async ({ page }) => {
  await page.goto('/es/herramientas/coste-plato/');
  await waitReady(page);
  await page.getByRole('button', { name: 'Añadir línea' }).click();
  const rows = page.locator('#foodRows [data-row]');
  await expect(rows).toHaveCount(2);
  await rows.nth(1).locator('[data-name="name"]').fill('Verduras');
  await rows.nth(1).locator('[data-name="cost"]').fill('1.25');
  await page.reload();
  await expect(page.locator('#foodRows [data-row]')).toHaveCount(2);
  await expect(page.locator('#foodRows [data-row]').nth(1).locator('[data-name="name"]')).toHaveValue('Verduras');
  await expect(page.locator('#foodRows [data-row]').nth(1).locator('[data-name="cost"]')).toHaveValue('1.25');
});

test('family calculator supports second child', async ({ page }) => {
  await page.goto('/es/herramientas/gastos-familiares/');
  await waitReady(page);
  await expect(page.getByRole('heading', { name: 'Hijo 2 (opcional)' })).toBeVisible();
  await expect(page.locator('#familyRows2 [data-row]')).toHaveCount(1);
  await page.locator('#familyRows2 [data-name="amount"]').fill('120');
  await page.locator('#familyRows2 [data-name="periodicity"]').selectOption('monthly');
  await page.getByRole('button', { name: 'Calcular' }).click();
  await expect(page.locator('#result')).toHaveClass(/show/);
  await expect(page.locator('#result .big')).toContainText('365,83');
});

test('invalid values show validation feedback', async ({ page }) => {
  await page.goto('/es/herramientas/margen-producto/');
  await waitReady(page);
  await page.locator('#productCost').fill('-1');
  await page.getByRole('button', { name: 'Calcular' }).click();
  await expect(page.locator('#validation')).toBeVisible();
  await expect(page.locator('#validation')).toContainText('Revisa los campos');
});

test('renovation calculator has no horizontal overflow on mobile', async ({ page }) => {
  await page.goto('/es/herramientas/presupuesto-reforma/');
  await waitReady(page);
  const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(width.scroll).toBeLessThanOrEqual(width.client);
  await expect(page.getByRole('button', { name: 'Añadir línea' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Calcular' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Restablecer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Imprimir' })).toBeVisible();
});
