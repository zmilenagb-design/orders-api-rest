const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación disponible en http://localhost:${PORT}/api/v1/docs`);
  console.log(`❤️  Health check en http://localhost:${PORT}/api/v1/health`);
});