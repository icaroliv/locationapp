import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import MapboxGL, {PointAnnotation, MarkerView} from '@rnmapbox/maps';
import axios from 'axios';
import IData from '../../interfaces/IData';
import Card from '../../components/Card';
import {Container} from './style';

// import { Container } from './styles';
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken('');

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [lastElement, setLastElement] = useState<IData>();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  useEffect(() => {
    load();
  }, [data]);

  const load = async () => {
    await axios.get('').then(result => {
      setData(result.data);
      console.log(result.data);
      getLastElement();
      setLastCoordinates();
    });
  };

  const getLastElement = () => {
    setLastElement(data[data.length - 1]);
  };

  const setLastCoordinates = () => {
    const result: number[] = [];
    result.push(Number(lastElement?.location.longitude || ''));
    result.push(Number(lastElement?.location.latitude || ''));
    setCoordinates(result);
  };

  return (
    <Container>
      {data.length != 0 ? (
        <>
          <Card
            temperatura={lastElement?.clima.temperatura || ''}
            hora={lastElement?.hora || ''}
            umidade={lastElement?.clima.umidade || ''}></Card>
          <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Dark}
            style={{
              width: width,
              height: height,
            }}>
            <MapboxGL.Camera zoomLevel={14} centerCoordinate={coordinates} />

            <PointAnnotation coordinate={coordinates}></PointAnnotation>
          </MapboxGL.MapView>
        </>
      ) : null}
    </Container>
  );
};

export default Map;
