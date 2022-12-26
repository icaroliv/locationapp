import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import MapboxGL, {PointAnnotation, MarkerView} from '@rnmapbox/maps';
import axios from 'axios';
import IData from '../../interfaces/IData';
import Card from '../../components/Card';
import {Container} from './style';

// import { Container } from './styles';
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaWNhcm9saXYiLCJhIjoiY2w5dHdoNnVkMXpraTN2bzVtd3JyZWl0cCJ9.VWPNzZvVowA6P-FJ3pQ_3Q',
);

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState([-37.8, -10.7]);
  const [data, setData] = useState<IData[]>([]);
  const [temperatura, setTemperatura] = useState<String>();
  const [umidade, setUmidade] = useState<String>();
  const [lastElement, setLastElement] = useState<IData>();

  useEffect(() => {
    load();
  }, [data]);

  const load = async () => {
    await axios.get('https://locationapi.vercel.app/list').then(result => {
      setData(result.data);
      console.log(result.data)
      getLastElement();
     // setLastCoordinates();
    });
  };

  const getLastElement = () => {
    setLastElement(data[data.length - 1]);
  };

  const setLastCoordinates = () => {
    const array = new Array();
  array.push(parseFloat(lastElement?.location.longitude || ""));
  array.push(parseFloat(lastElement?.location.latitude || ""));

  setCoordinates(array)
    console.log(array)
    //setCoordinates([Number(lastElement?.localizacao.latitude),Number(lastElement?.localizacao.longitude)])
    
  };

  return (
    <Container>
      <Card
        temperatura={lastElement?.clima.temperatura || ''}
        hora={lastElement?.hora || ""}
        umidade={lastElement?.clima.umidade || ''}></Card>
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Dark}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <PointAnnotation coordinate={coordinates}></PointAnnotation>
      </MapboxGL.MapView>
   
    </Container>
  );
};

export default Map;
