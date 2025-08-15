'use client'
import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import Image from 'next/image'

interface FormData {
  from_name: string
  from_email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // ⚙️ CONFIGURAÇÕES EMAILJS (SUAS CREDENCIAIS)
  const EMAILJS_CONFIG = {
    serviceId: 'service_85nf4uh',      // Seu Service ID
    templateId: 'template_3tjkfyv',    // Seu Template ID
    publicKey: 'rKcu7qGRGKuRu8HIs'     // Sua Public Key
  }

  // 📱 TELEGRAM CONFIG
  const TELEGRAM_CONFIG = {
    botToken: '8233407875:AAFerdG9skHwj9f7Yj8s2IUCgCS2g5Vnhzc',
    chatId: '1742104340'
  }

  // 📧 Função para enviar EMAIL
  const sendEmail = async (data: FormData & { date: string }) => {
    return await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      data as unknown as Record<string, unknown>,
      EMAILJS_CONFIG.publicKey
    )
  }

  // 📱 Função para enviar TELEGRAM
  const sendTelegram = async (data: FormData & { date: string }) => {
    const subjectEmoji = {
      'Busco ajuda': '🆘',
      'Quero apoiar': '🤝',
      'Parcerias': '🤝',
      'Informações gerais': 'ℹ️'
    }

    const telegramMessage = `
🏢 *NOVO CONTATO - Instituto Stellas*

👤 *Nome:* ${data.from_name}
📧 *Email:* ${data.from_email}
📱 *Telefone:* ${data.phone || 'Não informado'}
${subjectEmoji[data.subject as keyof typeof subjectEmoji] || '📝'} *Assunto:* ${data.subject}

📝 *Mensagem:*
${data.message}

🕒 *Data:* ${data.date}
🌐 *Origem:* Site Instituto Stellas
🔗 *URL:* http://31.97.245.115:5002
    `

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.chatId,
        text: telegramMessage,
        parse_mode: 'Markdown'
      })
    })

    if (!response.ok) {
      throw new Error('Erro ao enviar Telegram')
    }

    return response.json()
  }

  // 🚀 Função principal de envio (COMBO EmailJS + Telegram)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')

    try {
      // Preparar dados com timestamp (ISO para evitar hydration issues)
      const now = new Date()
      const dataWithDate = {
        ...formData,
        date: now.toISOString(),
        dateFormatted: `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      }

      // 🎯 ENVIAR SIMULTANEAMENTE: EmailJS + Telegram
      await Promise.all([
        sendEmail(dataWithDate),     // 📧 Email profissional
        sendTelegram(dataWithDate)   // 📱 Notificação instantânea
      ])

      setStatus('success')
      
      // Limpar formulário
      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
    } catch (error) {
      console.error('Erro ao enviar:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Opções de assunto
  const subjectOptions = [
    { value: '', label: 'Selecione um assunto', disabled: true },
    { value: 'Busco ajuda', label: '🆘 Busco ajuda' },
    { value: 'Quero apoiar', label: '❤️ Quero apoiar' },
    { value: 'Parcerias', label: '🤝 Parcerias' },
    { value: 'Informações gerais', label: 'ℹ️ Informações gerais' }
  ]

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Fale Conosco
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid de campos principais */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Nome Completo */}
          <div>
            <label htmlFor="from_name" className="block text-sm font-semibold text-gray-700 mb-2">
              👤 Nome Completo *
            </label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              placeholder="Seu nome completo"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="from_email" className="block text-sm font-semibold text-gray-700 mb-2">
              📧 Email *
            </label>
            <input
              type="email"
              id="from_email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Telefone (opcional) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              📱 Telefone <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              placeholder="(11) 99999-9999"
            />
          </div>

          {/* Assunto */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              📝 Assunto *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white"
            >
              {subjectOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mensagem */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            💬 Mensagem *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical hover:border-gray-400"
            placeholder={`Descreva como podemos ajudar você...

${formData.subject === 'Busco ajuda' ? 'Ex: Preciso de orientação sobre...' : ''}${formData.subject === 'Quero apoiar' ? 'Ex: Gostaria de contribuir com...' : ''}${formData.subject === 'Parcerias' ? 'Ex: Nossa empresa oferece...' : ''}${formData.subject === 'Informações gerais' ? 'Ex: Gostaria de saber mais sobre...' : ''}`}
          />
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-green-400 text-xl">✅</span>
              </div>
              <div className="ml-3">
                <p className="text-green-700 font-semibold">
                  Mensagem enviada com sucesso!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Responderemos em breve!
                </p>
              </div>
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400 text-xl">❌</span>
              </div>
              <div className="ml-3">
                <p className="text-red-700 font-semibold">
                  Erro ao enviar mensagem
                </p>
                <p className="text-red-600 text-sm mt-1">
                  Tente novamente ou entre em contato diretamente por email ou telefone.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.subject}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform ${
            isLoading || !formData.subject
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:ring-blue-200 shadow-lg'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando mensagem...
            </span>
          ) : !formData.subject ? (
            'Enviar Mensagem'
          ) : (
            <span className="flex items-center justify-center">
              Enviar Mensagem
            </span>
          )}
        </button>

        {/* Info adicional */}
        <div className="text-center text-sm text-gray-500">
          <p>Suas informações são protegidas e não serão compartilhadas.</p>
        </div>
      </form>

      {/* Contact Info Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">
            Ou entre em contato diretamente:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="mailto:institutostellas@gmail.com" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
              institutostellas@gmail.com
            </a>
            <a href="https://api.whatsapp.com/send?phone=5561982132588&text=Ol%C3%A1,%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 flex items-center gap-2 transition-colors">
              (61) 98213-2588
              <Image 
                src="/assets/whatsapp.png" 
                alt="WhatsApp" 
                width={16}
                height={16}
                className="w-4 h-4" 
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}