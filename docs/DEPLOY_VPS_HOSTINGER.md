# 🚀 Guia Completo de Deploy no VPS Linux Hostinger

## 📋 Pré-requisitos

### No seu VPS Hostinger:
- Ubuntu 20.04+ ou CentOS 7+
- Acesso root ou sudo
- Domínio apontado para o IP do VPS
- Mínimo 1GB RAM (recomendado 2GB+)

### Informações necessárias:
- IP do servidor
- Usuário e senha do VPS
- Domínio configurado (ex: institutostellas.com.br)
- Chave SendGrid (SENDGRID_API_KEY)

---

## 🔧 Passo 1: Preparação do Servidor

### 1.1 Conectar ao VPS via SSH
```bash
ssh root@SEU_IP_DO_VPS
# ou
ssh usuario@SEU_IP_DO_VPS
```

### 1.2 Atualizar o sistema
```bash
sudo apt update && sudo apt upgrade -y
# ou no CentOS:
# sudo yum update -y
```

### 1.3 Instalar dependências básicas
```bash
# Ubuntu/Debian
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx ufw

# CentOS/RHEL
# sudo yum install -y curl wget git nginx certbot python3-certbot-nginx firewalld
```

---

## 📦 Passo 2: Instalar Node.js e PM2

### 2.1 Instalar Node.js (versão 18+)
```bash
# Baixar e instalar Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

### 2.2 Instalar PM2 (gerenciador de processos)
```bash
sudo npm install -g pm2
```

---

## 🗂️ Passo 3: Preparar o Projeto

### 3.1 Baixar o projeto do Replit
No Replit, execute:
```bash
# Gerar arquivo para download
zip -r instituto-stellas.zip . -x "node_modules/*" ".git/*" "dist/*"
```

Baixe o arquivo e envie para o servidor usando SCP:
```bash
# Do seu computador:
scp instituto-stellas.zip root@SEU_IP:/home/
```

### 3.2 Extrair e configurar no servidor
```bash
cd /home
unzip instituto-stellas.zip -d instituto-stellas
cd instituto-stellas
```

### 3.3 Instalar dependências
```bash
npm install
```

### 3.4 Configurar variáveis de ambiente
```bash
# Criar arquivo de ambiente
nano .env
```

Adicionar no arquivo `.env`:
```env
NODE_ENV=production
PORT=3000
SENDGRID_API_KEY=sua_chave_sendgrid_aqui
DATABASE_URL=postgresql://usuario:senha@localhost:5432/instituto_stellas
```

---

## 🗄️ Passo 4: Configurar PostgreSQL (Opcional)

Se quiser usar banco de dados real (recomendado):

### 4.1 Instalar PostgreSQL
```bash
# Ubuntu
sudo apt install -y postgresql postgresql-contrib

# CentOS
# sudo yum install -y postgresql-server postgresql-contrib
# sudo postgresql-setup initdb
```

### 4.2 Configurar banco
```bash
sudo -u postgres psql

