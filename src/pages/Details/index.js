import React, {useState, useEffect} from 'react';
import { ScrollView, Modal } from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Star from 'react-native-stars';

import {deleteMovies ,saveMovies, hasMovie} from '../../utils/storage'

import { Feather, Ionicons } from '@expo/vector-icons';

import api, {key} from '../../services/api';
import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';

import {
  Container, 
  Header, 
  HeaderButton, 
  Banner, 
  ButtonLink, 
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from './styles';

export default function Details() {

  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(()=>{
    let isActive = true;

    async function getMovie() {
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR',
        }
      })
      .catch((errorr)=> console.log(error));

      if (isActive) {
        setMovie(response.data);
        const isFavorite = await hasMovie(response.data);
        setFavorite(isFavorite);
      }
    };

    if (isActive) getMovie();

    return () => isActive = false;

  }, []);

  async function handleFavoriteMovie(item) {
    if(favorite) {
      await deleteMovies(item.id);
      setFavorite(false);
      alert('Filme retirado da lista');
    } else {
      await saveMovies('@primeFilmes', item);
      setFavorite(true);
      alert('Filme adicionado a lista');
    }
  }

  return(
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={()=> navigation.goBack()}>
          <Feather
            name='arrow-left'
            size={28}
            color='#FFF'
          />
        </HeaderButton>
        <HeaderButton onPress={()=> handleFavoriteMovie(movie)}>
          { favorite ? (
            <Ionicons
              name='bookmark'
              size={28}
              color='#FFF'
            />
          ) : (
            <Ionicons
              name='bookmark-outline'
              size={28}
              color='#FFF'
            />
          )}
        </HeaderButton>
      </Header>
      <Banner
        resizeMethod='resize'
        source={{uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`}}
      />
      <ButtonLink onPress={()=> setOpenLink(true)}>
        <Feather name="link" size={24} color="#FFF"/>
      </ButtonLink>
      <Title numberOfLines={1}>{movie.title}</Title>

      <ContentArea>
        <Star
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name='md-star' size={24} color='#E7A74E' />}
          emptyStar={<Ionicons name='md-star-outline' size={24} color='#E7A74E' />}
          halfStar={<Ionicons name='md-star-half' size={24} color='#E7A74E' />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=> String(item.id)}
        renderItem={({item})=> <Genres data={item}/> }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType='slide' transparent={true} visible={openLink}>
        <ModalLink link={movie?.homepage} title={movie?.title} closeModal={() => setOpenLink(false)}/>
      </Modal>
    </Container>
  );
}