import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/_middleware.js';

for (const host of ['www.handyfigs.com', 'simple-tools-22i.pages.dev']) {
  test(`${host} redirects a deep link without losing its path or query`, () => {
    const response = onRequest({
      request: new Request(`https://${host}/en/tools/product-margin/?label=a%20b&value=10&value=20`),
      next() { throw new Error('Alias must redirect before serving content'); }
    });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'),
      'https://handyfigs.com/en/tools/product-margin/?label=a%20b&value=10&value=20');
  });
}

test('root redirects preserve the query and avoid a second alias redirect', () => {
  for (const host of ['handyfigs.com', 'www.handyfigs.com', 'simple-tools-22i.pages.dev']) {
    const response = onRequest({ request: new Request(`https://${host}/?source=launch`), next() {} });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), 'https://handyfigs.com/es/?source=launch');
  }
});

test('canonical pages, verification files, previews and unknown hosts pass through', async () => {
  for (const url of [
    'https://handyfigs.com/es/',
    'https://handyfigs.com/google0966770103d5e696.html',
    'https://preview.simple-tools-22i.pages.dev/en/',
    'https://www.handyfigs.com.example.org/es/'
  ]) {
    const expected = new Response('upstream content', { status: 200 });
    assert.equal(await onRequest({ request: new Request(url), next: () => expected }), expected);
  }
});

test('unknown paths retain the original 404 response', async () => {
  const expected = new Response('not found', { status: 404 });
  const response = await onRequest({
    request: new Request('https://handyfigs.com/does-not-exist/'),
    next: () => expected
  });
  assert.equal(response, expected);
  assert.equal(response.status, 404);
});
