/* eslint-disable prettier/prettier */
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {ProviderContext} from './app/';
import {Main} from './navigation';

const App = () => {
  return (
    <ProviderContext>
      <NativeBaseProvider>
        <PaperProvider>
          <Main />
        </PaperProvider>
      </NativeBaseProvider>
    </ProviderContext>
  );
};

export default App;
