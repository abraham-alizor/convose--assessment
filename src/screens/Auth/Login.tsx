import React, {FC, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {landingpagebackground} from '@/assets/pngImagePack';
import StatusbarImageContainer from '@/shared/layout/StatusbarImageContainer';
import {Box} from '@/shared/components/Box';

import {RootNavigationProps} from '@/navigations/types';
import {AutocompleteDropdown} from '@/shared/components/Autocomplete';
import {MockData} from '../../mock/index';

import {useInterests} from '../../hooks/index';
import {Text} from '@/shared/components/Typography';

const Signup: FC<RootNavigationProps<'LoginScreen'>> = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const {data, isLoading, isError, error} = useInterests({
    limit: 12,
    from: 0,
  });

  if (isError) {
    return (
      <Box>
        <Text>Error: {(error as Error).message}</Text>
      </Box>
    );
  }
  console.log(data);

  return (
    <StatusbarImageContainer
      backgroundColor="primary"
      imageName={landingpagebackground}>
      <ScrollView
        // style={{height: '100%'}}
        bounces={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="md" paddingTop="md">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Box mt="xl" />

            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              initialValue={{id: '2'}} // or just '2'
              onSelectItem={setSelectedItem}
              dataSet={MockData}
            />
          </KeyboardAvoidingView>
        </Box>
      </ScrollView>
    </StatusbarImageContainer>
  );
};

export default Signup;
