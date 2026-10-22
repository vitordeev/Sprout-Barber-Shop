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
