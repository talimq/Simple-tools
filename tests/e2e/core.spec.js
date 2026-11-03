import { test, expect } from '@playwright/test';

async function waitReady(page){await expect(page.locator('body')).toHaveAttribute('data-ready','true')}

test('home search, filters and language switch', async ({ page }) => {
  await page.goto('/es/');
  await waitReady(page);
  await expect(page.locator('.card[data-category]')).toHaveCount(7);
  await page.getByRole('button', { name: 'Restauración' }).click();
  await expect(page.locator('.card[data-category]:visible')).toHaveCount(1);
  await expect(page.locator('.card[data-category][hidden]:visible')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Restauración' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Empresa / RRHH' }).click();
  await expect(page.locator('.card[data-category]:visible')).toHaveCount(1);
  await expect(page.locator('.card[data-category]:visible h3')).toContainText('empleado');
  await page.getByRole('button', { name: 'Todas' }).click();
  await page.locator('#tool-search').fill('devoluciones');
  await expect(page.locator('.card[data-category]:visible')).toHaveCount(1);
  await expect(page.locator('.card[data-category]:visible')).toContainText('margen de producto');
  await page.locator('a.lang').click();
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

for (const lang of ['es', 'en']) {
  test(`${lang}: all categories render only their matching cards, and empty search recovers`, async ({ page }) => {
    await page.goto(`/${lang}/`);
    await waitReady(page);
    await expect(page.locator('.empty')).toBeHidden();
    for (const button of await page.locator('.filter:not([data-filter="all"])').all()) {
      const category = await button.getAttribute('data-filter');
      await button.click();
      await expect(page.locator('.card:visible')).toHaveCount(1);
      await expect(page.locator('.card:visible')).toHaveAttribute('data-category', category);
      await expect(page.locator('.card[hidden]:visible')).toHaveCount(0);
    }
    await page.locator('#tool-search').fill('zzzz-unmatched-tool');
    await expect(page.locator('.card:visible')).toHaveCount(0);
    await expect(page.getByRole('status')).toBeVisible();
    await page.locator('#tool-search').fill('');
    await page.locator('[data-filter="all"]').click();
    await expect(page.locator('.card:visible')).toHaveCount(7);
    await expect(page.getByRole('status')).toBeHidden();
  });
}

test('search and category intersect and search ignores accents', async ({ page }) => {
  await page.goto('/es/');
  await waitReady(page);
  await page.locator('#tool-search').fill('autonomos');
  await expect(page.locator('.card:visible')).toHaveCount(1);
  await page.locator('[data-filter="family"]').click();
  await expect(page.locator('.card:visible')).toHaveCount(0);
  await expect(page.getByRole('status')).toBeVisible();
  await page.locator('#tool-search').fill('');
  await expect(page.locator('.card:visible')).toHaveCount(1);
  await expect(page.locator('.card:visible')).toHaveAttribute('data-category', 'family');
});

const toolCases = [
  ['coste-plato', 'food-cost', 9.14],
  ['precio-trabajo', 'job-pricing', 177.47],
  ['margen-producto', 'product-margin', 11.01],
  ['rentabilidad-alquiler', 'rental-yield', '4.0%'],
  ['coste-empleado', 'employee-cost', 43000],
  ['gastos-familiares', 'family-expenses', 245.83],
  ['presupuesto-reforma', 'renovation-estimate', 1481.04]
];
for (const lang of ['es', 'en']) {
  for (const [esSlug, enSlug, result] of toolCases) {
    test(`${lang}: ${esSlug} calculates, switches language and returns home`, async ({ page }) => {
      const path = `/${lang}/${lang === 'es' ? 'herramientas' : 'tools'}/${lang === 'es' ? esSlug : enSlug}/`;
      await page.goto(`/${lang}/`);
      await waitReady(page);
      await page.locator(`.card[href="${path}"]`).click();
      await waitReady(page);
      await page.locator('#calc').click();
      const expected = typeof result === 'number'
        ? new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(result)
        : result;
      await expect(page.locator('#result .big')).toHaveText(expected);
      await expect(page.locator('#validation')).toBeHidden();
      const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
      await page.locator('a.lang').click();
      await waitReady(page);
      await expect(page).toHaveURL(new RegExp(`/${lang === 'es' ? enSlug : esSlug}/$`));
      await page.locator('a.back').click();
      await expect(page.locator('.card:visible')).toHaveCount(7);
    });
  }
}

test('blocked local storage does not break calculation or reset', async ({ page }) => {
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem', 'removeItem']) {
      Storage.prototype[method] = () => { throw new DOMException('Blocked', 'SecurityError'); };
    }
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/es/herramientas/coste-empleado/');
  await waitReady(page);
  await page.locator('#salary').fill('40000');
  await page.locator('#calc').click();
  await expect(page.locator('#result .big')).toHaveText('56.200,00 €');
  await page.locator('.reset').click();
  await waitReady(page);
  await expect(page.locator('#salary')).toHaveValue('30000');
  expect(errors).toEqual([]);
});
