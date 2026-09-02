import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          cart: path.resolve(__dirname, 'cart.html'),
          sana: path.resolve(__dirname, 'sana.html'),
          blackLawnSuit: path.resolve(__dirname, 'black-lawn-suit.html'),
          gulChiffonSuit: path.resolve(__dirname, 'gul-chiffon-suit.html'),
          rubyOrganzaSuit: path.resolve(__dirname, 'ruby-organza-suit.html'),
          menBlueSuit: path.resolve(__dirname, 'men-blue-suit.html'),
          menCharcoalSuit: path.resolve(__dirname, 'men-charcoal-suit.html'),
          menIvorySuit: path.resolve(__dirname, 'men-ivory-suit.html'),
          blackShoes: path.resolve(__dirname, 'black-shoes.html'),
          tanLeatherShoes: path.resolve(__dirname, 'tan-leather-shoes.html'),
          urbanSneakers: path.resolve(__dirname, 'urban-sneakers.html'),
          ladiesSandal: path.resolve(__dirname, 'ladies-sandal.html'),
          ladiesTraditionalKhussa: path.resolve(__dirname, 'ladies-traditional-khussa.html'),
          gentsPeshawariChappal: path.resolve(__dirname, 'gents-peshawari-chappal.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
