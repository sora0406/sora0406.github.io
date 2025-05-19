module.exports = {
  builds: [
    {
      src: 'package.json',
      use: '@vercel/next',
      config: {
        installCommand: 'npm install --legacy-peer-deps',
        buildCommand: './vercel-build.sh',
        nodeVersion: '20.x',
        skipAutoInstall: true,
        devCommand: 'npm run dev',
      }
    }
  ],
  env: {
    NODEJS_VERSION: '20.x',
    NPM_FLAGS: '--legacy-peer-deps',
    SKIP_PNPM: '1'
  }
} 