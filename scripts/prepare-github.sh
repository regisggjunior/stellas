#!/bin/bash

echo "🚀 Preparando projeto Instituto Stellas para GitHub..."

# Criar diretório docs se não existir
mkdir -p docs

# Mover documentações para pasta docs
if [ -f "DEPLOY_VPS_HOSTINGER.md" ]; then
    mv DEPLOY_VPS_HOSTINGER.md docs/
    echo "✅ Movido DEPLOY_VPS_HOSTINGER.md para docs/"
fi

if [ -f "MIGRATE_TO_NEXTJS.md" ]; then
    mv MIGRATE_TO_NEXTJS.md docs/
    echo "✅ Movido MIGRATE_TO_NEXTJS.md para docs/"
fi

# Criar arquivo de configuração do GitHub
mkdir -p .github/workflows

# Criar template para GitHub Actions
cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run check
    
    - name: Build
      run: npm run build
      
    - name: Test (if tests exist)
      run: npm test --if-present

  build-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build production
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: production-build
        path: dist/
EOF

echo "✅ Criado workflow do GitHub Actions"

# Criar template de issues
mkdir -p .github/ISSUE_TEMPLATE

cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug Report
about: Criar um relatório de bug
title: '[BUG] '
labels: 'bug'
assignees: ''
---

## 🐛 Descrição do Bug
Uma descrição clara e concisa do que o bug é.

## 🔄 Passos para Reproduzir
1. Vá para '...'
2. Clique em '....'
3. Role para baixo até '....'
4. Veja o erro

## ✅ Comportamento Esperado
Uma descrição clara e concisa do que você esperava que acontecesse.

## 📱 Screenshots
Se aplicável, adicione screenshots para ajudar a explicar seu problema.

## 🖥️ Informações do Ambiente
 - OS: [ex: iOS]
 - Browser [ex: chrome, safari]
 - Versão [ex: 22]

## 📄 Contexto Adicional
Adicione qualquer outro contexto sobre o problema aqui.
EOF

cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature Request
about: Sugerir uma nova funcionalidade
title: '[FEATURE] '
labels: 'enhancement'
assignees: ''
---

## 🚀 Descrição da Funcionalidade
Uma descrição clara e concisa da funcionalidade que você gostaria.

## 💡 Motivação
Por que esta funcionalidade seria útil? Que problema ela resolve?

## 📋 Solução Proposta
Uma descrição clara e concisa do que você quer que aconteça.

## 🔄 Alternativas Consideradas
Uma descrição clara e concisa de quaisquer soluções ou funcionalidades alternativas que você considerou.

## 📄 Contexto Adicional
Adicione qualquer outro contexto ou screenshots sobre a solicitação de funcionalidade aqui.
EOF

echo "✅ Criados templates de issues"

# Criar arquivo de segurança
cat > SECURITY.md << 'EOF'
# Política de Segurança

## Versões Suportadas

Atualmente suportamos a seguinte versão com atualizações de segurança:

| Versão | Suportada          |
| ------ | ------------------ |
| 1.0.x  | :white_check_mark: |

## Reportando uma Vulnerabilidade

Se você descobrir uma vulnerabilidade de segurança, por favor:

1. **NÃO** abra uma issue pública
2. Envie um email para: institutostellas@gmail.com
3. Inclua:
   - Descrição da vulnerabilidade
   - Passos para reproduzir
   - Possível impacto
   - Sugestões de correção (se houver)

Responderemos dentro de 48 horas e forneceremos uma linha do tempo para a correção.

## Práticas de Segurança

Este projeto implementa:
- Validação de entrada rigorosa
- Sanitização de dados
- Headers de segurança HTTP
- Ambiente de desenvolvimento isolado
- Secrets management adequado
EOF

echo "✅ Criado arquivo de segurança"

# Criar arquivo de changelog
cat > CHANGELOG.md << 'EOF'
# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-08-15

### Adicionado
- Landing page completa do Instituto Stellas
- Sistema de contato com envio de emails via SendGrid
- Design responsivo com cores oficiais da marca
- Formulário de contato com validação completa
- Auto-resposta personalizada para diferentes tipos de solicitação
- Números de emergência para casos de ajuda
- Seções: Hero, Sobre, Missão, Impacto, Contato, Footer
- Documentação completa para deploy em VPS
- Guia de migração para Next.js
- Configuração para desenvolvimento local
- Assets oficiais do Instituto Stellas

