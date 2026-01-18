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

const cache: Record<string, { ts: number; data: GeoResult }> = {}

export async function lookupIp(ip?: string): Promise<GeoResult | null> {
    if (!ip) return null
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
        if (provider === 'ipinfo' && ipinfoToken) {
            res = await axios.get(`https://ipinfo.io/${cleanIp}/json?token=${ipinfoToken}`, { timeout: 5000 })
        } else if (provider === 'ip-api') {
            res = await axios.get(`http://ip-api.com/json/${cleanIp}`, { timeout: 5000 })
        } else {
            // Default to ipapi.co
            res = await axios.get(`https://ipapi.co/${cleanIp}/json/`, { timeout: 5000 })
        }

        const data = res.data

        // Handle different data structures from different providers
        const result: GeoResult = {
            ip: cleanIp,
            country: data.country_name || data.country || 'Unknown',
            countryCode: data.country_code || data.countryCode || '',
            region: data.region || data.regionName || '',
            city: data.city || ''
        }

        // Final fallback to ip-api.com if first choice failed to give country
        if (result.country === 'Unknown' && provider !== 'ip-api') {
            const fallbackRes = await axios.get(`http://ip-api.com/json/${cleanIp}`, { timeout: 3000 })
            if (fallbackRes.data && fallbackRes.data.status === 'success') {
                result.country = fallbackRes.data.country
                result.countryCode = fallbackRes.data.countryCode
                result.region = fallbackRes.data.regionName
                result.city = fallbackRes.data.city
            }
        }

        cache[cleanIp] = { ts: now, data: result }
        return result
    } catch (err) {
        console.error('Geo-IP lookup failed:', err)
        return null
    }
}
