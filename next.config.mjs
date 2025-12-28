/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static export for Vercel
    output: 'standalone',

    // Exclude projects folder from the build
    webpack: (config) => {
        config.watchOptions = {
            ignored: ['**/projects/**', '**/node_modules/**'],
        };
        return config;
    },
};

export default nextConfig;
