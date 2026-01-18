/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}"
    ],
    theme: {
        extend: {
            keyframes: {
                'banner-scroll-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                'banner-scroll-right': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                floatLR: {
                    '0%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(20px)' },
                    '100%': { transform: 'translateX(0)' }
                },
                floatRL: {
                    '0%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(-20px)' },
                    '100%': { transform: 'translateX(0)' }
                }
            },
            animation: {
                'banner-scroll-left': 'banner-scroll-left 25s linear infinite',
                'banner-scroll-right': 'banner-scroll-right 25s linear infinite',
                floatLR: 'floatLR 6s ease-in-out infinite',
                floatRL: 'floatRL 6s ease-in-out infinite'
            }
        }
    },
    plugins: []
}
