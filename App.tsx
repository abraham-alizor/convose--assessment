import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClientProvider} from '@tanstack/react-query';
import theme from './src/shared/theme';
import i18nextConfig from './src/i18n/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AutocompleteDropdownContextProvider} from './src/shared/components/Autocomplete';
import QueryClients from './src/config/QueryClient';

i18nextConfig.initalizeI18Next();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme.lightTheme}>
        <QueryClientProvider client={QueryClients}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
          <AutocompleteDropdownContextProvider>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </AutocompleteDropdownContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
