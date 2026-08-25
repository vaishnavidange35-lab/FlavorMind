import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 FlavorMind AI Server running on port ${PORT}`);
  console.log(`📡 Environment: ${config.nodeEnv}`);
  console.log(`🧪 Health Check: http://localhost:${PORT}/health`);
  console.log(`==================================================`);
});
