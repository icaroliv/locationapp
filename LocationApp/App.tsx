import React, {type PropsWithChildren} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import Map from './src/pages/Map';

const App = () => {
  return (
    <PaperProvider>
      <Map />
    </PaperProvider>
  );
};

export default App;
