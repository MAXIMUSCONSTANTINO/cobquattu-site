# Plano de Arquitetura: Ecossistema Cobquattu (Área de Membros)

Este documento descreve a estrutura local para o novo fluxo de autenticação e dashboard da Cobquattu.

## 1. Novas Rotas (Wouter)
- `/auth/login`: Página unificada de acesso.
- `/auth/register/parceiro`: Inscrição para Parceiros Especializados.
- `/auth/register/proprietario`: Inscrição para Proprietários de Imóveis.
- `/auth/register/empresario`: Inscrição para Empresários com Projetos.
- `/dashboard`: Área de introdução e boas-vindas ao ecossistema.

## 2. Estrutura de Formulários
### Parceiros
- Nome e Sobrenome (opcional)
- Email
- Telefone
- Profissão
- Senha / Confirmação

### Proprietários (Clientes Tipo 1)
- Campos padrão +
- Matrícula do Imóvel (com aviso de atualização futura)
- Valor Sugerido do Imóvel

### Empresários (Clientes Tipo 2)
- Campos padrão +
- Nome do Projeto
- Características / Resumo
- Valor Necessário para Conclusão

## 3. Identidade Visual
- Fundo: Dark (#000000)
- Destaques: Gold/Accent (#D4AF37)
- Tipografia: Serifada sofisticada para títulos, Sans para dados.
- Elementos: Logotipo oficial em destaque em todas as telas de auth.

## 4. Lógica de Acesso
- Login flexível: Email OR Nome + Telefone + Senha.
