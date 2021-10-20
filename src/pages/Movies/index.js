
import React, {useState, useEffect} from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import Header from '../../components/Header';
import FavoriteItem from '../../components/FavoriteItem';

import {Container, ListMovies} from './styles';

import {deleteMovies, getMoviesSave} from '../../utils/storage';

export default function Movies() {
  const navigation = useNavigation();
  // Usado para dizer se a pagina está aberta ou não, assim vai atualizar a lista
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState([]);

  useEffect(()=> {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@primeFilmes');

      if (isActive) setMovies(result);
    }

    if (isActive) getFavoriteMovies();

    return () => isActive = false;
  }, [isFocused]);

  async function handleDelete(id) {
    const result = await deleteMovies(id);
    setMovies(result);
  }

  function navigateDetails(item) {
    navigation.navigate('Details', {id: item.id})
  }

  return (
    <Container>
      <Header title="Meus Filmes"/>

      <ListMovies
        showVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => 
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={navigateDetails}
          />
        }
      />
    </Container>
  );
}
