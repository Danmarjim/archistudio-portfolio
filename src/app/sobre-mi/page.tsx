'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Award, BookOpen, Briefcase, Heart } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'

// Datos de la trayectoria
const timeline = [
  {
    year: '2010',
    title: 'Graduación en Arquitectura',
    description: 'Escuela Técnica Superior de Arquitectura de Madrid (ETSAM)',
    type: 'education',
  },
  {
    year: '2010-2015',
    title: 'Arquitecta Junior',
    description: 'Estudio de arquitectura reconocido en Madrid, trabajando en proyectos residenciales y comerciales',
    type: 'work',
  },
  {
    year: '2015',
    title: 'Máster en Diseño Sostenible',
    description: 'Especialización en arquitectura bioclimática y materiales sostenibles',
    type: 'education',
  },
  {
    year: '2015-2020',
    title: 'Arquitecta Senior',
    description: 'Liderazgo de proyectos de gran envergadura con enfoque en sostenibilidad',
    type: 'work',
  },
  {
    year: '2020',
    title: 'Fundación del Estudio',
    description: 'Apertura del estudio propio con foco en arquitectura residencial y reformas',
    type: 'work',
  },
]

// Valores/filosofía
const values = [
  {
    icon: Heart,
    title: 'Diseño centrado en las personas',
    description: 'Cada proyecto comienza escuchando las necesidades, sueños y forma de vida de quienes habitarán el espacio.',
  },
  {
    icon: BookOpen,
    title: 'Respeto por el entorno',
    description: 'Integramos cada proyecto en su contexto, respetando el paisaje, la cultura local y los recursos disponibles.',
  },
  {
    icon: Award,
    title: 'Calidad sin concesiones',
    description: 'Desde el diseño hasta la construcción, cuidamos cada detalle para garantizar resultados excepcionales.',
  },
  {
    icon: Briefcase,
    title: 'Transparencia y cercanía',
    description: 'Mantenemos una comunicación constante y honesta durante todo el proceso del proyecto.',
  },
]

// Stats
const stats = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '50+', label: 'Proyectos realizados' },
  { value: '100%', label: 'Clientes satisfechos' },
  { value: '12', label: 'Premios recibidos' },
]

export default function SobreMiPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src="/images/about/placeholder.jpg"
                  alt="Foto de la arquitecta"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary-100" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-600">
                Sobre mí
              </p>

              <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
                Arquitectura con alma
              </h1>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600">
                <p>
                  Soy María García, arquitecta con más de 15 años de experiencia diseñando
                  espacios que transforman la vida de las personas. Mi pasión por la arquitectura
                  nació de la fascinación por cómo los espacios pueden influir en nuestras emociones
                  y comportamientos.
                </p>
                <p>
                  Mi enfoque combina funcionalidad, estética y sostenibilidad, buscando siempre
                  soluciones que respeten el entorno y respondan a las necesidades reales de cada
                  cliente. Creo firmemente que la buena arquitectura mejora la calidad de vida.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-4xl font-medium text-primary-600 md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
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
              Mi filosofía
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Cuatro principios que guían cada proyecto que emprendo
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-neutral-50 p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
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
              Trayectoria
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Un recorrido por mi formación y experiencia profesional
            </p>
          </motion.div>

          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-neutral-200 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary-600 md:left-1/2">
                    {item.type === 'education' ? (
                      <BookOpen className="h-3 w-3 text-white" />
                    ) : (
                      <Briefcase className="h-3 w-3 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-12 w-full md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <span className="text-sm font-medium text-primary-600">
                      {item.year}
                    </span>
                    <h3 className="mt-1 font-serif text-xl font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-neutral-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-primary-600 px-8 py-16 text-center md:px-16"
          >
            <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Me encantaría conocer tu idea y explorar juntos cómo hacerla realidad.
              Cada proyecto comienza con una conversación.
            </p>
            <div className="mt-8">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <Link href="/contacto">
                  Hablemos de tu proyecto
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
