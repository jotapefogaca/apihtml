# Gerador de Páginas Estáticas | Foxy Lady

Este projeto gera páginas HTML estáticas para cada acompanhante cadastrado, usando dados da API do site Foxy Lady.

## 🚀 Como funciona

O script `generateStaticPages.ts`:
1. Faz uma requisição à API `/api/v1/getAllModels`
2. Lê o template `modelo-foxylady-final.html`
3. Substitui os placeholders com os dados de cada acompanhante
4. Gera arquivos HTML na pasta `dist/acompanhante/[slug]/index.html`

## 📦 Estrutura esperada

