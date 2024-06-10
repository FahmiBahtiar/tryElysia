//import elysia
import { Elysia } from 'elysia';
import { swagger } from "@elysiajs/swagger";

//import routes
import Routes from './routes';

//initiate elysia
const app = new Elysia();

app.use(swagger({
    path: '/docs',
    provider : 'swagger-ui'
}))
//route home
app.get('/', () => 'Hello Elysia!');

//add routes
app.group('/api', (app) => app.use(Routes))

//start server on port 3000
app.listen(3000);
 
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);