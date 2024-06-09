import app from './src/index.js';

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
