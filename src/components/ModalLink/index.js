import React from 'react';
import {WebView} from 'react-native-webview';

import {Feather} from '@expo/vector-icons';

import {Title, BackButton} from './styles';

export default function ModalLink({link, title, closeModal}) {
  return(
    <>
      <BackButton onPress={closeModal}>
        <Feather name='x' size={35} color="#FFF"/>
        <Title numberOfLines={1}>{title}</Title>
      </BackButton>
      <WebView
        source={{uri:link}}
      />
    </>
  );
}