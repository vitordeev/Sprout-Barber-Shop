# Colocar o projeto no GitHub

## Apresentação sugerida

- Nome: `sprout-barbershop`
- Descrição: Landing page responsiva para barbearia com Astro, TypeScript, serviços filtráveis, carrossel de vídeos e agendamento pelo Fresha.
- Topics: `astro`, `typescript`, `css`, `landing-page`, `responsive-design`, `barbershop`, `portfolio`.
- Website: `https://sproutbarbershop.netlify.app/` (endereço informado pelo responsável).

## Envio pelo Git

Use a pasta `sprout-site` como raiz do repositório. Não envie a pasta externa inteira, pois ela contém referências originais, histórico de trabalho e pacotes de publicação duplicados.

Crie um repositório vazio na sua conta do GitHub, sem gerar README ou licença. Abra um terminal em `sprout-site` e execute:

```sh
git init
git add .
git status --short
git commit -m "feat: adiciona projeto Sprout BarberShop"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/sprout-barbershop.git
git push -u origin main
```

Substitua `SEU-USUARIO`. Se já houver um repositório válido, confira `git status` e `git remote -v` antes; não substitua o remoto existente sem conferir o destino. Nesta cópia, a pasta `.git` existente não foi reconhecida pelo Git. Não é necessário apagá-la para preparar os arquivos.

Revise `git status` antes de confirmar: não inclua credenciais, `.openai`, dependências ou caches. O `.gitignore` não remove arquivos já rastreados.

## Alternativa pelo navegador

Crie o repositório e use **Add file → Upload files**. Envie o conteúdo de `sprout-site`, incluindo arquivos de configuração ocultos, sem `.git`, `.openai`, `node_modules`, `.astro` ou `.npm-cache`. O README e o package.json devem ficar na raiz. Não envie apenas o ZIP: extraia os arquivos para que o GitHub mostre o código.

## Validação e hospedagem

```sh
npm ci
npm run check
npm run build
npm run format:check
```

Não há confirmação de build padrão completo nesta preparação. O ambiente Windows já apresentou restrições de acesso e, nesta sessão, alguns arquivos locais também apresentaram falhas de leitura do OneDrive. Se um arquivo estiver somente na nuvem, selecione **Sempre manter neste dispositivo** na pasta antes de copiar ou enviar.

A publicação manual anterior usou `scripts/build-netlify-static.mjs` e `scripts/verify-netlify-static.mjs`, documentados no histórico externo `PUBLICAR-NETLIFY.md`. Esse gerador é específico do estado atual e não substitui o build padrão para futuras funcionalidades ou fotos que exijam otimização.

Publicar o código no GitHub não publica automaticamente o site. Para integração com Netlify usando esta pasta como raiz, o comando padrão é `npm run build` e a saída é `dist`. Não configure GitHub Pages sem adaptar os caminhos e a configuração do Astro.

Para destacar no perfil, fixe o repositório em **Customize your pins**. Uma captura real do site pode ser acrescentada ao README posteriormente.
