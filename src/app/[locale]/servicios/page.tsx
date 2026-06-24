'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Video, Key, Paintbrush, CheckCircle2 } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import { services } from '@/lib/constants'
import type { Service } from '@/types'
import NavBand from '@/components/sections/NavBand'

const serviceImages: Record<string, string> = {
  archiadvice: '/images/services/archiadvice.jpg',
  'consulenza-acquisto': '/images/services/consulenza-acquisto.jpg',
  restyling: '/images/services/restyling.jpg',
  'progettazione-architettonica': '/images/services/progettazione.jpg',
}

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  video: Video,
  key: Key,
  paintbrush: Paintbrush,
}

const serviceQuestions: Record<string, string> = {
  archiadvice: 'Cerchi un consiglio rapido di un esperto?',
  'consulenza-acquisto': 'Vuoi comprare casa?',
  restyling: 'Aria di cambiamenti?',
  'progettazione-architettonica': 'Devi ristrutturare?',
}

const serviceLabels: Record<string, string> = {
  archiadvice: 'Adatto se:',
  'consulenza-acquisto': 'Adatto se:',
  restyling: 'Adatto se:',
  'progettazione-architettonica': 'Servizio chiavi in mano pensato per toglierti ogni preoccupazione',
}

const serviceNumbers: Record<string, number> = {
  archiadvice: 1,
  'consulenza-acquisto': 2,
  restyling: 3,
  'progettazione-architettonica': 4,
}

const ScrivimiButton = () => (
  <Link
    href="/contacto"
    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
  >
    Scrivimi
    <ArrowRight className="h-4 w-4" />
  </Link>
)

const PreventivoButton = () => (
  <Link
    href="/contacto"
    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
  >
    Scrivimi per ricevere il tuo preventivo gratuito
    <ArrowRight className="h-4 w-4" />
  </Link>
)

const serviceExtras: Record<string, React.ReactNode> = {
  archiadvice: (
    <a
      href="https://calendly.com/mp_archistudio"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
    >
      Prenota il tuo ArchiAdvice
      <ArrowRight className="h-4 w-4" />
    </a>
  ),
  'consulenza-acquisto': <ScrivimiButton />,
  restyling: <ScrivimiButton />,
  'progettazione-architettonica': (
    <a
      href="#come-lavoriamo"
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
    >
      Scopri come lavoriamo
      <ArrowRight className="h-4 w-4" />
    </a>
  ),
}

interface ServiceCardProps {
  service: Service
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Home
  const isReversed = index % 2 !== 0
  const question = serviceQuestions[service.slug]
  const number = serviceNumbers[service.slug]
  const extra = serviceExtras[service.slug]
  const label = serviceLabels[service.slug]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id={service.slug}
      className={`grid items-center gap-12 lg:grid-cols-2 scroll-mt-28`}
    >
      {/* Content */}
      <div className={isReversed ? 'lg:order-2' : ''}>
        {/* Number + Icon */}
        <div className="mb-4 flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
            {number}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        </div>

        <h3 className="font-serif text-3xl font-medium uppercase tracking-wide text-primary-600">
          {service.title}
        </h3>

        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
          {label}
        </p>

