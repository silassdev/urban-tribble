import axios from 'axios'

type GeoResult = {
    ip?: string
    country?: string
    countryCode?: string
    region?: string
    city?: string
}

const provider = (process.env.GEOIP_PROVIDER || 'ipapi').toLowerCase()
const ipinfoToken = process.env.IPINFO_TOKEN || ''
const cacheTTL = Number(process.env.GEOIP_CACHE_TTL || 86400) * 1000

// Simple in-memory cache (ip -> { ts, data })
const cache: Record<string, { ts: number; data: GeoResult }> = {}

export async function lookupIp(ip?: string): Promise<GeoResult | null> {
    if (!ip) return null

    // Normalize IPv6 localhost etc
    const cleanIp = String(ip).split(',')[0].trim()

    // Skip local/private IPs
    if (cleanIp === '::1' || cleanIp.startsWith('127.') || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.')) {
        return null
    }

    const now = Date.now()
    const cached = cache[cleanIp]
    if (cached && (now - cached.ts) < cacheTTL) return cached.data

    try {
        let res
        if (provider === 'ipinfo') {
            if (!ipinfoToken) {
                console.warn('IPINFO_TOKEN not provided, falling back to ipapi')
                res = await axios.get(`https://ipapi.co/${cleanIp}/json/`, { timeout: 5000 })
            } else {
                res = await axios.get(`https://ipinfo.io/${cleanIp}/json?token=${ipinfoToken}`, { timeout: 5000 })
            }
        } else {
            // Default to ipapi
            res = await axios.get(`https://ipapi.co/${cleanIp}/json/`, { timeout: 5000 })
        }

        const data = res.data
        const result: GeoResult = {
            ip: cleanIp,
            country: data.country_name || data.country || 'Unknown',
            countryCode: data.country_code || data.countryCode || '',
            region: data.region || data.regionName || '',
            city: data.city || ''
        }

        cache[cleanIp] = { ts: now, data: result }
        return result
    } catch (err) {
        console.error('Geo-IP lookup failed:', err)
        return null
    }
}
