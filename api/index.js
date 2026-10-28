// Entrada de Vercel: reenvía cada petición a la app Nest compilada en dist/ (ver src/serverless.ts).
module.exports = require('../dist/serverless').default;
