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
