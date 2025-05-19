module.exports = {
  builds: [
    {
      src: 'package.json',
      use: '@vercel/next',
      config: {
        installCommand: 'pnpm install --frozen-lockfile=false',
        buildCommand: './vercel-build.sh',
        nodeVersion: '18.20.3',
        skipAutoInstall: false,
        devCommand: 'pnpm dev',
      }
    }
  ],
  env: {
    NODEJS_VERSION: '18.20.3',
    NPM_FLAGS: '--legacy-peer-deps'
  }
} 