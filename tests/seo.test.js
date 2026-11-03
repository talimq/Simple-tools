import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

execFileSync(process.execPath,['scripts/generate-pages.js']);
const base='https://handyfigs.com';
const pairs=[['coste-plato','food-cost'],['precio-trabajo','job-pricing'],['margen-producto','product-margin'],['rentabilidad-alquiler','rental-yield'],['coste-empleado','employee-cost'],['gastos-familiares','family-expenses'],['presupuesto-reforma','renovation-estimate']];
const titles=new Set();
for(const lang of ['es','en']){
  const routes=[`/${lang}/`,...pairs.map(pair=>`/${lang}/${lang==='es'?'herramientas':'tools'}/${pair[lang==='es'?0:1]}/`)];
  for(const [i,route] of routes.entries())test(`SEO ${route}`,()=>{
    const html=fs.readFileSync(`public${route}index.html`,'utf8');
    const otherLang=lang==='es'?'en':'es';
    const otherRoute=i===0?`/${otherLang}/`:`/${otherLang}/${otherLang==='es'?'herramientas':'tools'}/${pairs[i-1][otherLang==='es'?0:1]}/`;
    assert.ok(html.includes(`<link rel="canonical" href="${base}${route}">`));
    assert.ok(html.includes(`hreflang="${otherLang}" href="${base}${otherRoute}"`));
    assert.ok(html.includes(`hreflang="x-default" href="${base}${lang==='es'?route:otherRoute}"`));
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    const title=html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title),'Every page must have a distinct title');titles.add(title);
    const data=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.ok(data['@graph'].some(x=>x['@type']==='WebPage'&&x.url===base+route));
    if(i>0){
      const app=data['@graph'].find(x=>x['@type']==='WebApplication');
      assert.equal(app.url,base+route);assert.equal(app.offers.price,'0');
      assert.ok(data['@graph'].some(x=>x['@type']==='BreadcrumbList'));
      assert.ok(html.includes(lang==='es'?'Ejemplo práctico':'Worked example'));
      assert.ok(html.includes(lang==='es'?'Fórmula del cálculo':'Calculation formula'));
    }
    assert.ok(!html.includes('content="noindex'));
  });
}

test('sitemap contains exactly the 16 localized canonical pages',()=>{
  const sitemap=fs.readFileSync('public/sitemap.xml','utf8');
  const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
  assert.equal(urls.length,16);assert.equal(new Set(urls).size,16);
  for(const url of urls){assert.ok(url.startsWith(base+'/'));assert.ok(fs.existsSync(`public${new URL(url).pathname}index.html`));}
  assert.ok(!sitemap.includes('pages.dev'));assert.ok(!sitemap.includes('404'));
});

test('production allows crawling, redirects root and provides a nonindexable 404',()=>{
  const robots=fs.readFileSync('public/robots.txt','utf8');
  assert.ok(robots.includes(`Sitemap: ${base}/sitemap.xml`));
  assert.ok(!/^Disallow:\s*\/$/m.test(robots));
  assert.equal(fs.readFileSync('public/_redirects','utf8'),'/ /es/ 301\n');
  assert.ok(fs.readFileSync('public/404.html','utf8').includes('content="noindex,follow"'));
});
