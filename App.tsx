import React, {useEffect} from 'react';
import {Platform, StatusBar, BackHandler} from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';

import theme from './src/shared/theme';
import i18nextConfig from './src/i18n/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AutocompleteDropdownContextProvider} from './src/shared/components/Autocomplete';

i18nextConfig.initalizeI18Next();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme.lightTheme}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <AutocompleteDropdownContextProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </AutocompleteDropdownContextProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
