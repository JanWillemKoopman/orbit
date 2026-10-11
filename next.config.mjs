/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // De productbeelden (/product) bevatten kleine schermtekst; 85 houdt die scherp.
  images: { qualities: [75, 85], formats: ['image/avif', 'image/webp'] },
}
export default nextConfig
