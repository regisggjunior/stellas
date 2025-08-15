#!/bin/bash

# Instituto Stellas - Install Nginx Configuration
# Domains: institutostellas.com.br + www.institutostellas.com.br

echo "🌐 INSTITUTO STELLAS - INSTALANDO CONFIGURAÇÃO NGINX"
echo "==================================================="
echo ""
echo "📋 Domínios configurados:"
echo "   • institutostellas.com.br"
echo "   • www.institutostellas.com.br"
echo ""

# Copiar configuração para sites-available
echo "📂 Copiando configuração..."
cp /var/www/stellas/landingpage/nginx-stellas.conf /etc/nginx/sites-available/stellas

# Ativar site
echo "🔗 Ativando site..."
ln -sf /etc/nginx/sites-available/stellas /etc/nginx/sites-enabled/stellas

# Remover default se existir
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    rm /etc/nginx/sites-enabled/default
    echo "🗑️ Site default removido"
fi

# Testar configuração
echo "🧪 Testando configuração Nginx..."
if nginx -t; then
    echo "✅ Configuração válida"
    
    # Recarregar nginx
    echo "🔄 Recarregando Nginx..."
    systemctl reload nginx
    echo "✅ Nginx recarregado com sucesso"
    
    # Verificar status
    echo "📊 Status do Nginx:"
    systemctl status nginx --no-pager -l
    
else
    echo "❌ Erro na configuração Nginx"
    echo "📋 Verificando sintaxe:"
    nginx -t
    exit 1
fi

echo ""
echo "🎉 CONFIGURAÇÃO NGINX INSTALADA!"
echo ""
echo "🔗 DOMÍNIOS ATIVOS:"
echo "   🌐 http://institutostellas.com.br → https://institutostellas.com.br"
echo "   🌐 http://www.institutostellas.com.br → https://www.institutostellas.com.br"
echo ""
echo "📍 IP DO SERVIDOR: $(curl -s ipinfo.io/ip 2>/dev/null || echo 'Não foi possível obter')"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "   1. ✅ DNS: Configurar A record para $(curl -s ipinfo.io/ip 2>/dev/null)"
echo "   2. ✅ Cloudflare: Ativar proxy (nuvem laranja) para SSL"
echo "   3. ✅ Uptime Kuma: Atualizar monitors"
echo "   4. ✅ Testar: https://institutostellas.com.br"
echo ""

# Salvar informações
echo "DOMAINS=institutostellas.com.br,www.institutostellas.com.br" > /var/www/stellas/landingpage/.domain-config
echo "CONFIGURED_DATE=$(date)" >> /var/www/stellas/landingpage/.domain-config
echo "IP_ADDRESS=$(curl -s ipinfo.io/ip 2>/dev/null)" >> /var/www/stellas/landingpage/.domain-config
echo "NGINX_CONFIG=/etc/nginx/sites-available/stellas" >> /var/www/stellas/landingpage/.domain-config

echo "💾 Configuração salva em: /var/www/stellas/landingpage/.domain-config"