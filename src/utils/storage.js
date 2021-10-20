import AsyncStorage from '@react-native-async-storage/async-storage';

// Buscar filmes salvos
export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);
  let moviesSave = JSON.parse(myMovies) || [];
  return moviesSave;
}

//Salvar filmes
export async function saveMovies(key, newMovie) {
  //pegando os filmes já salvos
  let moviesStored = await getMoviesSave(key);

  // Verificar se o novo filme já está salvo, se tiver retorna verdadeiro
  const hasMovie = moviesStored.some( item => item.id === newMovie.id);

  if (hasMovie) {
    console.log('Filme já cadastrado');
    return;
  }
  // Se passar pelo IF vai salvar o filme
  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
  console.log('Filme cadastrado');
}

// deletar filme
export async function deleteMovies(id) {
  let moviesStored = await getMoviesSave('@primeFilmes');
  // filtrar e retornar todos os filmes que tem id diferente do dado
  let myMovies = moviesStored.filter( item=> {
    return (item.id !== id);
  })

  await AsyncStorage.setItem('@primeFilmes', JSON.stringify(myMovies));
  console.log('Filme deletado');
  return myMovies;
}

// filtrar filmes
export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave('@primeFilmes');
  const hasMovie = moviesStored.find( item => item.id === movie.id);

  if (hasMovie) return true;

  return false;
}