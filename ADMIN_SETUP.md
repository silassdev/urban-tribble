# Admin System Setup Guide

## 🎯 What's Been Implemented

A complete admin system for AllPilar with:
- **Admin Authentication** with JWT tokens
- **Contact Management Dashboard** with filters and pagination
- **Analytics Dashboard** with doughnut charts showing geographic distribution
- **Email Notifications** when new contacts are submitted
- **Site View Tracking** for analytics
- **Mark as Resolved** functionality for contact management

## 📋 Prerequisites

- MongoDB running
- SMTP credentials for email notifications

## 🚀 Setup Instructions

### 1. Configure Environment Variables

Create or update `.env.local` with the following:

```env
# MongoDB Connection
MONGODB_URI=
JWT_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
ADMIN_EMAIL=

# Optional: Geo-IP Service (defaults to ipapi.co which is free)
GEOIP_PROVIDER=ipapi
# IPINFO_TOKEN=your-token-here  # Only if using ipinfo

# Optional: Public URL for email links
NEXT_PUBLIC_URL=http://localhost:3000
```

### 2. Seed Admin User

Run the seed script to create the default admin user:

```bash
npm run seed:admin
```

This will create an admin user with:
- **Email**: `admin@allpilar.com`
- **Password**: `password`


### 3. Start the Development Server

```bash
npm run dev
```

### 4. Access the Admin Dashboard

Navigate to: **http://localhost:3000/admin/login**

Login with the credentials from step 2.

## 📍 Admin Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Main admin dashboard |

## 🔌 API Endpoints

### Public Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/view` - Track site views

### Protected Admin Endpoints (Require JWT Token)

- `POST /api/admin/login` - Admin login (returns JWT)
- `GET /api/admin/contacts` - List contacts with pagination
- `GET /api/admin/contacts/[id]` - Get single contact
- `PATCH /api/admin/contacts/[id]/resolve` - Mark contact as resolved/unresolved
- `GET /api/admin/analytics` - Get analytics data

## 🎨 Features

### Dashboard Features

1. **Analytics Overview** - Shows:
   - Total contacts
   - Unresolved contacts
   - Total site views
   - Unique visitors
   - Geographic distribution chart (doughnut chart)

2. **Contact Table** with:
   - Search filter (searches email, subject, description, country)
   - Status filter (All, Resolved, Unresolved)
   - Pagination
   - View button to see full details
   - Resolve/Unresolve toggle

3. **Contact Modal** displays:
   - All contact information
   - Geo-location data
   - IP address and user agent
   - Ability to mark as resolved/unresolved

## 🗄️ Database Models

### Contact Model
- email (optional)
- preferredContact
- subject
- description
- ip
- userAgent
- anonymous (boolean)
- resolved (boolean)
- country (string)
- timestamps

### SiteView Model
- ip
- userAgent
- path
- country
- timestamps

### Admin Model
- name
- email (unique)
- passwordHash
- timestamps

## 🔐 Security Notes

1. **JWT Secret**: Always use a strong, random secret in production
2. **HTTPS**: Use HTTPS in production for admin routes
3. **Password**: Change the default admin password immediately
4. **IP Privacy**: Geo-location is derived automatically; you can disable storing full IPs if needed

## 🧪 Testing

1. **Test Contact Form**: Submit via your existing contact form
2. **Check Email**: Verify admin notification received
3. **Login**: Login to admin dashboard
4. **View Contacts**: Check if contact appears in table
5. **Test Filters**: Try search and status filters
6. **Mark Resolved**: Toggle resolved status
7. **View Analytics**: Check that charts display properly
