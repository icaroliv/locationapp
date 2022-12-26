import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Container,Text} from './style';
import moment from 'moment';

interface ICard {
  temperatura: String;
  umidade: String;
  children?: React.ReactNode;
  hora: string;
}

const Card: React.FC<ICard> = ({temperatura, umidade,hora}) => {
  return (
    <Container>
      <>
        <Text>Última temperatura registrada {Number(temperatura).toFixed(2)} ºC  <FontAwesome5 name={'thermometer-three-quarters'} solid /></Text>
        <Text>Última umidade registrada {Number(umidade).toFixed(2)}%    <FontAwesome5 name={"humidity"} solid /></Text>
        <Text>Hora da leitura dos dados {moment(hora).format("hh:mm:ss")} <FontAwesome5 name={"clock"} solid /></Text>
      </>
    </Container>
  );
};

export default Card;
