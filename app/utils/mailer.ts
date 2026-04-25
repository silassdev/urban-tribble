import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const port = Number(process.env.SMTP_PORT || 587)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export async function sendEmail(to: string, subject: string, html: string) {
    if (!to) {
        console.warn('Destination email not provided; skipping notification')
        return
    }

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html
    })
}

export async function sendAdminNotification(subject: string, html: string) {
    const to = process.env.ADMIN_EMAIL
    if (!to) {
        console.warn('ADMIN_EMAIL not configured; skipping notification')
        return
    }

    await sendEmail(to, subject, html)
}