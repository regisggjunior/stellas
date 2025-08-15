# Instituto Stellas - Configuração Uptime Kuma

## 📊 ATUALIZAR MONITOR EXISTENTE

### 1. Monitor Principal
```
Acesse: http://31.97.245.115:3001
Login como admin

Encontre: "Instituto Stellas - Landing Page"
Clique em: Edit

ALTERAR:
URL: https://institutostellas.com.br
Nome: Instituto Stellas - Landing Page (HTTPS)
Heartbeat: 60 seconds
Max Redirects: 5
Accept Status Codes: 200-299
Follow Redirect: Yes
```

## 🔒 ADICIONAR MONITORES NOVOS

### 2. Monitor SSL Certificate
```
Monitor Type: HTTP(s) - Keyword
Friendly Name: Instituto Stellas - SSL Certificate  
URL: https://institutostellas.com.br
Keyword: Instituto Stellas
Heartbeat Interval: 6 hours
SSL Certificate Alert: 7 days before expiration
Max Retries: 3
Tags: stellas, ssl, certificate, https
```

### 3. Monitor WWW Redirect
```
Monitor Type: HTTP(s)
Friendly Name: Instituto Stellas - WWW Redirect
URL: https://www.institutostellas.com.br
Expected Status: 301 ou 302
Heartbeat: 2 hours
Max Redirects: 5
Follow Redirect: No (para testar só o redirect)
Tags: stellas, redirect, www
```

### 4. Monitor Formulário EmailJS
```
Monitor Type: HTTP(s) - Keyword
Friendly Name: Instituto Stellas - Formulário Contact
URL: https://institutostellas.com.br
Keyword: Fale Conosco
Heartbeat: 30 minutes
Tags: stellas, form, emailjs, contact
```

### 5. Monitor Performance
```
Monitor Type: HTTP(s) - Keyword
Friendly Name: Instituto Stellas - Performance Check
URL: https://institutostellas.com.br
Keyword: "Do trauma à transformação"
Heartbeat: 15 minutes
Timeout: 30 seconds
Tags: stellas, performance, speed
```

## 📱 NOTIFICAÇÕES TELEGRAM

### Configuração Telegram Notification
```
Notification Type: Telegram
Bot Token: 8233407875:AAFerdG9skHwj9f7Yj8s2IUCgCS2g5Vnhzc
Chat ID: 1742104340
Thread ID: (leave empty)

Message Template:
🚨 **INSTITUTO STELLAS ALERT**

**Service:** {monitorName}
**Status:** {status}
**URL:** {monitorURL}
**Time:** {localDateTime}

**Message:** {msg}

**Response Time:** {heartbeatTime}ms
**Monitor Type:** {monitorType}

---
Instituto Stellas Monitoring System
```

## 🏷️ TAGS RECOMENDADAS

```
Tags para organização:
- stellas (todos os monitors)
- https (monitors HTTPS)
- ssl (monitors SSL)
- form (monitors de formulário)
- redirect (monitors de redirect)
- performance (monitors de performance)
- critical (monitors críticos)
- production (ambiente produção)
```

## 🎯 ALERTAS CONFIGURADOS

### Cenários de Alerta:
1. **Site Offline:** > 2 minutos down
2. **SSL Expiring:** < 7 dias para expirar
3. **Performance:** > 5 segundos response time
4. **Redirect Broken:** WWW não redireciona
5. **Form Issues:** Formulário não carrega

### Notification Settings:
- **Telegram:** Todos os alertas
- **Frequency:** Immediate for critical, 10min for warnings
- **Auto-resolve:** Yes (quando volta ao normal)

## 📊 DASHBOARD FINAL

Monitors Ativos:
✅ Instituto Stellas - Landing Page (HTTPS)
✅ Instituto Stellas - SSL Certificate  
✅ Instituto Stellas - WWW Redirect
✅ Instituto Stellas - Formulário Contact
✅ Instituto Stellas - Performance Check

Status Page: Opcional (público)
URL: https://status.institutostellas.com.br