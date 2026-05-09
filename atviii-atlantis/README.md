# Atlantis - Sistema de Hospedagem

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 16 ou superior)
- [TypeScript](https://www.typescriptlang.org/) instalado globalmente

## Instalação do TypeScript (caso não tenha)

```bash
npm install -g typescript
```

## Passos para rodar o projeto

### 1. Instalar as dependências

Na pasta raiz do projeto (`atviii-atlantis`), execute:

```bash
npm install
```

### 2. Compilar o TypeScript

```bash
tsc
```

Isso irá compilar os arquivos `.ts` da pasta `src/ts/` e gerar os arquivos `.js` correspondentes.

### 3. Executar o projeto

```bash
node src/js/app/app.js
```

## Resumo (todos os comandos de uma vez)

```bash
npm install
tsc
node src/js/app/app.js
```
