import React, {useState, useEffect} from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

import SearchItem from "../../components/SearchItem";

import api, { key } from "../../services/api";
import { Container, ListMovies } from "./styles";

export default function Search() {

  const navigation = useNavigation();
  const route = useRoute();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let isActive = true;

    async function getMovies(){
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params?.name,
          api_key: key,
          language: 'pt-BR',
          page: 1,
        }
      })

      if(isActive) {
        setMovies(response.data.results);
        // console.log(response.data.results);
        setLoading(false);
      }
    }

    if (isActive) getMovies();

    return () => isActive = false;

  }, []);

  function navigationDetailsPage(item) {
    navigation.navigate('Details', {id: item.id});
  }

  if (loading) return <Container></Container>;

  return(
    <Container>
      <ListMovies
        data={movies}
        showVerticalScrollIndicator={false}
        keyExtractor={ item => String(item.id)}
        renderItem={({item}) => <SearchItem data={item} navigatePage={()=> navigationDetailsPage(item)}/>}
      />
    </Container>
  );
}