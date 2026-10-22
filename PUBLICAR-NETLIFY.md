# Publicar a Sprout no Netlify

O arquivo Sprout-BarberShop-Netlify.zip contém o site estático pronto, com index.html na raiz, estilos, scripts, imagens, cabeçalhos de segurança e oito vídeos. Não é necessário instalar Node ou executar build para enviar este pacote.

1. Entre na sua conta Netlify e abra https://app.netlify.com/drop.
2. Arraste Sprout-BarberShop-Netlify.zip para a área de publicação. Se preferir, extraia o ZIP e arraste a pasta que contém index.html.
3. Aguarde a conclusão do envio e abra a URL fornecida pelo Netlify.
4. Confira no computador e celular: setas do carrossel, reprodução dos vídeos, agendamento Fresha e WhatsApp.

Para atualizar um site Netlify existente, use a área de deploy manual da página Deploys desse site.

Também há uma cópia descompactada em publicar-netlify/. Envie somente esse pacote ou essa pasta; o código Astro em sprout-site/ precisa ser compilado antes de um envio manual.

## Verificações realizadas

Página e recursos locais respondem por HTTP. Oito vídeos estão associados aos cartões; scripts têm sintaxe válida; CSS inclui responsividade e barra de rolagem oculta. Não foi realizado teste visual no navegador ou em celular real.

O build padrão Astro foi bloqueado por restrições de acesso do esbuild neste ambiente. Este pacote foi gerado a partir dos componentes e dados atuais com o compilador e runtime Astro, estilos compilados e scripts transpilados por TypeScript. Não equivale a aprovação do comando npm run build.

Para regenerar esta versão estática, dentro de sprout-site/ execute:

    node scripts/build-netlify-static.mjs
    node scripts/verify-netlify-static.mjs

Depois compacte o conteúdo atualizado de publicar-netlify/, mantendo index.html na raiz. O gerador alternativo é específico para esta landing page estática e interrompe a execução se encontrar fotos na galeria que exigem otimização; nesse caso use o build padrão Astro em um ambiente com permissões adequadas.

Documentação Netlify: https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/
