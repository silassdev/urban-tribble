import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export async function sendAdminNotification(subject: string, html: string) {
    const to = process.env.ADMIN_EMAIL
    if (!to) {
        console.warn('ADMIN_EMAIL not configured; skipping notification')
        return
    }

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html
    })
}