        <ul className="mt-3 space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <span className="text-neutral-600">{feature}</span>
            </li>
          ))}
        </ul>

        {extra}
      </div>

      {/* Visual */}
      <div className={`relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 ${isReversed ? 'lg:order-1' : ''}`}>
        {serviceImages[service.slug] ? (
          <Image
            src={serviceImages[service.slug]}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <Icon className="h-20 w-20 text-neutral-200" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ServiciosPage() {
  return (
    <>
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
              I miei servizi
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl">
              Dalla consulenza rapida al progetto chiavi in mano — scegli il servizio
              più adatto alla tua situazione.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services */}
      <section className="pb-24">
        <Container>
          <div className="space-y-28">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Stacco grafico */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            {/* Linea salmone top */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>

            {/* Testo */}
            <p className="font-serif text-2xl font-medium uppercase leading-tight text-foreground md:text-3xl">
              Non sai quale servizio fa per te?
            </p>

            {/* Bottone mail */}
            <a
              href="mailto:martina_pozzi_17@hotmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-700"
            >
              Raccontami cosa hai in mente e lo scopriremo assieme
              <ArrowRight className="h-4 w-4 flex-shrink-0" />
            </a>

            {/* Linea salmone bottom */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Come lavoriamo */}
      <section id="come-lavoriamo" className="scroll-mt-28 bg-neutral-50 py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Come lavoriamo?
            </h2>
            <p className="mt-2 text-lg font-semibold uppercase tracking-widest text-primary-600">
              Ecco gli step del servizio 360°
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-3xl space-y-0">

            {/* Step 1 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">1</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">Rilievo</h3>
                <p className="mt-3 text-neutral-600">
                  Realizzazione di rilievo geometrico e fotografico. Misuriamo ogni angolo del tuo spazio e dalla realtà lo digitalizziamo creando delle tavole 2D che sono la base per lavorare ad ogni step successivo. Se richiesto faremo Accesso agli Atti per la verifica di Conformità dello stato di fatto con lo stato legittimo.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">2</span>
              </div>
              <div className="pt-1 w-full">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">Progetto Architettonico e d'Interni</h3>

                <div className="mt-4 space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Progetto preliminare</p>
                    <p className="mt-2 text-neutral-600">Sviluppo di progetto di massima e layout distributivo con redazione di planimetrie arredate in cui i tuoi sogni cominciano a prendere forma.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Progetto definitivo</p>
                    <ul className="mt-2 space-y-2 text-neutral-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Condivisione della tavola <strong>LOOKS &amp; FEELS</strong>: ricerca grafica di riferimenti concreti ed ispirazioni emotive per definire lo stile dell'intervento.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Presentazione del <strong>MOODBOARD MATERIALI</strong> per la definizione dei colori e materiali che seguono lo stile del progetto.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Sviluppo e definizione della proposta vincente, con la produzione di elaborati grafici necessari alla comprensione degli spazi: planimetrie, prospetti arredati ed elaborati 3D, con indicazione dei modelli di mobili scelti e delle finiture interne previste.</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Progetto esecutivo</p>
                    <ul className="mt-2 space-y-2 text-neutral-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Sviluppo delle tavole di dettaglio ed elaborati grafici di progetto esecutivo, demolizioni, costruzioni ed impianti per la richiesta di preventivi e preparazione del dossier di cantiere.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Preparazione della lista d'acquisto degli arredi da catalogo.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Disegno di eventuali arredi su misura.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">3</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">Direzione Artistica</h3>
                <ul className="mt-3 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Computo Metrico Estimativo delle opere murarie.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Ricerca e gestione delle imprese.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Assistenza sulla scelta dei materiali e finiture, incluso richiesta di campioni e preparazione delle visite presso gli showroom.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Richiesta e coordinazione dei preventivi ai fornitori.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Visite in cantiere per il controllo degli aspetti estetici di esecuzione nel rispetto delle finiture previste in progetto.</span></li>
                </ul>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">4</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">Coordinamento Cantiere</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary-600">Direzione lavori</p>
                <ul className="mt-2 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Condivisione del cronoprogramma estimativo ed organizzazione delle fasi di cantiere.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Sopralluoghi, riunioni di cantiere e verifiche di rispondenza al progetto sotto gli aspetti tecnico/normativi ed amministrativi.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Revisione Contabilità e Liquidazione delle lavorazioni a misura — Stato Avanzamento Lavori (SAL).</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" /><span>Assistenza sulla gestione delle fatture per detrazioni ed informazioni per accedere ai bonus.</span></li>
                </ul>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="relative flex gap-6 pb-0">
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">5</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">Pratica Edilizia-Urbanistica</h3>
                <p className="mt-3 text-neutral-600">
                  Redazione elaborati grafici e relazioni tecniche asseverate. Interfaccia con la pubblica amministrazione e assunzione delle responsabilità civili e penali ai fini dell'ottenimento dei titoli abilitativi. Pratiche d'aggiornamento catastale e consegna e protocollazione della Fine Lavori.
                </p>
              </div>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <PreventivoButton />
          </motion.div>
        </Container>
      </section>

      {/* Stacco grafico bottom */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            {/* Linea salmone top */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>

            {/* Pill */}
            <div className="mb-6 inline-block rounded-full bg-[#F2B5A4] px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white">
              Hai già chi ti affianca in alcuni di questi punti?
            </div>

            {/* OTTIMO */}
            <p className="font-serif text-2xl font-medium italic text-primary-600 md:text-3xl">
              Ottimo!
            </p>

            {/* Testo principale */}
            <p className="mt-4 font-serif text-2xl font-medium uppercase leading-tight text-foreground md:text-3xl">
              Con me puoi scegliere di essere seguita anche solo in uno di questi step!
            </p>

            {/* Illustrazione */}
            <div className="mt-8 flex justify-center">
              <div className="relative h-40 w-40">
                <Image
                  src="/images/services/icona1.png"
                  alt="Illustrazione"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Linea salmone bottom */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pt-24 pb-4">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-primary-600 px-8 py-16 text-center md:px-16"
          >
            <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">
              Scrivimi senza impegno
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Raccontami il tuo progetto e ciò di cui hai bisogno.
              Ti contatterò entro 48h per fissare una chiamata e prepararti un preventivo su misura.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <Link href="/contacto">
                  Scrivimi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <a
                href="https://calendly.com/mp_archistudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-primary-600"
              >
                Prenota il tuo ArchiAdvice →
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
