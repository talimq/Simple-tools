// Redirect only the two production aliases. Preview deployments keep their own host.
const productionAliases = new Set([
  'www.handyfigs.com',
  'simple-tools-22i.pages.dev'
]);

export function onRequest({ request, next }) {
  const url = new URL(request.url);
  const isAlias = productionAliases.has(url.hostname);
  const isRoot = url.pathname === '/';

  if (!isAlias && !isRoot) return next();

  if (isAlias) {
    url.protocol = 'https:';
    url.host = 'handyfigs.com';
  }
  if (isRoot) url.pathname = '/es/';

  return Response.redirect(url.toString(), 301);
}
