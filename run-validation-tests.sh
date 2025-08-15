#!/bin/bash

# Instituto Stellas - Validation Tests
echo "🧪 INSTITUTO STELLAS - TESTES DE VALIDAÇÃO"
echo "=========================================="
echo ""

DOMAIN="institutostellas.com.br"
WWW_DOMAIN="www.institutostellas.com.br"
IP_ADDRESS="31.97.245.115"

# Função para teste com retry
test_url() {
    local url=$1
    local description=$2
    local retries=3
    
    for i in $(seq 1 $retries); do
        if curl -s -f -m 10 "$url" > /dev/null 2>&1; then
            echo "   ✅ $description"
            return 0
        fi
        sleep 2
    done
    echo "   ❌ $description"
    return 1
}

# Teste 1: Next.js Local
echo "1. 🏠 Testando Next.js local (porta 5002)..."
if curl -s -I http://localhost:5002 | grep -q "200"; then
    echo "   ✅ Next.js desenvolvimento respondendo"
else
    echo "   ❌ Next.js desenvolvimento não responde"
fi

# Teste 2: Container se existir
echo ""
echo "2. 🐳 Testando container Docker..."
if docker ps | grep -q stellas-landingpage; then
    echo "   ✅ Container stellas-landingpage rodando"
    if docker exec stellas-landingpage wget -q --spider http://localhost:3000 2>/dev/null; then
        echo "   ✅ Container respondendo internamente"
    else
        echo "   ❌ Container não responde internamente"
    fi
else
    echo "   ℹ️ Container não está rodando (usando processo nativo)"
fi

# Teste 3: Traefik se existir
echo ""
echo "3. 🚛 Testando Traefik..."
if docker ps | grep -q traefik; then
    echo "   ✅ Traefik container rodando"
    if curl -s -I http://localhost:8081 | grep -q "200"; then
        echo "   ✅ Traefik dashboard acessível"
    else
        echo "   ❌ Traefik dashboard não acessível"
    fi
else
    echo "   ℹ️ Traefik não está rodando"
fi

# Teste 4: Nginx
echo ""
echo "4. 🌐 Testando Nginx..."
if systemctl is-active --quiet nginx 2>/dev/null; then
    echo "   ✅ Nginx service ativo"
else
    echo "   ℹ️ Nginx service não ativo"
fi

# Teste 5: Portas
echo ""
echo "5. 🔌 Testando portas..."
if netstat -tlnp | grep -q ":80"; then
    echo "   ✅ Porta 80 em uso"
else
    echo "   ⚠️ Porta 80 livre"
fi

if netstat -tlnp | grep -q ":443"; then
    echo "   ✅ Porta 443 em uso"
else
    echo "   ⚠️ Porta 443 livre"
fi

if netstat -tlnp | grep -q ":5002"; then
    echo "   ✅ Porta 5002 em uso (Next.js dev)"
else
    echo "   ❌ Porta 5002 livre"
fi

# Teste 6: DNS Resolution (simulado)
echo ""
echo "6. 🌐 Testando resolução DNS (simulado)..."
echo "   📍 IP do servidor: $IP_ADDRESS"
echo "   🌐 Domínio alvo: $DOMAIN"
echo "   🌐 Domínio www: $WWW_DOMAIN"

# Teste 7: Aplicação funcionando
echo ""
echo "7. 📱 Testando aplicação Next.js..."
if curl -s http://localhost:5002 | grep -q "Instituto Stellas"; then
    echo "   ✅ Conteúdo da aplicação carregando"
else
    echo "   ❌ Conteúdo da aplicação não encontrado"
fi

if curl -s http://localhost:5002 | grep -q "EmailJS"; then
    echo "   ✅ Sistema EmailJS detectado"
else
    echo "   ℹ️ Sistema EmailJS pode não estar ativo"
fi

# Teste 8: Telegram Bot
echo ""
echo "8. 📱 Testando Telegram Bot..."
if curl -s "https://api.telegram.org/bot8233407875:AAFerdG9skHwj9f7Yj8s2IUCgCS2g5Vnhzc/getMe" | grep -q '"ok":true'; then
    echo "   ✅ Telegram Bot acessível"
else
    echo "   ❌ Telegram Bot não acessível"
fi

# Teste 9: Uptime Kuma
echo ""
echo "9. 📊 Testando Uptime Kuma..."
if curl -s -I http://localhost:3001 | grep -q "200"; then
    echo "   ✅ Uptime Kuma acessível"
else
    echo "   ❌ Uptime Kuma não acessível"
fi

# Resumo
echo ""
echo "🎯 RESUMO DOS TESTES:"
echo "=============================="

# Verificações importantes
TESTS_PASSED=0
TESTS_TOTAL=6

# Test results
if curl -s -I http://localhost:5002 | grep -q "200"; then
    echo "✅ Next.js Local: FUNCIONANDO"
    ((TESTS_PASSED++))
else
    echo "❌ Next.js Local: FALHOU"
fi

if curl -s http://localhost:5002 | grep -q "Instituto Stellas"; then
    echo "✅ Conteúdo: CARREGANDO"
    ((TESTS_PASSED++))
else
    echo "❌ Conteúdo: FALHOU"
fi

if curl -s "https://api.telegram.org/bot8233407875:AAFerdG9skHwj9f7Yj8s2IUCgCS2g5Vnhzc/getMe" | grep -q '"ok":true'; then
    echo "✅ Telegram: FUNCIONANDO"
    ((TESTS_PASSED++))
else
    echo "❌ Telegram: FALHOU"
fi

if curl -s -I http://localhost:3001 | grep -q "200"; then
    echo "✅ Uptime Kuma: FUNCIONANDO"
    ((TESTS_PASSED++))
else
    echo "❌ Uptime Kuma: FALHOU"
fi

if netstat -tlnp | grep -q ":5002"; then
    echo "✅ Porta 5002: ATIVA"
    ((TESTS_PASSED++))
else
    echo "❌ Porta 5002: FALHOU"
fi

if systemctl is-active --quiet nginx 2>/dev/null || docker ps | grep -q traefik; then
    echo "✅ Proxy: CONFIGURADO"
    ((TESTS_PASSED++))
else
    echo "⚠️ Proxy: NÃO DETECTADO"
fi

echo ""
echo "📊 SCORE: $TESTS_PASSED/$TESTS_TOTAL testes passaram"

if [ $TESTS_PASSED -ge 4 ]; then
    echo "🎉 Sistema em boa condição para deploy do domínio!"
else
    echo "⚠️ Alguns problemas detectados. Verifique antes do deploy."
fi

echo ""
echo "📋 PRÓXIMOS PASSOS RECOMENDADOS:"
if [ $TESTS_PASSED -ge 4 ]; then
    echo "   1. ✅ Configurar DNS do domínio para $IP_ADDRESS"
    echo "   2. ✅ Executar setup do Traefik: ./setup-traefik-domain.sh"
    echo "   3. ✅ Atualizar Uptime Kuma com novo domínio"
    echo "   4. ✅ Testar formulário no domínio"
else
    echo "   1. 🔧 Corrigir problemas detectados"
    echo "   2. 🧪 Executar testes novamente"
    echo "   3. 🚀 Prosseguir com deploy após testes OK"
fi