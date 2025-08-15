# Contribuindo para o Instituto Stellas

Obrigado por considerar contribuir para o projeto do Instituto Stellas! Este documento fornece diretrizes para contribuições.

## 🎯 Como Contribuir

### Reportando Bugs
1. Verifique se o bug já foi reportado nas Issues
2. Se não, crie uma nova Issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informações do ambiente

### Sugerindo Melhorias
1. Abra uma Issue com a tag "enhancement"
2. Descreva a melhoria proposta
3. Explique por que seria útil
4. Forneça exemplos de uso, se possível

### Contribuindo com Código

#### Configuração do Ambiente
```bash
# Clone do repositório
git clone https://github.com/SEU_USUARIO/instituto-stellas.git
cd instituto-stellas

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Executar em desenvolvimento
npm run dev
```

#### Processo de Desenvolvimento
1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
4. **Faça suas alterações** seguindo as diretrizes
5. **Teste** suas alterações
6. **Commit** com mensagens claras:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
7. **Push** para seu fork:
   ```bash
   git push origin feature/nome-da-feature
   ```
8. **Abra um Pull Request**

## 📋 Diretrizes de Código

### TypeScript
- Use TypeScript estrito
- Defina tipos explícitos
- Evite `any`, use `unknown` quando necessário
- Use interfaces para objetos complexos

### React
- Use componentes funcionais
- Implemente hooks customizados quando apropriado
- Mantenha componentes pequenos e focados
- Use nomenclatura descritiva

### Estilização
- Use Tailwind CSS classes
- Mantenha consistência com o design system
- Use as cores oficiais do Instituto Stellas
- Implemente responsividade mobile-first

### Estrutura de Arquivos
```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── hooks/         # Hooks customizados
├── lib/           # Utilitários e configurações
└── types/         # Definições de tipos
```

## 🎨 Padrões de Design

### Cores
- **Primária**: `#247B7F` (Stellas Teal)
- **Secundária**: `#F28A3A` (Stellas Orange)
- **Neutra**: `#F8F9FA` (Stellas Light)
- **Texto**: `#2D3748` (Stellas Dark)

### Componentes
- Use componentes do shadcn/ui quando possível
- Crie variações consistentes
- Implemente estados de loading e erro
- Adicione feedback visual para interações

## 📝 Mensagens de Commit

Use convenções semânticas:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação, espaços
- `refactor:` refatoração de código
- `test:` adição de testes
- `chore:` tarefas de manutenção

Exemplos:
```bash
feat: adiciona formulário de contato
fix: corrige validação de email
docs: atualiza README com instruções
style: ajusta espaçamento do header
refactor: simplifica componente Hero
test: adiciona testes para ContactForm
chore: atualiza dependências
```

## 🧪 Testes

### Executando Testes
```bash
npm run test        # Executar todos os testes
npm run test:watch  # Modo watch
npm run test:coverage # Coverage report
```

### Escrevendo Testes
- Teste componentes críticos
- Inclua testes de integração para formulários
- Teste cenários de erro
- Mantenha cobertura > 80%

## 📚 Documentação

### README
- Mantenha instruções atualizadas
- Inclua exemplos de uso
- Documente configurações necessárias

### Código
- Comente lógica complexa
- Use JSDoc para funções públicas
- Mantenha comentários atualizados

## 🔍 Review Process

### Critérios para Aprovação
- [ ] Código segue as diretrizes
- [ ] Funcionalidade testada
- [ ] Documentação atualizada
- [ ] Performance adequada
- [ ] Acessibilidade mantida
- [ ] Design consistente

### Checklist do Pull Request
- [ ] Título descritivo
- [ ] Descrição clara das mudanças
- [ ] Screenshots (se aplicável)
- [ ] Testes passando
- [ ] Conflitos resolvidos

## 🆘 Suporte

### Dúvidas sobre Contribuição
- Abra uma Issue com a tag "question"
- Consulte a documentação existente
- Entre em contato: institutostellas@gmail.com

### Comunidade
- Seja respeitoso e inclusivo
- Ajude outros contribuidores
- Compartilhe conhecimento

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

**Obrigado por contribuir com o Instituto Stellas!** 💜

Sua ajuda faz a diferença na vida de muitas famílias.