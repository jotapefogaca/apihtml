// generateStaticPages.ts

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const PAGE_URLS = [
  'https://www.foxylady.com.br/home/acompanhantes',
  'https://www.foxylady.com.br/home/acompanhantes/new'
];

const OUTPUT_BASE_DIR = path.join(__dirname, 'dist', 'cloned_pages');

async function fetchAndSavePage(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Erro ao acessar ${url}: ${res.statusText}`);
    }

    const html = await res.text();
    const slug = url.split('/').pop() || 'index';
    const outputDir = path.join(OUTPUT_BASE_DIR, slug);
    const filePath = path.join(outputDir, 'index.html');

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`✔ Página clonada: ${filePath}`);

  } catch (err) {
    console.error(`Erro ao clonar ${url}:`, err);
  }
}

async function clonePages() {
  for (const url of PAGE_URLS) {
    await fetchAndSavePage(url);
  }
}

clonePages();
