# Sprout BarberShop

Landing page responsiva para uma barbearia, desenvolvida com **Astro, TypeScript e CSS**, com foco em apresentar serviços e facilitar o agendamento.

**[Acesse o site](https://sproutbarbershop.netlify.app/)**

<p align="center">
  <img src="sprout-site/public/images/sprout-logo-graffiti.png" alt="Logo Sprout BarberShop" width="420" />
</p>

## Funcionalidades

- Serviços e preços com filtros por categoria.
- Agendamento externo pelo Fresha e contato pelo WhatsApp.
- Carrossel com oito vídeos sem áudio, controles e navegação por setas.
- Avaliações, endereço e horários de funcionamento.
- Layout adaptado para celular, tablet e computador.
- Galeria preparada para fotos reais, oculta enquanto não há imagens.
- Foco visível, navegação por teclado e suporte à redução de movimento.

## Tecnologias

Astro 6 · TypeScript · CSS · Prettier · npm

Site estático, sem backend ou banco de dados. Componentes, dados do negócio e estilos ficam separados para facilitar a manutenção.

## Executar localmente

Requer **Node.js 22.12 ou superior** e npm. Entre na pasta do site:

```sh
cd sprout-site
npm ci
npm run dev
```

Abra o endereço exibido no terminal. Para visualizar pelo celular na mesma rede Wi-Fi, execute `npm run dev:mobile` e use o endereço Network informado.

| Comando                | Função                                   |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento              |
| `npm run dev:mobile`   | Prévia na rede local, porta 4322         |
| `npm run check`        | Verificação Astro e TypeScript           |
| `npm run build`        | Verificação e geração do site em `dist/` |
| `npm run preview`      | Prévia do build                          |
| `npm run format:check` | Conferência de formatação                |
| `npm run format`       | Formatação dos arquivos                  |

## Estrutura

```text
sprout-site/
  public/images/       Identidade visual
  public/videos/       Vídeos do carrossel
  src/assets/cuts/     Fotos para a galeria
  src/components/      Seções e elementos reutilizáveis
  src/data/            Serviços, contatos, avaliações e mídias
  src/layouts/         Layout e metadados
  src/pages/           Página principal
  src/styles/          Estilos globais e responsividade
  docs/                Documentação técnica
  scripts/             Utilitários de mídia e publicação
```

## Personalização

Edite `src/data/business.ts` para atualizar serviços, preços, horários e contatos. As avaliações ficam em `src/data/reviews.ts`. Adicione fotos reais em `src/assets/cuts/`; os vídeos ficam em `public/videos/`.

Preços e avaliações são dados estáticos. Cidade e CEP ainda precisam de confirmação com o responsável.

## Publicação e validação

O fluxo padrão é `npm ci` seguido de `npm run build`; publique a pasta `dist/` em uma hospedagem estática. As regras de `public/_headers` dependem do suporte do provedor.

Publicado manualmente no Netlify, no endereço informado pelo responsável: [sproutbarbershop.netlify.app](https://sproutbarbershop.netlify.app/). O build padrão encontrou restrições de acesso no ambiente Windows em sessões anteriores. Consulte as limitações e o fluxo alternativo em [docs/github.md](sprout-site/docs/github.md).

Documentação: [arquitetura](sprout-site/docs/architecture.md) · [segurança](sprout-site/docs/security.md) · [guia do GitHub](sprout-site/docs/github.md).

## Direitos de uso

Projeto apresentado como portfólio, sem licença de código aberto concedida. Marca, logo, vídeos, fotos e depoimentos podem ter direitos próprios; a disponibilização do código não concede autorização de reutilização desses materiais.
