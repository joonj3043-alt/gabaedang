// Optional: node tools/prepare-seo.mjs https://ACCOUNT.github.io/REPOSITORY/
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=new URL(process.argv[2] || '');
if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash)throw new Error('HTTPS 사이트 기본 URL을 입력하세요.');
if(!base.pathname.endsWith('/'))base.pathname+='/';
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='404.html');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const name of pages){
 const f=path.join(root,name);let s=fs.readFileSync(f,'utf8');
 s=s.replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta property="og:url"[^>]*>/g,'');
 s=s.replace(/<meta property="og:image"[^>]*>/,'<meta property="og:image" content="'+escape(new URL('assets/hero-v2.webp',base).href)+'">');
 s=s.replace('</head>','<link rel="canonical" href="'+escape(new URL(name,base).href)+'"><meta property="og:url" content="'+escape(new URL(name,base).href)+'"></head>');fs.writeFileSync(f,s);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(n=>'<url><loc>'+escape(new URL(n,base).href)+'</loc></url>').join('')+'</urlset>');
console.log('Canonical, OG URL, sitemap.xml updated for '+pages.length+' pages.');

// GitHub Pages also serves 404.html for nested invalid paths.
const notFound=path.join(root,'404.html');
if(fs.existsSync(notFound)){let html=fs.readFileSync(notFound,'utf8').replace(/<base[^>]*>/g,'');html=html.replace('<head>','<head><base href="'+escape(base.href)+'">');fs.writeFileSync(notFound,html);}
