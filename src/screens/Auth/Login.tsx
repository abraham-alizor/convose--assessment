import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {landingpagebackground} from '@/assets/pngImagePack';
import StatusbarImageContainer from '@/shared/layout/StatusbarImageContainer';
import {Box} from '@/shared/components/Box';

import {RootNavigationProps} from '@/navigations/types';
import {AutocompleteDropdown} from '@/shared/components/Autocomplete';
import {MockData} from '../../mock/index';
import {Image} from '@/shared/components/Image';

interface LoginFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: FC<RootNavigationProps<'LoginScreen'>> = ({navigation}) => {
  const {t} = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Kyc');
    }, 2000);
  };

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
