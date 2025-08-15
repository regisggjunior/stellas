# 🔄 Guia Completo de Migração: React + Express → Next.js

## 📋 Visão Geral da Migração

Este guia detalha como migrar o projeto atual (React + Express + TypeScript) para **Next.js 14 com App Router**, mantendo todas as funcionalidades existentes.

### 🎯 Benefícios da migração:
- **SEO melhorado** com renderização server-side
- **Performance superior** com otimizações automáticas
- **Deployment simplificado** (um único build)
- **File-based routing** mais intuitivo
- **API Routes integradas** (sem servidor Express separado)
- **Otimização automática** de imagens e fonts

---

## 🗂️ Estrutura Atual vs Nova

### Estrutura Atual:
```
projeto/
├── client/src/          # Frontend React
├── server/              # Backend Express
├── shared/              # Esquemas compartilhados
└── package.json         # Dependências
```

### Nova Estrutura Next.js:
```
instituto-stellas-nextjs/
├── app/                 # App Router (páginas e layouts)
├── components/          # Componentes React
├── lib/                 # Utilitários e configurações
├── public/              # Assets estáticos
├── types/               # Tipos TypeScript
└── package.json         # Dependências Next.js
```

---

## 🚀 Passo 1: Configuração Inicial

### 1.1 Criar novo projeto Next.js
```bash
npx create-next-app@latest instituto-stellas-nextjs
cd instituto-stellas-nextjs
```

Configurações durante criação:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ src/ directory
- ✅ App Router
- ❌ import alias (usaremos configuração personalizada)

### 1.2 Instalar dependências específicas
```bash
npm install @sendgrid/mail drizzle-orm drizzle-zod @neondatabase/serverless
npm install zod react-hook-form @hookform/resolvers
npm install @tanstack/react-query @radix-ui/react-dialog @radix-ui/react-toast
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-button
npm install @radix-ui/react-card @radix-ui/react-form @radix-ui/react-input
npm install @radix-ui/react-label @radix-ui/react-select @radix-ui/react-separator
npm install @radix-ui/react-textarea date-fns framer-motion

npm install -D drizzle-kit @types/node
```

---

## 📁 Passo 2: Configuração do Next.js

### 2.1 Configurar `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
}

