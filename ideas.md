# COBQUATTU - Brainstorming de Design Premium

## Conceito Selecionado: Minimalismo Executivo Cinematográfico

### Design Movement
**Brutalismo Digital + Minimalismo Corporativo + Cinematografia Arquitetônica**

Uma abordagem que combina a severidade do brutalismo com a elegância do minimalismo corporativo, inspirada em cinematografia arquitetônica e design institucional de alto nível. Transmite poder, inteligência e exclusividade através da simplicidade estratégica.

### Core Principles

1. **Espaço Negativo como Protagonista**: O vazio é tão importante quanto o conteúdo. Cada elemento respira. Layouts assimétricos com abundância de whitespace criam sensação de sofisticação e poder.

2. **Tipografia como Hierarquia**: Tipografia forte e deliberada (sans-serif moderna + serif elegante) estabelece autoridade. Pesos contrastantes (100, 400, 700, 900) criam dramaticidade.

3. **Profundidade Sutil**: Sombras cinematográficas, gradientes imperceptíveis, e layering criam dimensão sem ruído visual. Tudo é refinado e controlado.

4. **Movimento Intencional**: Animações lentas, transições suaves e scroll cinematográfico. Nada é aleatório. Cada movimento comunica intenção estratégica.

### Color Philosophy

**Paleta Premium Executiva:**
- **Preto Fosco (Principal)**: `#0a0a0a` - Não é preto puro. Sofisticado, profundo, transmite autoridade e exclusividade.
- **Grafite Escuro**: `#1a1a1a` - Para variações e profundidade
- **Branco Quase-Puro**: `#f8f8f8` - Não é branco absoluto. Mais quente, menos agressivo.
- **Dourado Discreto**: `#d4af37` (com opacidade 0.6-0.8) - Apenas em acentos estratégicos. Transmite valor e exclusividade.
- **Verde Escuro Sofisticado**: `#1a3a2a` - Para acentos secundários. Representa crescimento, desenvolvimento regional, sustentabilidade.
- **Cinza Neutro**: `#6b7280` - Para textos secundários e subtis

**Intenção Emocional**: Confiança absoluta, poder silencioso, inteligência estratégica, exclusividade, desenvolvimento regional.

### Layout Paradigm

**Assimetria Estratégica com Eixo Central Implícito**

- Hero: Imagem cinematográfica full-width com texto posicionado assimetricamente (esquerda/direita alternada)
- Seções: Alternância entre full-width e conteúdo centrado com margens generosas
- Cards: Grid 3 colunas em desktop, mas com espaçamento generoso (gap-8 mínimo)
- Tipografia: Títulos alinhados à esquerda, subtítulos em cor sofisticada
- Sem bordas retas demais: Usar clipping paths sutis, divisores SVG cinematográficos

### Signature Elements

1. **Divisores Cinematográficos**: SVG paths suaves que separam seções com elegância (não linhas retas)
2. **Ícones Minimalistas**: Ícones de linha fina, peso 1.5-2px, em dourado ou branco
3. **Gradientes Imperceptíveis**: Gradientes de preto para cinza muito sutis em backgrounds
4. **Tipografia Escalonada**: Títulos em 48-64px, subtítulos em 20-24px, body em 16px

### Interaction Philosophy

- **Hover States**: Elementos ganham brilho sutil (opacity, glow discreto em dourado)
- **Scroll**: Parallax cinematográfico em imagens, fade-in suave em textos
- **Botões**: Transformação elegante (scale 0.98, shadow expand)
- **Formulários**: Animações suaves, focus states em dourado
- **Links**: Underline animado em dourado, não em cor vibrante

### Animation

- **Entrance**: Fade-in + slight slide-up (300ms ease-out)
- **Scroll**: Parallax em imagens (velocidade reduzida), fade-in em cards
- **Hover**: Scale 1.02 + shadow expand (200ms ease-out)
- **Transições**: Todas em 200-400ms, nunca abruptas
- **Easing**: `cubic-bezier(0.23, 1, 0.32, 1)` para saídas, `cubic-bezier(0.77, 0, 0.175, 1)` para movimentos

### Typography System

**Fonte Display**: Poppins Bold (700-900) para títulos principais
- Tamanhos: 64px (hero), 48px (seções), 32px (subtítulos)
- Tracking: -0.02em para títulos grandes

**Fonte Body**: Inter Regular (400-500) para corpo
- Tamanho: 16px base, 14px para secundários
- Line-height: 1.6 para corpo, 1.2 para títulos

**Fonte Accent**: Playfair Display (700) para destaques estratégicos
- Usado em headlines e citações

**Hierarquia Rigorosa**: 
- Títulos: Poppins 900, tracking -0.02em
- Subtítulos: Poppins 700, cor grafite
- Body: Inter 400, cor cinza
- Acentos: Dourado discreto em palavras-chave

---

## Implementação

Este design será implementado através de:
1. Tailwind CSS com cores customizadas em OKLCH
2. Framer Motion para animações cinematográficas
3. SVG dividers para separações elegantes
4. Imagens geradas premium para hero e seções principais
5. Mobile-first com breakpoints estratégicos
6. Scroll cinematográfico com Intersection Observer

**Objetivo Final**: Um website que pareça uma revista premium de investimentos, sofisticado, poderoso, exclusivo e inteligente.
