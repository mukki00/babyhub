const app = require('./app');
const env = require('./config/env');

// Local-only entry point (not used by Vercel) for running `npm run local`.
app.listen(env.port, () => {
  console.log(`Baby Hub API listening on http://localhost:${env.port}`);
});
