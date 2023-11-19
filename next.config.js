/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['rrnukgzcqauvkouytmeq.supabase.co'],
    },
    experimental: {
      serverActions: true,
    },
  };
  
  module.exports = nextConfig;