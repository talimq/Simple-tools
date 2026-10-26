import fs from 'node:fs';import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['scripts/generate-pages.js'],{stdio:'inherit'});
const required=['public/es/index.html','public/en/index.html','public/sitemap.xml','public/robots.txt'];
for(const f of required)if(!fs.existsSync(f))throw new Error(`Missing ${f}`);
const es=fs.readFileSync('public/es/index.html','utf8');const en=fs.readFileSync('public/en/index.html','utf8');
for(const [name,html] of [['es',es],['en',en]]){const cards=(html.match(/class="card"/g)||[]).length;if(cards!==7)throw new Error(`${name}: expected 7 cards, got ${cards}`)}
console.log('Static build verified: 7 tools in ES and EN, sitemap and robots present.');
