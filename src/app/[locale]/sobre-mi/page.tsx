'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sun, Palette, Maximize2, Heart, BookOpen, Briefcase } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'

const values = [
  {
    icon: Sun,
    title: 'Luce',
    description: 'La linfa vitale di ogni stanza.',
  },
  {
    icon: Palette,
    title: 'Colore',
    description: 'Per creare spazi emozionali e vibranti.',
  },
  {
    icon: Maximize2,
    title: 'Spazio extra',
    description: 'Perché ogni cm conta e dare ad ogni oggetto il proprio contenitore permette di avere una casa ordinata e quindi più spaziosa.',
  },
  {
    icon: Heart,
    title: 'Empatia',
    description: 'Porto in Italia quel calore e quell\'energia appresi all\'estero, ma soprattutto la capacità di ascoltare.',
  },
]

const timeline = [
  {
    year: 'Formazione',
    date: '2011',
    title: 'Politecnico di Milano',
    description: 'Laurea in Architettura al Politecnico di Milano.',
    type: 'education',
  },
  {
    year: 'Siviglia',
    date: '2013',
    title: 'Studio Vázquez Consuegra',
    description: 'Prima esperienza internazionale nello studio Vázquez Consuegra a Siviglia.',
    type: 'work',
  },
  {
    year: 'Barcellona',
    date: '2017',
    title: 'Exe Arquitectura',
    description: 'Collaborazione con Exe Arquitectura a Barcellona.',
    type: 'work',
  },
  {
    year: 'Oggi',
    date: '2021',
    title: 'MP Archistudio',
    description: 'Studio con base a Bergamo e Siviglia, con progetti in Italia e all\'estero.',
    type: 'work',
  },
]

export default function SobreMiPage() {
  return (
    <>
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
                  src="/images/about/_K7A9382_1.jpg"
                  alt="Martina C.M. Pozzi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
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
                Chi sono
              </p>
              <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
                Architettura empatica
              </h1>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600">
                <p>
                  Credo fermamente che la buona architettura migliori la qualità della vita.
                </p>
                <p>
                  Scegliere l&apos;architetto giusto per la casa dei propri sogni significa trovare un buon professionista ma anche affidarsi a una persona che ti aiuterà in una fase decisionale importantissima.
                </p>
                <p>
                  Qualcuno che sappia ascoltarvi e accompagnarvi per mano in quel territorio inesplorato — e spesso stressante! — che è la ristrutturazione. E che vi guidi con occhio attento sui costi globali.
                </p>
                <p className="font-medium text-foreground">
                  Senza fiducia, non può nascere un grande progetto.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Bio Section */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Chi è Martina C.M. Pozzi?
            </h2>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>
                Sono un&apos;architetta con oltre 15 anni di esperienza nella progettazione di spazi che trasformano la vita delle persone.
              </p>
              <p>
                La mia passione per l&apos;architettura è nata dal fascino per il modo in cui gli spazi possono influenzare le nostre emozioni e i nostri comportamenti.
              </p>
              <p>
                Il mio approccio unisce funzionalità, estetica e sostenibilità, alla ricerca costante di soluzioni che rispettino l&apos;ambiente e rispondano alle reali esigenze di ogni cliente.
              </p>
              <p>
                Sono una persona solare, di quelle col &quot;sorriso a mille denti&quot;, capace di trovare il lato positivo in ogni sfida.
              </p>
              <p>
                La mia creatività è irrequieta: se non sto progettando interni, mi trovate a creare collage analogici con la firma{' '}
                <a
                  href="https://www.instagram.com/mp_collages/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 underline underline-offset-2 hover:text-primary-700"
                >
                  @mp_collages
                </a>
                .
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Timeline Section */}
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
              Il mio percorso
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Formata a Milano, cresciuta in Spagna. È lì che ho trovato la mia strada.
            </p>
          </motion.div>

          <div className="relative mt-16">
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
                  <div className="absolute left-4 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary-600 md:left-1/2">
                    {item.type === 'education' ? (
                      <BookOpen className="h-3 w-3 text-white" />
                    ) : (
                      <Briefcase className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`ml-12 w-full md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <span className="text-sm font-medium text-primary-600">{item.year}</span>
                    <h3 className="mt-1 font-serif text-xl font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-neutral-600">{item.description}</p>
                    <p className="mt-1 text-sm text-neutral-400">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-16 max-w-3xl rounded-2xl bg-primary-50 p-8 text-center"
          >
            <p className="text-lg leading-relaxed text-neutral-700">
              Tra Siviglia e Barcellona ho vissuto un decennio che ha cambiato il mio modo di vedere l&apos;architettura. Lì ho capito che la mia vera missione è la{' '}
              <span className="font-semibold text-primary-700">progettazione sartoriale d&apos;interni</span>.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Values Section */}
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
              Cosa porto nei miei progetti
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium uppercase tracking-wide text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
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
            <p className="text-sm font-medium uppercase tracking-widest text-primary-200">
              Studio con base a Bergamo 🇮🇹 e Siviglia 🇪🇸
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-white md:text-4xl">
              Hai un&apos;idea nel cassetto?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Scrivimi, mettiamoci alla prova e trasformiamola in realtà.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <a href="mailto:martina_pozzi_17@hotmail.com">
                  Scrivimi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
