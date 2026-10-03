import type { Config } from 'tailwindcss'
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { accent: '#bcff2f', surface: '#171717' } } }, plugins: [] } satisfies Config
