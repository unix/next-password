const withTM = require('next-transpile-modules')(['@geist-ui/core'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],

  env: {
    VERSION: require('./package.json').version,
    // IGNORE_PASSWORD: !process.env.VERCEL_ENV,
  },

  rewrites: [
    {
      source: '/missing',
      permanent: true,
      destination: 'https://github.com/unix/next-password/wiki/Missing-password',
    },
  ],
}

module.exports = withTM(withBundleAnalyzer(nextConfig))
