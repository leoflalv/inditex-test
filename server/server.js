import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use((req, res, next) => {
  setTimeout(next, 500);
});

server.use('/api', router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
