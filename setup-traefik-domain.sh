#!/bin/bash

# Instituto Stellas - Setup Traefik + Domain
# Domains: institutostellas.com.br + www.institutostellas.com.br

echo "🚛 INSTITUTO STELLAS - CONFIGURAÇÃO TRAEFIK + DOMÍNIO"
echo "===================================================="
echo ""
echo "🌐 Domínios configurados:"
echo "   • institutostellas.com.br (principal)"
echo "   • www.institutostellas.com.br (redirect para principal)"
echo ""

# Verificar se está no diretório correto
if [ ! -f "docker-compose.traefik.yml" ]; then
    echo "❌ Execute este script na pasta /var/www/stellas/landingpage/"
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down 2>/dev/null || true

# Parar Nginx se estiver rodando na porta 80/443
echo "🌐 Verificando conflitos de porta..."
if netstat -tlnp | grep -q ":80\|:443"; then
    echo "⚠️ Porta 80/443 em uso. Pode ser necessário parar o Nginx:"
    echo "   sudo systemctl stop nginx"
    read -p "Deseja continuar mesmo assim? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        echo "❌ Operação cancelada"
        exit 1
    fi
fi

# Criar rede traefik se não existir
echo "🌐 Criando rede traefik..."
docker network create traefik 2>/dev/null || echo "   ℹ️ Rede traefik já existe"

# Build da imagem Stellas
echo "🏗️ Building imagem Instituto Stellas..."
docker build -t stellas-nextjs . || {
    echo "❌ Erro no build da imagem"
    exit 1
}

# Subir Traefik + Stellas
echo "🚀 Subindo Traefik + Instituto Stellas..."
docker-compose -f docker-compose.traefik.yml up -d

# Aguardar inicialização
echo "⏳ Aguardando inicialização (60 segundos)..."
sleep 60

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose -f docker-compose.traefik.yml ps

# Verificar logs do Traefik
echo ""
echo "📝 Logs do Traefik (últimas 10 linhas):"
docker logs traefik --tail 10

# Verificar logs do Stellas
echo ""
echo "📝 Logs do Stellas (últimas 10 linhas):"
docker logs stellas-landingpage --tail 10

# Testar conectividade
echo ""
echo "🧪 Testes de conectividade:"

# Teste 1: Container interno
if docker exec stellas-landingpage wget -q --spider http://localhost:3000 2>/dev/null; then
    echo "   ✅ Container Stellas respondendo internamente"
else
    echo "   ❌ Container Stellas não responde internamente"
fi

# Teste 2: Traefik dashboard
if curl -s -I http://localhost:8081 | grep -q "200"; then
    echo "   ✅ Traefik dashboard acessível"
else
    echo "   ❌ Traefik dashboard não acessível"
fi

# Obter IP público
IP_ADDRESS=$(curl -s ipinfo.io/ip 2>/dev/null || echo "Não foi possível obter")

echo ""
echo "🎉 CONFIGURAÇÃO TRAEFIK CONCLUÍDA!"
echo ""
echo "🔗 ACESSOS:"
echo "   🌐 Site: https://institutostellas.com.br"
echo "   🌐 Site: https://www.institutostellas.com.br (redireciona)"
echo "   🚛 Traefik Dashboard: http://$IP_ADDRESS:8081"
echo "   📱 Direct: http://$IP_ADDRESS:3000 (container)"
echo ""
echo "📍 IP DO SERVIDOR: $IP_ADDRESS"
echo ""
echo "📋 CONFIGURAÇÃO DNS NECESSÁRIA:"
echo "   Tipo: A"
echo "   Nome: @ (ou institutostellas.com.br)"
echo "   Valor: $IP_ADDRESS"
echo "   TTL: 300"
echo ""
echo "   Tipo: CNAME"
echo "   Nome: www"
echo "   Valor: institutostellas.com.br"
echo "   TTL: 300"
echo ""
echo "🔒 SSL:"
echo "   ✅ Let's Encrypt automático via Traefik"
echo "   ✅ Renovação automática"
echo "   ✅ HTTPS redirect configurado"
echo ""
echo "📊 MONITORAMENTO:"
echo "   • Atualizar Uptime Kuma para: https://institutostellas.com.br"
echo "   • Adicionar monitor SSL certificate"
echo "   • Configurar alertas Telegram"
echo ""

# Salvar configuração
cat > /var/www/stellas/landingpage/.domain-config << EOF
DOMAINS=institutostellas.com.br,www.institutostellas.com.br
PROXY=traefik
SSL=letsencrypt
CONFIGURED_DATE=$(date)
IP_ADDRESS=$IP_ADDRESS
TRAEFIK_DASHBOARD=http://$IP_ADDRESS:8081
CONTAINER_NAME=stellas-landingpage
COMPOSE_FILE=docker-compose.traefik.yml
EOF

echo "💾 Configuração salva em: .domain-config"
echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo "   1. Configurar DNS do domínio"
echo "   2. Aguardar propagação DNS (até 24h)"
echo "   3. Testar https://institutostellas.com.br"
echo "   4. Atualizar Uptime Kuma"
echo "   5. Testar formulário EmailJS + Telegram"
echo ""