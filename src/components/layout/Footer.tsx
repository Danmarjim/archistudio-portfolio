'use client'

import { Link } from '@/i18n/navigation'
import { Instagram, Linkedin, Mail } from 'lucide-react'
import Container from '@/components/ui/Container'
import Logo from '@/components/shared/Logo'
import { siteConfig } from '@/lib/constants'

const PinterestIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
)

const LinktreeIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.511 5.853l4.005-4.117 2.117 2.057-4.12 4.002h5.734v2.912h-5.734l4.12 4.003-2.117 2.057-4.005-4.117v9.35h-3.022v-9.35l-4.004 4.117-2.118-2.057 4.12-4.003H3.753V8.795h5.734L5.367 3.793l2.118-2.057 4.004 4.117V.001h3.022v5.852z"/>
  </svg>
)

const HouzzIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
    {/* Forma "h" stile Houzz: colonna sinistra alta + tetto diagonale + porta centrale */}
    <polygon points="3,3 32,3 97,38 97,97 65,97 65,67 35,67 35,97 3,97" />
  </svg>
)

const SpaziBelliIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
    {/* Rettangolo alto a sinistra */}
    <rect x="3" y="3" width="21" height="55" />
    {/* Casa a destra: pentagono (corpo + tetto) */}
    <polygon points="38,58 38,25 67,3 96,25 96,58" />
    {/* Barra orizzontale in basso */}
    <rect x="3" y="70" width="94" height="27" />
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-3 md:gap-8">

          {/* Sinistra: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="font-serif text-lg text-neutral-700">
              Diamo forma e colore ai tuoi sogni
            </p>
          </div>

          {/* Centro: Social */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-5">
              {siteConfig.social.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 transition-colors hover:text-foreground"
                  aria-label={link.platform}
                >
                  {link.platform === 'instagram' && <Instagram className="h-5 w-5" />}
                  {link.platform === 'linkedin' && <Linkedin className="h-5 w-5" />}
                  {link.platform === 'pinterest' && <PinterestIcon />}
                  {link.platform === 'linktree' && <LinktreeIcon />}
                </a>
              ))}
              <a
                href="https://www.spazibelli.com/professionisti/arch-martina-pozzi-mp_archistudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-foreground"
                aria-label="Spazi Belli"
              >
                <SpaziBelliIcon />
              </a>
              <a
                href="https://www.houzz.it/pro/martina-pozzi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-foreground"
                aria-label="Houzz"
              >
                <HouzzIcon />
              </a>
            </div>
          </div>

          {/* Destra: Contatti */}
          <div className="flex flex-col gap-2 text-sm text-neutral-600 md:items-end">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
            <p>Via Bologna, 24128</p>
            <p>Bergamo (BG) Italia</p>
            <p>P.IVA IT07788400963</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-200 py-6">
          <p className="text-center text-sm text-neutral-500">
            &copy; {currentYear}{' '}
            <span className="font-medium text-neutral-700">Martina Chiara Maria Pozzi</span>
            {' '}|{' '}
            MP_archistudio. Tutti i diritti riservati.
            {' '}|{' '}
            <Link
              href="/privacy"
              className="underline transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
