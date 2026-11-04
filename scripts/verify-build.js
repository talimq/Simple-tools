import fs from 'node:fs';import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['scripts/generate-pages.js'],{stdio:'inherit'});
const required=['public/es/index.html','public/en/index.html','public/sitemap.xml','public/robots.txt'];
for(const f of required)if(!fs.existsSync(f))throw new Error(`Missing ${f}`);
const es=fs.readFileSync('public/es/index.html','utf8');const en=fs.readFileSync('public/en/index.html','utf8');
for(const [name,html] of [['es',es],['en',en]]){const cards=(html.match(/class="card"/g)||[]).length;if(cards!==7)throw new Error(`${name}: expected 7 cards, got ${cards}`)}
console.log('Static build verified: 7 tools in ES and EN, sitemap and robots present.');

// Verify the generated navigation and asset URLs, including every language pair.
function htmlFiles(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?htmlFiles(`${dir}/${entry.name}`):entry.name.endsWith('.html')?[`${dir}/${entry.name}`]:[])}
// Ownership verification documents are not generated navigation pages.
const pages=htmlFiles('public').filter(file=>!file.includes('/__qa__/')&&(file.endsWith('/index.html')||file==='public/404.html'));
for(const file of pages){
  const html=fs.readFileSync(file,'utf8');
  for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){
    const url=match[1];
    const target=`public${url}${url.endsWith('/')?'index.html':''}`;
    if(!fs.existsSync(target))throw new Error(`${file}: broken local URL ${url}`);
  }
}
if(pages.length!==18)throw new Error(`Expected 18 generated pages, got ${pages.length}`);
console.log('Verified all 18 pages, internal navigation and asset links.');
