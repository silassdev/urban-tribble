import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../app/model/Admin'

const MONGODB_URI = process.env.MONGODB_URI

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI as string)
        console.log('✅ Connected to MongoDB')

        const existing = await Admin.findOne({ email: 'silas@allpilar.xyz' })
        if (existing) {
            console.log('⚠️  Admin user already exists')
            console.log('Email:', existing.email)
            process.exit(0)
        }

        const password = '@McCoy$2024'
        const passwordHash = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
            name: 'Silas',
            email: 'silas@allpilar.xyz',
            passwordHash
        })

        console.log('✅ Admin user created successfully!')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('📧 Email:', admin.email)
        console.log('🔑 Password:', password)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━')

        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding admin:', error)
        process.exit(1)
    }
}

seedAdmin()
