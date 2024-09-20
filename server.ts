import express, { Request, Response } from 'express'; // импортируем типы Request и Response
import { createServer } from 'vite';
import { createSSRApp } from 'vue';
import App from './src/App.vue';
import { renderToString } from '@vue/server-renderer';

async function startServer() {
  const app = express();

  const vite = await createServer({
    server: {
      middlewareMode: true,
    },
  });

  app.use(vite.middlewares);

  app.get('*', async (req: Request, res: Response) => { // Указываем типы для req и res
    try {
      const ssrApp = createSSRApp(App);
      const html = await renderToString(ssrApp);
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    } catch (error) {
      console.error('Error during rendering:', error);
      res.status(500).end('Internal Server Error');
    }
  });

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}

startServer();