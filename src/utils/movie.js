// Gerar lista de filmes no tamanho especifico
export function getListMovies(size, movies) {
  let listMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    listMovies.push(movies[i]);
  }

  return listMovies;
}

// Gerar um número aleatorio com base na lista de filmes
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}