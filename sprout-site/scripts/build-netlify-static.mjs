import { transform } from '@astrojs/compiler';
import ts from 'typescript';
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  copyFileSync,
} from 'node:fs';
import { resolve, dirname, extname, relative, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { renderToString } from 'astro/runtime/server/index.js';

// Fallback for this static landing page when the native esbuild process is blocked.
const root = process.cwd();
const output = resolve(root, '../publicar-netlify');
const modules = resolve(root, '.astro/netlify-modules');
mkdirSync(output, { recursive: true });
mkdirSync(modules, { recursive: true });
const styles = [readFileSync('src/styles/global.css', 'utf8')];
const scriptPaths = new Map();
const compiledPaths = new Map();
const transpile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
async function compile(file) {
  file = resolve(file);
  if (compiledPaths.has(file)) return compiledPaths.get(file);
  const target = join(
    modules,
    relative(root, file).replace(/[\\/]/g, '_') + '.mjs',
  );
  compiledPaths.set(file, target);
  let source = readFileSync(file, 'utf8');
  source = source.replace(
    /import\s+\{\s*Image\s*\}\s+from\s*['\"]astro:assets['\"];?/g,
    'const Image = () => {};',
  );
  if (file.endsWith('data\\gallery.ts') || file.endsWith('data/gallery.ts')) {
    const photos = readdirSync('src/assets/cuts').filter((name) =>
      /\.(jpe?g|png|webp|avif)$/i.test(name),
    );
    if (photos.length)
      throw Error('Use o build Astro para otimizar as fotos da galeria.');
    source = 'export const cutPhotos = []; export const hasCutPhotos = false;';
  }
  if (extname(file) === '.astro') {
    const built = await transform(source, {
      filename: file.replaceAll('\\', '/'),
    });
    styles.push(...built.css);
    for (const [index, script] of built.scripts.entries()) {
      if (script.type !== 'inline')
        throw Error('Script externo não suportado pelo fallback.');
      const name = `script-${scriptPaths.size}.js`;
      writeFileSync(join(output, name), transpile(script.code));
      scriptPaths.set(
        `${file.replaceAll('\\', '/')}?astro&type=script&index=${index}&lang.ts`,
        `/${name}`,
      );
    }
    source =
      built.code.replace(/createMetadata as \$\$createMetadata,?/g, '') +
      '\nfunction $$createMetadata() { return {}; }\n';
  }
  source = source.replace(
    /import\s+[^;]*?from\s*['"]astro:assets['"];?/g,
    'const Image = () => {};',
  );
  source = source.replace(/import\s*['"][^'"]+\.css['"];?/g, '');
  const imports = [...source.matchAll(/\bfrom\s*(['"])([^'"]+)\1/g)];
  for (const match of imports) {
    const specifier = match[2];
    if (!specifier.startsWith('.')) continue;
    let dependency = resolve(dirname(file), specifier);
    if (!extname(dependency)) dependency += '.ts';
    const compiled = await compile(dependency);
    source = source.replaceAll(
      match[0],
      `from ${JSON.stringify(pathToFileURL(compiled).href)}`,
    );
  }
  writeFileSync(target, transpile(source));
  return target;
}
const page = await compile('src/pages/index.astro');
const component = (await import(pathToFileURL(page).href)).default;
const result = {
  styles: new Set(),
  scripts: new Set(),
  links: new Set(),
  renderers: [],
  clientDirectives: new Map(),
  inlinedScripts: new Map(),
  compressHTML: false,
  partial: false,
  base: '/',
  cancelled: false,
  componentMetadata: new Map(),
  _metadata: {
    hasRenderedHead: false,
    renderedScripts: new Set(),
    hasDirectives: new Set(),
    extraHead: [],
    propagators: new Set(),
    templateDepth: 0,
    rendererSpecificHydrationScripts: new Set(),
  },
  _experimentalQueuedRendering: { enabled: false },
  createAstro: (props, slots) => ({ props, slots, generator: 'Astro' }),
  resolve: async (id) => {
    if (!scriptPaths.has(id)) throw Error(`Script não encontrado: ${id}`);
    return scriptPaths.get(id);
  },
};
let html = await renderToString(result, component, {}, {}, true);
html = html.replace(
  '</head>',
  '<link rel="stylesheet" href="/site.css"></head>',
);
writeFileSync(join(output, 'site.css'), styles.join('\n'));
writeFileSync(join(output, 'index.html'), html);
function copyPublic(folder, destination) {
  mkdirSync(destination, { recursive: true });
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    if (item.name.endsWith('.md')) continue;
    const from = join(folder, item.name),
      to = join(destination, item.name);
    if (item.isDirectory()) copyPublic(from, to);
    else copyFileSync(from, to);
  }
}
copyPublic('public', output);
writeFileSync(
  join(output, '_headers'),
  readFileSync('public/_headers', 'utf8') +
    "\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'\n",
);
console.log(`Site estático gerado: ${output}`);
