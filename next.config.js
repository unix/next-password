const withTM = require('next-transpile-modules')(['@geist-ui/core'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],

  env: {
    VERSION: require('./package.json').version,
  },
}

module.exports = withTM(withBundleAnalyzer(nextConfig))
