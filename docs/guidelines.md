# ✲ CLM — Design System Guidelines

> Gerado automaticamente a partir do arquivo Figma **✲ CLM**  
> Coleções: `.Primitives` · `Colors` | Fonte: **Instrument Sans**

## Regra De Uso No Projeto

- Toda tela nova deve usar a base de cores semânticas e os text styles definidos neste documento.
- Toda atualização em telas existentes deve priorizar os tokens de `src/styles/tokens.css`, evitando valores hardcoded quando já houver variável equivalente.
- A base oficial para cores é a coleção semântica `Colors`, com suporte a `light` e `dark`.
- A base oficial para tipografia é a coleção de `Text Styles` com a família **Instrument Sans**.

---

## Sumário

1. [Primitivas de Cor](#1-primitivas-de-cor)
2. [Variáveis Semânticas](#2-variáveis-semânticas)
   - 2.1 [Brand Primary](#21-brand-primary)
   - 2.2 [Brand Secondary](#22-brand-secondary)
   - 2.3 [Background](#23-background)
   - 2.4 [Content](#24-content)
   - 2.5 [Border](#25-border)
   - 2.6 [Button — Primary](#26-button--primary)
   - 2.7 [Button — Secondary](#27-button--secondary)
   - 2.8 [Button — Ghost](#28-button--ghost)
   - 2.9 [Feedback](#29-feedback)
   - 2.10 [Accent](#210-accent)
3. [Text Styles](#3-text-styles)

---

## 1. Primitivas de Cor

Coleção: `.Primitives` · Modo único: `Mode 1`

### Orange

| Token | Hex |
|---|---|
| `color/orange/100` | `#FFF1EB` |
| `color/orange/200` | `#FFD9C9` |
| `color/orange/300` | `#FFB79C` |
| `color/orange/400` | `#FF8A5F` |
| `color/orange/500` | `#F1672C` |
| `color/orange/600` | `#D95522` |
| `color/orange/700` | `#B8471C` |
| `color/orange/800` | `#913716` |
| `color/orange/900` | `#6B2910` |

### Blue

| Token | Hex |
|---|---|
| `color/blue/100` | `#E6EEF2` |
| `color/blue/200` | `#C0D3DC` |
| `color/blue/300` | `#8FAFBE` |
| `color/blue/400` | `#5B879F` |
| `color/blue/500` | `#113A52` |
| `color/blue/600` | `#0E3247` |
| `color/blue/700` | `#0B2A3B` |
| `color/blue/800` | `#081F2C` |
| `color/blue/900` | `#05151E` |

### Gray

| Token | Hex |
|---|---|
| `color/gray/50`  | `#FAFAFA` |
| `color/gray/100` | `#F0F1F2` |
| `color/gray/200` | `#D9DBDD` |
| `color/gray/300` | `#C2C5C8` |
| `color/gray/400` | `#A3A7AB` |
| `color/gray/500` | `#7F8489` |
| `color/gray/600` | `#61666B` |
| `color/gray/700` | `#44484D` |
| `color/gray/800` | `#2C2F33` |
| `color/gray/900` | `#1B1B1B` |

### Yellow

| Token | Hex |
|---|---|
| `color/yellow/100` | `#FFF4E5` |
| `color/yellow/200` | `#FFE2BF` |
| `color/yellow/300` | `#FFC980` |
| `color/yellow/400` | `#FFAE40` |
| `color/yellow/500` | `#F79009` |
| `color/yellow/600` | `#D97E08` |
| `color/yellow/700` | `#B36807` |
| `color/yellow/800` | `#8C5105` |
| `color/yellow/900` | `#663A04` |

### Green

| Token | Hex |
|---|---|
| `color/green/100` | `#E6F6EC` |
| `color/green/200` | `#BFE8CF` |
| `color/green/300` | `#80D1A5` |
| `color/green/400` | `#40BA7A` |
| `color/green/500` | `#00A63E` |
| `color/green/600` | `#009236` |
| `color/green/700` | `#007A2E` |
| `color/green/800` | `#005F24` |
| `color/green/900` | `#00441A` |

### Purple

| Token | Hex |
|---|---|
| `color/purple/100` | `#F4E7FF` |
| `color/purple/200` | `#E3C7FF` |
| `color/purple/300` | `#C78FFF` |
| `color/purple/400` | `#A94BFF` |
| `color/purple/500` | `#9810FA` |
| `color/purple/600` | `#860EE0` |
| `color/purple/700` | `#700CC0` |
| `color/purple/800` | `#59099A` |
| `color/purple/900` | `#420774` |

### iBlue

| Token | Hex |
|---|---|
| `color/iblue/100` | `#E8EEFF` |
| `color/iblue/200` | `#C7D6FF` |
| `color/iblue/300` | `#8FAEFF` |
| `color/iblue/400` | `#4B7FFF` |
| `color/iblue/500` | `#155DFC` |
| `color/iblue/600` | `#124FE0` |
| `color/iblue/700` | `#0F42BF` |
| `color/iblue/800` | `#0B3399` |
| `color/iblue/900` | `#082473` |

### Pink

| Token | Hex |
|---|---|
| `color/pink/100` | `#FFE6F1` |
| `color/pink/200` | `#FFC2DC` |
| `color/pink/300` | `#FF85B8` |
| `color/pink/400` | `#FF4794` |
| `color/pink/500` | `#FF0074` |
| `color/pink/600` | `#E00066` |
| `color/pink/700` | `#BF0056` |
| `color/pink/800` | `#990044` |
| `color/pink/900` | `#730033` |

### Red

| Token | Hex |
|---|---|
| `color/red/100` | `#FDECEC` |
| `color/red/200` | `#F9D2CF` |
| `color/red/300` | `#F5A8A3` |
| `color/red/400` | `#EE6F67` |
| `color/red/500` | `#F04438` |
| `color/red/600` | `#D93B31` |
| `color/red/700` | `#B73129` |
| `color/red/800` | `#8F2721` |
| `color/red/900` | `#661B17` |

---

## 2. Variáveis Semânticas

Coleção: `Colors` · Modos: `light` / `dark`

> As colunas **Light** e **Dark** mostram o alias que a variável referencia em cada modo.

---

### 2.1 Brand Primary

Paleta primária da marca, baseada em **Orange**.

| Token | Light | Dark |
|---|---|---|
| `brand/primary/subtle`  | `orange/100` | `orange/900` |
| `brand/primary/muted`   | `orange/200` | `orange/700` |
| `brand/primary/soft`    | `orange/300` | `orange/600` |
| `brand/primary/main`    | `orange/500` | `orange/400` |
| `brand/primary/strong`  | `orange/600` | `orange/300` |
| `brand/primary/bold`    | `orange/700` | `orange/200` |
| `brand/primary/intense` | `orange/900` | `orange/100` |

---

### 2.2 Brand Secondary

Paleta secundária da marca, baseada em **Blue**.

| Token | Light | Dark |
|---|---|---|
| `brand/secondary/subtle`  | `blue/100` | `blue/900` |
| `brand/secondary/muted`   | `blue/200` | `blue/700` |
| `brand/secondary/soft`    | `blue/300` | `blue/600` |
| `brand/secondary/main`    | `blue/500` | `blue/400` |
| `brand/secondary/strong`  | `blue/600` | `blue/300` |
| `brand/secondary/bold`    | `blue/700` | `blue/200` |
| `brand/secondary/intense` | `blue/900` | `blue/100` |

---

### 2.3 Background

| Token | Light | Dark |
|---|---|---|
| `background/primary`      | `gray/50`             | `gray/900` |
| `background/secondary`    | `gray/100`            | `gray/800` |
| `background/tertiary`     | `gray/200`            | `gray/700` |
| `background/always-dark`  | `gray/900`            | `gray/900` *(fixo)* |
| `background/always-light` | `gray/50`             | `gray/50` *(fixo)* |
| `background/always-brand` | `brand/primary/main`  | `brand/primary/main` *(fixo)* |

---

### 2.4 Content

| Token | Light | Dark |
|---|---|---|
| `content/primary`      | `gray/900`           | `gray/100` |
| `content/secondary`    | `gray/800`           | `gray/200` |
| `content/tertiary`     | `gray/700`           | `gray/300` |
| `content/inverse`      | `gray/50`            | `gray/900` |
| `content/always-dark`  | `gray/900`           | `gray/900` *(fixo)* |
| `content/always-light` | `gray/50`            | `gray/50` *(fixo)* |
| `content/always-brand` | `brand/primary/main` | `brand/primary/main` *(fixo)* |

---

### 2.5 Border

| Token | Light | Dark |
|---|---|---|
| `border/primary`   | `gray/200` | `gray/800` |
| `border/secondary` | `gray/300` | `gray/700` |
| `border/tertiary`  | `gray/400` | `gray/600` |

---

### 2.6 Button — Primary

#### Background

| Token | Light | Dark |
|---|---|---|
| `button/primary/background/enabled`  | `brand/primary/main`   | `brand/primary/main` |
| `button/primary/background/hover`    | `brand/primary/strong` | `brand/primary/strong` |
| `button/primary/background/pressed`  | `brand/primary/bold`   | `brand/primary/bold` |
| `button/primary/background/disabled` | `gray/300`             | `gray/800` |
| `button/primary/background/alert`    | `red/600`              | `red/400` |

#### Content

| Token | Light | Dark |
|---|---|---|
| `button/primary/content/enabled`  | `gray/50`  | `gray/50` |
| `button/primary/content/hover`    | `gray/50`  | `gray/50` |
| `button/primary/content/pressed`  | `gray/50`  | `gray/50` |
| `button/primary/content/disabled` | `gray/700` | `gray/500` |
| `button/primary/content/alert`    | `gray/50`  | `gray/50` |

---

### 2.7 Button — Secondary

#### Background

| Token | Light | Dark |
|---|---|---|
| `button/secondary/background/enabled`  | `transparent` | `transparent` |
| `button/secondary/background/hover`    | `gray/50`     | `gray/800` |
| `button/secondary/background/pressed`  | `gray/100`    | `gray/700` |
| `button/secondary/background/disabled` | `transparent` | `transparent` |
| `button/secondary/background/alert`    | `transparent` | `transparent` |

#### Content

| Token | Light | Dark |
|---|---|---|
| `button/secondary/content/enabled`  | `brand/secondary/main`   | `brand/secondary/main` |
| `button/secondary/content/hover`    | `brand/secondary/strong` | `brand/secondary/strong` |
| `button/secondary/content/pressed`  | `brand/secondary/bold`   | `brand/secondary/bold` |
| `button/secondary/content/disabled` | `gray/500`               | `gray/500` |
| `button/secondary/content/alert`    | `red/600`                | `red/400` |

#### Border

| Token | Light | Dark |
|---|---|---|
| `button/secondary/border/enabled`  | `gray/200`             | `gray/700` |
| `button/secondary/border/hover`    | `gray/300`             | `gray/600` |
| `button/secondary/border/pressed`  | `gray/400`             | `gray/500` |
| `button/secondary/border/disabled` | `gray/300`             | `gray/800` |
| `button/secondary/border/alert`    | `red/600`              | `red/400` |
| `button/secondary/border/focus`    | `brand/secondary/soft` | `brand/secondary/soft` |

---

### 2.8 Button — Ghost

#### Background

| Token | Light | Dark |
|---|---|---|
| `button/ghost/background/enabled`  | `transparent` | `transparent` |
| `button/ghost/background/hover`    | `gray/100`    | `gray/800` |
| `button/ghost/background/pressed`  | `gray/200`    | `gray/700` |
| `button/ghost/background/disabled` | `transparent` | `transparent` |
| `button/ghost/background/alert`    | `transparent` | `transparent` |

#### Content

| Token | Light | Dark |
|---|---|---|
| `button/ghost/content/enabled`  | `brand/secondary/main`   | `brand/secondary/main` |
| `button/ghost/content/hover`    | `brand/secondary/strong` | `brand/secondary/strong` |
| `button/ghost/content/pressed`  | `brand/secondary/bold`   | `brand/secondary/bold` |
| `button/ghost/content/disabled` | `gray/500`               | `gray/500` |
| `button/ghost/content/alert`    | `red/600`                | `red/400` |

---

### 2.9 Feedback

| Token | Light | Dark |
|---|---|---|
| `feedback/error/content`      | `red/600`    | `red/100` |
| `feedback/error/background`   | `red/100`    | `red/900` |
| `feedback/error/border`       | `red/300`    | `red/600` |
| `feedback/success/content`    | `green/600`  | `green/200` |
| `feedback/success/background` | `green/100`  | `green/900` |
| `feedback/success/border`     | `green/300`  | `green/600` |
| `feedback/warning/content`    | `yellow/800` | `yellow/200` |
| `feedback/warning/background` | `yellow/100` | `yellow/900` |
| `feedback/warning/border`     | `yellow/300` | `yellow/600` |
| `feedback/info/content`       | `iblue/700`  | `iblue/200` |
| `feedback/info/background`    | `iblue/100`  | `iblue/900` |
| `feedback/info/border`        | `iblue/300`  | `iblue/600` |

---

### 2.10 Accent

| Token | Light | Dark |
|---|---|---|
| `accent/pink/content`      | `pink/600`   | `pink/100` |
| `accent/pink/background`   | `pink/100`   | `pink/900` |
| `accent/purple/content`    | `purple/600` | `purple/100` |
| `accent/purple/background` | `purple/100` | `purple/900` |
| `accent/blue/content`      | `iblue/700`  | `iblue/200` |
| `accent/blue/background`   | `iblue/100`  | `iblue/900` |
| `accent/green/content`     | `green/600`  | `green/200` |
| `accent/green/background`  | `green/100`  | `green/900` |
| `accent/yellow/content`    | `yellow/800` | `yellow/200` |
| `accent/yellow/background` | `yellow/100` | `yellow/900` |

---

## 3. Text Styles

Fonte: **Instrument Sans**

### Display

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Display/L` | 112px | Medium | 100% | -4% |
| `Display/M` | 96px  | Medium | 100% | -4% |
| `Display/S` | 72px  | Medium | 100% | -4% |

### Heading

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Heading/H1` | 56px | Medium   | 120% | -4% |
| `Heading/H2` | 48px | Medium   | 120% | -4% |
| `Heading/H3` | 40px | SemiBold | 120% | -4% |
| `Heading/H4` | 32px | SemiBold | 120% | -4% |
| `Heading/H5` | 24px | SemiBold | 120% | -4% |
| `Heading/H6` | 20px | SemiBold | 140% | -2% |

### Body

| Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Body/x-large/bold`     | 18px | Bold     | 150% | -2% |
| `Body/x-large/semibold` | 18px | SemiBold | 150% | -2% |
| `Body/x-large/medium`   | 18px | Medium   | 150% | -2% |
| `Body/x-large/regular`  | 18px | Regular  | 150% | -2% |
| `Body/large/bold`       | 16px | Bold     | 150% | -2% |
| `Body/large/semibold`   | 16px | SemiBold | 150% | -2% |
| `Body/large/medium`     | 16px | Medium   | 150% | -2% |
| `Body/large/regular`    | 16px | Regular  | 150% | -2% |
| `Body/medium/bold`      | 14px | Bold     | 150% | -2% |
| `Body/medium/semibold`  | 14px | SemiBold | 150% | -2% |
| `Body/medium/medium`    | 14px | Medium   | 150% | -2% |
| `Body/medium/regular`   | 14px | Regular  | 150% | -2% |
| `Body/small/bold`       | 12px | Bold     | 150% | -2% |
| `Body/small/semibold`   | 12px | SemiBold | 150% | -2% |
| `Body/small/medium`     | 12px | Medium   | 150% | -2% |
| `Body/small/regular`    | 12px | Regular  | 150% | -2% |
