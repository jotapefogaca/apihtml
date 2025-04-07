// generateStaticPages.ts

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const API_URL = 'https://seusite.com/api/v1/getAllModels';
const TEMPLATE_PATH = path.join(__dirname, 'modelo-foxylady-final.html');
const OUTPUT_BASE_DIR = path.join(__dirname, 'dist', 'acompanhante');

async function generatePages() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado na resposta da API');
    }

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    data.forEach((modelo) => {
      const html = template
        .replace(/{{nome}}/g, modelo.nome)
        .replace(/{{cidade}}/g, modelo.cidade || '')
        .replace(/{{slug}}/g, modelo.slug)
        .replace(/{{fotoPerfil}}/g, modelo.fotoPerfil || '');

      const outputDir = path.join(OUTPUT_BASE_DIR, modelo.slug);
      const filePath = path.join(outputDir, 'index.html');

      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`✔ Página gerada: ${filePath}`);
    });
  } catch (err) {
    console.error('Erro ao gerar páginas:', err);
  }
}

generatePages();
