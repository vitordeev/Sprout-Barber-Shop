# Cópia dos arquivos — 11/10/2026

Registro do estado observado, complementar ao CONTEXTO.md. Para editar o site, use os arquivos ativos. Documentos antigos podem conter etapas superadas, descritas no contexto.

## sprout-site/package.json

~~~~text
{
  "name": "sprout-barbershop",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": "\u003e=22.12.0"
  },
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "check": "astro check",
    "build": "astro check \u0026\u0026 astro build",
    "preview": "astro preview --host 127.0.0.1",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "dev:mobile": "astro dev --host 0.0.0.0 --port 4322"
  },
  "dependencies": {
    "astro": "^6.0.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.9.0",
    "prettier": "^3.6.0",
    "prettier-plugin-astro": "^0.14.0"
  }
}

~~~~

## sprout-site/astro.config.mjs

~~~~text
import { defineConfig } from 'astro/config';
export default defineConfig({
 output: 'static', build: { inlineStylesheets: 'never' },
 security: { csp: { directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'", "connect-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'none'"] } }
});
~~~~

## sprout-site/tsconfig.json

~~~~text
{
  "extends": "astro/tsconfigs/strictest",
  "include": [
    ".astro/types.d.ts",
    "**/*"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
~~~~

## sprout-site/README.md

~~~~text
# Sprout BarberShop

Landing page estÃ¡tica e responsiva baseada nas cinco referÃªncias fornecidas. Visual verde, preto e branco; serviÃ§os filtrÃ¡veis; equipe; avaliaÃ§Ã£o resumida; horÃ¡rios e localizaÃ§Ã£o.

## Uso
Requer Node.js >= 22.12.
```sh
npm install # primeira instalação; depois usar npm ci com o lockfile
npm run dev
npm run build
npm run preview
```

O build executa a verificaÃ§Ã£o de tipos e gera dist/. NÃ£o editar dist diretamente.
Use npm run format e npm run format:check para formataÃ§Ã£o.

## ConteÃºdo
Editar src/data/business.ts. bookingUrl permanece vazio atÃ© receber o link oficial. Nesse estado os botÃµes levam Ã  seÃ§Ã£o de visita, sem simular agendamento. Confirmar endereÃ§o completo (cidade e CEP), preÃ§os, horÃ¡rios e link antes de divulgaÃ§Ã£o. As avaliaÃ§Ãµes sÃ£o uma fotografia da referÃªncia enviada, nÃ£o uma consulta em tempo real. A arte principal Ã© a imagem fornecida pelo usuÃ¡rio.

## DocumentaÃ§Ã£o
Ver docs/architecture.md para estrutura e decisÃµes, e docs/security.md para controles e limites de hospedagem. public/_headers depende do suporte do provedor.

## Prévia no celular
Na mesma rede Wi-Fi do computador, execute npm run dev:mobile.
A prévia usa a porta 4322. Abra no celular o endereço Network mostrado pelo Astro.
O computador precisa permanecer ligado com esse terminal aberto.

## Hospedagem Sites
Projeto registrado em .openai/hosting.json. Não foi publicado: build bloqueado por acesso a diretórios no ambiente e envio Git bloqueado por conexão de rede. Reutilizar esse project_id ao retomar; não criar outro Site.

~~~~

## sprout-site/public/_headers

~~~~text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY

~~~~

## sprout-site/src/assets/cuts/README.md

~~~~text
# Fotos dos cortes

Coloque as fotos nesta pasta: sprout-site/src/assets/cuts/
Formatos: JPG, JPEG, PNG, WebP e AVIF.
Nomes sugeridos: corte-01.jpg, corte-02.jpg, corte-03.jpg etc.
As fotos aparecem em ordem de nome, sem espaços vazios.
Sem fotos, a galeria e seus links de navegação ficam ocultos.

Prefira fotos verticais 4:5, com o cabelo centralizado.
Se novos arquivos não aparecerem, reinicie npm run dev.
Adicionar fotos a uma versão publicada exige novo build e publicação.

~~~~

## .\sprout-site\src\data\business.ts

~~~~text
export interface Service {
  name: string;
  description: string;
  minutes: number;
  price: number;
  category: 'common' | 'chemical';
}
export const business: {
  name: string;
  bookingUrl: string;
  whatsappNumber: string;
  address: string;
  directions: string;
  mapsUrl: string;
  rating: string;
  reviews: number;
  barber: string;
  hours: { days: string; hours: string }[];
} = {
  name: 'Sprout BarberShop',
  whatsappNumber: '5511910789925',
  bookingUrl:
    'https://www.fresha.com/pt/a/sprout-barbershop-sao-paulo-avenida-cesario-de-abreu-450-pz04wr3u',
  address: 'Avenida Cesário de Abreu, 450 — Centro, São Paulo',
  directions:
    'Subindo a rua da Igreja Universal na rotatória, do lado direito da rua, ao lado da autoescola.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Avenida%20Ces%C3%A1rio%20de%20Abreu%20450%20S%C3%A3o%20Paulo',
  rating: '5,0',
  reviews: 65,
  barber: 'Luan',
  hours: [
    { days: 'Segunda a quinta', hours: '09:30 – 20:30' },
    { days: 'Sexta e sábado', hours: '09:30 – 21:30' },
    { days: 'Domingo', hours: 'Fechado' },
  ],
};
export const services: readonly Service[] = [
  {
    name: 'Corte',
    description: 'Corte com lavagem.',
    minutes: 40,
    price: 45,
    category: 'common',
  },
  {
    name: 'Barba',
    description: 'Barba desenhada completa.',
    minutes: 20,
    price: 30,
    category: 'common',
  },
  {
    name: 'Cavanhaque',
    description: 'Bigode e cavanhaque desenhados.',
    minutes: 10,
    price: 10,
    category: 'common',
  },
  {
    name: 'Sobrancelha',
    description: '',
    minutes: 5,
    price: 10,
    category: 'common',
  },
  {
    name: 'Máscara negra',
    description: 'Cuidado com máscara negra e toalha quente.',
    minutes: 20,
    price: 15,
    category: 'common',
  },
  {
    name: 'Botox',
    description: 'Para abrir os cachos ou alisar.',
    minutes: 70,
    price: 80,
    category: 'chemical',
  },
  {
    name: 'Hidratação / finalização',
    description: 'Hidratação profissional.',
    minutes: 25,
    price: 25,
    category: 'chemical',
  },
  {
    name: 'Luzes',
    description: '',
    minutes: 135,
    price: 80,
    category: 'chemical',
  },
];
if (business.bookingUrl && new URL(business.bookingUrl).protocol !== 'https:')
  throw new Error('O link de agendamento deve usar HTTPS.');

~~~~

## .\sprout-site\src\data\gallery.ts

~~~~text
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>(
  '../assets/cuts/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' },
);

export const cutPhotos = Object.entries(images)
  .sort(([a], [b]) => a.localeCompare(b, 'pt-BR', { numeric: true }))
  .map(([, photo], index) => ({
    photo,
    number: String(index + 1).padStart(2, '0'),
  }));

export const hasCutPhotos = cutPhotos.length > 0;

~~~~

## .\sprout-site\src\data\reviews.ts

~~~~text
export const customerReviews = [
  {
    name: 'jean w',
    quote:
      'Excelente, ambiente e equipamentos de primeira, o barbeiro também é bom',
    date: '15/01/2025',
  },
  {
    name: 'Pedro F',
    quote: 'Corte excelente, ambiente muito chave e barbeiro sensacional',
    date: '27/03/2025',
  },
  {
    name: 'Richard R',
    quote: 'Luan é um ótimo barbeiro!',
    date: '24/01/2025',
  },
] as const;
// Trechos originais, sem reescrita. Fonte:
// https://www.fresha.com/lp/en/bt/barbershops/in/br-s%C3%A3o-paulo/itapevi

~~~~

## .\sprout-site\src\components\About.astro

~~~~text
---
import { business } from '../data/business';
import ContactLink from './ContactLink.astro';
---

<section class="about section wrap" id="essencia" aria-labelledby="about-title">
  <div class="about-grid">
    <div>
      <p class="eyebrow">QUEM CUIDA DO SEU CORTE</p><h2 id="about-title">
        Conheça o <span>{business.barber}.</span>
      </h2>
    </div>
    <div class="barber-profile">
      <span class="barber-monogram" aria-hidden="true">L</span>
      <div><h3>{business.barber}</h3><p>Barbeiro na Sprout BarberShop</p></div>
      <ContactLink />
    </div>
  </div>
</section>

~~~~

## .\sprout-site\src\components\BookingLink.astro

~~~~text
---
import { business } from '../data/business';
interface Props {
  label?: string;
}
const { label = 'Agendar meu horário' } = Astro.props;
---

<a
  class="button"
  href={business.bookingUrl || '#visite'}
  target={business.bookingUrl ? '_blank' : undefined}
  rel={business.bookingUrl ? 'noopener noreferrer' : undefined}
  >{business.bookingUrl ? label : 'Planeje sua visita'}
  <span aria-hidden="true">↗</span></a
>

~~~~

## .\sprout-site\src\components\BrandLogo.astro

~~~~text
<a class="wordmark" href="#inicio" aria-label="Sprout BarberShop, início">
  <img
    class="brand-graffiti"
    src="/images/sprout-logo-graffiti.png"
    alt="Sprout — logo em grafite"
    width="2172"
    height="724"
  />
</a>

~~~~

## .\sprout-site\src\components\ContactLink.astro

~~~~text
---
import { business } from '../data/business';
const whatsappUrl = `https://wa.me/${business.whatsappNumber}`;
---

<a
  class="button button-contact"
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Entrar em contato pelo WhatsApp com a Sprout BarberShop"
>
  Entrar em contato <span aria-hidden="true">↗</span>
</a>

~~~~

## .\sprout-site\src\components\Footer.astro

~~~~text
---
import BrandLogo from './BrandLogo.astro';
import { business } from '../data/business';
---

<footer class="footer wrap">
  <BrandLogo /><span>© {new Date().getFullYear()} {business.name}</span>
</footer>

~~~~

## .\sprout-site\src\components\Gallery.astro

~~~~text
---
import { Image } from 'astro:assets';
import { cutPhotos } from '../data/gallery';
---

{
  cutPhotos.length > 0 && (
    <section
      class="gallery section wrap"
      id="cortes"
      aria-labelledby="gallery-title"
    >
      <div class="section-heading">
        <div>
          <>
            <p class="eyebrow">CORTES DA SPROUT</p>
            <h2 id="gallery-title">
              Nosso <span>trabalho.</span>
            </h2>
          </>
        </div>
      </div>
      <div class="gallery-grid">
        {cutPhotos.map(({ photo, number }) => (
          <figure class="gallery-item">
            <Image
              src={photo}
              alt={`Corte de cabelo realizado na Sprout BarberShop — foto ${number}`}
              widths={[400, 640, 900]}
              sizes="(max-width: 540px) calc(100vw - 40px), (max-width: 760px) calc((100vw - 56px) / 2), (max-width: 1376px) calc((100vw - 128px) / 3), 416px"
              format="webp"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

~~~~

## .\sprout-site\src\components\Header.astro

~~~~text
---
import BrandLogo from './BrandLogo.astro';
import { hasCutPhotos } from '../data/gallery';
---

<header class="header wrap">
  <BrandLogo /><nav aria-label="Navegação principal">
    <a href="#servicos">Serviços</a>{
      hasCutPhotos && <a href="#cortes">Cortes</a>
    }<a href="#avaliacoes">Avaliações</a><a href="#visite">Onde estamos</a>
  </nav>
</header>

~~~~

## .\sprout-site\src\components\Hero.astro

~~~~text
---
import BookingLink from './BookingLink.astro';
import ContactLink from './ContactLink.astro';
import { business } from '../data/business';
import { hasCutPhotos } from '../data/gallery';
---

<section class="hero wrap" id="inicio" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow">SPROUT BARBERSHOP</p>
    <h1 id="hero-title">Seu estilo.<br /><span>Nosso cuidado.</span></h1>
    <p class="intro">
      Corte, barba e cuidados com o cabelo. Confira os serviços e agende seu
      horário.
    </p>
    <div class="hero-actions"><BookingLink /><ContactLink /></div>
    {
      hasCutPhotos && (
        <a class="text-link hero-gallery-link" href="#cortes">
          Veja os cortes <span aria-hidden="true">↓</span>
        </a>
      )
    }
    <a
      class="rating"
      href={business.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Avaliação ${business.rating} de 5, com ${business.reviews} avaliações no Fresha`}
      ><span class="stars" aria-hidden="true">★★★★★</span><strong
        >{business.rating}</strong
      ><span>· {business.reviews} avaliações no Fresha</span></a
    >
  </div>
  <div class="hero-art">
    <img
      src="/images/sprout-brand-complete.png"
      alt="Sprout Studio: grafite branco e verde com trevo e ramos"
      width="1254"
      height="1254"
      fetchpriority="high"
    />
  </div>
</section>

~~~~

## .\sprout-site\src\components\MobileBooking.astro

~~~~text
---
import BookingLink from './BookingLink.astro';
import { business } from '../data/business';
---

<aside class="mobile-booking" aria-label="Agendamento rápido">
  <div><strong>Sprout BarberShop</strong></div>
  <BookingLink label="Agendar no Fresha" />
  <a
    class="mobile-whatsapp"
    href={`https://wa.me/${business.whatsappNumber}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Entrar em contato pelo WhatsApp"
  >
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      aria-hidden="true"
      ><path
        d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l1.9-5.4A8.5 8.5 0 1 1 21 11.5Z"
      ></path><path d="M8 8c0 4 4 8 8 8"></path></svg
    >
  </a>
</aside>

~~~~

## .\sprout-site\src\components\Reviews.astro

~~~~text
---
import { customerReviews } from '../data/reviews';
import { business } from '../data/business';
---

<section
  class="reviews section wrap"
  id="avaliacoes"
  aria-labelledby="reviews-title"
>
  <div class="section-heading">
    <div>
      <p class="eyebrow">AVALIAÇÕES NO FRESHA</p><h2 id="reviews-title">
        Quem já <span>passou por aqui.</span>
      </h2>
    </div><a
      class="text-link"
      href={business.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      >Ver avaliações no Fresha <span aria-hidden="true">↗</span></a
    >
  </div>
  <div class="reviews-grid reviews-grid-original">
    {
      customerReviews.map((review) => (
        <figure class="review-card">
          <>
            <span class="stars" aria-label="5 de 5 estrelas">
              ★★★★★
            </span>
            <blockquote class="review-summary-text">
              <p>{review.quote}</p>
            </blockquote>
            <figcaption>
              {review.name}
              <span>Trecho original · {review.date}</span>
            </figcaption>
          </>
        </figure>
      ))
    }
  </div>
</section>

~~~~

## .\sprout-site\src\components\Services.astro

~~~~text
---
import { services } from '../data/business';
---

<section class="section wrap" id="servicos" aria-labelledby="services-title">
  <div class="section-heading">
    <div>
      <p class="eyebrow">SERVIÇOS E PREÇOS</p><h2 id="services-title">
        Escolha seu <span>cuidado.</span>
      </h2>
    </div>
  </div>
  <div class="services-controls" aria-label="Filtrar serviços" hidden>
    <button class="active" data-filter="all" aria-pressed="true"
      >Todos os serviços</button
    ><button data-filter="common" aria-pressed="false">Corte & cuidado</button
    ><button data-filter="chemical" aria-pressed="false">Química & cor</button>
  </div>
  <div class="services-grid">
    {
      services.map((service) => (
        <article class="service" data-category={service.category}>
          <h3>{service.name}</h3>
          {service.description && <p>{service.description}</p>}
          <div class="service-bottom">
            <strong>
              R$ {service.price}
              <small>,00</small>
            </strong>
          </div>
        </article>
      ))
    }
  </div>
</section>
<script>
  const controls = document.querySelector<HTMLElement>('.services-controls');
  if (controls) {
    controls.hidden = false;
    const buttons = controls.querySelectorAll<HTMLButtonElement>('button');
    buttons.forEach((button) =>
      button.addEventListener('click', () => {
        const category = button.dataset['filter'];
        buttons.forEach((item) => {
          item.classList.toggle('active', item === button);
          item.setAttribute('aria-pressed', String(item === button));
        });
        document.querySelectorAll<HTMLElement>('.service').forEach((card) => {
          card.hidden =
            category !== 'all' && card.dataset['category'] !== category;
        });
      }),
    );
  }
</script>

~~~~

## .\sprout-site\src\components\Visit.astro

~~~~text
---
import { business } from '../data/business';
import BookingLink from './BookingLink.astro';
import ContactLink from './ContactLink.astro';
---

<section class="visit section" id="visite" aria-labelledby="visit-title">
  <div class="wrap">
    <div class="section-heading">
      <div>
        <p class="eyebrow">LOCALIZAÇÃO E CONTATO</p><h2 id="visit-title">
          Visite a <span>Sprout.</span>
        </h2>
      </div><div class="contact-actions"><BookingLink /><ContactLink /></div>
    </div>
    <div class="visit-grid">
      <div>
        <h3>Endereço</h3><address>{business.address}</address><p>
          {business.directions}
        </p><a
          class="text-link"
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          >Como chegar <span aria-hidden="true">↗</span></a>
      </div>
      <div>
        <h3>Horários</h3><dl class="hours">
          {
            business.hours.map((item) => (
              <div>
                <>
                  <dt>{item.days}</dt>
                  <dd>{item.hours}</dd>
                </>
              </div>
            ))
          }
        </dl>
      </div>
      <div class="visit-details">
        <h3>Contato</h3><a
          class="text-link"
          href={`https://wa.me/${business.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp (11) 91078-9925"
          >(11) 91078-9925 <span aria-hidden="true">↗</span></a
        ><ul>
          <li>Estacionamento disponível</li><li>
            Próximo ao transporte público
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

~~~~

## .\sprout-site\src\layouts\BaseLayout.astro

~~~~text
---
import '../styles/global.css';
interface Props { title: string; description: string; }
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content={description} /><meta name="theme-color" content="#111510" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<meta property="og:title" content={title} /><meta property="og:description" content={description} />
<meta property="og:type" content="website" /><meta property="og:locale" content="pt_BR" />
<link rel="icon" href="/images/sprout-clover-favicon.png?v=4" type="image/png" /><title>{title}</title>
</head>
<body><a class="skip-link" href="#conteudo">Pular para o conteúdo</a><slot /></body>
</html>
~~~~

## .\sprout-site\src\pages\index.astro

~~~~text
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Gallery from '../components/Gallery.astro';
import Reviews from '../components/Reviews.astro';

import Visit from '../components/Visit.astro';
import Footer from '../components/Footer.astro';
import MobileBooking from '../components/MobileBooking.astro';
---

<BaseLayout
  title="Sprout BarberShop — Seu estilo tem raiz"
  description="Conheça a Sprout BarberShop: cortes, barba e cuidados com o cabelo. Confira serviços, preços, horários e como chegar."
  ><Header /><main id="conteudo">
    <Hero /><Services /><Gallery /><Reviews /><Visit />
  </main><Footer /><MobileBooking /></BaseLayout
>

~~~~

## .\sprout-site\src\styles\global.css

~~~~text
@layer reset, base, components, responsive;
@layer reset {
  * {
    box-sizing: border-box;
  }
  body,
  h1,
  h2,
  h3,
  p,
  figure {
    margin: 0;
  }
  img {
    display: block;
    max-width: 100%;
  }
  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }
  button {
    font: inherit;
  }
  [hidden] {
    display: none !important;
  }
}
@layer base {
  :root {
    color-scheme: light;
    --bg: #ffffff;
    --surface: #f5f5f5;
    --line: #dedede;
    --green: #3c681b;
    --text: #202020;
    --muted: #626262;
    --accent: #b9ee62;
    --font:
      ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
  }
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 32px;
  }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    cursor: pointer;
  }
  h1,
  h2,
  h3 {
    text-wrap: balance;
    font-weight: 700;
  }
  h1 {
    font-size: clamp(3rem, 5.3vw, 5rem);
    line-height: 1.1;
    letter-spacing: -0.04em;
  }
  h2 {
    font-size: clamp(2rem, 3.6vw, 3.4rem);
    line-height: 1.15;
    letter-spacing: -0.035em;
  }
  h3 {
    line-height: 1.3;
    letter-spacing: -0.02em;
  }
  h1 span,
  h2 span {
    color: var(--green);
  }
  p {
    text-wrap: pretty;
  }
  :focus-visible {
    outline: 3px solid var(--green);
    outline-offset: 5px;
  }
  ::selection {
    background: var(--accent);
    color: var(--text);
  }
  section {
    scroll-margin-top: 25px;
  }
}
@layer components {
  .wrap {
    width: min(1280px, calc(100% - 96px));
    margin-inline: auto;
  }
  .section {
    padding-block: 80px;
  }
  .skip-link {
    position: fixed;
    top: 8px;
    left: 8px;
    background: var(--text);
    color: var(--bg);
    padding: 12px;
    z-index: 20;
    transform: translateY(-160%);
  }
  .skip-link:focus {
    transform: none;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    min-height: 104px;
    border-bottom: 1px solid var(--line);
  }
  .wordmark {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding-block: 8px;
  }
  .brand-graffiti {
    display: block;
    width: 190px;
    height: auto;
    object-fit: contain;
  }
  .brand-subtitle {
    color: var(--muted);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    line-height: 1.2;
    margin-top: 4px;
  }
  .header nav {
    display: flex;
    gap: 28px;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
  }
  .header nav a {
    padding-block: 8px;
  }
  .header nav a:hover,
  .text-link:hover {
    color: var(--green);
  }
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    min-height: 48px;
    padding: 13px 22px;
    border: 1px solid var(--text);
    border-radius: 999px;
    background: var(--text);
    color: var(--bg);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    transition:
      background 0.2s,
      border-color 0.2s;
  }
  .button:hover {
    background: var(--green);
    border-color: var(--green);
  }
  .button span {
    font-size: 19px;
  }
  .button-contact {
    background: var(--bg);
    color: var(--text);
    border-color: var(--line);
  }
  .button-contact:hover {
    background: var(--surface);
    border-color: var(--green);
  }
  .hero {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
    gap: 55px;
    padding-block: 64px 72px;
  }
  .hero-copy {
    min-width: 0;
  }
  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.4px;
    line-height: 1.5;
    color: var(--green);
    margin-bottom: 18px;
  }
  .intro {
    max-width: 410px;
    margin-top: 24px;
    font-size: 17px;
    line-height: 1.7;
    color: var(--muted);
  }
  .hero-actions,
  .contact-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
  .hero-actions {
    margin-top: 28px;
  }
  .text-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    font-size: 14px;
    font-weight: 600;
  }
  .hero-gallery-link {
    margin-top: 16px;
  }
  .rating {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    margin-top: 20px;
    font-size: 13px;
    color: var(--muted);
  }
  .rating strong {
    color: var(--text);
    font-size: 16px;
  }
  .stars {
    color: var(--green);
    letter-spacing: 2px;
  }
  .hero-art {
    background: var(--bg);
    min-width: 0;
  }
  .hero-art img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  .section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 32px;
  }
  .services-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
  }
  .services-controls button {
    min-height: 44px;
    padding: 10px 18px;
    border: 1px solid var(--line);
    border-radius: 30px;
    background: var(--bg);
    color: var(--muted);
    font-size: 14px;
  }
  .services-controls button.active {
    background: var(--text);
    color: var(--bg);
    border-color: var(--text);
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }
  .service {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 225px;
    padding: 24px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: var(--surface);
    transition: border-color 0.2s;
  }
  .service:hover {
    border-color: var(--green);
  }
  .service-top {
    font-size: 13px;
    color: var(--muted);
  }
  .service h3 {
    margin-block: 20px 10px;
    font-size: 22px;
    overflow-wrap: break-word;
  }
  .service p {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 24px;
  }
  .service-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: auto;
  }
  .service-bottom strong {
    font-size: 25px;
    font-weight: 600;
    letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
  }
  .service-bottom small {
    font-size: 14px;
  }
  .service-bottom a {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line);
    border-radius: 50%;
    color: var(--green);
    font-size: 23px;
  }
  .service-bottom a:hover {
    background: var(--green);
    color: var(--bg);
  }
  .gallery,
  .about {
    border-top: 1px solid var(--line);
  }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px 16px;
  }
  .gallery-item {
    min-width: 0;
  }
  .gallery-item img,
  .gallery-placeholder {
    width: 100%;
    aspect-ratio: 4 / 5;
    border-radius: 18px;
  }
  .gallery-item img {
    height: auto;
    object-fit: cover;
  }
  .gallery-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--surface);
    border: 1px dashed var(--line);
    color: var(--muted);
  }
  .gallery-placeholder svg {
    color: var(--green);
  }
  .gallery-placeholder span {
    font-size: 14px;
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 48px;
    align-items: center;
  }
  .barber-profile {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 18px;
  }
  .barber-monogram {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--surface);
    color: var(--green);
    font-size: 28px;
    font-weight: 600;
  }
  .barber-profile h3 {
    font-size: 22px;
  }
  .barber-profile p {
    font-size: 14px;
    color: var(--muted);
    margin-top: 4px;
  }
  .barber-profile .button {
    margin-left: auto;
  }
  .visit {
    background: var(--bg);
    border-top: 1px solid var(--line);
  }
  .visit .section-heading {
    align-items: center;
  }
  .visit-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr 0.8fr;
    gap: 48px;
    margin-top: 40px;
  }
  .visit h3 {
    font-size: 19px;
    margin-bottom: 20px;
  }
  address {
    font-style: normal;
    font-size: 16px;
    font-weight: 600;
    max-width: 320px;
  }
  .visit p {
    font-size: 14px;
    color: var(--muted);
    margin-block: 14px 16px;
  }
  .hours {
    font-size: 14px;
    margin: 0;
  }
  .hours > div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    border-bottom: 1px solid var(--line);
    padding-block: 12px;
  }
  .hours dd {
    margin: 0;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .visit-details ul {
    padding-left: 18px;
    margin-top: 14px;
    color: var(--muted);
    font-size: 14px;
  }
  .visit-details li + li {
    margin-top: 8px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-block: 32px;
    border-top: 1px solid var(--line);
  }
  .footer > span {
    font-size: 13px;
    color: var(--muted);
  }
  .mobile-booking {
    display: none;
  }
}
@layer responsive {
  @media (max-width: 1100px) {
    .wrap {
      width: calc(100% - 60px);
    }
    .hero {
      gap: 30px;
    }
    .header nav {
      gap: 18px;
    }
    .services-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .about-grid,
    .visit-grid {
      gap: 30px;
    }
    .barber-profile .button {
      margin-left: 0;
    }
  }
  @media (max-width: 760px) {
    body {
      padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
    }
    html {
      scroll-padding-bottom: 100px;
    }
    .wrap {
      width: calc(100% - 40px);
    }
    .section {
      padding-block: 56px;
    }
    .header {
      flex-wrap: wrap;
      padding-block: 20px;
      gap: 16px;
      min-height: 100px;
    }
    .header .brand-graffiti {
      width: 150px;
      height: auto;
    }
    .header .button {
      padding-inline: 16px;
      font-size: 13px;
    }
    .header nav {
      order: 3;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px 16px;
      font-size: 13px;
    }
    .hero {
      grid-template-columns: 1fr;
      padding-block: 40px 48px;
      gap: 32px;
    }
    h1 {
      font-size: clamp(2.75rem, 9.5vw, 4.25rem);
    }
    .hero-art {
      max-width: 480px;
      margin-inline: auto;
    }
    .hero-actions .button {
      padding-inline: 18px;
    }
    .section-heading {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 28px;
    }
    .service {
      padding: 20px;
    }
    .service h3 {
      font-size: 20px;
    }
    .gallery-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .about-grid,
    .visit-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .visit .section-heading {
      align-items: flex-start;
    }
    .visit-grid {
      margin-top: 32px;
    }
    .visit-details {
      border-top: 1px solid var(--line);
      padding-top: 24px;
    }
    .footer {
      flex-wrap: wrap;
    }
    .mobile-booking {
      position: fixed;
      inset: auto 0 0;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg);
      border-top: 1px solid var(--line);
      padding: 12px 20px calc(12px + env(safe-area-inset-bottom, 0px));
      box-shadow: 0 -6px 24px rgb(23 26 21 / 5%);
    }
    .mobile-booking > div {
      margin-right: auto;
    }
    .mobile-booking strong {
      font-size: 14px;
      font-weight: 600;
    }
    .mobile-booking .button {
      padding: 12px 16px;
      font-size: 13px;
      gap: 8px;
      white-space: nowrap;
    }
    .mobile-whatsapp {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border: 1px solid var(--line);
      border-radius: 50%;
      color: var(--green);
    }
  }
  @media (max-width: 540px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
    .barber-profile .button {
      width: 100%;
    }
  }
  @media (max-width: 400px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
    .mobile-booking {
      gap: 8px;
      padding-inline: 14px;
    }
    .mobile-booking .button {
      padding-inline: 12px;
    }
    .mobile-booking > div {
      display: none;
    }
    .mobile-booking .button {
      flex: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    * {
      transition: none !important;
    }
  }
}

@layer components {
  .reviews {
    border-top: 1px solid var(--line);
  }
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
  .review-card {
    background: var(--surface);
    display: flex;
    flex-direction: column;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: 18px;
  }
  .review-card .review-summary-text {
    margin: 18px 0 24px;
    font-size: 16px;
  }
  .review-card figcaption {
    margin-top: auto;
    font-size: 14px;
    font-weight: 600;
  }
  .review-card figcaption span {
    display: block;
    margin-top: 4px;
    font-size: 13px;
    color: var(--muted);
    font-weight: 400;
  }
}
@layer responsive {
  @media (max-width: 760px) {
    .reviews-grid {
      grid-template-columns: 1fr;
    }
  }
}

@layer components {
  .reviews-grid-original {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  }
  .review-card blockquote.review-summary-text {
    margin-inline: 0;
  }
}

~~~~

## .\sprout-site\docs\architecture.md

~~~~text
# Arquitetura e critérios de qualidade

A landing page usa Astro, TypeScript estrito e geração estática. Não existe um padrão único de pastas para todos os projetos complexos. A escolha aqui prioriza o propósito atual e evolução gradual.

## Estrutura
- src/pages: rotas e composição das páginas.
- src/layouts: documento HTML, metadados e estilos globais.
- src/components: seções e elementos reutilizáveis.
- src/data: dados tipados, serviços, preços e contato.
- src/styles: tokens, estilos e adaptações responsivas.
- public: imagem fornecida, favicon e configuração de cabeçalhos.
- docs: decisões de arquitetura e segurança.
- .github/workflows: validação automatizada.
- dist: saída gerada; não editar nem versionar.

Componentes consomem dados; dados não dependem de componentes. Os preços e horários têm uma única fonte. Não adicionar camadas ou pastas vazias antecipadamente. Ao introduzir agendamento próprio, criar um serviço separado com validação no servidor, controle de acesso e persistência; a landing page não confirma horários.

## Verificação
Build bloqueado por erros de tipagem; formatação consistente; lockfile versionado; instalação reprodutível com npm ci; auditoria de dependências; validações em CI. Validar visualmente celular e desktop, navegação por teclado, filtros e links antes de divulgação pública.

## Fontes
- https://docs.astro.build/en/basics/project-structure/
- https://docs.astro.build/en/guides/typescript/
- https://docs.astro.build/en/reference/configuration-reference/
- https://docs.npmjs.com/cli/commands/npm-ci/
- https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
- https://www.w3.org/WAI/tutorials/page-structure/

~~~~

## .\sprout-site\docs\content-sources.md

~~~~text
# Conteúdo e fontes

Avaliações consultadas em 10/10/2026 no perfil da própria barbearia:
https://www.fresha.com/es-MX/a/sprout-barbershop-sao-paulo-avenida-cesario-de-abreu-450-pz04wr3u

Trechos exatos curtos de Marcio C, Pedro F e jean w; cada avaliação exibida tem cinco estrelas. Não foram usados o resumo de IA como depoimento ou imagens de clientes.

O endereço original apresenta São Paulo no Fresha. Foi encontrado cadastro de Luan Henrique Rodrigues Santos no mesmo número e rua, em Itapevi–SP, CEP 06653-020:
https://cnpj.biz/58969438000162

Cidade e CEP aguardam confirmação do proprietário; o endereço original permanece até recebê-la. Nenhuma alteração de cidade foi tratada como confirmada.

## Avaliações mais detalhadas
Os cartões agora apresentam resumos fiéis dos comentários de jean w (15/01/2025), Pedro A (03/02/2025) e Marcio C (16/07/2025), encontrados no Fresha:
https://www.fresha.com/lp/en/bt/barbershops/in/br-s%C3%A3o-paulo/itapevi

Identificados como Avaliação resumida, sem aspas de citação literal. Não foram adicionadas experiências ou alegações que não constam dos comentários consultados.

~~~~

## .\sprout-site\docs\design-references.md

~~~~text
# Referências de barbearias

Consultadas em 10/10/2026:

- Fellow Barber — https://www.fellowbarber.com/pages/services
- Fellow Barber (localização) — https://www.fellowbarber.com/pages/locations/
- Ruffians — https://ruffians.co.uk/

Padrões observados no conteúdo e navegação: acesso direto ao agendamento, apresentação de serviços com duração, localização e contato próximos à decisão de marcar um horário.

Adaptação para Sprout: agendamento persistente no celular, acesso à galeria a partir do início e chamada para agendamento após os cortes. Mantidos os dados reais da Sprout, o fundo branco, os detalhes verdes, a arte própria e seis espaços para fotos. Não foram reutilizados fotos, textos promocionais, depoimentos ou marcas dos sites externos.

Verificação: sintaxe Astro e formatação. Revisão visual no navegador e build integral permanecem limitados pelo acesso a diretórios do ambiente.

~~~~

## .\sprout-site\docs\image-edit.md

~~~~text
# Edição da arte Sprout

Ferramenta: image_gen integrada (edição por referência).
Original preservado: public/images/sprout-brand.png
Arte integrada: public/images/sprout-brand-complete.png (1254 × 1254).

## Prompt final

Use case: precise-object-edit / outpainting. Edit target: attached local Sprout Studio graffiti image. Reconstruct the complete artwork whose upper clover leaves and bottom curling vines are cropped in this screenshot. Preserve exact words 'SPROUT STUDIO', white bubble graffiti lettering, thick black outlines, vivid green four-leaf clover, detailed leaf veins, curling green vines and paint drips. Expand the composition to show the ENTIRE clover above and ENTIRE vines and all dripping ends below. Place the whole complete artwork centered with generous white margins on every side, on a clean pure white background, no screenshot black frame or rounded container. Keep recognizable typography, lettering arrangement and handmade graffiti style. Do not add any other words, props or symbols. Square composition, high quality image asset for a white barbershop landing page. Nothing touches any edge.

~~~~

## .\sprout-site\docs\logo-graffiti.md

~~~~text
# Nova logo em grafite

Criada com image_gen integrada. A arte anterior foi usada somente como referência de estilo. Arquivo final: public/images/sprout-logo-graffiti.png, 2172 × 724, com transparência. Aplicada ao cabeçalho e rodapé; BARBERSHOP permanece como texto HTML legível abaixo.

## Prompt final

Create a NEW horizontal logo for Sprout BarberShop, using the input only as style reference. Do NOT reproduce or shrink the reference composition. Design a distinct, compact header wordmark: exact text 'SPROUT' in a SINGLE horizontal row of custom chunky graffiti bubble letters, WHITE fill with very thick BLACK outline, restrained bright GREEN highlights. Below it, exact text 'BARBERSHOP' in smaller BLACK bold condensed clean lettering, easy to read. Incorporate one small flat GREEN four-leaf clover to the left, integrated with the S, NOT above the wordmark. New original letter shapes, confident street-art personality inspired by the reference, cleaner and simpler. No 'STUDIO', no sprawling vines, no large central clover, no paint cloud, no background speckles, no elaborate illustration. Only two tiny controlled drips if useful. Wide 3:1 landscape canvas, logo uses 90% of width and most height, narrow clear margins on every edge. Transparent background with actual alpha. Optimized for legibility at 180px width on a white website header. Crisp polished flat raster logo, no mockup, no shadow, no border container.

~~~~

## .\sprout-site\docs\security.md

~~~~text
# Segurança

## Controles implementados
- Página estática, sem backend, credenciais, cookies, formulários ou coleta de dados.
- Conteúdo interpolado pelo Astro, sem HTML arbitrário, eval ou injeção de conteúdo.
- CSP emitida pelo Astro no build, com hashes para recursos inline e recursos locais.
- Política restritiva para objetos, conexão e envio de formulário.
- Links externos com noopener e noreferrer; agendamento aceita HTTPS.
- Sem fontes, scripts de analytics, mapas incorporados ou imagens remotas.
- Dados pessoais e segredos nunca devem ser colocados no frontend.
- Arquivos .env e dependências fora do controle de versão.

## Hospedagem
public/_headers oferece nosniff, Permissions-Policy, Referrer-Policy e X-Frame-Options para hosts que reconhecem o formato. O arquivo não garante aplicação em todos os provedores: verificar os cabeçalhos reais após hospedagem. frame-ancestors exige cabeçalho HTTP; a CSP por meta não oferece esse controle. HTTPS e proteção contra enquadramento dependem do host.

## Limites e evolução
Auditoria de dependências não prova ausência de vulnerabilidades. Nenhuma promessa de segurança absoluta. Um futuro backend de agendamento exige validação no servidor, autenticação adequada, limites de requisição, proteção de dados e revisão própria. Nunca marcar uma reserva como confirmada sem integração real.

~~~~

## .\sprout-site\docs\validation.md

~~~~text
# Estado da validação

Pesquisa e implementação inicial concluídas em 10/10/2026.
A instalação de dependências falhou com EACCES ao acessar registry.npmjs.org por restrição de rede do ambiente.

Concluído: leitura das cinco referências; organização modular; validação dos oito serviços e da presença dos imports principais e imagem.
Pendente: instalação, geração do package-lock.json, formatação, astro check, build, npm audit, revisão visual no navegador e publicação.

O workflow de CI requer package-lock.json: gerá-lo com npm install em um ambiente com acesso ao registro e versioná-lo antes de ativar o CI. A seguir executar npm run format, npm run build e npm audit --audit-level=high.

Nenhuma implantação foi registrada ou iniciada. O contato oficial permanece pendente. Não interpretar a configuração de segurança como verificação da hospedagem.

## Revisão do visual claro
Arte reconstruída com image_gen, original preservado e nova imagem integrada. Fundo branco contínuo, cartões arredondados, botões pretos e detalhes verdes.
As dependências e o lockfile agora existem após instalação pelo usuário. A checagem Astro e o build foram tentados, mas o esbuild falhou ao ler diretórios com Acesso negado neste ambiente. Sem revisão visual automatizada ou publicação nesta revisão.

## Revisão de tipografia, paleta e conteúdo
- Fonte de sistema consistente, títulos com menor compressão e corpo a partir de 14px nas informações secundárias.
- Paleta centralizada: branco #ffffff, texto #171a15, cinza #5e6559, verde #3c681b e verde claro #b9ee62 para seleção.
- Contraste calculado sobre branco: texto 17,57:1; cinza 6,03:1; verde 6,59:1.
- Removidos slogans repetidos, faixa decorativa, pôster, seção duplicada de avaliações, legendas numeradas da galeria e chamada repetida após as fotos.
- Preservados preços, tempos dos serviços, fotos, avaliação do início, profissional, horários, endereço, estacionamento e links de contato/agendamento.
- CSS consolidado em camadas com regras responsivas únicas e estilos sem uso removidos.
- Validação: compilador Astro sem erros de sintaxe nos componentes, CSS analisado com PostCSS e formatação Prettier aprovada.
- Limite: não foi realizada revisão visual no navegador ou novo build integral; a falha anterior de acesso a diretórios do ambiente permanece sem resolução.

## Ajustes de conteúdo real e conversão
- Três trechos reais de avaliações do Fresha, com atribuição e link de origem.
- Galeria e links aparecem somente quando há fotos reais; sem espaços reservados públicos.
- Botões de agendamento retirados do cabeçalho e dos oito cartões, preservados no início, contato e barra do celular.
- Endereço completo aguardando confirmação de Itapevi–SP / CEP 06653-020 devido à divergência com a identificação de São Paulo no Fresha.
- Componentes Astro e CSS analisados sem erros de sintaxe; formatação verificada. Build e revisão visual continuam pendentes pelas limitações previamente registradas.

~~~~
