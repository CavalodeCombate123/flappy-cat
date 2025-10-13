const CACHE_NAME = 'flappy-cat-cache-v2'; // Versão do cache atualizada
// Lista de arquivos que o Service Worker vai guardar (cache)
const urlsToCache = [
  '/',
  'index.html',
  'telainicio.png', 
  'pngwing.com.png',
  'world.png',
  'greg.png',
  'icone-512x512.png',
  'gato.png',
  'piscina.png',
  'deserto.png',
  'gregfeliz.png',
  'Layane.png',
  'noite1.gif',
  'afuis-removebg-preview.png'
];

// Evento de instalação: abre o cache e adiciona os arquivos da lista
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: intercepta as requisições
// Se o arquivo estiver no cache, entrega a cópia do cache
// Se não, busca na rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache
        }
        return fetch(event.request); // Busca na rede
      }
    )
  );
});

