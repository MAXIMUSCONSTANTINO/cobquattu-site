# TODO - Migração Cobquattu para Web-DB-User

## Fase 1: Análise e Planejamento
- [x] Clonar repositório localmente
- [x] Revisar estrutura atual (web-static)
- [x] Identificar pendências críticas
- [x] Planejar migração para web-db-user

## Fase 2: Configurar Backend
- [x] Adicionar dependências de backend (Express, Drizzle, bcrypt, JWT)
- [x] Criar estrutura de banco de dados (schema.ts)
- [x] Configurar conexão MySQL/TiDB
- [x] Criar arquivo de migração SQL
- [x] Implementar helpers de banco de dados (db.ts)

## Fase 3: Autenticação Segura
- [ ] Criar procedimentos tRPC para autenticação
- [ ] Implementar hash de senha com bcrypt
- [ ] Criar middleware de proteção de rotas
- [ ] Implementar JWT para sessões
- [ ] Criar contexto de autenticação no servidor

## Fase 4: Fluxo de Cadastro Real
- [ ] Criar mutations tRPC para registro (Parceiro, Proprietário, Empresário)
- [ ] Implementar validações de dados
- [ ] Persistir usuários no banco de dados
- [ ] Criar sessão após cadastro bem-sucedido
- [ ] Adicionar tratamento de erros

## Fase 5: Dashboards e Redirecionamentos
- [ ] Proteger rotas de dashboard com autenticação
- [ ] Corrigir redirecionamento pós-cadastro para dashboard correto
- [ ] Implementar diferentes dashboards por tipo de usuário
- [ ] Adicionar logout funcional
- [ ] Criar página de perfil do usuário

## Fase 6: Remover localStorage
- [ ] Remover dependência de localStorage para dados sensíveis
- [ ] Implementar sessões seguras via cookies
- [ ] Migrar estado de autenticação para servidor
- [ ] Implementar refresh de token

## Fase 7: Testes
- [ ] Testar fluxo completo de cadastro
- [ ] Testar login com dados corretos e incorretos
- [ ] Testar proteção de rotas
- [ ] Testar redirecionamentos
- [ ] Testar logout
- [ ] Verificar persistência de dados

## Fase 8: Commit no GitHub
- [ ] Fazer commit das alterações
- [ ] Push para repositório
- [ ] Atualizar README com instruções de setup
- [ ] Documentar mudanças

## Notas Importantes
- Manter todo o design visual existente
- Manter todas as páginas institucionais (Manifesto, Nordeste Estratégico, etc.)
- Manter estrutura de componentes React
- Usar tRPC para comunicação cliente-servidor
- Implementar autenticação segura com JWT
- Usar Drizzle ORM para banco de dados
