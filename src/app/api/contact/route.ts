import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { siteConfig } from '@/lib/constants'

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  projectType?: string
  message?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  const name = payload.name?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const phone = payload.phone?.trim() ?? ''
  const projectType = payload.projectType?.trim() ?? ''
  const message = payload.message?.trim() ?? ''

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY non configurata: impossibile inviare il messaggio di contatto.')
    return NextResponse.json({ error: 'not_configured' }, { status: 500 })
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'MP_archistudio <onboarding@resend.dev>'

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Nuovo messaggio dal sito — ${name}`,
      html: `
        <h2>Nuovo messaggio dal form di contatto</h2>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefono:</strong> ${escapeHtml(phone)}</p>` : ''}
        ${projectType ? `<p><strong>Tipo di progetto:</strong> ${escapeHtml(projectType)}</p>` : ''}
        <p><strong>Messaggio:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'send_failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form send error:', err)
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}
