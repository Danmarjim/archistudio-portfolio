import { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy | MP_archistudio',
  description: 'Informativa sul trattamento dei dati personali ai sensi del GDPR – Reg. UE 2016/679.',
}

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            Ultimo aggiornamento: giugno 2026
          </p>

          <div className="mt-12 space-y-10 text-neutral-700 leading-relaxed">

            {/* 1 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                1. Titolare del trattamento
              </h2>
              <p>
                Il Titolare del trattamento dei dati personali è:
              </p>
              <address className="not-italic mt-3 pl-4 border-l-2 border-primary-200 space-y-1">
                <p className="font-medium text-foreground">Martina Chiara Maria Pozzi</p>
                <p>MP_archistudio – Studio di Architettura e Interior Design</p>
                <p>Via Bologna 2, 24128 Bergamo (BG) – Italia</p>
                <p>P.IVA IT07788400963</p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:martina_pozzi_17@hotmail.com"
                    className="text-primary-600 hover:underline"
                  >
                    martina_pozzi_17@hotmail.com
                  </a>
                </p>
              </address>
            </section>

            {/* 2 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                2. Dati personali raccolti
              </h2>
              <p>
                Attraverso il presente sito web possono essere raccolti i seguenti dati personali:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>
                  <strong>Dati di navigazione</strong> – indirizzo IP, tipo di browser, pagine visitate, data e ora di accesso, raccolti automaticamente dai sistemi informatici del sito.
                </li>
                <li>
                  <strong>Dati forniti volontariamente</strong> – nome, indirizzo email, numero di telefono e qualsiasi altra informazione inserita nel modulo di contatto.
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                3. Finalità e base giuridica del trattamento
              </h2>
              <p>I dati personali sono trattati per le seguenti finalità:</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium text-foreground">a) Risposta alle richieste di contatto</p>
                  <p className="mt-1 text-sm">
                    Base giuridica: esecuzione di misure precontrattuali su richiesta dell'interessato (art. 6, par. 1, lett. b) GDPR).
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">b) Adempimento di obblighi legali</p>
                  <p className="mt-1 text-sm">
                    Base giuridica: adempimento di un obbligo legale (art. 6, par. 1, lett. c) GDPR).
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">c) Miglioramento del sito (dati di navigazione aggregati e anonimi)</p>
                  <p className="mt-1 text-sm">
                    Base giuridica: legittimo interesse del Titolare (art. 6, par. 1, lett. f) GDPR).
                  </p>
                </div>
              </div>
            </section>

            {/* 4 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                4. Modalità del trattamento e conservazione
              </h2>
              <p>
                I dati sono trattati con strumenti informatici e telematici, adottando misure di sicurezza adeguate a prevenire perdita, accesso non autorizzato, modifica e divulgazione non consentita.
              </p>
              <p className="mt-3">
                I dati forniti tramite il modulo di contatto sono conservati per il tempo strettamente necessario a evadere la richiesta e, in ogni caso, non oltre <strong>24 mesi</strong> dalla raccolta, salvo obblighi di legge che impongano una conservazione più lunga.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                5. Comunicazione e diffusione dei dati
              </h2>
              <p>
                I dati personali non sono diffusi a terzi non autorizzati. Possono essere comunicati a:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Fornitori di servizi tecnici (hosting, email) che operano come Responsabili del trattamento ai sensi dell'art. 28 GDPR.</li>
                <li>Autorità competenti, qualora richiesto dalla legge.</li>
              </ul>
              <p className="mt-3">
                Il sito è ospitato su <strong>Vercel Inc.</strong> (San Francisco, CA, USA). Vercel adotta misure di sicurezza conformi al GDPR e ai meccanismi di trasferimento previsti dalla normativa europea.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                6. Diritti dell'interessato
              </h2>
              <p>
                Ai sensi degli artt. 15–22 del GDPR, l'interessato ha il diritto di:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>accedere ai propri dati personali;</li>
                <li>richiederne la rettifica o la cancellazione;</li>
                <li>opporsi al trattamento o richiederne la limitazione;</li>
                <li>richiedere la portabilità dei dati;</li>
                <li>revocare il consenso in qualsiasi momento, senza pregiudizio per la liceità del trattamento precedente alla revoca;</li>
                <li>proporre reclamo all'<strong>Autorità Garante per la protezione dei dati personali</strong> (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.garanteprivacy.it</a>).</li>
              </ul>
              <p className="mt-4">
                Per esercitare i propri diritti, l'interessato può scrivere a:{' '}
                <a
                  href="mailto:martina_pozzi_17@hotmail.com"
                  className="text-primary-600 hover:underline"
                >
                  martina_pozzi_17@hotmail.com
                </a>
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                7. Cookie
              </h2>
              <p>
                Il sito utilizza esclusivamente <strong>cookie tecnici</strong> indispensabili al funzionamento delle pagine (es. preferenze di lingua). Non vengono utilizzati cookie di profilazione o di tracciamento a fini pubblicitari.
              </p>
              <p className="mt-3">
                L'utente può configurare il proprio browser per rifiutare i cookie; in tal caso alcune funzionalità del sito potrebbero non essere disponibili.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-4">
                8. Modifiche alla presente informativa
              </h2>
              <p>
                Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con l'indicazione della data di aggiornamento. Si invita a consultare periodicamente questa pagina.
              </p>
            </section>

          </div>
        </div>
      </Container>
    </div>
  )
}
