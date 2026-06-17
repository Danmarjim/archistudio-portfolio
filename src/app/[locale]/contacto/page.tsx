'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram, Linkedin } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import { siteConfig } from '@/lib/constants'

type ProjectType = 'ristrutturazione' | 'interior' | 'restyling' | 'altro'

interface FormData {
  name: string
  email: string
  phone: string
  projectType: ProjectType
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const projectTypes = [
  { value: 'ristrutturazione', label: 'Ristrutturazione integrale' },
  { value: 'interior', label: 'Interior design' },
  { value: 'restyling', label: 'Restyling' },
  { value: 'altro', label: 'Altro tipo di progetto' },
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: '+39 327 126 7024',
    href: 'tel:+393271267024',
  },
  {
    icon: MapPin,
    label: 'Indirizzo',
    value: 'Via Bologna 2, 24128, Bergamo',
    href: 'https://maps.google.com/?q=Via+Bologna+2,+24128+Bergamo',
  },
]

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  )
}

function LinktreeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.511 5.853l4.005-4.117 2.117 2.057-4.12 4.002h5.734v2.912h-5.734l4.12 4.003-2.117 2.057-4.005-4.117v9.35h-3.022v-9.35l-4.004 4.117-2.118-2.057 4.12-4.003H3.753V8.795h5.734L5.367 3.793l2.118-2.057 4.004 4.117V.001h3.022v5.852z"/>
    </svg>
  )
}

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/mp_archistudio/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/martinachiaramariapozzi/', label: 'LinkedIn' },
  { icon: PinterestIcon, href: 'https://es.pinterest.com/MartinaCMPozzi/', label: 'Pinterest' },
  { icon: LinktreeIcon, href: 'https://linktr.ee/Arch.MartinaPozzi?utm_source=linktree_profile_share&ltsid=5ebb31cc-5a59-4cce-b0a5-d577b11e5c5a', label: 'Linktree' },
]

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: 'ristrutturazione',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio'
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email non è valida"
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            Contatto
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Hai un progetto in mente? Raccontami la tua idea e ti risponderò entro 24 ore.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {isSubmitted ? (
              <div className="rounded-2xl bg-green-50 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mt-6 font-serif text-2xl font-medium text-foreground">
                  Messaggio inviato!
                </h2>
                <p className="mt-3 text-neutral-600">
                  Grazie per avermi contattato. Ti risponderò al più presto.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      projectType: 'ristrutturazione',
                      message: '',
                    })
                  }}
                >
                  Invia un altro messaggio
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-foreground transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                        errors.name ? 'border-red-500' : 'border-neutral-200'
                      }`}
                      placeholder="Il tuo nome"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-foreground transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                        errors.email ? 'border-red-500' : 'border-neutral-200'
                      }`}
                      placeholder="tua@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Telefono */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground"
                    >
                      Telefono (opzionale)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-foreground transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      placeholder="+39 000 000 0000"
                    />
                  </div>

                  {/* Tipo di progetto */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-foreground"
                    >
                      Tipo di progetto
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-foreground transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Messaggio */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground"
                  >
                    Raccontami il tuo progetto *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-2 block w-full resize-none rounded-xl border bg-white px-4 py-3 text-foreground transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                      errors.message ? 'border-red-500' : 'border-neutral-200'
                    }`}
                    placeholder="Descrivi brevemente il tuo progetto, le tue esigenze e qualsiasi dettaglio che ritieni utile..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      Invia messaggio
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl bg-neutral-50 p-8">
              <h2 className="font-serif text-xl font-medium text-foreground">
                Informazioni di contatto
              </h2>

              <div className="mt-6 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <item.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{item.label}</p>
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-medium text-foreground transition-colors hover:text-primary-600"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 border-t border-neutral-200 pt-8">
                <p className="text-sm text-neutral-500">Seguimi sui social</p>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 border-t border-neutral-200 pt-8">
                <p className="text-sm text-neutral-500">Orari di disponibilità</p>
                <p className="mt-2 font-medium text-foreground">
                  Lunedì – Venerdì
                </p>
                <p className="text-neutral-600">9:00 – 18:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
