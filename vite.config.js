import { defineConfig } from 'vite';
import posthtml from 'posthtml';
import include from 'posthtml-include';
import path from 'path';

export default defineConfig({
  root: 'src',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [
    {
      name: 'html-include',
      transformIndexHtml(html) {
        return posthtml([include({ root: path.resolve(__dirname, 'src') })])
          .process(html)
          .then((result) => result.html);
      },
    },
  ],
  
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'src/index.html'),
        menu: path.resolve(__dirname, 'src/about/index.html'),
      },
    },
  },
});
