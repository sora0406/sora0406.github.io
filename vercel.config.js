module.exports = {
  builds: [
    {
      src: 'package.json',
      use: '@vercel/next',
      config: {
        installCommand: 'npm install --legacy-peer-deps',
        buildCommand: './vercel-build.sh',
        nodeVersion: '18.20.3',
        skipAutoInstall: true,
        devCommand: 'npm run dev',
      }
    }
  ],
  env: {
    NODEJS_VERSION: '18.20.3',
    NPM_FLAGS: '--legacy-peer-deps',
    SKIP_PNPM: '1'
  }
} 