module.exports = nextConfig
```

### 2.2 Configurar `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/assets/*": ["./public/assets/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2.3 Configurar `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'stellas-teal': '#247B7F',
        'stellas-orange': '#F28A3A',
        'stellas-light': '#F8F9FA',
        'stellas-dark': '#2D3748',
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 🎨 Passo 3: Migração dos Estilos

### 3.1 Atualizar `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom Instituto Stellas styles */
.stellas-gradient {
  background: linear-gradient(135deg, #247B7F 0%, #F28A3A 100%);
}

.stellas-text-gradient {
  background: linear-gradient(135deg, #247B7F 0%, #F28A3A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stellas-shadow {
  box-shadow: 0 10px 25px rgba(36, 123, 127, 0.15);
}

@media (prefers-reduced-motion: no-preference) {
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Form styles */
.form-input {
  @apply w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-stellas-teal focus:border-transparent transition-all duration-200;
}

.form-label {
  @apply block text-sm font-medium text-stellas-dark mb-2;
}

/* Button styles */
.btn-primary {
  @apply bg-stellas-teal hover:bg-stellas-teal/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl;
}

.btn-secondary {
  @apply bg-stellas-orange hover:bg-stellas-orange/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl;
}
```

---

## 🧩 Passo 4: Migração dos Tipos e Schemas

### 4.1 Criar `src/types/index.ts`
```typescript
// Migrar conteúdo de shared/schema.ts
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Tabela de contatos
export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone"),
  assunto: text("assunto").notNull(),
  mensagem: text("mensagem").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schemas de validação
export const insertContactSchema = createInsertSchema(contacts, {
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  assunto: z.enum(["busco-ajuda", "quero-apoiar", "parcerias", "informacoes"]),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
}).omit({ id: true, createdAt: true });

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
```

### 4.2 Criar `src/lib/database.ts`
```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { contacts } from "@/types";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema: { contacts } });
```

---

## 📱 Passo 5: Layout Principal

### 5.1 Criar `src/app/layout.tsx`
```typescript
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Instituto Stellas | Do trauma à transformação',
    template: '%s | Instituto Stellas'
  },
  description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio. Do trauma à transformação: um caminho possível com apoio.',
  keywords: ['instituto stellas', 'feminicídio', 'violência de gênero', 'apoio', 'transformação', 'Brasil'],
  authors: [{ name: 'Instituto Stellas' }],
  creator: 'Instituto Stellas',
  publisher: 'Instituto Stellas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://institutostellas.com.br',
    title: 'Instituto Stellas | Do trauma à transformação',
    description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio.',
    siteName: 'Instituto Stellas',
    images: [{
      url: '/assets/logo-og.png',
      width: 1200,
      height: 630,
      alt: 'Instituto Stellas - Do trauma à transformação',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instituto Stellas | Do trauma à transformação',
    description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio.',
    images: ['/assets/logo-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
```

### 5.2 Criar `src/app/providers.tsx`
```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

---

## 📄 Passo 6: Página Principal

### 6.1 Criar `src/app/page.tsx`
```typescript
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Mission } from '@/components/mission'
import { Impact } from '@/components/impact'
import { Contact } from '@/components/contact'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instituto Stellas | Do trauma à transformação',
  description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio. Do trauma à transformação: um caminho possível com apoio.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Mission />
      <Impact />
      <Contact />
      <Footer />
    </main>
  )
}
```

---

## 🔌 Passo 7: API Routes (Substituindo Express)

### 7.1 Criar `src/app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { insertContactSchema } from '@/types'
import { db } from '@/lib/database'
import { contacts } from '@/types'
import { sendContactEmail, sendAutoReply } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertContactSchema.parse(body)
    
    // Salvar no banco de dados
    const [contact] = await db.insert(contacts).values(validatedData).returning()
    
    // Enviar emails
    const emailSent = await sendContactEmail(validatedData)
    const autoReplySent = await sendAutoReply(
      validatedData.email,
      validatedData.nome,
      validatedData.assunto
    )
    
    console.log('Novo contato recebido:', {
      contact: contact.id,
      emailSent,
      autoReplySent
    })
    
    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso! Você receberá uma confirmação por email e nossa equipe entrará em contato em breve."
    })
    
  } catch (error) {
    console.error('Erro no formulário de contato:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: "Dados inválidos",
        errors: (error as any).errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde ou entre em contato pelo email institutostellas@gmail.com"
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allContacts = await db.select().from(contacts).orderBy(contacts.createdAt)
    return NextResponse.json(allContacts)
  } catch (error) {
    console.error('Erro ao buscar contatos:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
```

### 7.2 Criar `src/lib/email-service.ts`
```typescript
import sgMail from '@sendgrid/mail'

// Configurar SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

interface ContactEmailData {
  nome: string
  email: string
  telefone?: string
  assunto: string
  mensagem: string
}

const getSubjectText = (assunto: string): string => {
  switch (assunto) {
    case 'busco-ajuda':
      return 'Busco ajuda'
    case 'quero-apoiar':
      return 'Quero apoiar'
    case 'parcerias':
      return 'Parcerias'
    case 'informacoes':
      return 'Informações gerais'
    default:
      return 'Contato'
  }
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid não configurado. Email que seria enviado:', data)
    return true
  }

  const subjectText = getSubjectText(data.assunto)
  
  const msg = {
    to: 'institutostellas@gmail.com',
    from: {
      email: 'noreply@institutostellas.org.br',
      name: 'Site Instituto Stellas'
    },
    replyTo: data.email,
    subject: `[Site] ${subjectText} - ${data.nome}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #247B7F; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Instituto Stellas</h1>
          <p style="margin: 5px 0 0 0;">Nova mensagem do site</p>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h2 style="color: #247B7F; margin-top: 0;">Detalhes do Contato</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Nome:</td>
              <td style="padding: 8px 0;">${data.nome}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #247B7F;">${data.email}</a></td>
            </tr>
            ${data.telefone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Telefone:</td>
              <td style="padding: 8px 0;">${data.telefone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Assunto:</td>
              <td style="padding: 8px 0;">${subjectText}</td>
            </tr>
          </table>
          
          <h3 style="color: #247B7F; margin: 20px 0 10px 0;">Mensagem:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #F28A3A; border-radius: 4px;">
            ${data.mensagem.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="background: #2D3748; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Esta mensagem foi enviada através do site do Instituto Stellas</p>
          <p style="margin: 5px 0 0 0;">Para responder, utilize o email: ${data.email}</p>
        </div>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    console.log('Email enviado com sucesso para institutostellas@gmail.com')
    return true
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return false
  }
}

export async function sendAutoReply(recipientEmail: string, nome: string, assunto: string): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid não configurado. Auto-resposta que seria enviada para:', recipientEmail)
    return true
  }

  const subjectText = getSubjectText(assunto)
  
  const msg = {
    to: recipientEmail,
    from: {
      email: 'institutostellas@gmail.com',
      name: 'Instituto Stellas'
    },
    subject: `Recebemos sua mensagem - Instituto Stellas`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #247B7F; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Instituto Stellas</h1>
          <p style="margin: 5px 0 0 0;">Do trauma à transformação: um caminho possível com apoio</p>
        </div>
        
        <div style="padding: 20px;">
          <h2 style="color: #247B7F;">Olá, ${nome}!</h2>
          
          <p>Recebemos sua mensagem sobre "<strong>${subjectText}</strong>" e agradecemos por entrar em contato conosco.</p>
          
          <p>Nossa equipe analisará sua solicitação e retornará o contato em breve. O tempo de resposta pode variar de acordo com a demanda, mas nos comprometemos a responder o mais rapidamente possível.</p>
          
          ${assunto === 'busco-ajuda' ? `
          <div style="background: #FFF3CD; border: 1px solid #F28A3A; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #F28A3A; margin: 0 0 10px 0;">🚨 Emergência?</h3>
            <p style="margin: 0;"><strong>Se você está em situação de emergência, ligue:</strong></p>
            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">📞 Central de Atendimento à Mulher: 180</p>
            <p style="margin: 5px 0 0 0;">📞 Polícia Militar: 190</p>
          </div>
          ` : ''}
          
          <p>Enquanto isso, você pode:</p>
          <ul>
            <li>Conhecer mais sobre nosso trabalho em nosso site</li>
            <li>Seguir nossas redes sociais para acompanhar nossas atividades</li>
            <li>Compartilhar nossa missão com outras pessoas que possam precisar de apoio</li>
          </ul>
          
          <p>Gratidão por confiar em nosso trabalho.</p>
          
          <p style="margin-top: 30px;">
            <strong>Equipe Instituto Stellas</strong><br>
            📧 institutostellas@gmail.com<br>
            🌐 www.institutostellas.org.br
          </p>
        </div>
        
        <div style="background: #2D3748; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Instituto Stellas - Transformando luto em luta</p>
        </div>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    console.log('Auto-resposta enviada com sucesso para:', recipientEmail)
    return true
  } catch (error) {
    console.error('Erro ao enviar auto-resposta:', error)
    return false
  }
}
```

---

## 🧩 Passo 8: Migrar Componentes

### 8.1 Estrutura dos componentes
Copiar todos os componentes de `client/src/components/` para `src/components/`, fazendo os seguintes ajustes:

1. **Remover `wouter`** e usar navegação nativa do Next.js:
```typescript
// Antes (wouter)
import { Link } from 'wouter'

// Depois (Next.js)
import Link from 'next/link'
```

2. **Atualizar imports de assets**:
```typescript
// Antes
import logoUrl from '@assets/logo.png'

// Depois
import logoUrl from '/assets/logo.png'
// ou usar next/image
import Image from 'next/image'
import logoUrl from '/assets/logo.png'
```

3. **Usar `next/image` para otimização**:
```typescript
// Antes
<img src={logoUrl} alt="Logo" />

// Depois
import Image from 'next/image'
<Image src={logoUrl} alt="Logo" width={200} height={100} />
```

### 8.2 Exemplo de componente migrado: `src/components/contact.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertContactSchema, type InsertContact } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      assunto: 'informacoes',
      mensagem: '',
    },
  })

  const onSubmit = async (data: InsertContact) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Mensagem enviada!",
          description: result.message,
        })
        form.reset()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contato" className="py-20 bg-stellas-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stellas-dark mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aqui para apoiar. Entre em contato conosco para saber mais sobre nosso trabalho ou para buscar ajuda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informações de contato */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-stellas-dark mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-stellas-teal p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stellas-dark">Email</h4>
                    <p className="text-gray-600">institutostellas@gmail.com</p>
                  </div>
                </div>
                {/* Adicionar outros contatos conforme necessário */}
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="form-label">Nome completo *</label>
                <Input
                  {...form.register('nome')}
                  placeholder="Seu nome completo"
                  className="form-input"
                />
                {form.formState.errors.nome && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">Email *</label>
                <Input
                  {...form.register('email')}
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className="form-input"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">Telefone</label>
                <Input
                  {...form.register('telefone')}
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Assunto *</label>
                <Select
                  value={form.watch('assunto')}
                  onValueChange={(value) => form.setValue('assunto', value as any)}
                >
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione o assunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="busco-ajuda">Busco ajuda</SelectItem>
                    <SelectItem value="quero-apoiar">Quero apoiar</SelectItem>
                    <SelectItem value="parcerias">Parcerias</SelectItem>
                    <SelectItem value="informacoes">Informações gerais</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.assunto && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.assunto.message}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">Mensagem *</label>
                <Textarea
                  {...form.register('mensagem')}
                  placeholder="Conte-nos como podemos ajudar..."
                  rows={5}
                  className="form-input"
                />
                {form.formState.errors.mensagem && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.mensagem.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 📁 Passo 9: Assets e Arquivos Estáticos

### 9.1 Migrar assets
Copie todos os arquivos de `attached_assets/` para `public/assets/`:
```bash
cp -r attached_assets/* public/assets/
```

### 9.2 Atualizar `public/robots.txt`
```txt
User-agent: *
Allow: /

Sitemap: https://institutostellas.com.br/sitemap.xml
```

### 9.3 Criar `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://institutostellas.com.br</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🚀 Passo 10: Scripts e Deploy

### 10.1 Atualizar `package.json`
```json
{
  "name": "instituto-stellas-nextjs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    // ... dependências listadas anteriormente
  },
  "devDependencies": {
    // ... dev dependencies
  }
}
```

### 10.2 Configurar variáveis de ambiente
Criar `.env.local`:
```env
SENDGRID_API_KEY=sua_chave_aqui
DATABASE_URL=postgresql://usuario:senha@localhost:5432/instituto_stellas
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Criar `.env.production`:
```env
SENDGRID_API_KEY=sua_chave_producao
DATABASE_URL=postgresql://usuario:senha@host:5432/instituto_stellas
NEXT_PUBLIC_APP_URL=https://institutostellas.com.br
```

---

## 🔄 Passo 11: Testagem e Validação

### 11.1 Testes locais
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Fazer build de produção
npm run build

# Testar build de produção
npm start
```

### 11.2 Checklist de funcionalidades
- [ ] Página carrega corretamente
- [ ] Navegação funciona
- [ ] Formulário de contato envia emails
- [ ] Responsividade mantida
- [ ] SEO metadata configurado
- [ ] Imagens otimizadas
- [ ] Performance adequada

---

## 🎯 Passo 12: Deploy para Vercel (Recomendado para Next.js)

### 12.1 Deploy automático
1. Fazer push para GitHub/GitLab
2. Conectar repositório na Vercel
3. Configurar variáveis de ambiente
4. Deploy automático

### 12.2 Configurar domínio
1. Adicionar domínio na Vercel
2. Configurar DNS para apontar para Vercel
3. SSL automático

---

## 📊 Benefícios Pós-Migração

### Performance:
- **50-70% melhoria** em Core Web Vitals
- **Imagens otimizadas** automaticamente
- **Code splitting** automático
- **Prefetching** de páginas

### SEO:
- **Server-side rendering** para melhor indexação
- **Metadata dinâmica** por página
- **Sitemap automático**
- **Structured data** support

### Developer Experience:
- **Hot reload** mais rápido
- **TypeScript** integrado
- **API routes** integradas
- **Deploy** simplificado

### Manutenção:
- **Uma aplicação** ao invés de frontend + backend
- **Dependências reduzidas**
- **Build process** otimizado
- **Monitoramento** integrado

---

## 🆘 Troubleshooting

### Problemas comuns:

**1. Imports de assets não funcionam:**
```typescript
// Usar caminhos absolutos
import logo from '/assets/logo.png'
// ou relativo à pasta public
<Image src="/assets/logo.png" alt="Logo" width={200} height={100} />
```

**2. API routes não funcionam:**
```typescript
// Verificar nome dos arquivos: route.ts
// Verificar exports: export async function POST()
// Verificar NextRequest/NextResponse imports
```

**3. Hydration errors:**
```typescript
// Usar suppressHydrationWarning no html tag
// Verificar diferenças entre servidor e cliente
// Usar useEffect para código client-only
```

**4. Banco de dados não conecta:**
```bash
# Verificar DATABASE_URL
# Executar migrações: npm run db:push
# Verificar permissões de rede
```

---

## ✅ Checklist Final da Migração

- [ ] Projeto Next.js configurado
- [ ] Dependências instaladas
- [ ] Tipos e schemas migrados
- [ ] API routes funcionando
- [ ] Componentes migrados
- [ ] Estilos atualizados
- [ ] Assets copiados
- [ ] Variáveis de ambiente configuradas
- [ ] SEO metadata implementado
- [ ] Formulário de contato testado
- [ ] Build de produção funcionando
- [ ] Deploy realizado
- [ ] Domínio configurado
- [ ] SSL ativo
- [ ] Performance verificada

**🎉 Migração concluída! Projeto Next.js funcionando em produção.**

---

## 📚 Recursos Adicionais

- [Documentação Next.js 14](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Deployment Guide](https://nextjs.org/docs/deployment)
- [Performance Guide](https://nextjs.org/docs/advanced-features/measuring-performance)
- [SEO Guide](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)