-- No console do PostgreSQL:
CREATE DATABASE instituto_stellas;
CREATE USER stellas_user WITH PASSWORD 'senha_forte_aqui';
GRANT ALL PRIVILEGES ON DATABASE instituto_stellas TO stellas_user;
\q
```

### 4.3 Executar migrações
```bash
cd /home/instituto-stellas
npm run db:push
```

---

## 🏗️ Passo 5: Build e Deploy

### 5.1 Fazer build do projeto
```bash
npm run build
```

### 5.2 Testar localmente
```bash
npm start
```

### 5.3 Configurar PM2
Criar arquivo `ecosystem.config.js`:
```bash
nano ecosystem.config.js
```

Conteúdo do arquivo:
```javascript
module.exports = {
  apps: [{
    name: 'instituto-stellas',
    script: 'dist/index.js',
    cwd: '/home/instituto-stellas',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    env_file: '.env',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### 5.4 Criar diretório de logs
```bash
mkdir -p logs
```

### 5.5 Iniciar com PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🌐 Passo 6: Configurar Nginx

### 6.1 Criar configuração do site
```bash
sudo nano /etc/nginx/sites-available/instituto-stellas
```

Conteúdo do arquivo:
```nginx
server {
    listen 80;
    server_name institutostellas.com.br www.institutostellas.com.br;

    # Redirect all HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name institutostellas.com.br www.institutostellas.com.br;

    # SSL certificates (will be configured by certbot)
    ssl_certificate /etc/letsencrypt/live/institutostellas.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/institutostellas.com.br/privkey.pem;

    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Main proxy to Node.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 6.2 Ativar o site
```bash
sudo ln -s /etc/nginx/sites-available/instituto-stellas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 Passo 7: Configurar SSL com Let's Encrypt

### 7.1 Obter certificado SSL
```bash
sudo certbot --nginx -d institutostellas.com.br -d www.institutostellas.com.br
```

### 7.2 Configurar renovação automática
```bash
sudo crontab -e
```

Adicionar linha:
```bash
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔥 Passo 8: Configurar Firewall

### 8.1 Configurar UFW (Ubuntu)
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

### 8.2 Configurar FirewallD (CentOS)
```bash
# sudo systemctl start firewalld
# sudo systemctl enable firewalld
# sudo firewall-cmd --permanent --add-service=http
# sudo firewall-cmd --permanent --add-service=https
# sudo firewall-cmd --permanent --add-service=ssh
# sudo firewall-cmd --reload
```

---

## 📊 Passo 9: Monitoramento e Logs

### 9.1 Verificar status da aplicação
```bash
pm2 status
pm2 logs instituto-stellas
```

### 9.2 Configurar rotação de logs
```bash
sudo nano /etc/logrotate.d/instituto-stellas
```

Conteúdo:
```
/home/instituto-stellas/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 9.3 Monitoramento básico
```bash
# Instalar htop para monitoramento
sudo apt install htop

# Verificar uso de recursos
htop
df -h
free -h
```

---

## 🔄 Passo 10: Scripts de Atualização

### 10.1 Criar script de deploy
```bash
nano deploy.sh
chmod +x deploy.sh
```

Conteúdo do `deploy.sh`:
```bash
#!/bin/bash

echo "🚀 Iniciando deploy do Instituto Stellas..."

# Backup atual
echo "📦 Fazendo backup..."
cp -r /home/instituto-stellas /home/instituto-stellas-backup-$(date +%Y%m%d-%H%M%S)

# Baixar nova versão
echo "📥 Baixando nova versão..."
cd /home
wget https://SEU_LINK_DO_PROJETO/instituto-stellas-latest.zip
unzip -o instituto-stellas-latest.zip -d instituto-stellas-new

# Preservar configurações
echo "⚙️  Preservando configurações..."
cp /home/instituto-stellas/.env /home/instituto-stellas-new/
cp /home/instituto-stellas/ecosystem.config.js /home/instituto-stellas-new/

# Instalar dependências
echo "📦 Instalando dependências..."
cd /home/instituto-stellas-new
npm install

# Build
echo "🏗️  Fazendo build..."
npm run build

# Parar aplicação atual
echo "⏸️  Parando aplicação..."
pm2 stop instituto-stellas

# Substituir arquivos
echo "🔄 Atualizando arquivos..."
rm -rf /home/instituto-stellas-old
mv /home/instituto-stellas /home/instituto-stellas-old
mv /home/instituto-stellas-new /home/instituto-stellas

# Iniciar nova versão
echo "▶️  Iniciando nova versão..."
cd /home/instituto-stellas
pm2 start ecosystem.config.js

echo "✅ Deploy concluído!"
echo "📊 Status: $(pm2 status)"
```

---

## 🆘 Troubleshooting

### Problemas comuns e soluções:

**1. Aplicação não inicia:**
```bash
pm2 logs instituto-stellas
# Verificar logs para erros específicos
```

**2. Nginx não consegue conectar:**
```bash
sudo nginx -t
sudo systemctl status nginx
# Verificar configuração e status
```

**3. SSL não funciona:**
```bash
sudo certbot renew --dry-run
# Testar renovação de certificado
```

**4. Banco de dados não conecta:**
```bash
sudo -u postgres psql -c "\l"
# Verificar se banco existe
```

**5. Aplicação consume muita memória:**
```bash
pm2 reload instituto-stellas
# Recarregar aplicação
```

### Comandos úteis:
```bash
# Ver logs em tempo real
pm2 logs instituto-stellas --lines 100

# Reiniciar aplicação
pm2 restart instituto-stellas

# Ver métricas
pm2 monit

# Parar aplicação
pm2 stop instituto-stellas

# Ver status do Nginx
sudo systemctl status nginx

# Recarregar Nginx
sudo systemctl reload nginx
```

---

## 📈 Otimizações de Performance

### 1. Cache do Nginx
Adicionar ao bloco `http` em `/etc/nginx/nginx.conf`:
```nginx
# Cache zone
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=app_cache:10m inactive=60m;
proxy_cache_key "$scheme$request_method$host$request_uri";
```

### 2. Compressão Gzip
Já incluída na configuração do Nginx acima.

### 3. PM2 Cluster Mode
Para servidores com múltiplos cores, editar `ecosystem.config.js`:
```javascript
instances: 'max', // ou número específico como 2
exec_mode: 'cluster'
```

---

## 🔐 Segurança Adicional

### 1. Fail2Ban
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

### 2. Backup automatizado
```bash
# Adicionar ao crontab
0 2 * * * /home/scripts/backup.sh
```

### 3. Atualizações automáticas de segurança
```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

---

## ✅ Checklist Final

- [ ] Servidor atualizado e configurado
- [ ] Node.js e PM2 instalados
- [ ] Projeto baixado e configurado
- [ ] Variáveis de ambiente definidas
- [ ] Banco de dados configurado (se necessário)
- [ ] Build realizado com sucesso
- [ ] PM2 rodando a aplicação
- [ ] Nginx configurado e ativo
- [ ] SSL configurado e funcionando
- [ ] Firewall configurado
- [ ] Domínio apontando corretamente
- [ ] Logs funcionando
- [ ] Backup configurado
- [ ] Scripts de deploy criados

**🎉 Projeto no ar! Acesse: https://institutostellas.com.br**

---

## 📞 Suporte

Se encontrar problemas:

1. Verificar logs: `pm2 logs instituto-stellas`
2. Verificar status: `pm2 status`
3. Verificar Nginx: `sudo nginx -t`
4. Verificar conectividade: `curl localhost:3000`

Para suporte da Hostinger: [help.hostinger.com.br](https://help.hostinger.com.br)