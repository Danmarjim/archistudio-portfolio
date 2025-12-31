'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Hammer, Sofa, CheckCircle2, MessageCircle, Pencil, HardHat, Key } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import { services } from '@/lib/constants'
import type { Service } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  hammer: Hammer,
  sofa: Sofa,
}

// Proceso de trabajo
const process = [
  {
    step: 1,
    icon: MessageCircle,
    title: 'Consulta inicial',
    description: 'Nos reunimos para conocer tus necesidades, expectativas y presupuesto. Escuchamos tu visión y aportamos ideas iniciales.',
  },
  {
    step: 2,
    icon: Pencil,
    title: 'Diseño y proyecto',
    description: 'Desarrollamos el anteproyecto con planos, renders y memoria. Iteramos contigo hasta lograr el diseño perfecto.',
  },
  {
    step: 3,
    icon: HardHat,
    title: 'Ejecución de obra',
    description: 'Coordinamos y supervisamos la construcción, gestionamos gremios y resolvemos imprevistos para cumplir plazos.',
  },
  {
    step: 4,
    icon: Key,
    title: 'Entrega final',
    description: 'Te entregamos el proyecto terminado con toda la documentación, garantías y nuestro compromiso de servicio postventa.',
  },
]

// FAQs
const faqs = [
  {
    question: '¿Cuánto cuesta un proyecto de arquitectura?',
    answer: 'El coste depende del tipo de proyecto, su complejidad y alcance. Tras una primera consulta gratuita, elaboramos un presupuesto detallado y sin compromiso adaptado a tus necesidades específicas.',
  },
  {
    question: '¿Cuánto tiempo lleva un proyecto completo?',
    answer: 'Los plazos varían según el proyecto. Una reforma integral puede llevar 3-6 meses, mientras que una vivienda unifamiliar puede requerir 12-18 meses desde el diseño hasta la entrega. Te proporcionamos un cronograma detallado desde el inicio.',
  },
  {
    question: '¿Trabajáis fuera de Madrid?',
    answer: 'Sí, trabajamos en toda España. Para proyectos fuera de Madrid, organizamos las visitas necesarias y coordinamos con equipos locales cuando es preciso.',
  },
  {
    question: '¿Gestionáis las licencias y permisos?',
    answer: 'Sí, nos encargamos de toda la tramitación administrativa: licencias de obra, permisos municipales, certificaciones energéticas y cualquier documentación necesaria.',
  },
]

interface ServiceDetailCardProps {
  service: Service
  index: number
}

function ServiceDetailCard({ service, index }: ServiceDetailCardProps) {
  const Icon = iconMap[service.icon] || Home
  const isReversed = index % 2 !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`grid items-center gap-12 lg:grid-cols-2 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <div className={isReversed ? 'lg:order-2' : ''}>
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
          <Icon className="h-8 w-8 text-primary-600" />
        </div>

        <h3 className="font-serif text-3xl font-medium text-foreground">
          {service.title}
        </h3>

        <p className="mt-4 text-lg text-neutral-600">
          {service.description}
        </p>

        <ul className="mt-8 space-y-4">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <span className="text-neutral-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual placeholder */}
      <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 ${isReversed ? 'lg:order-1' : ''}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-24 w-24 text-neutral-200" />
        </div>
      </div>
    </motion.div>
  )
}

export default function ServiciosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
              Servicios
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl">
              Ofrecemos soluciones integrales de arquitectura, desde el diseño inicial hasta
              la entrega de llaves. Cada proyecto recibe una atención personalizada y un
              compromiso total con la excelencia.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services Detail */}
      <section className="pb-24">
        <Container>
          <div className="space-y-24">
            {services.map((service, index) => (
              <ServiceDetailCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="bg-neutral-50 py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Cómo trabajamos
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Un proceso claro y transparente de principio a fin
            </p>
          </motion.div>

          <div className="relative mt-16">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-primary-100 lg:block" />

            <div className="grid gap-8 lg:grid-cols-4">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  {/* Step number */}
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg">
                    <step.icon className="h-7 w-7" />
                  </div>

                  <div className="mt-6">
                    <span className="text-sm font-medium text-primary-600">
                      Paso {step.step}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-neutral-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Resolvemos las dudas más comunes sobre nuestros servicios
            </p>
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-neutral-50 p-6"
              >
                <h3 className="font-serif text-lg font-medium text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-3 text-neutral-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-primary-600 px-8 py-16 text-center md:px-16"
          >
            <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">
              ¿Listo para empezar tu proyecto?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Cuéntanos tu idea y te ayudaremos a hacerla realidad.
              La primera consulta es gratuita y sin compromiso.
            </p>
            <div className="mt-8">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <Link href="/contacto">
                  Solicitar presupuesto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
