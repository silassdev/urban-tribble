/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}"
    ],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' }
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
                marquee: 'marquee 18s linear infinite',
                floatLR: 'floatLR 6s ease-in-out infinite',
                floatRL: 'floatRL 6s ease-in-out infinite'
            }
        }
    },
    plugins: []
}
