import app from './app.js';
import config from './config/index.js';
import prisma from './config/database.js';

const PORT = config.port;

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   🌍 Rio International Travel Agency API       ║
║                                                ║
║   Environment: ${config.nodeEnv.toUpperCase().padEnd(34)}║
║   Port: ${PORT.toString().padEnd(40)}║
║   URL: ${config.apiUrl.padEnd(41)}║
║                                                ║
╚════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
    console.log('✅ Process terminated');
    process.exit(0);
  });
});