### Tecnologias
- React 18 + TypeScript
- Express.js para backend
- Tailwind CSS para estilização
- Drizzle ORM para banco de dados
- SendGrid para envio de emails
- Replit para desenvolvimento

### Segurança
- Validação client-side e server-side
- Sanitização de dados de entrada
- Headers de segurança HTTP
- Variables de ambiente protegidas
EOF

echo "✅ Criado changelog"

# Verificar se git está inicializado
if [ ! -d ".git" ]; then
    echo "🔧 Inicializando repositório Git..."
    git init
    git branch -M main
else
    echo "✅ Repositório Git já inicializado"
fi

# Criar arquivo de instruções finais
cat > GITHUB_SETUP.md << 'EOF'
# 🚀 Setup do GitHub - Instituto Stellas

## Passos para Upload

### 1. Criar Repositório no GitHub
1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nome: `instituto-stellas`
4. Descrição: `Landing page profissional para o Instituto Stellas - Do trauma à transformação`
5. Marque como Público
6. **NÃO** inicialize com README (já temos um)

### 2. Upload dos Arquivos

Execute os comandos abaixo no terminal do Replit:

```bash
# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: landing page completa do Instituto Stellas

- Sistema de contato com SendGrid
- Design responsivo com cores oficiais
- Documentação completa de deploy
- Formulários validados
- Auto-resposta personalizada"

# Conectar com o GitHub (substitua SEU_USUARIO pelo seu usuário)
git remote add origin https://github.com/SEU_USUARIO/instituto-stellas.git

# Fazer push
git push -u origin main
```

### 3. Configurar o Repositório

#### Configurações Recomendadas:
- **About**: "Landing page profissional para o Instituto Stellas, organização que apoia famílias afetadas pela violência de gênero"
- **Website**: URL do site quando deployado
- **Topics**: `instituto-stellas`, `react`, `typescript`, `landing-page`, `ong`, `feminicidio`

#### Proteger Branch Main:
1. Settings → Branches
2. Add rule para `main`
3. Require pull request reviews
4. Require status checks to pass

#### Configurar GitHub Pages (opcional):
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `docs`

### 4. Configurar Secrets (para CI/CD)

Se usar GitHub Actions:
1. Settings → Secrets and variables → Actions
2. Adicionar:
   - `SENDGRID_API_KEY`
   - `DATABASE_URL` (se usar banco)

### 5. Configurar Issues e PRs

Templates já criados em `.github/ISSUE_TEMPLATE/`

### 6. Documentação Adicional

Arquivos incluídos:
- `README.md` - Documentação principal
- `CONTRIBUTING.md` - Guia de contribuição
- `LICENSE` - Licença MIT
- `SECURITY.md` - Política de segurança
- `CHANGELOG.md` - Log de mudanças
- `docs/` - Documentações técnicas

## 🎯 Próximos Passos

1. ✅ Upload para GitHub
2. ⚙️ Configurar CI/CD (opcional)
3. 🚀 Deploy em produção
4. 📱 Testar em diferentes dispositivos
5. 📊 Configurar analytics (opcional)
6. 🔍 SEO e otimizações
7. 🌟 Compartilhar com a comunidade

## 📞 Suporte

- Issues do GitHub para bugs e features
- Email: institutostellas@gmail.com
- Documentação completa em `/docs`
EOF

echo "✅ Criado guia de setup do GitHub"

echo ""
echo "🎉 Projeto preparado para GitHub!"
echo ""
echo "📁 Arquivos criados:"
echo "  ├── README.md (documentação principal)"
echo "  ├── LICENSE (licença MIT)"
echo "  ├── .gitignore (arquivos ignorados)"
echo "  ├── .env.example (exemplo de configuração)"
echo "  ├── CONTRIBUTING.md (guia de contribuição)"
echo "  ├── SECURITY.md (política de segurança)"
echo "  ├── CHANGELOG.md (log de mudanças)"
echo "  ├── GITHUB_SETUP.md (instruções de upload)"
echo "  ├── .github/workflows/ci.yml (CI/CD)"
echo "  ├── .github/ISSUE_TEMPLATE/ (templates)"
echo "  └── docs/ (documentações técnicas)"
echo ""
echo "📖 Próximo passo: Siga as instruções em GITHUB_SETUP.md"
echo ""
EOF

chmod +x scripts/prepare-github.sh

# Executar o script
./scripts/prepare-github.sh