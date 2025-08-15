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
