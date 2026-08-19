'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'

export default function TappetiPage() {
  const t = useTranslations('TappetiPage')

  return (
    <>
      {/* Hero */}
      <section className="pb-4 pt-16 md:pt-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-2xl font-semibold tracking-wide text-[#8B5C2A] md:text-3xl">
              {t('heroLine1')}<br />
              {t('heroLine2')}
            </h1>
          </motion.div>
        </Container>
      </section>

      {/* Video */}
      <section className="pb-10 pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto w-full px-6 md:max-w-[33vw] md:px-0"
        >
          <video
            src="/images/tappeti/tappeti-01.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full md:rounded-lg"
          />
        </motion.div>
      </section>

      {/* Riga 1: testo descrittivo + foto tappeti-02 */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-16">

            {/* Testo descrittivo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                {t('description1')}
              </p>
              <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                {t('description2')}
              </p>
              <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                {t('description3')}
              </p>
              <p className="mt-auto pt-6 text-right font-serif text-3xl font-light leading-tight text-[#8B5C2A] md:text-4xl">
                {t('videocallCta')}
              </p>
            </motion.div>

            {/* Foto tappeti-02 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/tappeti/tappeti-02.jpg"
                alt="Collezione Sevilla — dettaglio tappeto"
                width={800}
                height={1000}
                className="w-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Riga 2: foto tappeti-03 + scheda tecnica */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-16">

            {/* Foto tappeti-03 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/tappeti/tappeti-03 - copia.jpg"
                alt="Collezione Sevilla — tappeto"
                width={800}
                height={1000}
                className="w-full object-cover"
              />
            </motion.div>

            {/* Scheda tecnica + frase in basso */}
            <div className="flex flex-col">
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8"
              >
                <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#8B5C2A]">
                  Collezione Sevilla 2026/2027
                </h2>
                <dl className="flex flex-col gap-5">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-[#8B5C2A]">
                      {t('material')}
                    </dt>
                    <dd className="mt-1 text-base font-medium text-neutral-900">
                      {t('materialValue')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-[#8B5C2A]">
                      {t('producer')}
                    </dt>
                    <dd className="mt-1 text-base font-medium text-neutral-900">
                      {t('producerValue')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-[#8B5C2A]">
                      Design
                    </dt>
                    <dd className="mt-1 text-base font-medium text-neutral-900">
                      Martina Pozzi — MP_archistudio
                    </dd>
                  </div>
                </dl>
              </motion.aside>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-auto pt-8 font-serif text-3xl font-light leading-tight text-[#8B5C2A] md:text-4xl"
              >
                {t('tailoredText')}
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* Foto orizzontale tappeti-04 + descrizione modelli */}
      <section className="pb-16 md:pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/tappeti/tappeti-04.jpg"
                alt="Collezione Sevilla — vista d'insieme"
                width={1600}
                height={900}
                className="w-full object-cover"
              />
            </div>
            <p className="mt-8 font-serif text-2xl font-light leading-snug text-neutral-800 md:text-3xl">
              {t('modelsIntro')} <span className="font-medium">ARCHI, PETALÀ, JACARANDA, MANTÓN</span> e <span className="font-medium">FUNDICIÓN</span>.
            </p>
            <div className="mt-10 flex flex-col items-center gap-6 text-center">
              <p className="text-base font-medium uppercase tracking-widest text-[#8B5C2A] md:text-lg">
                {t('catalogCta')}
              </p>
              <Link
                href="/contacto"
                className="inline-block rounded-full bg-[#8B5C2A] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
              >
                {t('catalogButton')}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Foto orizzontale tappeti-05 */}
      <section className="pb-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/tappeti/tappeti-05.jpg"
              alt="Collezione Sevilla — tappeti-05"
              width={1600}
              height={900}
              className="w-full object-cover"
            />
          </motion.div>
        </Container>
      </section>

      {/* Foto tappeti-06 e tappeti-07 affiancate */}
      <section className="pb-20">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/tappeti/tappeti-06 - copia.jpg"
                alt="Collezione Sevilla — tappeti-06"
                width={800}
                height={1000}
                className="w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/tappeti/tappeti-07 - copia.jpg"
                alt="Collezione Sevilla — tappeti-07"
                width={800}
                height={1000}
                className="w-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

    </>
  )
}
