/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com"
            }
        ]
    },
    compiler: {
        removeConsole: false
    }
}

module.exports = nextConfig
