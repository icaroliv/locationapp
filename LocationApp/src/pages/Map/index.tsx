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
  const [coordinates, setCoordinates] = useState<Number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [temperatura, setTemperatura] = useState<String>();
  const [umidade, setUmidade] = useState<String>();
  const [lastElement, setLastElement] = useState<IData>();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    await axios.get('https://locationapi.vercel.app/list').then(result => {
      setData(result.data);
      getLastElement();
      setLastCoordinates();
    });
  };

  const getLastElement = () => {
    setLastElement(data[data.length - 1]);
    console.log(lastElement);
  };

  const setLastCoordinates = () => {
    const result : number[] = [];
    result.push(Number(lastElement?.location.longitude || ""));
    result.push(Number(lastElement?.location.latitude || ""));
    setCoordinates(result);
  };

  return (
    <Container>
      {coordinates.length != 0 ? (
        <>
          <Card
            temperatura={lastElement?.clima.temperatura || ''}
            hora={lastElement?.hora || ''}
            umidade={lastElement?.clima.umidade || ''}></Card>
          <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Dark}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}>
            <PointAnnotation coordinate={coordinates}></PointAnnotation>
          </MapboxGL.MapView>
        </>
      ) : null}
    </Container>
  );
};

export default Map;
